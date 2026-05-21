## Why

El sistema de registro de eventos actualmente no tiene autenticación ni control de acceso. Se necesita una tabla de usuarios en la base de datos como base fundamental para implementar el sistema de login con roles (ADMIN/CONSULTA) que permita diferenciar quién puede crear/editar participantes y quién solo puede consultar.

## What Changes

- Se crea la tabla `usuarios_db` en la base de datos del backend Python
- Se definen los campos: `id` (PK autonumérica), `username` (string), `password` (string), `rol` (string)
- Se restringen los valores del campo `rol` a estrictamente `ADMIN` o `CONSULTA`
- Se establece la base de datos para soportar autenticación JWT (changes siguientes)

## Capabilities

### New Capabilities
- `user-database`: Tabla de usuarios con campos de autenticación y roles para el sistema de registro de eventos

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Backend Python**: Nuevo modelo/tabla de base de datos `usuarios_db`
- **Base de datos**: Schema change — nueva tabla
- **Changes siguientes**: Este change es prerequisito para Change 2 (AuthContext), Change 3 (JWT), Change 4 (Rutas), y Change 5 (UI con permisos)
