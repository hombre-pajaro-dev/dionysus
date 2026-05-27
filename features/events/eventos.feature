# language: es
Característica: Gestión de Eventos

  Como organizador de un venue
  Quiero crear y gestionar eventos
  Para publicarlos a los miembros y controlar la visibilidad

  Antecedentes:
    Dado un venue público de prueba para eventos
    Y un venue privado de prueba para eventos
    Y un organizador con teléfono "+525500000300" en ambos venues

  Escenario: Organizador crea un evento en su venue
    Cuando el organizador crea un evento "Jam del Sábado" en el venue público
    Entonces recibe status 201
    Y el evento existe en la base de datos

  Escenario: Eventos de venue público aparecen en descubrimiento público
    Dado un evento público "Festival Abierto" en el venue público
    Cuando cualquier persona consulta los eventos públicos
    Entonces recibe status 200
    Y la respuesta incluye el evento "Festival Abierto"

  Escenario: Eventos de venue privado NO aparecen en descubrimiento público
    Dado un evento público "Jam Privado" en el venue privado
    Cuando cualquier persona consulta los eventos públicos
    Entonces recibe status 200
    Y la respuesta NO incluye el evento "Jam Privado"

  Escenario: Miembro del venue privado sí ve sus eventos
    Dado un evento con visibilidad MEMBERS_ONLY "Jam Secreto" en el venue privado
    Y un miembro activo con teléfono "+525500000301" en el venue privado
    Cuando ese miembro consulta los eventos de su venue
    Entonces recibe status 200
    Y la respuesta incluye el evento "Jam Secreto"

  Escenario: Organizador cancela un evento
    Dado un evento público "Evento a Cancelar" en el venue público
    Cuando el organizador cancela ese evento
    Entonces recibe status 200
    Y el evento tiene fecha de cancelación registrada
