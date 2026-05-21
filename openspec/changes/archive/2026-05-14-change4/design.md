## Context

`App.tsx` actualmente tiene 3 rutas (`/`, `/nuevo`, `/editar/:id`) todas públicas sin protección. `PrivateRoute` y `LoginPage` existen desde Change2 pero no se usan. El sistema de JWT está funcional desde Change3. El menú de navegación muestra los mismos links para todos los usuarios sin distinguir rol ni estado de autenticación.

## Goals / Non-Goals

**Goals:**
- Configurar rutas públicas (`/login`, `/`) y privadas (`/nuevo`, `/editar/:id`) en App.tsx
- Usar `PrivateRoute` como wrapper para proteger rutas por autenticación y rol
- Agregar "Cerrar Sesión" al menú cuando el usuario está autenticado
- Mostrar "Nuevo participante" solo para ADMIN
- Preparar la ruta `/publica` como página pública sin autenticación

**Non-Goals:**
- NO adaptar la UI de Home para ocultar botones según rol (Change 5)
- NO proteger endpoints del backend con `get_current_user` (ya existe desde Change3, se usa después)
- NO crear PublicaPage con contenido real (solo placeholder)

## Decisions

### 1. PrivateRoute como wrapper de Route element
**Decision:** Usar `<PrivateRoute><Component /></PrivateRoute>` como valor del `element` prop de React Router v6.
**Rationale:** Patrón estándar de React Router v6. PrivateRoute retorna `<Navigate>` si no hay auth, o `children` si hay auth.
**Alternatives considered:** Layout route pattern — rechazado porque es más verboso y no aporta valor aquí.

### 2. Rutas públicas sin PrivateRoute
**Decision:** `/` y `/login` se configuran como Route simples sin wrapper.
**Rationale:** La ruta `/` será protegida en Change 5 cuando se adapte la UI. Por ahora, `/` es accesible para todos pero los botones de acción se ocultan según rol (Change 5). Para este change, `/` se deja pública para no romper el flujo existente.

### 3. Menú condicional con useAuth
**Decision:** El componente App consume `useAuth()` para mostrar/ocultar items del menú según `isAuthenticated` y `user.rol`.
**Rationale:** Simple y directo. El contexto ya está disponible gracias a Change2.

### 4. PublicaPage como placeholder
**Decision:** Crear `PublicaPage` con contenido mínimo "Página pública" para cumplir con la especificación de ruta pública.
**Rationale:** El Changes.md menciona `/publica` pero no define contenido. Placeholder suficiente para Change 4.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| `/` queda pública sin proteger botones de acción | Change 5 adapta la UI de Home para ocultar botones según rol |
| Usuario no autenticado puede ver lista de participantes | Aceptable temporalmente; Change 5 lo restringe |
| Menú se vuelve más complejo con condicionales | Separar en componente `Navbar` en futuro si crece |
