from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
import json
import jwt

import models
from database import engine, SessionLocal

SECRET_KEY = "dev-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
security = HTTPBearer()

# Configurar CORS para permitir peticiones desde React (ej. localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambiar a los dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency para obtener la sesión de BD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def seed_users():
    db = SessionLocal()
    try:
        usuarios = [
            {"username": "admin", "password": "admin123", "rol": "ADMIN"},
            {"username": "usuario", "password": "usuario123", "rol": "CONSULTA"},
        ]
        for usuario in usuarios:
            exists = db.query(models.UsuarioDB).filter(
                models.UsuarioDB.username == usuario["username"]
            ).first()
            if not exists:
                db.add(models.UsuarioDB(**usuario))
        db.commit()
    finally:
        db.close()

seed_users()

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> models.UsuarioDB:
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str | None = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Token inválido")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = db.query(models.UsuarioDB).filter(models.UsuarioDB.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    return user

def require_admin(current_user: models.UsuarioDB = Depends(get_current_user)) -> models.UsuarioDB:
    if current_user.rol != "ADMIN":
        raise HTTPException(status_code=403, detail="Permisos insuficientes")
    return current_user

@app.post("/login", response_model=models.TokenResponse)
def login(request: models.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.UsuarioDB).filter(
        models.UsuarioDB.username == request.username,
        models.UsuarioDB.password == request.password,
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    access_token = create_access_token(data={"sub": user.username, "rol": user.rol})
    return models.TokenResponse(access_token=access_token)

@app.get("/participantes", response_model=list[models.ParticipanteResponse])
def get_participantes(
    db: Session = Depends(get_db),
    current_user: models.UsuarioDB = Depends(get_current_user),
):
    return db.query(models.ParticipanteDB).all()

@app.post("/participantes", response_model=models.ParticipanteResponse)
def create_participante(
    participante: models.ParticipanteCreate,
    db: Session = Depends(get_db),
    current_user: models.UsuarioDB = Depends(require_admin),
):
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
    db: Session = Depends(get_db),
    current_user: models.UsuarioDB = Depends(require_admin),
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
def delete_participante(
    participante_id: int,
    db: Session = Depends(get_db),
    current_user: models.UsuarioDB = Depends(require_admin),
):
    db_participante = db.query(models.ParticipanteDB).filter(models.ParticipanteDB.id == participante_id).first()
    if not db_participante:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    db.delete(db_participante)
    db.commit()
    return {"ok": True}
