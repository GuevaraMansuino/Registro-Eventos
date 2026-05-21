## ADDED Requirements

### Requirement: AuthContext provides authentication state
The system SHALL provide a React Context (`AuthContext`) that exposes authentication state including the current user, login status, and role.

#### Scenario: AuthContext is available to consumer components
- **WHEN** a component calls `useAuth()` within an `AuthProvider`
- **THEN** it receives the current user, login status, and role

#### Scenario: AuthContext returns undefined outside AuthProvider
- **WHEN** a component calls `useAuth()` outside of an `AuthProvider`
- **THEN** it receives `undefined`

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

### Requirement: AuthProvider wraps ParticipantesProvider in main.tsx
The `AuthProvider` SHALL be the parent of `ParticipantesProvider` in the component tree in `main.tsx`.

#### Scenario: AuthProvider is outermost provider
- **WHEN** the application renders
- **THEN** the component tree is `<AuthProvider>` → `<ParticipantesProvider>` → `<App />`
