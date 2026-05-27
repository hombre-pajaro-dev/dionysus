Feature: Perfil de usuario

  Background:
    Given un teléfono de prueba "+525500777001"
    And el usuario tiene una sesión activa

  Scenario: Miembro consulta su perfil
    When consulta su perfil
    Then recibe status 200
    And la respuesta incluye su teléfono "+525500777001"

  Scenario: Miembro actualiza nombre y ciudad
    When actualiza su perfil con nombre "Gerardo Rendon" y ciudad "CDMX"
    Then recibe status 200
    And la respuesta contiene nombre "Gerardo Rendon"
    And la respuesta contiene ciudad "CDMX"

  Scenario: Miembro actualiza su arte
    When actualiza su arte a "músico, productor"
    Then recibe status 200
    And la respuesta contiene artPractice "músico, productor"

  Scenario: Nombre vacío devuelve 400
    When actualiza su perfil con nombre vacío
    Then recibe status 400

  Scenario: Sin autenticación GET perfil devuelve 401
    Given no hay sesión activa
    When consulta su perfil
    Then recibe status 401

  Scenario: Sin autenticación PATCH perfil devuelve 401
    Given no hay sesión activa
    When actualiza su perfil con nombre "Anon" y ciudad "MX"
    Then recibe status 401
