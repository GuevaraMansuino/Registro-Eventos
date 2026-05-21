## ADDED Requirements

### Requirement: JWT token is generated on successful login
The backend SHALL generate a JWT token containing the user's username and role, signed with a secret key, and return it to the client upon successful credential validation.

#### Scenario: Valid credentials produce a JWT token
- **WHEN** a user submits valid username and password to the login endpoint
- **THEN** the system generates a JWT with `sub` (username), `rol`, and `exp` claims and returns it

#### Scenario: Token includes expiration
- **WHEN** a JWT token is generated
- **THEN** it includes an `exp` claim set to 24 hours from creation time

### Requirement: JWT token is persisted in localStorage
The frontend SHALL store the received JWT token in `localStorage` upon successful login.

#### Scenario: Token is saved after login
- **WHEN** login succeeds and a token is received from the backend
- **THEN** the token is stored in `localStorage` under the key `auth_token`

#### Scenario: Token is retrieved on app load
- **WHEN** the application loads
- **THEN** the system checks `localStorage` for an existing `auth_token` and restores the session if valid

### Requirement: JWT token is sent in Authorization header
The frontend SHALL include the JWT token in the `Authorization: Bearer <token>` header for every API request to the backend.

#### Scenario: API request includes token
- **WHEN** the frontend makes a fetch request to any backend endpoint
- **THEN** the request includes the header `Authorization: Bearer <token>`

#### Scenario: Request without token is sent when not authenticated
- **WHEN** no token exists in localStorage
- **THEN** the request is sent without the Authorization header

### Requirement: Token is removed on logout
The system SHALL remove the JWT token from `localStorage` when the user logs out.

#### Scenario: Logout clears token
- **WHEN** the user calls `logout()`
- **THEN** the `auth_token` key is removed from `localStorage`
