## 1. Rutas públicas

- [x] 1.1 Crear `src/pages/PublicaPage.tsx` como placeholder de página pública
- [x] 1.2 Agregar ruta `/publica` en App.tsx que renderice PublicaPage
- [x] 1.3 Agregar ruta `/login` en App.tsx que renderice LoginPage

## 2. Rutas protegidas con PrivateRoute

- [x] 2.1 Envolver ruta `/nuevo` con `<PrivateRoute rol="ADMIN">` en App.tsx
- [x] 2.2 Envolver ruta `/editar/:id` con `<PrivateRoute rol="ADMIN">` en App.tsx

## 3. Menú de navegación con autenticación

- [x] 3.1 Consumir `useAuth()` en App.tsx para obtener estado de autenticación y rol
- [x] 3.2 Agregar botón "Cerrar Sesión" al menú (visible solo si `isAuthenticated`)
- [x] 3.3 Mostrar link "Nuevo participante" solo si `user?.rol === "ADMIN"`
- [x] 3.4 Conectar botón "Cerrar Sesión" con `logout()` y redirigir a `/`
