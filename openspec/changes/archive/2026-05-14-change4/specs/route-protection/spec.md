## ADDED Requirements

### Requirement: App configures public routes without authentication
The application SHALL configure `/login` and `/publica` as public routes that do not require authentication.

#### Scenario: Login page is accessible without authentication
- **WHEN** a user navigates to `/login`
- **THEN** the LoginPage component renders without any authentication check

#### Scenario: Public page is accessible without authentication
- **WHEN** a user navigates to `/publica`
- **THEN** the PublicaPage component renders without any authentication check

### Requirement: App configures protected routes with PrivateRoute
The application SHALL wrap admin-only routes (`/nuevo`, `/editar/:id`) with `<PrivateRoute rol="ADMIN">` to enforce role-based access control.

#### Scenario: Admin route requires ADMIN role
- **WHEN** a user with role `CONSULTA` navigates to `/nuevo`
- **THEN** the system redirects to `/`

#### Scenario: Admin route blocks unauthenticated users
- **WHEN** an unauthenticated user navigates to `/editar/1`
- **THEN** the system redirects to `/login`

### Requirement: Home route is accessible to all users
The `/` route SHALL render the Home component without authentication requirements.

#### Scenario: Home page renders for all users
- **WHEN** any user (authenticated or not) navigates to `/`
- **THEN** the Home component renders
