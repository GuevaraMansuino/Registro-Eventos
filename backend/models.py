from sqlalchemy import Column, Integer, String, Boolean
import json
from pydantic import BaseModel, field_validator
from typing import List, Literal
from database import Base

# SQLAlchemy Model
class ParticipanteDB(Base):
    __tablename__ = "participantes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    email = Column(String, index=True)
    edad = Column(Integer)
    pais = Column(String)
    modalidad = Column(String)
    tecnologias = Column(String) # Guardaremos como JSON string
    nivel = Column(String)
    aceptaTerminos = Column(Boolean)

class UsuarioDB(Base):
    __tablename__ = "usuarios_db"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True, unique=True)
    password = Column(String)
    rol = Column(String)

# Pydantic Schemas
class ParticipanteCreate(BaseModel):
    nombre: str
    email: str
    edad: int
    pais: str
    modalidad: str
    tecnologias: List[str]
    nivel: str
    aceptaTerminos: bool

class ParticipanteResponse(ParticipanteCreate):
    id: int

    @field_validator('tecnologias', mode='before')
    def parse_tecnologias(cls, v):
        if isinstance(v, str):
            try:
                return json.loads(v)
            except:
                return []
        return v

    class Config:
        from_attributes = True

class UsuarioCreate(BaseModel):
    username: str
    password: str
    rol: Literal["ADMIN", "CONSULTA"]

class UsuarioResponse(UsuarioCreate):
    id: int

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
