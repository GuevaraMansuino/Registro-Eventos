## ADDED Requirements

### Requirement: Navigation shows logout when authenticated
The navigation menu SHALL display a "Cerrar Sesión" option only when the user is authenticated.

#### Scenario: Logout option visible after login
- **WHEN** the user is authenticated
- **THEN** the navigation menu shows a "Cerrar Sesión" button

#### Scenario: Logout option hidden when not authenticated
- **WHEN** the user is not authenticated
- **THEN** the navigation menu does not show "Cerrar Sesión"

### Requirement: Logout button calls auth logout
The "Cerrar Sesión" button SHALL call the `logout()` function from `useAuth()` when clicked.

#### Scenario: Clicking logout clears session
- **WHEN** the user clicks "Cerrar Sesión"
- **THEN** the `logout()` function is called, the token is removed, and the user is redirected to `/`

### Requirement: Nuevo participante is visible only for ADMIN
The navigation menu SHALL display the "Nuevo participante" link only when the user has the `ADMIN` role.

#### Scenario: ADMIN sees Nuevo participante link
- **WHEN** the user has role `ADMIN`
- **THEN** the navigation menu shows the "Nuevo participante" link

#### Scenario: CONSULTA does not see Nuevo participante link
- **WHEN** the user has role `CONSULTA`
- **THEN** the navigation menu does not show the "Nuevo participante" link

#### Scenario: Unauthenticated user does not see Nuevo participante link
- **WHEN** the user is not authenticated
- **THEN** the navigation menu does not show the "Nuevo participante" link
