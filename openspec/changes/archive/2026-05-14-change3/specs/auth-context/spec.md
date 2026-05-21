## MODIFIED Requirements

### Requirement: AuthProvider manages login and logout
The system SHALL provide an `AuthProvider` component that manages login and logout state using `useReducer`. The `login()` function SHALL send credentials to `POST /login` on the backend, persist the returned JWT token in `localStorage`, and dispatch the LOGIN action with the decoded user data.

#### Scenario: User logs in successfully with backend
- **WHEN** `login()` is called with valid credentials
- **THEN** the system sends a POST request to `/login`, stores the JWT token in `localStorage`, sets the user state, and `isAuthenticated` becomes true

#### Scenario: User logs in with invalid credentials
- **WHEN** `login()` is called with invalid credentials
- **THEN** the backend returns 401, no token is stored, and the function returns false

#### Scenario: User logs out
- **WHEN** `logout()` is called
- **THEN** the system removes the JWT token from `localStorage`, clears the user state, and `isAuthenticated` becomes false

#### Scenario: Session is restored from localStorage on app load
- **WHEN** the application starts and a valid JWT token exists in `localStorage`
- **THEN** the system decodes the token, restores the user state, and `isAuthenticated` becomes true
