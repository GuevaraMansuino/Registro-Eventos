## Context

El backend (FastAPI + SQLAlchemy + SQLite) tiene la tabla `usuarios_db` con campos `username`, `password` (texto plano), y `rol`. El frontend tiene `AuthProvider` con login mock en memoria, `LoginPage` con formulario, y `PrivateRoute` que valida autenticación. No hay comunicación real entre frontend y backend para autenticación. No hay librería JWT instalada en el backend.

## Goals / Non-Goals

**Goals:**
- Instalar `PyJWT` en el backend para generación y validación de tokens
- Crear endpoint `POST /login` que valida credenciales contra `usuarios_db` y retorna JWT
- Crear dependencia `get_current_user` para proteger endpoints con JWT
- Conectar `AuthProvider.login()` al endpoint real del backend
- Persistir JWT en `localStorage` del frontend
- Enviar JWT en header `Authorization: Bearer <token>` en cada petición

**Non-Goals:**
- NO hash de passwords (se puede agregar después, pero para este proyecto educativo se acepta el riesgo)
- NO refresh tokens (JWT con expiración simple es suficiente)
- NO HTTPS (es entorno de desarrollo local)
- NO cambiar la estructura de rutas protegidas (Change 4 se encarga)

## Decisions

### 1. PyJWT para generación y validación de tokens
**Decision:** Usar `PyJWT` (paquete `jwt`) como librería de JWT en el backend.
**Rationale:** Es la librería estándar de Python para JWT, ligera y bien mantenida. `python-jose` es otra opción pero es más pesada y orientada a OAuth.
**Alternatives considered:** `python-jose` — rechazado porque es overkill para un JWT simple.

### 2. JWT con expiración de 24 horas
**Decision:** Los tokens expiran en 24 horas usando el claim `exp` estándar.
**Rationale:** Balance entre usabilidad (no pedir login cada hora) y seguridad (no token eterno).
**Secret key:** Se usa una constante `SECRET_KEY` en el backend. En producción debería ser variable de entorno.

### 3. localStorage para persistencia del token
**Decision:** El token se guarda en `localStorage` del navegador.
**Rationale:** Simple y efectivo para este proyecto. `sessionStorage` se perdería al cerrar la pestaña. Cookies httpOnly serían más seguras pero requieren configuración adicional de CORS.
**Risk:** Vulnerable a XSS. Mitigation: aceptable para proyecto educativo; en producción usar cookies httpOnly.

### 4. Header Authorization Bearer para enviar token
**Decision:** El token se envía como `Authorization: Bearer <token>` en cada petición fetch.
**Rationale:** Estándar RFC 6750. FastAPI puede leerlo fácilmente con `HTTPBearer`.
**Alternatives considered:** Cookie — rechazado por complejidad de CORS en desarrollo.

### 5. Password en texto plano (aceptado para proyecto educativo)
**Decision:** Se mantiene el password en texto plano en la base de datos.
**Rationale:** El proyecto es educativo y no maneja datos sensibles reales. Agregar bcrypt sería buena práctica pero añade complejidad no requerida.
**Risk:** Si la DB se expone, las passwords son legibles. Mitigation: solo datos de prueba locales.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Secret key hardcodeada | Documentar que en producción debe ser variable de entorno |
| localStorage vulnerable a XSS | Aceptable para proyecto educativo |
| Passwords en texto plano | Solo datos de prueba, no credenciales reales |
| Token no se refresca automáticamente | Expiración de 24h; el usuario hace login de nuevo |
