## 1. Home con permisos por rol

- [x] 1.1 Consumir `useAuth()` en Home.tsx para obtener `user`
- [x] 1.2 Ocultar botón "Nuevo participante" si `user?.rol !== "ADMIN"`
- [x] 1.3 Ocultar botón "Resetear datos" si `user?.rol !== "ADMIN"`

## 2. ParticipanteCard con permisos por rol

- [x] 2.1 Consumir `useAuth()` en ParticipanteCard.tsx para obtener `user`
- [x] 2.2 Ocultar botón "Editar" si `user?.rol !== "ADMIN"`
- [x] 2.3 Ocultar botón "Eliminar" si `user?.rol !== "ADMIN"`

## 3. Ruta Home protegida

- [x] 3.1 Envolver ruta `/` con `<PrivateRoute>` en App.tsx
