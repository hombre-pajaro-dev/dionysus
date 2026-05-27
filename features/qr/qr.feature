Feature: QR de miembro

  Background:
    Given un teléfono de prueba "+525500999001"
    And el usuario tiene una sesión activa

  Scenario: Miembro obtiene su QR como PNG data URL
    When solicita su QR como PNG
    Then recibe status 200
    And la respuesta contiene un campo "dataUrl" con prefijo "data:image/png"

  Scenario: Miembro obtiene su QR como SVG
    When solicita su QR como SVG
    Then recibe status 200
    And el Content-Type es "image/svg+xml"
    And el cuerpo contiene "<svg"

  Scenario: Usuario no autenticado recibe 401 en PNG
    Given no hay sesión activa
    When solicita su QR como PNG
    Then recibe status 401

  Scenario: Usuario no autenticado recibe 401 en SVG
    Given no hay sesión activa
    When solicita su QR como SVG
    Then recibe status 401

  Scenario: El QR codifica el userId del miembro
    When solicita su QR como PNG
    Then recibe status 200
    And la respuesta contiene un campo "userId" igual al userId del miembro
