# ADR 0001 — WhatsApp OTP como mecanismo de autenticación

## Estado
Aceptado

## Contexto
La comunidad ya se comunica principalmente por WhatsApp. Los miembros son invitados y aprobados via ese canal. El perfil de usuario no es técnico — gestionar contraseñas agrega fricción innecesaria.

## Decisión
Autenticación sin contraseña via WhatsApp OTP. El usuario ingresa su número de teléfono, recibe un código de un solo uso por WhatsApp, y accede a la plataforma. No hay contraseñas.

## Alternativas consideradas
- **Email + contraseña**: más fricción, muchos usuarios no revisarían el correo oportunamente
- **Google/Apple SSO**: no todos tienen cuenta vinculada; excluye usuarios sin smartphone moderno
- **SMS OTP**: posible fallback, pero WhatsApp tiene mayor tasa de entrega en México y es el canal ya establecido

## Consecuencias
- El número de teléfono es el identificador primario del usuario
- El QR del miembro vive en la plataforma y puede exportarse a Apple Wallet / Google Wallet
- Requiere integración con la API de WhatsApp Business para envío de OTPs
- Usuarios sin WhatsApp quedan excluidos del flujo digital (cubiertos por el Cajero de Tokens en eventos)
