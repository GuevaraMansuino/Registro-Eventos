## 1. Modelo SQLAlchemy

- [x] 1.1 Crear clase `UsuarioDB` en `models.py` con `__tablename__ = "usuarios_db"`
- [x] 1.2 Definir campos: `id` (Integer, PK, index), `username` (String, index), `password` (String), `rol` (String)

## 2. Schemas Pydantic

- [x] 2.1 Crear `UsuarioCreate` con campos `username: str`, `password: str`, `rol: Literal["ADMIN", "CONSULTA"]`
- [x] 2.2 Crear `UsuarioResponse` con `id: int` + campos de `UsuarioCreate` y `from_attributes = True`

## 3. Verificación de creación de tabla

- [x] 3.1 Confirmar que `models.Base.metadata.create_all(bind=engine)` crea ambas tablas (`participantes` y `usuarios_db`) al iniciar la app
