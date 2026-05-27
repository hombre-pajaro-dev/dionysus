# language: es
Característica: Balance de Tokens por Membresía

  Como miembro de un venue
  Quiero ver mi balance de tokens y que cada operación quede registrada
  Para llevar control de mis contribuciones y consumo

  Antecedentes:
    Dado un venue de prueba con un miembro activo de teléfono "+525500000100"

  Escenario: Membresía nueva tiene balance cero
    Cuando el miembro consulta su balance
    Entonces recibe status 200
    Y el balance es 0

  Escenario: Acreditar tokens incrementa el balance
    Dado que el cajero agrega 50000 centavos al balance del miembro
    Cuando el miembro consulta su balance
    Entonces recibe status 200
    Y el balance es 50000

  Escenario: Múltiples créditos acumulan correctamente
    Dado que el cajero agrega 30000 centavos al balance del miembro
    Y que el cajero agrega 20000 centavos al balance del miembro
    Cuando el miembro consulta su balance
    Entonces recibe status 200
    Y el balance es 50000

  Escenario: Debitar tokens decrementa el balance
    Dado que el cajero agrega 100000 centavos al balance del miembro
    Cuando el POS debita 40000 centavos del balance del miembro
    Entonces recibe status 200
    Y el balance resultante es 60000

  Escenario: Débito con saldo insuficiente es rechazado
    Dado que el cajero agrega 10000 centavos al balance del miembro
    Cuando el POS debita 50000 centavos del balance del miembro
    Entonces recibe status 422

  Escenario: El historial de transacciones refleja todas las operaciones
    Dado que el cajero agrega 80000 centavos al balance del miembro
    Y que el cajero agrega 20000 centavos al balance del miembro
    Cuando el miembro consulta su historial de transacciones
    Entonces recibe status 200
    Y el historial contiene 2 transacciones

  Escenario: Balance de un venue no afecta balance en otro venue para el mismo usuario
    Dado que el cajero agrega 100000 centavos al balance del miembro
    Y el mismo usuario es miembro activo de un segundo venue de prueba
    Cuando el miembro consulta su balance en el segundo venue
    Entonces el balance en el segundo venue es 0

  Escenario: Cajero de tokens agrega saldo via API autenticada
    Dado un cajero con teléfono "+525500000101" en ese venue
    Cuando el cajero agrega 75000 centavos via API
    Entonces recibe status 201
    Y el balance es 75000
