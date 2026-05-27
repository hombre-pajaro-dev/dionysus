Feature: Cajero de tokens

  Background:
    Given un venue de prueba para cajero con slug "test-cashier-venue"
    And un miembro activo en ese venue con teléfono "+525500666001"
    And un cajero de tokens con teléfono "+525500666002" en ese venue

  Scenario: Cajero busca miembro por userId y obtiene balance
    When el cajero busca al miembro por userId
    Then recibe status 200
    And la respuesta incluye membershipId del miembro
    And la respuesta incluye nombre del miembro

  Scenario: Cajero agrega tokens y el balance sube
    When el cajero busca al miembro por userId
    And el cajero agrega 20000 centavos al miembro
    Then recibe status 201
    And el balance del miembro es 20000

  Scenario: Usuario sin rol recibe 403 en lookup
    Given un usuario sin permisos con teléfono "+525500666003"
    When ese usuario busca al miembro por userId
    Then recibe status 403

  Scenario: Sin autenticación recibe 401 en lookup
    When se busca miembro sin sesión
    Then recibe status 401

  Scenario: userId inexistente devuelve 404
    When el cajero busca el userId "uid-inexistente"
    Then recibe status 404

  Scenario: Cajero consulta sus propias membresías como miembro
    Given el cajero también es miembro de ese venue
    When el cajero consulta sus membresías
    Then recibe status 200
    And la respuesta incluye al menos una membresía con venueId del venue
