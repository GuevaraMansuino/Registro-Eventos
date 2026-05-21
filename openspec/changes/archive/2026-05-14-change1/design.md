## Context

El backend actual usa FastAPI + SQLAlchemy con SQLite (`participantes.db`). Existe un modelo `ParticipanteDB` con CRUD completo pero no hay ningún sistema de autenticación ni tabla de usuarios. La base de datos se inicializa automáticamente via `models.Base.metadata.create_all(bind=engine)` en `main.py`.

## Goals / Non-Goals

**Goals:**
- Agregar tabla `usuarios_db` al schema existente de SQLAlchemy
- Soportar campos: `id` (PK), `username`, `password`, `rol` con valores restringidos a `ADMIN` o `CONSULTA`
- Mantener compatibilidad con la base SQLite existente (`participantes.db`)
- Preparar la base para autenticación JWT (changes siguientes)

**Non-Goals:**
- NO implementar login ni generación de JWT (Change 3)
- NO implementar AuthContext ni rutas protegidas (Changes 2 y 4)
- NO migrar a otro motor de base de datos
- NO hash de passwords en este change (se hará en Change 3 con JWT)

## Decisions

### 1. SQLAlchemy model separado para usuarios
**Decision:** Crear un nuevo modelo `UsuarioDB` en `models.py` siguiendo el mismo patrón que `ParticipanteDB`.
**Rationale:** Mantiene consistencia con el patrón existente. `Base.metadata.create_all` creará ambas tablas automáticamente sin migraciones complejas.
**Alternatives considered:** Usar Alembic para migraciones — rechazado porque es un proyecto pequeño y SQLite no soporta ALTER COLUMN nativamente bien.

### 2. Campo `rol` como String con validación en Pydantic
**Decision:** El campo `rol` será `String` en SQLAlchemy con validación de valores en el Pydantic schema usando `Literal["ADMIN", "CONSULTA"]`.
**Rationale:** Simple y efectivo para dos valores fijos. Un ENUM de SQL sería overkill para SQLite.
**Alternatives considered:** SQLAlchemy `Enum` — más verboso y no aporta valor real sobre String con validación Pydantic.

### 3. Password en texto plano (temporal)
**Decision:** En este change el password se almacena como string plano. El hashing se implementará en Change 3 junto con JWT.
**Rationale:** Este change solo crea la estructura de datos. El hashing es parte de la lógica de autenticación.
**Risk:** Si se insertan usuarios antes de Change 3, las passwords quedarán expuestas. Mitigation: no insertar usuarios reales hasta que Change 3 esté completo.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Passwords en texto plano hasta Change 3 | No usar credenciales reales; solo datos de prueba |
| SQLite no soporta migraciones complejas | `create_all` es idempotente — tablas nuevas se crean sin afectar existentes |
| Dos tablas en el mismo archivo `models.py` | Separar en futuro si crece (e.g., `models/usuarios.py`) |
