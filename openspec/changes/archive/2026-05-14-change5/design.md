## Context

Home.tsx muestra botones "Nuevo participante" y "Resetear datos" sin distinguir rol. ParticipanteCard.tsx muestra botones "Editar" y "Eliminar" a todos los usuarios. Change4 ya agregó `useAuth()` en App.tsx y PrivateRoute, pero la UI interna de las páginas no consume el contexto de auth. CONSULTA puede ver y hacer clic en botones que lo redirigen a rutas protegidas (mal UX — mejor ni mostrarlos).

## Goals / Non-Goals

**Goals:**
- Ocultar botones de escritura (Nuevo, Editar, Eliminar, Resetear) para CONSULTA
- Mantener visibilidad completa de la lista de participantes para ambos roles
- Envolver `/` con `<PrivateRoute>` para requerir autenticación
- Usar `useAuth()` en Home y ParticipanteCard para verificar rol

**Non-Goals:**
- NO proteger endpoints del backend (ya existe `get_current_user` desde Change3)
- NO crear vistas diferentes para CONSULTA — es la misma vista con botones ocultos
- NO cambiar la estructura de navegación (ya hecha en Change4)

## Decisions

### 1. useAuth() directamente en Home y ParticipanteCard
**Decision:** Consumir `useAuth()` directamente en ambos componentes para verificar `user?.rol === "ADMIN"`.
**Rationale:** Simple y directo. No necesita HOC ni componente wrapper adicional.
**Alternatives considered:** Componente `AdminOnly` wrapper — rechazado porque agrega complejidad innecesaria para 2-3 condicionales.

### 2. Ocultar vs deshabilitar botones
**Decision:** Los botones se ocultan completamente (`renderizado condicional`) en vez de deshabilitarse.
**Rationale:** CONSULTA no necesita saber que existen acciones que no puede usar. Menos ruido visual.
**Alternatives considered:** Botones disabled con tooltip — rechazado porque genera confusión sobre permisos.

### 3. Home protegida con PrivateRoute simple
**Decision:** La ruta `/` se envuelve con `<PrivateRoute>` (sin rol) en App.tsx.
**Rationale:** Requiere autenticación para ver la lista pero no restringe por rol. CONSULTA y ADMIN pueden ver la lista.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Ocultar botones no es seguridad real | Los endpoints del backend también deben protegerse (Change3 ya tiene `get_current_user`) |
| ParticipanteCard necesita acceso a AuthContext | Ya disponible globalmente desde Change2 |
| Usuario no autenticado no puede ver `/` | Redirigido a `/login` por PrivateRoute |
