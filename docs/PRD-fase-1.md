# PRD — Dionysus Fase 1: Plataforma Multi-Comunidad + Tokens para El Nido

## Problem Statement

El Nido es un venue privado que organiza jams musicales los sábados. Actualmente los pagos se hacen en efectivo o tarjeta dentro del espacio, lo cual representa un riesgo legal (el venue no tiene permisos de venta). No existe forma de gestionar acceso, donativos y consumo de manera digital y trazable. Escalar la comunidad es imposible: la aprobación de miembros es manual y no estructurada, no hay registro de quién invitó a quién, y no existe historial de participación.

Pero el problema es más amplio: no existe una plataforma que conecte a personas que quieren crear y asistir a eventos culturales con los venues, artistas y organizadores que los hacen posibles. El Nido es el primer caso de uso, pero la necesidad aplica a cualquier comunidad que organiza eventos.

## Solution

Dionysus es una plataforma que conecta comunidades, venues, artistas y organizadores alrededor de eventos culturales. Cualquier persona puede descubrir venues y eventos en la plataforma. Cada venue es a la vez un espacio físico y una comunidad con sus propios miembros, su propio manifiesto y su propio sistema de tokens.

Dentro de la plataforma pueden existir venues **públicos** (cualquiera puede unirse) y venues **privados** (solo por invitación, como El Nido). Los tokens son venue-scoped: el balance de un miembro en El Nido es independiente de su balance en cualquier otro venue.

Un usuario puede ser miembro de múltiples venues simultáneamente bajo una sola cuenta. La plataforma está preparada para crecer hacia un marketplace donde organizadores encuentren artistas, venues disponibles y proveedores de servicio.

**Fase 1** implementa el sistema completo de membresía y tokens para El Nido, sobre una arquitectura ya preparada para múltiples venues.

---

## User Stories

### Registro y Membresía (Venue Privado — El Nido)

1. Como miembro activo de El Nido, quiero generar mi liga de invitación personal para ese venue, para poder compartirla con personas que quiero invitar.
2. Como persona interesada, quiero registrarme via la liga de invitación de un miembro de El Nido, para iniciar mi solicitud de membresía en ese venue específico.
3. Como persona en proceso de registro, quiero leer y aceptar el Manifiesto de El Nido, para declarar explícitamente mi compromiso con sus valores.
4. Como persona en proceso de registro, quiero llenar un formulario breve con mis datos y motivaciones, para que los organizadores puedan conocerme antes de aprobarme.
5. Como persona en proceso de registro, quiero proporcionar mi número de WhatsApp, para recibir mi código de acceso y comunicaciones futuras.
6. Como persona en proceso de registro, quiero saber que mi solicitud está siendo revisada, para tener expectativas claras del siguiente paso.
7. Como organizador de El Nido, quiero recibir notificación por push y por WhatsApp cuando hay una solicitud de membresía pendiente, para no perderme ninguna.
8. Como organizador de El Nido, quiero ver el nombre, respuestas del formulario y quién invitó a cada solicitante, para tomar una decisión informada de aprobación.
9. Como organizador de El Nido, quiero aprobar o rechazar una solicitud desde la plataforma, para controlar quién entra a la comunidad.
10. Como operador de puerta de El Nido, quiero aprobar una solicitud de membresía en tiempo real durante un evento, para no bloquear la entrada a personas que llegaron sin haber pasado el proceso previo.
11. Como nuevo miembro aprobado, quiero recibir un mensaje de bienvenida por WhatsApp con el enlace a mi perfil y mi QR, para acceder a la plataforma de inmediato.
12. Como organizador, quiero dar de baja la membresía de un miembro en este venue en cualquier momento, para mantener la integridad de la comunidad.

### Registro y Membresía (Venue Público — flujo futuro)

