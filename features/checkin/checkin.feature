Feature: Verificación de acceso en puerta

  Background:
    Given un venue de prueba para checkin con slug "test-door-venue"
    And un evento activo en ese venue
    And un miembro activo con teléfono "+525500888001"
    And un operador de puerta con teléfono "+525500888002"

  Scenario: Miembro con acceso es validado correctamente
    Given el miembro tiene acceso al evento
    When el operador verifica el acceso del miembro al evento
    Then recibe status 200
    And la respuesta indica que tiene acceso
    And la respuesta incluye el nombre del miembro

  Scenario: Miembro sin acceso es rechazado
    When el operador verifica el acceso del miembro al evento
    Then recibe status 200
    And la respuesta indica que no tiene acceso

  Scenario: QR desconocido devuelve 404
    When el operador verifica el userId "userId-inexistente" en el evento
    Then recibe status 404

  Scenario: Usuario sin rol de puerta recibe 403
    Given un usuario sin rol en ese venue con teléfono "+525500888003"
    When ese usuario verifica el acceso del miembro al evento
    Then recibe status 403

  Scenario: Sin autenticación recibe 401
    When se verifica acceso sin sesión
    Then recibe status 401
