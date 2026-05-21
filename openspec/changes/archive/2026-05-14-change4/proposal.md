## Why

Change2 creó los componentes `PrivateRoute` y `LoginPage` pero no se integraron en el enrutamiento de la app. Change3 agregó JWT autenticación. Ahora se necesita configurar las rutas de `App.tsx` para que las páginas públicas sean accesibles sin login y las páginas protegidas requieran autenticación (y algunas rol ADMIN).

## What Changes

- Se agrega la ruta `/login` que renderiza `LoginPage` (pública)
- Se agregan rutas públicas `/` y `/publica` sin validación
- Se envuelven rutas `/` (Home/ListaPage) con `<PrivateRoute>` simple
- Se envuelven rutas `/nuevo` y `/editar/:id` con `<PrivateRoute rol="ADMIN">`
- Se agrega opción "Cerrar Sesión" al menú de navegación
- Se muestra "Nuevo participante" en el menú solo para usuarios ADMIN

## Capabilities

### New Capabilities
- `route-protection`: Configuración de rutas públicas y privadas en el enrutamiento de la app
- `navigation-auth`: Menú de navegación adaptado según estado de autenticación y rol del usuario

### Modified Capabilities
- `private-route`: Se integra en el enrutamiento real de App.tsx (ya existía como componente)

## Impact

- **`frontend/src/App.tsx`**: Cambio mayor — reestructuración completa de rutas con PrivateRoute
- **Menú de navegación**: Items condicionales según auth y rol
- **Rutas nuevas**: `/login` (LoginPage), `/publica` (PublicaPage placeholder)
- **Rutas protegidas**: `/nuevo` y `/editar/:id` requieren rol ADMIN
