## Context

El frontend actual tiene un patrón de contexto ya establecido con `ParticipantesContext` + `ParticipantesProvider` usando `useReducer`. `main.tsx` envuelve la app con `<BrowserRouter>` → `<ParticipantesProvider>` → `<App />`. No existe ningún sistema de autenticación ni rutas protegidas. Las rutas actuales son `/`, `/nuevo`, `/editar/:id` — todas públicas.

## Goals / Non-Goals

**Goals:**
- Crear `AuthContext` siguiendo el mismo patrón de Context + Provider que `ParticipantesContext`
- Crear `PrivateRoute` como componente que valida autenticación antes de renderizar children
- Crear `LoginPage` con formulario de usuario/password
- Envolver `<AuthProvider>` como padre de `<ParticipantesProvider>` en `main.tsx`
- Preparar la interfaz para integración con JWT en Change 3

**Non-Goals:**
- NO conectar login con backend (Change 3 — JWT)
- NO configurar rutas protegidas en App.tsx (Change 4)
- NO adaptar menú según permisos (Change 5)
- NO persistir token en localStorage (Change 3)

## Decisions

### 1. AuthContext con useReducer siguiendo patrón existente
**Decision:** Usar el mismo patrón `AuthContext.ts` + `AuthProvider.tsx` + reducer que ya se usa para Participantes.
**Rationale:** Consistencia con la arquitectura existente. El equipo ya conoce este patrón.
**Alternatives considered:** useState simple — rechazado porque el patrón de reducer ya está establecido y escala mejor.

### 2. Estado de auth en memoria (sin persistencia aún)
**Decision:** En este change el estado de autenticación vive solo en memoria (useReducer). La persistencia del JWT se agrega en Change 3.
**Rationale:** Separación de responsabilidades — este change es estructura, Change 3 es integración con backend.
**Risk:** Al refrescar la página se pierde la sesión. Mitigation: aceptable hasta Change 3.

### 3. PrivateRoute como componente wrapper con Navigate
**Decision:** `PrivateRoute` recibe `children` y opcionalmente `rol`. Si no hay usuario autenticado, redirige a `/login`. Si hay rol requerido y no coincide, redirige a `/`.
**Rationale:** Patrón estándar de React Router v6. Simple y componible.
**Alternatives considered:** HOC pattern — rechazado porque los wrappers con children son más legibles en React moderno.

### 4. AuthProvider envuelve a ParticipantesProvider
**Decision:** En `main.tsx`: `<AuthProvider>` → `<ParticipantesProvider>` → `<App />`
**Rationale:** El contexto de auth debe estar disponible para todos los componentes, incluyendo los que usan ParticipantesProvider.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Sesión se pierde al refrescar (sin persistencia) | Temporal hasta Change 3 con JWT en localStorage |
| Dos contextos anidados aumentan complejidad | Patrón ya establecido con Participantes, equipo familiarizado |
| LoginPage sin conexión real al backend | Usar credenciales mock de prueba hasta Change 3 |
