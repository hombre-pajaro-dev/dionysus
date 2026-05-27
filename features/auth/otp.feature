# language: es
Característica: Autenticación OTP

  Como usuario nuevo o existente
  Quiero recibir un código OTP por WhatsApp
  Para verificar mi identidad y acceder a la plataforma

  Antecedentes:
    Dado un teléfono de prueba "+525500000001"

  Escenario: Usuario solicita OTP con teléfono válido
    Cuando solicita un OTP
    Entonces recibe status 200
    Y existe un OTP activo en la base de datos para ese teléfono

  Escenario: Solicitud sin teléfono retorna error de validación
    Cuando solicita un OTP sin proporcionar teléfono
    Entonces recibe status 400

  Escenario: Código correcto genera sesión
    Dado un OTP ya generado para ese teléfono
    Cuando verifica el OTP con el código correcto
    Entonces recibe status 200
    Y la respuesta contiene cookie de sesión
    Y existe el usuario en la base de datos

  Escenario: Código incorrecto es rechazado
    Dado un OTP ya generado para ese teléfono
    Cuando verifica el OTP con código incorrecto "000000"
    Entonces recibe status 401

  Escenario: Usuario cierra sesión
    Dado una sesión activa para ese teléfono
    Cuando cierra sesión
    Entonces recibe status 200
    Y la cookie de sesión está eliminada
