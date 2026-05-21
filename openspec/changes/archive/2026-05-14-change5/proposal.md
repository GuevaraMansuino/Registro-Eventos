## Why

Change4 configuró rutas protegidas y menú condicional, pero la vista Home (`Home.tsx`) y las tarjetas de participantes (`ParticipanteCard.tsx`) siguen mostrando botones de acción (Nuevo, Editar, Eliminar, Resetear) a todos los usuarios sin distinguir rol. Un usuario CONSULTA puede ver y usar botones que no debería. Se necesita adaptar la UI para que las acciones de escritura solo sean visibles para ADMIN.

## What Changes

- Se oculta el botón "Nuevo participante" en Home para usuarios CONSULTA
- Se ocultan los botones "Editar" y "Eliminar" en `ParticipanteCard` para usuarios CONSULTA
- Se oculta el botón "Resetear datos" en Home para usuarios CONSULTA
- Se mantiene la visualización de lista de participantes para ambos roles
- Se protege la vista Home con `PrivateRoute` simple (requiere autenticación pero no rol específico)

## Capabilities

### New Capabilities
- `role-based-ui`: Componentes de interfaz que se adaptan visualmente según el rol del usuario autenticado

### Modified Capabilities
- `route-protection`: La ruta `/` ahora requiere autenticación (era pública en change4)

## Impact

- **`frontend/src/pages/Home.tsx`**: Botones condicionales según `user?.rol === "ADMIN"`
- **`frontend/src/components/ParticipanteCard.tsx`**: Botones Editar/Eliminar condicionales según rol
- **`frontend/src/App.tsx`**: Ruta `/` envuelta con `<PrivateRoute>` simple
- **UX CONSULTA**: Solo ve lista de participantes con filtros, sin botones de acción
