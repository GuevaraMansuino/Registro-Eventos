from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json

import models
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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

@app.delete("/participantes/{participante_id}")
def delete_participante(participante_id: int, db: Session = Depends(get_db)):
    db_participante = db.query(models.ParticipanteDB).filter(models.ParticipanteDB.id == participante_id).first()
    if not db_participante:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    db.delete(db_participante)
    db.commit()
    return {"ok": True}
