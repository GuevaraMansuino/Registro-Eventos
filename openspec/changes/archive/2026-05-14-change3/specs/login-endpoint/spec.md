## ADDED Requirements

### Requirement: POST /login endpoint validates credentials
The backend SHALL provide a `POST /login` endpoint that accepts `username` and `password`, validates them against the `usuarios_db` table, and returns a JWT token on success.

#### Scenario: Valid credentials return token
- **WHEN** a POST request is sent to `/login` with valid `username` and `password`
- **THEN** the response is 200 with a JSON body containing `access_token` and `token_type: "bearer"`

#### Scenario: Invalid credentials return error
- **WHEN** a POST request is sent to `/login` with incorrect `username` or `password`
- **THEN** the response is 401 with a JSON error message

#### Scenario: Missing fields return validation error
- **WHEN** a POST request is sent to `/login` without `username` or `password`
- **THEN** the response is 422 with a validation error

### Requirement: JWT dependency validates token for protected endpoints
The backend SHALL provide a `get_current_user` dependency that extracts and validates the JWT token from the `Authorization` header.

#### Scenario: Valid token returns current user
- **WHEN** a request includes a valid JWT token in the `Authorization: Bearer <token>` header
- **THEN** the dependency returns the decoded user information

#### Scenario: Invalid token returns 401
- **WHEN** a request includes an expired or malformed JWT token
- **THEN** the response is 401 with an authentication error

#### Scenario: Missing token returns 401
- **WHEN** a request to a protected endpoint lacks the `Authorization` header
- **THEN** the response is 401 with an authentication error
