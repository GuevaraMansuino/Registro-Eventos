## MODIFIED Requirements

### Requirement: LoginPage calls auth login on submit
The `LoginPage` SHALL call the `login()` function from `useAuth()` when the form is submitted. The `login()` function sends credentials to the backend `POST /login` endpoint.

#### Scenario: Form submission triggers backend login
- **WHEN** the user fills in credentials and clicks "Login"
- **THEN** the `login()` function sends a POST request to `/login` with the entered username and password

#### Scenario: Backend error is displayed to user
- **WHEN** the backend returns a 401 error
- **THEN** the login page displays "Credenciales inválidas" to the user
