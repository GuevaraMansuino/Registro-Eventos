## ADDED Requirements

### Requirement: User database table exists
The system SHALL provide a `usuarios_db` table in the SQLite database with fields for user authentication and role-based access control.

#### Scenario: Table is created on application startup
- **WHEN** the FastAPI application starts
- **THEN** the `usuarios_db` table exists in the database alongside the existing `participantes` table

### Requirement: User table has required fields
The `usuarios_db` table SHALL contain the following fields: `id` (integer, primary key, auto-increment), `username` (string, not null), `password` (string, not null), `rol` (string, not null).

#### Scenario: User record has all required fields
- **WHEN** a new user record is inserted into `usuarios_db`
- **THEN** it contains a unique `id`, a `username`, a `password`, and a `rol` value

### Requirement: Role field is restricted to ADMIN or CONSULTA
The `rol` field SHALL only accept the values `ADMIN` or `CONSULTA`. Any other value SHALL be rejected.

#### Scenario: Valid role ADMIN is accepted
- **WHEN** a user is created with `rol = "ADMIN"`
- **THEN** the record is saved successfully

#### Scenario: Valid role CONSULTA is accepted
- **WHEN** a user is created with `rol = "CONSULTA"`
- **THEN** the record is saved successfully

#### Scenario: Invalid role is rejected
- **WHEN** a user is created with `rol = "SUPERADMIN"` (or any value other than `ADMIN` or `CONSULTA`)
- **THEN** the system rejects the creation with a validation error

### Requirement: SQLAlchemy model for users exists
The system SHALL provide a SQLAlchemy model class `UsuarioDB` mapped to the `usuarios_db` table, following the same pattern as the existing `ParticipanteDB` model.

#### Scenario: UsuarioDB model is defined
- **WHEN** the application imports `models.py`
- **THEN** the `UsuarioDB` class is available and mapped to the `usuarios_db` table

### Requirement: Pydantic schema for user creation exists
The system SHALL provide a Pydantic schema `UsuarioCreate` for validating user input, with `rol` restricted to `Literal["ADMIN", "CONSULTA"]`.

#### Scenario: Valid user input passes validation
- **WHEN** a request body contains `username`, `password`, and a valid `rol`
- **THEN** the Pydantic schema validates successfully

#### Scenario: Invalid role fails validation
- **WHEN** a request body contains `rol = "INVALID"`
- **THEN** Pydantic raises a validation error
