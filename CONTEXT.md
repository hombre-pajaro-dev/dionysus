# Dionysus — Glosario del Dominio

## Términos core

### Donativo
Una contribución monetaria que hace un miembro al unirse a un evento. Tiene dos efectos simultáneos:
1. Otorga **Acceso** al evento específico (si cubre el monto mínimo sugerido)
2. Convierte 1:1 en **Tokens** que se agregan al **Balance** del miembro

Un miembro puede tener tokens acumulados de eventos anteriores, pero igual debe hacer un donativo mínimo nuevo por cada evento al que quiera asistir.

### Token
Unidad de valor digital con tasa fija 1:1 con MXN. Persiste en el **Balance** del miembro entre eventos. Se usa dentro del venue para canjear por bienes (bebidas, comida, merch) mediante el **POS**.

### Balance
Saldo acumulado de tokens de un miembro. No expira. Se incrementa con cada **Donativo** y se decrementa con cada compra en el **POS**.

### Acceso
Permiso para entrar a un evento específico. Se obtiene al hacer un **Donativo** que cubra el monto mínimo sugerido del evento. Se verifica físicamente en la puerta mediante el **QR del miembro**.

### QR del Miembro
Código QR único por miembro. Vive dentro de la plataforma y puede exportarse a Apple Wallet / Google Wallet para acceso fácil sin abrir la app. Tiene dos usos:
1. **En la puerta**: verificación de **Acceso** al evento
2. **En el POS**: descuento de tokens del **Balance** para compras dentro del venue

### Miembro
Usuario aprobado para ser parte de la comunidad. El acceso no es abierto — requiere aprobación de un Organizador o del Operador de Puerta durante un evento. Cualquier miembro puede generar una liga de invitación para atraer nuevos miembros, pero la aprobación siempre recae en un rol autorizado. Todo miembro queda ligado al miembro que lo invitó (referral).

### Solicitud de Membresía
Estado intermedio de un usuario que se registró via liga de invitación pero aún no ha sido aprobado. Visible en la cola de pendientes para Organizadores y Operadores de Puerta.

### Organizador
Rol con capacidad de aprobar/rechazar Solicitudes de Membresía, gestionar eventos y venues. Puede ser el dueño del venue u otra persona de confianza designada.

### Liga de Invitación
URL única generada por cualquier miembro. Lleva el identificador del miembro que invita (para trazabilidad de referral). Al registrarse via esta liga, el usuario queda en estado de Solicitud de Membresía hasta ser aprobado.

### Venue
Espacio físico que alberga eventos. El primer venue es **El Nido**. Un venue tiene una página en la plataforma con descripción, misión/visión, y gestiona sus propios eventos.

### Evento
Ocurrencia programada en un **Venue**. Puede ser puntual o recurrente (ej. jams de sábado). Define el monto mínimo de **Donativo** sugerido para obtener **Acceso**. Puede ser exclusivo para miembros o abierto al público general.

### Operador de Puerta
Persona física en el venue que verifica el **QR del Miembro** para validar el **Acceso** al evento.

### Operador de POS
Persona física en el venue que opera el sistema POS para descontar **Tokens** del **Balance** de un miembro a cambio de bienes.

### Cajero de Tokens
Persona física en el evento que acepta efectivo y agrega **Tokens** al **Balance** de un miembro directamente via la plataforma (rol de admin de evento). Es el puente para miembros que no usan la plataforma digitalmente durante el evento. Todo queda registrado en el sistema — no existen tokens físicos paralelos.

### POS
Sistema punto de venta ya existente (implementado por separado) usado el día del evento para gestionar inventario y ventas. Se integra con la plataforma via API: escanea el **QR del Miembro**, consulta y descuenta del **Balance** en tiempo real. Soporte offline es requerimiento futuro (fuera de Fase 1).

### Manifiesto
Documento que expresa los valores y compromisos de la comunidad. El usuario debe leerlo y aceptarlo explícitamente durante el registro. La aceptación queda registrada en la plataforma (quién, cuándo).

### Solicitud de Membresía (campos)
Al registrarse via **Liga de Invitación**, el usuario proporciona:
- Nombre completo
- Número de teléfono (usado para **WhatsApp OTP**)
- Cómo se enteró de la comunidad
- Por qué quiere ser parte
- Qué arte practica (músico, taller, espectador, etc.)

El referente (quien invitó) se captura automáticamente desde la liga — no se pregunta.

### Evento Recurrente
En Dionysus, cada ocurrencia de un evento recurrente (ej. jam de cada sábado) es un **Evento** independiente con su propio monto mínimo de **Donativo**. No existe suscripción multi-fecha en Fase 1.

### Notificación de Aprobación Pendiente
Cuando un usuario completa su registro y queda en cola, los **Organizadores** reciben:
1. Push notification dentro de la plataforma
2. Mensaje de WhatsApp con nombre del solicitante y sus respuestas del formulario
