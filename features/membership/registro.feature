# language: es
Característica: Membresía — Registro y Aprobación via Liga de Invitación

  Como miembro activo de un venue privado
  Quiero generar ligas de invitación y gestionar solicitudes
  Para controlar el crecimiento de la comunidad

  Antecedentes:
    Dado un venue privado de prueba
    Y un organizador con teléfono "+525500000010" en ese venue

  Escenario: Miembro genera liga de invitación para su venue
    Cuando el organizador genera una liga de invitación para el venue
    Entonces recibe status 201
    Y la respuesta contiene un token de invitación

  Escenario: Persona nueva se registra via liga válida y queda PENDING
    Dado una liga de invitación válida generada por el organizador
    Cuando una persona con teléfono "+525500000020" se registra via esa liga
    Entonces recibe status 201
    Y la membresía queda en estado "PENDING"
    Y el referente de la membresía es el organizador

  Escenario: Usuario existente usa liga — no se duplica el usuario
    Dado una liga de invitación válida generada por el organizador
    Y un usuario existente con teléfono "+525500000030"
    Cuando ese usuario se registra via esa liga
    Entonces recibe status 201
    Y existe solo un usuario con teléfono "+525500000030" en la base de datos
    Y la membresía queda en estado "PENDING"

  Escenario: Liga agotada rechaza el registro
    Dado una liga de invitación ya agotada
    Cuando una persona con teléfono "+525500000040" intenta registrarse via esa liga
    Entonces recibe status 409

  Escenario: Token de invitación inválido retorna 404
    Cuando una persona con teléfono "+525500000050" intenta registrarse via liga "token-invalido-xyz"
    Entonces recibe status 404

  Escenario: Organizador consulta solicitudes pendientes de su venue
    Dado una solicitud pendiente de "+525500000060" en el venue
    Cuando el organizador consulta las solicitudes pendientes del venue
    Entonces recibe status 200
    Y la respuesta incluye la solicitud de "+525500000060"

  Escenario: Organizador aprueba una solicitud pendiente
    Dado una solicitud pendiente de "+525500000070" en el venue
    Cuando el organizador aprueba esa membresía
    Entonces recibe status 200
    Y la membresía queda en estado "ACTIVE"

  Escenario: Organizador suspende una membresía activa
    Dado una membresía activa de "+525500000080" en el venue
    Cuando el organizador suspende esa membresía
    Entonces recibe status 200
    Y la membresía queda en estado "SUSPENDED"