13. Como persona interesada en un venue público, quiero unirme al venue al hacer mi primera compra de boleto, sin necesidad de solicitud previa, para acceder sin fricción.
14. Como persona interesada, quiero poder usar una liga de invitación para unirme a un venue público, para que quien me invitó quede registrado como referente.
15. Como organizador de un venue público, quiero que nuevos miembros sean aprobados automáticamente al realizar su primer donativo, para no tener que aprobar a cada persona manualmente.

### Cuenta de Usuario (Global)

16. Como usuario, quiero tener una sola cuenta en la plataforma independientemente de cuántos venues integre, para no crear múltiples registros con el mismo número.
17. Como usuario, quiero iniciar sesión ingresando mi número de teléfono y recibir un código por WhatsApp, para no tener contraseña.
18. Como usuario, quiero que mi sesión persista un tiempo razonable, para no autenticarme en cada visita.
19. Como usuario, quiero ver todos los venues de los que soy miembro, para navegar entre mis comunidades.
20. Como usuario, quiero ver mi perfil global (nombre, ciudad, disciplina artística), para que sea consistente en todos los venues que integro.

### QR del Miembro

21. Como miembro, quiero ver mi QR personal desde la plataforma en cualquier momento, para tenerlo listo cuando lo necesite.
22. Como miembro, quiero agregar mi QR a Apple Wallet, para acceder a él rápidamente desde la pantalla de bloqueo sin abrir la app.
23. Como miembro, quiero agregar mi QR a Google Wallet, para acceder a él rápidamente desde mi Android.
24. Como miembro, quiero que mi QR sea el mismo en todos los venues, para no gestionar múltiples QRs.

### Donativos y Tokens

25. Como miembro de El Nido, quiero ver los eventos próximos con su monto mínimo sugerido de donativo, para saber cuánto contribuir.
26. Como miembro, quiero hacer un donativo para un evento via tarjeta de crédito/débito, para obtener acceso y agregar tokens a mi balance en ese venue.
27. Como miembro, quiero hacer un donativo via OXXO, para poder pagar en efectivo sin ir al venue.
28. Como miembro, quiero que mis tokens se acrediten automáticamente a mi balance del venue al confirmarse el pago, para no depender de nadie.
29. Como miembro, quiero ver mi balance de tokens del venue actual en tiempo real, para saber cuánto tengo disponible.
30. Como miembro, quiero ver el historial de transacciones de mi membresía en cada venue por separado, para llevar registro de mi participación.
31. Como miembro, quiero agregar tokens adicionales a mi balance de un venue en cualquier momento, para no quedarme sin saldo dentro del espacio.
32. Como miembro de múltiples venues, quiero que mis balances sean independientes por venue, para que consumir tokens en un venue no afecte mi saldo en otro.

### Acceso al Evento

33. Como operador de puerta, quiero escanear el QR de un miembro al llegar al evento, para verificar que hizo su donativo mínimo para ese evento.
34. Como operador de puerta, quiero ver claramente si el miembro tiene acceso válido o no, para tomar la decisión en segundos.
35. Como operador de puerta, quiero ver el balance actual de tokens del miembro al escanear su QR, para darle contexto sobre su saldo en el venue.
36. Como miembro, quiero que el acceso sea verificado en menos de 3 segundos, para no generar fila en la puerta.

### Cajero de Tokens

37. Como cajero de tokens, quiero buscar a un miembro por nombre o número de teléfono, para agregar tokens a su balance cuando pagan en efectivo.
38. Como cajero de tokens, quiero agregar un monto específico de tokens al balance de la membresía de un miembro en el venue, para reflejar el efectivo recibido.
39. Como cajero de tokens, quiero que cada operación quede registrada en el historial de transacciones, para que exista trazabilidad de ingresos en efectivo.

### Integración con POS (Sistema Externo)

