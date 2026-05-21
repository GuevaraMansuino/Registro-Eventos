## ADDED Requirements

### Requirement: Home hides write actions for CONSULTA role
The Home page SHALL hide the "Nuevo participante" and "Resetear datos" buttons when the authenticated user has the `CONSULTA` role.

#### Scenario: ADMIN sees all action buttons
- **WHEN** a user with role `ADMIN` views the Home page
- **THEN** the page displays "Nuevo participante" and "Resetear datos" buttons

#### Scenario: CONSULTA does not see action buttons
- **WHEN** a user with role `CONSULTA` views the Home page
- **THEN** the page does not display "Nuevo participante" or "Resetear datos" buttons

### Requirement: ParticipanteCard hides edit and delete for CONSULTA role
The ParticipanteCard component SHALL hide the "Editar" and "Eliminar" buttons when the authenticated user has the `CONSULTA` role.

#### Scenario: ADMIN sees edit and delete buttons
- **WHEN** a user with role `ADMIN` views a participant card
- **THEN** the card displays "Editar" and "Eliminar" buttons

#### Scenario: CONSULTA does not see edit and delete buttons
- **WHEN** a user with role `CONSULTA` views a participant card
- **THEN** the card does not display "Editar" or "Eliminar" buttons

### Requirement: CONSULTA can view participant list
Users with the `CONSULTA` role SHALL be able to view the full list of participants with all their details and apply filters.

#### Scenario: CONSULTA views participant list
- **WHEN** a user with role `CONSULTA` navigates to the home page
- **THEN** they can see all participants, their details, and use the filter controls
