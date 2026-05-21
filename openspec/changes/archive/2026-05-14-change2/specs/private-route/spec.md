## ADDED Requirements

### Requirement: PrivateRoute blocks unauthenticated access
The system SHALL provide a `PrivateRoute` component that prevents access to protected routes when the user is not authenticated.

#### Scenario: Unauthenticated user is redirected to login
- **WHEN** an unauthenticated user tries to access a protected route
- **THEN** the system redirects to `/login`

#### Scenario: Authenticated user accesses protected route
- **WHEN** an authenticated user tries to access a protected route
- **THEN** the system renders the child component

### Requirement: PrivateRoute validates user role
The `PrivateRoute` component SHALL accept an optional `rol` prop. If provided, the user must have the matching role to access the route.

#### Scenario: User with matching role accesses route
- **WHEN** a user with role `ADMIN` accesses a route wrapped with `<PrivateRoute rol="ADMIN">`
- **THEN** the system renders the child component

#### Scenario: User without matching role is redirected
- **WHEN** a user with role `CONSULTA` accesses a route wrapped with `<PrivateRoute rol="ADMIN">`
- **THEN** the system redirects to `/`

#### Scenario: PrivateRoute without rol prop only checks authentication
- **WHEN** a route is wrapped with `<PrivateRoute>` (no rol prop)
- **THEN** any authenticated user can access regardless of role
