from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from pydantic import BaseModel
from dotenv import load_dotenv
import json
import os
from datetime import datetime, timedelta
import jwt
import mercadopago

load_dotenv()

import models
from database import engine, SessionLocal

# JWT Configuration
SECRET_KEY = "dev-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
security = HTTPBearer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambiar a los dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MERCADOPAGO_ACCESS_TOKEN = os.environ.get("MERCADOPAGO_ACCESS_TOKEN", "TEST-ACCESS-TOKEN")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")

sdk = mercadopago.SDK(MERCADOPAGO_ACCESS_TOKEN)

# Dependency para obtener la sesión de BD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> models.UsuarioResponse:
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Token inválido")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = db.query(models.UsuarioDB).filter(models.UsuarioDB.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    return models.UsuarioResponse(id=user.id, username=user.username, password=user.password, rol=user.rol)

@app.post("/login", response_model=models.TokenResponse)
def login(request: models.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.UsuarioDB).filter(
        models.UsuarioDB.username == request.username,
        models.UsuarioDB.password == request.password
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    access_token = create_access_token(
        data={"sub": user.username, "rol": user.rol}
    )
    return models.TokenResponse(access_token=access_token)

@app.get("/participantes", response_model=list[models.ParticipanteResponse])
def get_participantes(db: Session = Depends(get_db)):
    return db.query(models.ParticipanteDB).all()

@app.post("/participantes", response_model=models.ParticipanteResponse)
def create_participante(participante: models.ParticipanteCreate, db: Session = Depends(get_db)):
    # Convertir list de tecnologias a JSON string para guardar
    db_participante = models.ParticipanteDB(
        nombre=participante.nombre,
        email=participante.email,
        edad=participante.edad,
        pais=participante.pais,
        modalidad=participante.modalidad,
        tecnologias=json.dumps(participante.tecnologias),
        nivel=participante.nivel,
        aceptaTerminos=participante.aceptaTerminos
    )
    db.add(db_participante)
    db.commit()
    db.refresh(db_participante)
    return db_participante

@app.put("/participantes/{participante_id}", response_model=models.ParticipanteResponse)
def update_participante(
    participante_id: int,
    participante: models.ParticipanteCreate,
    db: Session = Depends(get_db)
):
    db_participante = db.query(models.ParticipanteDB).filter(models.ParticipanteDB.id == participante_id).first()
    if not db_participante:
        raise HTTPException(status_code=404, detail="Participante no encontrado")

    db_participante.nombre = participante.nombre
    db_participante.email = participante.email
    db_participante.edad = participante.edad
    db_participante.pais = participante.pais
    db_participante.modalidad = participante.modalidad
    db_participante.tecnologias = json.dumps(participante.tecnologias)
    db_participante.nivel = participante.nivel
    db_participante.aceptaTerminos = participante.aceptaTerminos

    db.commit()
    db.refresh(db_participante)
    return db_participante

@app.delete("/participantes/{participante_id}")
def delete_participante(participante_id: int, db: Session = Depends(get_db)):
    db_participante = db.query(models.ParticipanteDB).filter(models.ParticipanteDB.id == participante_id).first()
    if not db_participante:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    db.delete(db_participante)
    db.commit()
    return {"ok": True}



class PreferenciaRequest(BaseModel):
    id_curso: str
    title: str
    unit_price: float
    quantity: int = 1

@app.post("/crear-preferencia")
def crear_preferencia(data: PreferenciaRequest):
    """
    Crea una preferencia de pago en Mercado Pago y retorna la URL de Checkout Pro.
    """
    preference_data = {
        "items": [
            {
                "title": data.title,
                "quantity": data.quantity,
                "unit_price": data.unit_price,
                "currency_id": "ARS",
            }
        ],"external_reference": data.id_curso,
    }


    if "localhost" not in FRONTEND_URL:
        preference_data["back_urls"] = {
            "success": f"{FRONTEND_URL}/pago/success",
            "failure": f"{FRONTEND_URL}/pago/failure",
            "pending": f"{FRONTEND_URL}/pago/pending",
        }
        preference_data["auto_return"] = "approved"

    try:
        result = sdk.preference().create(preference_data)

        if result["status"] != 201:
            print(f"[MercadoPago] Error {result['status']}: {result['response']}")
            raise HTTPException(
                status_code=500,
                detail={
                    "message": "Error al crear la preferencia en Mercado Pago",
                    "mp_status": result["status"],
                    "mp_error": result["response"],
                }
            )

        preference = result["response"]
        print(f"[MercadoPago] Preferencia creada: {preference['id']}")
        return {
            "id": preference["id"],
            "init_point": preference["init_point"],
            "sandbox_init_point": preference["sandbox_init_point"],
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"[MercadoPago] Exception: {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/pago-info/{payment_id}")
def obtener_informacion_pago(payment_id: int):
    """
    Consulta a Mercado Pago los detalles de un pago realizado para mostrarlos en el frontend.
    """
    try:
        payment_result = sdk.payment().get(payment_id)

        if payment_result["status"] != 200:
            raise HTTPException(status_code=404, detail="Pago no encontrado")

        payment = payment_result["response"]

        items = payment.get("additional_info", {}).get("items", [])

        return {
            "id_pago": payment["id"],
            "estado": payment["status"],             
            "monto_total": payment["transaction_amount"],
            "moneda": payment["currency_id"],
            "metodo_pago": payment["payment_type_id"],
            "fecha_aprobacion": payment.get("date_approved"),
            "items": items   
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"[MercadoPago] Error consultando pago: {e}")
        raise HTTPException(status_code=500, detail="Error al consultar el pago")

@app.post("/webhook")
async def webhook_mercadopago(request: Request):
    """
    Recibe notificaciones de pago de Mercado Pago.
    Mercado Pago envía notificaciones cuando cambia el estado de un pago.
    """
    try:
        body = await request.json()
        print(f"[Webhook] Notificación recibida: {json.dumps(body, indent=2)}")

        if body.get("type") == "payment":
            payment_id = body.get("data", {}).get("id")
            if payment_id:
                payment_result = sdk.payment().get(payment_id)
                if payment_result["status"] == 200:
                    payment = payment_result["response"]
                    print(f"[Webhook] Pago {payment_id}: status={payment.get('status')}")
                else:
                    print(f"[Webhook] Error consultando pago {payment_id}")

        return {"status": "ok"}

    except Exception as e:
        print(f"[Webhook] Error procesando notificación: {e}")
        return {"status": "error", "detail": str(e)}
