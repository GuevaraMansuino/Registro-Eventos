## Why

El sistema necesita autenticación para controlar quién accede a las diferentes funcionalidades. Change1 creó la tabla de usuarios en la base de datos; ahora se necesita la estructura frontend (AuthContext, PrivateRoute, LoginPage) y la integración del estado global de autenticación para preparar el flujo de login/logout.

## What Changes

- Se crea `src/context/AuthContext.tsx` con estado global de autenticación (login, logout, usuario actual)
- Se crea `src/routes/PrivateRoute.tsx` como componente de protección de rutas
- Se crea `src/pages/LoginPage.tsx` como vista de inicio de sesión
- Se modifica `main.tsx` para envolver `<AuthProvider>` como padre de `<ParticipantesProvider>`
- Se prepara la base para integración con JWT (Change 3)

## Capabilities

### New Capabilities
- `auth-context`: Estado global de autenticación con login, logout y usuario actual
- `private-route`: Componente de protección de rutas con validación de autenticación
- `login-page`: Vista de inicio de sesión con formulario de credenciales

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Frontend React**: Nuevos archivos `AuthContext.tsx`, `PrivateRoute.tsx`, `LoginPage.tsx`
- **`main.tsx`**: Cambio en el árbol de componentes — se agrega `<AuthProvider>`
- **Change 3 (JWT)**: Dependerá de este change para conectar el login con el backend
- **Change 4 (Rutas)**: Usará `PrivateRoute` para proteger rutas por rol