40. Como sistema POS externo, quiero consultar el balance de tokens de un usuario en un venue específico via API key, para saber si puede cubrir la compra.
41. Como sistema POS externo, quiero descontar tokens del balance de un usuario al concretar una venta (operación idempotente por transaction ID), para registrar el consumo.
42. Como miembro, quiero recibir confirmación inmediata de que se descontaron tokens de mi balance al comprar, para tener tranquilidad de que el sistema funcionó.

### Gestión de Eventos (Organizador)

43. Como organizador, quiero crear un evento con fecha, hora, descripción y monto mínimo de donativo, para publicarlo en la plataforma.
44. Como organizador, quiero marcar si un evento es exclusivo para miembros del venue o visible al público general, para controlar la visibilidad.
45. Como organizador, quiero ver cuántos miembros han hecho su donativo para un evento próximo, para estimar la asistencia.
46. Como organizador, quiero ver el total de donativos recaudados por evento, para tener visibilidad financiera.
47. Como organizador, quiero cancelar o posponer un evento, para comunicar cambios a los miembros que ya donaron.

### Gestión de Venue (Organizador)

48. Como organizador, quiero configurar si mi venue es público o privado, para controlar quién puede solicitar membresía.
49. Como organizador, quiero gestionar las ligas de invitación (crear, ver cuántas veces se han usado, desactivar), para controlar el crecimiento de mi comunidad.
50. Como organizador, quiero gestionar los roles de los usuarios en mi venue (Organizador, Operador de Puerta, Cajero de Tokens), para controlar los permisos.

### Administración de la Plataforma

51. Como admin de la plataforma, quiero ver todas las transacciones (donativos, top-ups, descuentos de POS) de todos los venues, para auditar el sistema.
52. Como admin de la plataforma, quiero ver el grafo de referrals por venue, para entender cómo crece cada comunidad.
53. Como admin de la plataforma, quiero crear y configurar nuevos venues en la plataforma, para onboardear nuevas comunidades.

---

## Implementation Decisions

### Módulos a construir / modificar

**1. Módulo de Auth**
Gestiona identidad global basada en número de teléfono (WhatsApp OTP). El número es el identificador primario del `Usuario` — no existe email/contraseña. Emite tokens de sesión JWT que codifican el `userId` global. Un mismo usuario puede tener múltiples membresías; el token de sesión siempre referencia al `Usuario`, no a una membresía específica.

**2. Módulo de Membresía**
Gestiona el ciclo de vida de una `Membresía` (relación `Usuario × Venue`): generación de ligas de invitación venue-scoped (con referral embebido), formulario de solicitud, aceptación del Manifiesto del venue (con timestamp por membresía), cola de aprobación, y estados (`PENDING → ACTIVE → SUSPENDED`). Al registrarse via liga, el módulo hace upsert del `Usuario` (si ya existe no se duplica) y crea la `Membresía`. El estado inicial depende del tipo de venue: `PRIVATE → PENDING`; `PUBLIC → ACTIVE`.

Las ligas de invitación soportan uso único (`maxUses: 1`, default para El Nido) y multi-uso (`maxUses: null` o un número fijo). Cada uso se registra en `InviteLinkUse` para trazabilidad.

**3. Módulo de Balance (módulo profundo)**
Gestiona el balance de tokens de una `Membresía` específica. Interface: `acreditar(membershipId, monto, concepto)` y `debitar(membershipId, monto, concepto)`. Cada operación genera una entrada inmutable en el historial de transacciones. Balance = suma de transacciones para esa membresía. No conoce ni a Stripe ni al POS — solo recibe instrucciones de acreditar o debitar. Los tokens son venue-scoped: el balance en El Nido es independiente al de cualquier otro venue.

**4. Módulo de Donativos y Pagos**
Capa de abstracción sobre proveedores de pago. Primer adaptador: Stripe (tarjeta + OXXO). Interface agnóstica al proveedor: `iniciarPago(userId, membershipId, monto, método, eventoId?)` → webhook de confirmación → llama al Módulo de Balance para acreditar. El `membershipId` determina qué balance recibe el crédito. Diseñado para agregar adaptadores (MercadoPago, etc.) sin tocar la lógica de negocio.

