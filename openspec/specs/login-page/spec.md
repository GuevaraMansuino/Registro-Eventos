## ADDED Requirements

### Requirement: LoginPage displays login form
The system SHALL provide a `LoginPage` component that renders a form with fields for "Usuario", "Password", and a "Login" button.

#### Scenario: Login page renders form fields
- **WHEN** the user navigates to `/login`
- **THEN** the page displays input fields for "Usuario" and "Password" and a "Login" button

### Requirement: LoginPage calls auth login on submit
The `LoginPage` SHALL call the `login()` function from `useAuth()` when the form is submitted. The `login()` function sends credentials to the backend `POST /login` endpoint.

#### Scenario: Form submission triggers backend login
- **WHEN** the user fills in credentials and clicks "Login"
- **THEN** the `login()` function sends a POST request to `/login` with the entered username and password

#### Scenario: Backend error is displayed to user
- **WHEN** the backend returns a 401 error
- **THEN** the login page displays "Credenciales inválidas" to the user

### Requirement: LoginPage redirects after successful login
After a successful login, the `LoginPage` SHALL redirect the user to the home page (`/`).

#### Scenario: Successful login redirects to home
- **WHEN** login succeeds
- **THEN** the user is redirected to `/`
