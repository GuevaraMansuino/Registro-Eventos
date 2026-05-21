# Changes Map - Registro de Eventos

> Este archivo contiene el mapa de todos los cambios planificados para el proyecto.
> Se debe consultar antes de iniciar cualquier change para entender el contexto general.

---

## Change 1: Base de Datos

**Descripción:** Crear la tabla de usuarios para el sistema de autenticación.

| # | Tarea | Detalle |
|---|-------|---------|
| 1.1 | Crear tabla `usuarios_db` | Generar la tabla en la base de datos |
| 1.2 | Definir campos | `id` (PK autonumérica), `username` (string), `password` (string), `rol` (string) |
| 1.3 | Definir roles soportados | Valores estrictos: `ADMIN` o `CONSULTA` |

---

## Change 2: Estructura de Archivos y Estado Global

**Descripción:** Crear la estructura de carpetas y el contexto global de autenticación.

| # | Tarea | Detalle |
|---|-------|---------|
| 2.1 | Crear `src/context/AuthContext.tsx` | Directorio de contexto + archivo |
| 2.2 | Crear `src/routes/PrivateRoute.tsx` | Directorio de rutas + archivo |
| 2.3 | Crear `src/pages/LoginPage.tsx` | Directorio de páginas + archivo |
| 2.4 | Implementar `AuthContext.tsx` | Lógica de inicio y cierre de sesión |
| 2.5 | Configurar `main.tsx` | Envolver `<AuthProvider>` como padre de `<ParticipantesProvider>` |

---

## Change 3: Autenticación y Seguridad (JWT)

**Descripción:** Implementar el flujo completo de autenticación con JWT.

| # | Tarea | Detalle |
|---|-------|---------|
| 3.1 | Generación de Token (Backend) | Generar JWT al validar credenciales del usuario |
| 3.2 | Persistencia del Token (Frontend) | Guardar JWT en localStorage, sessionStorage o cookies |
| 3.3 | Interceptores/Validación | Configurar cliente para enviar Token en cada petición |

---

## Change 4: Sistema de Rutas y Control de Acceso

**Descripción:** Configurar rutas públicas y privadas con validación de roles.

| # | Tarea | Detalle |
|---|-------|---------|
| 4.1 | Desarrollar `PrivateRoute.tsx` | Consumir `useAuth`, validar acceso, redirigir a `/login` si no autenticado, redirigir a `/` si no tiene rol |
| 4.2 | Configurar rutas públicas | `/`, `/login` (LoginPage), `/publica` (PublicaPage) — sin validación |
| 4.3 | Configurar rutas privadas generales | `/lista` (ListaPage), `/menu_inicio` (App) — envueltas con `<PrivateRoute>` |
| 4.4 | Configurar rutas de administrador | `/nuevo` (FormularioPage), `/editar/:id` (EditarPage) — envueltas con `<PrivateRoute rol="ADMIN">` |

---

## Change 5: Interfaz de Usuario (UI) y Vistas

**Descripción:** Desarrollar vistas y adaptar la UI según permisos del usuario.

| # | Tarea | Detalle |
|---|-------|---------|
| 5.1 | Desarrollar `LoginPage.tsx` | Formulario con campos "Usuario", "Password" y botón "Login" |
| 5.2 | Actualizar menú de navegación | Agregar "Cerrar Sesión" post-login; mostrar "Nuevo participante" solo para ADMIN |
| 5.3 | Adaptar UI según permisos | **ADMIN:** Leer, Crear, Editar, Eliminar (botones "Nuevo" y "Editar" visibles). **CONSULTA:** Solo ver participantes, sin acceso a formularios de edición/creación |

---

## Estado de Changes

| Change | Estado |
|--------|--------|
| 1. Base de Datos | 🔲 Pendiente |
| 2. Estructura de Archivos y Estado Global | 🔲 Pendiente |
| 3. Autenticación y Seguridad (JWT) | 🔲 Pendiente |
| 4. Sistema de Rutas y Control de Acceso | 🔲 Pendiente |
| 5. Interfaz de Usuario (UI) y Vistas | 🔲 Pendiente |
