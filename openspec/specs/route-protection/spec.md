## MODIFIED Requirements

### Requirement: Home route is accessible to all users
The `/` route SHALL render the Home component only for authenticated users. Both `ADMIN` and `CONSULTA` roles can access the route. Unauthenticated users SHALL be redirected to `/login`.

#### Scenario: Authenticated user accesses home
- **WHEN** any authenticated user (ADMIN or CONSULTA) navigates to `/`
- **THEN** the Home component renders

#### Scenario: Unauthenticated user is redirected to login
- **WHEN** an unauthenticated user navigates to `/`
- **THEN** the system redirects to `/login`
