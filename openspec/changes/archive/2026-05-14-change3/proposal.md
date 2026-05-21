## Why

Change1 creó la tabla de usuarios y Change2 la estructura frontend de autenticación. Ahora se necesita conectar ambos lados implementando JWT: el backend debe generar tokens al validar credenciales, y el frontend debe persistir y enviar el token en cada petición. Sin JWT, el login es mock y no hay seguridad real.

## What Changes

- Se agrega la dependencia `PyJWT` al backend Python para generación y validación de tokens
- Se implementa endpoint `POST /login` que valida credenciales contra `usuarios_db` y retorna un JWT
- Se implementa middleware/dependencia de FastAPI para validar JWT en endpoints protegidos
- El frontend persiste el JWT en `localStorage` al hacer login
- El frontend envía el JWT en el header `Authorization: Bearer <token>` en cada petición al backend
- `AuthContext.login()` se conecta al endpoint real en vez del mock

## Capabilities

### New Capabilities
- `jwt-auth`: Generación, validación y persistencia de tokens JWT entre frontend y backend
- `login-endpoint`: Endpoint POST /login para autenticación de usuarios contra la base de datos

### Modified Capabilities
- `auth-context`: El login pasa de ser mock en memoria a conectar con el backend real via JWT
- `login-page`: El formulario de login ahora envía credenciales al endpoint real del backend

## Impact

- **Backend Python**: Nueva dependencia `PyJWT`, nuevo endpoint `/login`, nueva dependencia `get_current_user` para proteger rutas
- **Frontend React**: `AuthProvider.login()` cambia de mock a fetch real, se agrega persistencia en `localStorage`
- **ParticipantesProvider**: Las peticiones fetch deben incluir el header `Authorization: Bearer <token>`
- **Base de datos**: Se lee `usuarios_db` para validar credenciales (ya existe desde Change1)