**5. Módulo de QR**
Genera el QR del miembro codificando el `userId` global (no el `membershipId`). El mismo QR funciona en todos los venues del usuario. El balance siempre se consulta en tiempo real vía API — el QR no codifica datos de saldo. Produce passes para Apple Wallet y Google Wallet.

**6. Módulo de Eventos**
Gestiona la creación y configuración de eventos por venue. Cada ocurrencia de un evento recurrente es un registro independiente con su propio monto mínimo de donativo. Registra qué membresías tienen `Acceso` a cada evento.

**7. Módulo de Notificaciones**
Envía mensajes via WhatsApp Business API y push notifications. Consume eventos del sistema desacopladamente. No es llamado directamente por otros módulos.

**8. API de POS (machine-to-machine)**
Endpoints autenticados via `POS_API_KEY` + `POS_VENUE_ID`. El QR escaneado contiene el `userId`; los endpoints resuelven la membresía correcta usando `(userId, POS_VENUE_ID)`:
- `GET /api/pos/balance?qr=<userId>` — consultar balance de la membresía
- `POST /api/pos/debit` — descontar tokens (idempotente por `transactionId` del POS)

Los operadores del POS no son usuarios de Dionysus. La autenticación es completamente machine-to-machine.

**9. Módulo de Roles y Permisos**
Roles son venue-scoped (excepto `ADMIN` que es global): `ORGANIZER`, `DOOR_OPERATOR`, `TOKEN_CASHIER`. Ortogonal a la membresía — un `Usuario` puede tener un rol en un venue sin tener membresía en él (ej. un cajero contratado). Un usuario puede tener múltiples roles en el mismo venue.

### Decisiones arquitectónicas

- Ver ADR 0001: WhatsApp OTP como mecanismo de autenticación
- Ver ADR 0002: Abstracción de proveedores de pago
- **`Usuario` es identidad global**; `Membresía` es la relación con un venue. No existen membresías sin usuario.
- **Balance inmutable por diseño**: no se editan transacciones, solo se agregan. Cancelaciones = créditos de reversa.
- **Tokens venue-scoped**: `Transaction.membershipId` determina qué venue acumula qué. No hay transferencia de tokens entre venues.
- **QR codifica `userId`** (global), no `membershipId`. El POS usa `POS_VENUE_ID` del env para saber qué venue está operando.
- La plataforma soporta theming por venue (colores, logos, nombre) — sin identidad de marca propia en Fase 1.
- `POS_OPERATOR` no es un rol de Dionysus. El POS es un sistema externo que se integra via API key; sus operadores no tienen cuenta en la plataforma.

### Esquema de datos (conceptual)

- **Usuario**: id, teléfono (único global), nombre, ciudad, disciplina_artística, creado_at
- **Venue**: id, nombre, descripción, manifiesto, slug, visibilidad (PÚBLICO/PRIVADO), creado_at
- **Membresía**: id, usuario_id, venue_id, estado, cómo_se_enteró, por_qué, manifiesto_aceptado_at, referente_id (usuario_id), creado_at
- **Liga de Invitación**: id, venue_id, generada_por_usuario_id, max_usos (null=ilimitado), creado_at
- **Uso de Liga**: id, liga_id, membresía_id, usada_at
- **Rol de Usuario**: id, usuario_id, rol, venue_id (null=global), asignado_at
- **Evento**: id, venue_id, nombre, fecha, duración, donativo_mínimo, visibilidad (miembros/público), creado_por_usuario_id
- **Acceso a Evento**: membresía_id, evento_id, pago_id?, otorgado_at
- **Pago**: id, usuario_id, membresía_id, evento_id?, monto, proveedor, estado, método
- **Transacción**: id, membresía_id, tipo (donativo/top-up/débito-pos/reversa), monto, concepto, referencia_externa, creado_at

