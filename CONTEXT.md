# Dionysus — Glosario del Dominio

## Términos core

### Plataforma
Dionysus — el contenedor público exterior. Cualquier persona puede descubrir venues, ver eventos públicos y crear una cuenta. No es en sí misma una comunidad; es la infraestructura que conecta **Venues**, **Artistas** y **Organizadores**.

### Venue
Espacio físico que alberga eventos Y funciona como comunidad. Un Venue tiene sus propios miembros, su propio **Manifiesto**, sus propias reglas de acceso y su propio sistema de **Tokens**. Puede ser **público** o **privado**.

- **Venue público**: cualquier usuario puede unirse; la **Membresía** se crea automáticamente al hacer la primera compra de boleto.
- **Venue privado**: solo por **Liga de Invitación** venue-scoped; requiere aprobación manual de un **Organizador**.

El primer venue es **El Nido** (privado).

> Nota: "Venue" y "Comunidad" son el mismo concepto en Dionysus. No existen comunidades sin espacio físico — la plataforma está orientada a la realización de eventos presenciales.

### Usuario
Cuenta global en la plataforma. Identificado por número de teléfono (WhatsApp). Existe una sola vez independientemente de cuántos Venues integre. Campos: `phone`, `name`, `city`, `artPractice`. Un Usuario puede tener **Membresías** en múltiples Venues simultáneamente.

### Membresía
La relación entre un **Usuario** y un **Venue**. Tiene su propio ciclo de vida (`PENDING → ACTIVE → SUSPENDED`). Campos venue-específicos: `howHeard`, `whyJoin`, `manifestoAcceptedAt`, `status`, `referrerId` (quién invitó al usuario a ESE venue). El **Balance** de tokens vive por Membresía — no es global.

### Donativo
Una contribución monetaria que hace un miembro al unirse a un evento. Tiene dos efectos simultáneos:
1. Otorga **Acceso** al evento específico (si cubre el monto mínimo sugerido)
2. Convierte 1:1 en **Tokens** que se agregan al **Balance** de su **Membresía** en ese venue

Un miembro puede tener tokens acumulados de eventos anteriores, pero igual debe hacer un donativo mínimo nuevo por cada evento al que quiera asistir.

### Token
Unidad de valor digital con tasa fija 1:1 con MXN. Pertenece a una **Membresía** específica (venue-scoped). No es transferible entre venues. Persiste en el **Balance** entre eventos. Se usa dentro del venue para canjear por bienes (bebidas, comida, merch) mediante el **POS**.

### Balance
Saldo acumulado de tokens de una **Membresía**. No expira. Se incrementa con cada **Donativo** y se decrementa con cada compra en el **POS**. Es por `(Usuario × Venue)` — no global.

### Acceso
Permiso para entrar a un evento específico. Se obtiene al hacer un **Donativo** que cubra el monto mínimo sugerido del evento. Se verifica físicamente en la puerta mediante el **QR del Miembro**.

### QR del Miembro
Código QR único por miembro. Vive dentro de la plataforma y puede exportarse a Apple Wallet / Google Wallet para acceso fácil sin abrir la app. Tiene dos usos:
1. **En la puerta**: verificación de **Acceso** al evento
2. **En el POS**: descuento de tokens del **Balance** para compras dentro del venue

### Solicitud de Membresía
Estado intermedio (`PENDING`) de un usuario que se registró via **Liga de Invitación** a un venue privado pero aún no ha sido aprobado. Visible en la cola de pendientes para Organizadores.

Para venues públicos no existe Solicitud — la Membresía nace directamente como `ACTIVE` en la primera compra.

### Organizador
Rol con capacidad de aprobar/rechazar Solicitudes de Membresía, gestionar eventos y el venue. Puede ser el dueño del venue u otra persona de confianza designada. Opera siempre en el contexto de un Venue específico.

### Liga de Invitación
URL única generada por cualquier miembro, scoped a un **Venue** específico. Lleva el identificador del miembro que invita (trazabilidad de referral). Soporta uso único (`maxUses: 1`) o multi-uso (`maxUses: null` = ilimitado, o un número fijo). Fase 1 (El Nido): siempre `maxUses: 1`. Al registrarse via liga en venue privado, el usuario queda `PENDING` hasta aprobación del Organizador. En venues públicos la aprobación es automática.

