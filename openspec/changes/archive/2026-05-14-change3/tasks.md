## 1. Dependencia PyJWT

- [x] 1.1 Instalar `PyJWT` en el venv del backend (`pip install PyJWT`)

## 2. Login endpoint (Backend)

- [x] 2.1 Crear Pydantic schema `LoginRequest` con `username: str` y `password: str`
- [x] 2.2 Crear Pydantic schema `TokenResponse` con `access_token: str` y `token_type: str`
- [x] 2.3 Implementar función `create_access_token(data, expires_delta)` que genera JWT
- [x] 2.4 Implementar endpoint `POST /login` que valida credenciales contra `usuarios_db` y retorna JWT
- [x] 2.5 Implementar dependencia `get_current_user` que extrae y valida JWT del header Authorization

## 3. AuthProvider con JWT (Frontend)

- [x] 3.1 Modificar `AuthProvider.login()` para enviar POST a `/login` y persistir token en `localStorage`
- [x] 3.2 Modificar `AuthProvider.logout()` para eliminar token de `localStorage`
- [x] 3.3 Agregar inicialización de estado desde `localStorage` al montar `AuthProvider`
- [x] 3.4 Crear función utilitaria `decodeToken` para leer datos del JWT sin validación de firma

## 4. Peticiones con token (Frontend)

- [x] 4.1 Modificar `ParticipantesProvider` para incluir header `Authorization: Bearer <token>` en fetches
