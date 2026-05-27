# language: es
Característica: Donativos y Pagos

  Como miembro de un venue
  Quiero hacer un donativo para un evento
  Para obtener acceso y acumular tokens en mi balance

  Antecedentes:
    Dado un venue de prueba para donativos con un miembro activo de teléfono "+525500000200"
    Y un evento en ese venue con donativo mínimo de 20000 centavos

  Escenario: Confirmación de pago acredita tokens en la membresía correcta
    Dado un pago pendiente de 50000 centavos para ese evento en esa membresía
    Cuando se confirma el pago via webhook
    Entonces el balance de la membresía es 50000
    Y existe un acceso al evento para esa membresía

  Escenario: Confirmar el mismo pago dos veces no duplica tokens (idempotencia)
    Dado un pago pendiente de 30000 centavos para ese evento en esa membresía
    Cuando se confirma el pago via webhook
    Y se confirma el mismo pago via webhook otra vez
    Entonces el balance de la membresía es 30000

  Escenario: Pago de otro miembro no afecta balance de la membresía
    Dado un pago pendiente de 40000 centavos para ese evento en esa membresía
    Y un segundo miembro activo con teléfono "+525500000201" en el mismo venue
    Y un pago pendiente de 60000 centavos del segundo miembro para ese evento
    Cuando se confirman ambos pagos via webhook
    Entonces el balance de la membresía es 40000
    Y el balance del segundo miembro es 60000

  @requires-stripe
  Escenario: Miembro inicia donativo via API
    Cuando el miembro inicia un donativo de 25000 centavos para el evento
    Entonces recibe status 201
    Y la respuesta contiene un clientSecret de Stripe