---

## Testing Decisions

Un buen test verifica comportamiento observable desde fuera del módulo, no implementación interna. No se testea que se llamó a una función; se testea que el estado resultante es correcto.

**Módulos con tests obligatorios:**

- **Módulo de Balance**: testear en aislamiento total. Casos: acreditación correcta, debitación correcta, debitación con saldo insuficiente, idempotencia, historial inmutable, independencia entre membresías de distintos venues para el mismo usuario.
- **Módulo de Membresía**: testear ciclo de vida completo — generación de liga (uso único y multi-uso), registro con upsert de usuario existente, transición de estados, trazabilidad de referral, rechazo de liga agotada.
- **API de POS**: testear los dos endpoints. Verificar autenticación via API key, resolución correcta de membresía por `(userId, venueId)`, idempotencia del débito por `transactionId`, respuesta cuando el miembro no existe o no tiene membresía activa en el venue, respuesta cuando el balance es insuficiente.
- **Módulo de Donativos**: testear flujo confirmación de pago → acreditación de balance en la membresía correcta. Usar adaptador de pago stub para no depender de Stripe en los tests.

**Módulos sin tests de unidad obligatorios en Fase 1:**
- Módulo de QR (la integración con Apple/Google Wallet se testea manualmente o con tests de integración)
- Módulo de Notificaciones (testeado via integración en staging)

---

## Out of Scope

- **UI multi-venue**: la arquitectura soporta múltiples venues pero la UI de gestión multi-venue no se construye en Fase 1. El foco es El Nido como venue piloto.
- **Venues públicos (flujo de auto-membresía)**: el schema y los módulos están preparados, pero la UI y el flujo de venues públicos son Fase 2.
- **Registro de Artistas / ArtistProfile**: directorio de artistas por disciplina, búsqueda, portafolio. Los campos de perfil global (`artPractice`) existen pero la tabla `ArtistProfile` y la UI de directorio son trabajo futuro.
- **Marketplace**: descubrimiento de artistas, venues disponibles y proveedores de servicio (audio, catering, etc.) para organizar eventos.
- **Página pública de venue / landing de eventos**: en Fase 1 los eventos de El Nido solo son visibles para miembros autenticados.
- **Split automático de pagos al venue**: en Fase 1 el dinero cae a una cuenta central. La arquitectura está preparada pero el flujo automático es Fase 2+.
- **Soporte offline del POS**: el POS consulta la API en tiempo real.
- **Gestión de inventario desde Dionysus**: el POS existente gestiona su propio inventario.
- **Suscripción multi-fecha**: cada evento requiere su propio donativo mínimo.
- **Apple Wallet / Google Wallet**: en Fase 1 el QR vive en la app. Los passes son stubs que requieren certificados de Apple Developer y Google Wallet API.

---

## Further Notes

- **WhatsApp Business API**: requiere cuenta verificada de WhatsApp Business. El proceso de aprobación de Meta puede tomar semanas — debe iniciarse en paralelo al desarrollo.
- **POS existente**: la integración requiere que el POS externo agregue la capacidad de llamar a los dos endpoints de la API de Dionysus. Es una modificación pequeña del lado del POS.
- **Manifiesto**: el contenido del Manifiesto es responsabilidad del equipo de cada venue. La plataforma lo muestra y registra la aceptación con timestamp en la membresía.
- **Modelo de comisión**: la tasa base de comisión de Dionysus sobre los donativos se define antes del lanzamiento. Es configuración del sistema, no parámetro UI en Fase 1.
- **Identidad de marca**: la plataforma se construye sin identidad propia en Fase 1. El sistema de diseño debe ser white-label — preparado para theming completo por venue.
- **Roadmap de roles**: el sistema está diseñado para agregar nuevos roles. El próximo rol planificado es `ARTIST` vía una tabla `ArtistProfile` opt-in, ortogonal al sistema de control de acceso existente.