### Evento
Ocurrencia programada en un **Venue**. Puede ser puntual o recurrente (ej. jams de sábado). Define el monto mínimo de **Donativo** sugerido para obtener **Acceso**.

Visibilidad:
- `PUBLIC`: visible sin autenticación; cualquiera puede verlo en la plataforma
- `MEMBERS_ONLY`: solo visible para miembros activos del venue

Participar (comprar boleto) siempre requiere **Membresía activa** en el venue, independientemente de la visibilidad del evento.

### Evento Recurrente
En Dionysus, cada ocurrencia de un evento recurrente (ej. jam de cada sábado) es un **Evento** independiente con su propio monto mínimo de **Donativo**. No existe suscripción multi-fecha en Fase 1.

### Operador de Puerta
Persona física en el venue que verifica el **QR del Miembro** para validar el **Acceso** al evento.

### Cajero de Tokens
Persona física en el evento que acepta efectivo y agrega **Tokens** al **Balance** de la **Membresía** de un miembro directamente via la plataforma. Es el puente para miembros que no usan la plataforma digitalmente durante el evento. Todo queda registrado — no existen tokens físicos paralelos.

### POS
Sistema punto de venta externo (sistema separado, no parte de Dionysus). Se integra via API key: escanea el **QR del Miembro**, consulta y descuenta del **Balance** de la **Membresía** en tiempo real. Los operadores del POS no son usuarios de Dionysus — la autenticación es machine-to-machine via `POS_API_KEY`. Soporte offline es requerimiento futuro (fuera de Fase 1).

### Manifiesto
Documento que expresa los valores y compromisos de un **Venue** específico. El usuario debe leerlo y aceptarlo explícitamente al unirse al venue. La aceptación queda registrada en la **Membresía** (quién, cuándo).

### Solicitud de Membresía (campos)
Al registrarse via **Liga de Invitación** a un venue privado, el usuario proporciona:
- Nombre completo
- Número de teléfono (usado para **WhatsApp OTP**)
- Cómo se enteró de la comunidad
- Por qué quiere ser parte
- Qué arte practica (músico, taller, espectador, etc.)

El referente (quien invitó) se captura automáticamente desde la liga — no se pregunta.

### Notificación de Aprobación Pendiente
Cuando un usuario completa su registro en un venue privado y queda en cola, los **Organizadores** del venue reciben:
1. Push notification dentro de la plataforma
2. Mensaje de WhatsApp con nombre del solicitante y sus respuestas del formulario

---

## Roles del sistema

| Rol | Scope | Descripción |
|---|---|---|
| `ADMIN` | Plataforma | Admin global de Dionysus |
| `ORGANIZER` | Venue | Gestiona venue, eventos y aprobaciones de membresía |
| `DOOR_OPERATOR` | Venue | Verifica QR en puerta |
| `TOKEN_CASHIER` | Venue | Agrega tokens via efectivo |
| `ARTIST` | Plataforma | Perfil artístico registrado, catalogado y buscable *(futuro)* |

---

## Roles del sistema — separación de conceptos

Los **roles** (`RoleType`) controlan acceso — qué puede hacer un Usuario dentro de un Venue.
El **perfil artístico** (`ArtistProfile`) controla descubrimiento — cómo puede ser encontrado un Usuario para ser contratado.

Son ortogonales: un mismo Usuario puede ser Artista + Organizador + miembro de múltiples venues sin conflicto.

---

## Roadmap de términos (planeados, no implementados)

- **ArtistProfile**: Extensión opt-in de `Usuario`. Tabla separada, relación 1:1 opcional. No es un rol — es un perfil de descubrimiento. Un usuario activa su perfil artístico cuando quiere aparecer en el directorio. Tiene: bio, links (SoundCloud, IG, etc.), disponibilidad, y una o más **Disciplinas**.
- **Disciplina**: Categoría artística de un Artista. Un Artista puede tener múltiples disciplinas (ej. músico + DJ, cocinero + performer). Modelado como tabla `ArtistDiscipline` para permitir filtrado en búsqueda.
- **Marketplace**: Capa de descubrimiento donde Organizadores encuentran Artistas, Venues disponibles, proveedores de servicio (audio, catering, etc.) para armar sus eventos. Oportunidad de monetización futura via acceso premium al directorio.
