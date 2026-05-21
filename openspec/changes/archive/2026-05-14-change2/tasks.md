## 1. AuthContext y AuthProvider

- [x] 1.1 Crear `src/context/AuthContext.ts` con interfaz de estado y `createContext`
- [x] 1.2 Crear `src/reducers/authReducer.ts` con reducer para login/logout
- [x] 1.3 Crear `src/context/AuthProvider.tsx` con `useReducer`, `login()`, `logout()`, y `useAuth()` hook

## 2. PrivateRoute

- [x] 2.1 Crear `src/routes/PrivateRoute.tsx` que consume `useAuth()` y valida autenticación
- [x] 2.2 Implementar redirección a `/login` si no autenticado, y a `/` si no tiene rol requerido

## 3. LoginPage

- [x] 3.1 Crear `src/pages/LoginPage.tsx` con formulario de "Usuario", "Password" y botón "Login"
- [x] 3.2 Conectar formulario con `login()` de `useAuth()` y redirigir a `/` al éxito

## 4. Integración en main.tsx

- [x] 4.1 Envolver `<AuthProvider>` como padre de `<ParticipantesProvider>` en `main.tsx`
