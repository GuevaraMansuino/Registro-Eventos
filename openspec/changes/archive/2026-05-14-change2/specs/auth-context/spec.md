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
The system SHALL provide an `AuthProvider` component that manages login and logout state using `useReducer`, following the same pattern as `ParticipantesProvider`.

#### Scenario: User logs in successfully
- **WHEN** `login()` is called with valid credentials
- **THEN** the user state is set and `isAuthenticated` becomes true

#### Scenario: User logs out
- **WHEN** `logout()` is called
- **THEN** the user state is cleared and `isAuthenticated` becomes false

#### Scenario: Initial state is unauthenticated
- **WHEN** the application starts
- **THEN** `isAuthenticated` is false and `user` is null

### Requirement: AuthProvider wraps ParticipantesProvider in main.tsx
The `AuthProvider` SHALL be the parent of `ParticipantesProvider` in the component tree in `main.tsx`.

#### Scenario: AuthProvider is outermost provider
- **WHEN** the application renders
- **THEN** the component tree is `<AuthProvider>` → `<ParticipantesProvider>` → `<App />`
