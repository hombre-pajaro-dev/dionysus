# PRD — Dionysus Fase 1: Plataforma Multi-Comunidad + Tokens para El Nido

## Problem Statement

El Nido es un venue privado que organiza jams musicales los sábados. Actualmente los pagos se hacen en efectivo o tarjeta dentro del espacio, lo cual representa un riesgo legal (el venue no tiene permisos de venta). No existe forma de gestionar acceso, donativos y consumo de manera digital y trazable. Escalar la comunidad es imposible: la aprobación de miembros es manual y no estructurada, no hay registro de quién invitó a quién, y no existe historial de participación.

Pero el problema es más amplio: no existe una plataforma que conecte a personas que quieren crear y asistir a eventos culturales con los venues, artistas y organizadores que los hacen posibles. El Nido es el primer caso de uso, pero la necesidad aplica a cualquier comunidad que organiza eventos.

## Solution

Dionysus es una plataforma que conecta comunidades, venues, artistas y organizadores alrededor de eventos culturales. Cualquier persona puede descubrir venues **públicos** y sus eventos — incluyendo eventos cercanos a su ubicación — sin necesidad de cuenta. Cada venue es a la vez un espacio físico y una comunidad con sus propios miembros, su propio manifiesto y su propio sistema de tokens.

Dentro de la plataforma pueden existir venues **públicos** (cualquiera puede unirse) y venues **privados** (solo por invitación, como El Nido). Los venues privados y sus eventos no son visibles públicamente. Los tokens son venue-scoped: el balance de un miembro en El Nido es independiente de su balance en cualquier otro venue.

Un usuario crea su cuenta una sola vez — verificando su número de WhatsApp via OTP — y a partir de ahí puede unirse a múltiples venues sin volver a autenticarse. La plataforma está preparada para crecer hacia un marketplace donde organizadores encuentren artistas, venues disponibles y proveedores de servicio.

**Fase 1** implementa el sistema completo de membresía y tokens para El Nido, sobre una arquitectura ya preparada para múltiples venues.

---

## User Stories

### Descubrimiento (sin cuenta)

1. Como persona sin cuenta, quiero ver un listado de venues públicos en la plataforma, para descubrir comunidades que me interesen.
2. Como persona sin cuenta, quiero ver eventos públicos cercanos a mi ubicación, para encontrar actividades culturales en mi ciudad.
3. Como persona sin cuenta, quiero ver el detalle de un venue público (descripción, manifiesto, eventos próximos), para decidir si quiero unirme.
4. Como persona sin cuenta, quiero ver el detalle de un evento público (fecha, lugar, descripción, monto de donativo), para decidir si quiero asistir.
5. Como persona sin cuenta, quiero que los venues privados (como El Nido) no aparezcan en el listado público, para que su existencia y eventos sean exclusivos para sus miembros.

### Cuenta de Usuario (Global)

6. Como persona nueva en la plataforma, quiero crear mi cuenta verificando mi número de WhatsApp con un código de un solo uso, para tener identidad en la plataforma.
7. Como usuario registrado, quiero iniciar sesión con mi número de teléfono y un código OTP por WhatsApp, para acceder a mi cuenta.
8. Como usuario registrado, quiero que mi sesión persista un tiempo razonable, para no autenticarme en cada visita.
9. Como usuario registrado, quiero unirme a nuevos venues sin necesidad de verificar mi número de teléfono de nuevo, ya que mi cuenta ya está verificada.
10. Como usuario, quiero ver todos los venues de los que soy miembro, para navegar entre mis comunidades.
11. Como usuario, quiero ver y editar mi perfil global (nombre, ciudad, disciplina artística), para que sea consistente en todos los venues que integro.

### Registro y Membresía (Venue Privado — El Nido)

12. Como miembro activo de El Nido, quiero generar mi liga de invitación personal para ese venue, para compartirla con personas que quiero invitar.
13. Como persona interesada, quiero registrarme via la liga de invitación de un miembro de El Nido, para iniciar mi solicitud de membresía en ese venue.
14. Como persona en proceso de registro, quiero leer y aceptar el Manifiesto de El Nido, para declarar explícitamente mi compromiso con sus valores.
15. Como persona en proceso de registro, quiero llenar un formulario breve con mis motivaciones, para que los organizadores puedan conocerme antes de aprobarme.
16. Como persona en proceso de registro, quiero saber que mi solicitud está siendo revisada, para tener expectativas claras del siguiente paso.
17. Como organizador de El Nido, quiero recibir notificación por push y por WhatsApp cuando hay una solicitud de membresía pendiente, para no perderme ninguna.
18. Como organizador de El Nido, quiero ver el nombre, respuestas del formulario y quién invitó a cada solicitante, para tomar una decisión informada de aprobación.
19. Como organizador de El Nido, quiero aprobar o rechazar una solicitud desde la plataforma, para controlar quién entra a la comunidad.
20. Como operador de puerta de El Nido, quiero aprobar una solicitud de membresía en tiempo real durante un evento, para no bloquear la entrada a personas que llegaron sin haber pasado el proceso previo.
21. Como nuevo miembro aprobado, quiero recibir un mensaje de bienvenida por WhatsApp con el enlace a mi perfil y mi QR, para acceder a la plataforma de inmediato.
22. Como organizador, quiero dar de baja la membresía de un miembro en este venue en cualquier momento, para mantener la integridad de la comunidad.

### Registro y Membresía (Venue Público — flujo futuro)

23. Como persona interesada en un venue público, quiero unirme al venue al hacer mi primera compra de boleto, sin necesidad de solicitud previa, para acceder sin fricción.
24. Como persona interesada, quiero poder usar una liga de invitación para unirme a un venue público, para que quien me invitó quede registrado como referente.
25. Como organizador de un venue público, quiero que nuevos miembros sean aprobados automáticamente al realizar su primer donativo, para no tener que aprobar a cada persona manualmente.

### QR del Miembro

26. Como miembro, quiero ver mi QR personal desde la plataforma en cualquier momento, para tenerlo listo cuando lo necesite.
27. Como miembro, quiero agregar mi QR a Apple Wallet, para acceder a él rápidamente desde la pantalla de bloqueo sin abrir la app.
28. Como miembro, quiero agregar mi QR a Google Wallet, para acceder a él rápidamente desde mi Android.
29. Como miembro, quiero que mi QR sea el mismo en todos los venues, para no gestionar múltiples QRs.

### Donativos y Tokens

30. Como miembro de El Nido, quiero ver los eventos próximos con su monto mínimo sugerido de donativo, para saber cuánto contribuir.
31. Como miembro, quiero hacer un donativo para un evento via tarjeta de crédito/débito, para obtener acceso y agregar tokens a mi balance en ese venue.
32. Como miembro, quiero hacer un donativo via OXXO, para poder pagar en efectivo sin ir al venue.
33. Como miembro, quiero que mis tokens se acrediten automáticamente a mi balance del venue al confirmarse el pago, para no depender de nadie.
34. Como miembro, quiero ver mi balance de tokens del venue actual en tiempo real, para saber cuánto tengo disponible.
35. Como miembro, quiero ver el historial de transacciones de mi membresía en cada venue por separado, para llevar registro de mi participación.
36. Como miembro, quiero agregar tokens adicionales a mi balance de un venue en cualquier momento, para no quedarme sin saldo dentro del espacio.
37. Como miembro de múltiples venues, quiero que mis balances sean independientes por venue, para que consumir tokens en un venue no afecte mi saldo en otro.

### Acceso al Evento

38. Como operador de puerta, quiero escanear el QR de un miembro al llegar al evento, para verificar que hizo su donativo mínimo para ese evento.
39. Como operador de puerta, quiero ver claramente si el miembro tiene acceso válido o no, para tomar la decisión en segundos.
40. Como operador de puerta, quiero ver el balance actual de tokens del miembro al escanear su QR, para darle contexto sobre su saldo en el venue.
41. Como miembro, quiero que el acceso sea verificado en menos de 3 segundos, para no generar fila en la puerta.

### Cajero de Tokens

42. Como cajero de tokens, quiero buscar a un miembro por nombre o número de teléfono, para agregar tokens a su balance cuando pagan en efectivo.
43. Como cajero de tokens, quiero agregar un monto específico de tokens al balance de la membresía de un miembro en el venue, para reflejar el efectivo recibido.
44. Como cajero de tokens, quiero que cada operación quede registrada en el historial de transacciones, para que exista trazabilidad de ingresos en efectivo.

### Gestión de Eventos (Organizador)

45. Como organizador, quiero crear un evento con fecha, hora, descripción y monto mínimo de donativo, para publicarlo en la plataforma.
46. Como organizador, quiero marcar si un evento es exclusivo para miembros del venue o visible al público general, para controlar la visibilidad.
47. Como organizador, quiero ver cuántos miembros han hecho su donativo para un evento próximo, para estimar la asistencia.
48. Como organizador, quiero ver el total de donativos recaudados por evento, para tener visibilidad financiera.
49. Como organizador, quiero cancelar o posponer un evento, para comunicar cambios a los miembros que ya donaron.

### Gestión de Venue (Organizador)

50. Como organizador, quiero configurar si mi venue es público o privado, para controlar quién puede solicitar membresía.
51. Como organizador, quiero gestionar las ligas de invitación (crear, ver cuántas veces se han usado, desactivar), para controlar el crecimiento de mi comunidad.
52. Como organizador, quiero gestionar los roles de los usuarios en mi venue (Organizador, Operador de Puerta, Cajero de Tokens), para controlar los permisos.

### Administración de la Plataforma

53. Como admin de la plataforma, quiero ver todas las transacciones de todos los venues, para auditar el sistema.
54. Como admin de la plataforma, quiero ver el grafo de referrals por venue, para entender cómo crece cada comunidad.
55. Como admin de la plataforma, quiero crear y configurar nuevos venues en la plataforma, para onboardear nuevas comunidades.

---

## Implementation Decisions

### Módulos a construir / modificar

**1. Módulo de Auth**
Gestiona identidad global basada en número de teléfono (WhatsApp OTP). El OTP se usa **únicamente al crear la cuenta por primera vez** y al iniciar sesión en dispositivos nuevos — no se requiere cada vez que el usuario se une a un nuevo venue. El número es el identificador primario del `Usuario`. Emite tokens de sesión JWT que codifican el `userId` global; el token de sesión referencia al `Usuario`, no a ninguna membresía específica.

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
Gestiona la creación y configuración de eventos por venue. Cada ocurrencia de un evento recurrente es un registro independiente con su propio monto mínimo de donativo. Registra qué membresías tienen `Acceso` a cada evento. Solo expone eventos de venues públicos en el listado de descubrimiento; venues privados son invisibles fuera de sus miembros.

**7. Módulo de Notificaciones**
Envía mensajes via WhatsApp Business API y push notifications. Consume eventos del sistema desacopladamente. No es llamado directamente por otros módulos.

**8. Módulo de Roles y Permisos**
Roles son venue-scoped (excepto `ADMIN` que es global): `ORGANIZER`, `DOOR_OPERATOR`, `TOKEN_CASHIER`. Ortogonal a la membresía — un `Usuario` puede tener un rol en un venue sin tener membresía en él (ej. un cajero contratado). Un usuario puede tener múltiples roles en el mismo venue.

### Decisiones arquitectónicas

- Ver ADR 0001: WhatsApp OTP como mecanismo de autenticación
- Ver ADR 0002: Abstracción de proveedores de pago
- **OTP solo al crear cuenta / iniciar sesión**: unirse a un nuevo venue no requiere re-autenticación. La cuenta ya está verificada.
- **Descubrimiento solo de venues públicos**: venues privados y sus eventos no aparecen en ningún listado público ni búsqueda.
- **`Usuario` es identidad global**; `Membresía` es la relación con un venue. No existen membresías sin usuario.
- **Balance inmutable por diseño**: no se editan transacciones, solo se agregan. Cancelaciones = créditos de reversa.
- **Tokens venue-scoped**: `Transaction.membershipId` determina qué venue acumula qué. No hay transferencia de tokens entre venues.
- **QR codifica `userId`** (global); el mismo QR sirve en todos los venues del usuario.
- La plataforma soporta theming por venue (colores, logos, nombre) — sin identidad de marca propia en Fase 1.

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
- **Módulo de Membresía**: testear ciclo de vida completo — generación de liga (uso único y multi-uso), registro con upsert de usuario existente, transición de estados, trazabilidad de referral, rechazo de liga agotada. Verificar que unirse a un segundo venue no requiere nuevo OTP.
- **Módulo de Donativos**: testear flujo confirmación de pago → acreditación de balance en la membresía correcta. Usar adaptador de pago stub para no depender de Stripe en los tests.
- **Módulo de Eventos**: testear que eventos de venues privados no aparecen en consultas de descubrimiento público.

**Módulos sin tests de unidad obligatorios en Fase 1:**
- Módulo de QR (la integración con Apple/Google Wallet se testea manualmente o con tests de integración)
- Módulo de Notificaciones (testeado via integración en staging)

---

## Out of Scope

- **UI multi-venue**: la arquitectura soporta múltiples venues pero la UI de gestión multi-venue no se construye en Fase 1. El foco es El Nido como venue piloto.
- **Venues públicos (flujo de auto-membresía)**: el schema y los módulos están preparados, pero la UI y el flujo de venues públicos son Fase 2.
- **Descubrimiento por geolocalización**: el schema no almacena coordenadas geográficas en Fase 1. El filtro por ubicación es Fase 2.
- **Registro de Artistas / ArtistProfile**: directorio de artistas por disciplina, búsqueda, portafolio. Los campos de perfil global (`artPractice`) existen pero la tabla `ArtistProfile` y la UI de directorio son trabajo futuro.
- **Marketplace**: descubrimiento de artistas, venues disponibles y proveedores de servicio (audio, catering, etc.) para organizar eventos.
- **Integración con sistema POS externo**: la API de POS existe en el codebase pero no es parte del PRD de la plataforma — es una integración bilateral entre el POS existente y Dionysus, fuera del scope de las features de usuario.
- **Split automático de pagos al venue**: en Fase 1 el dinero cae a una cuenta central. La arquitectura está preparada pero el flujo automático es Fase 2+.
- **Suscripción multi-fecha**: cada evento requiere su propio donativo mínimo.
- **Apple Wallet / Google Wallet**: en Fase 1 el QR vive en la app. Los passes son stubs que requieren certificados de Apple Developer y Google Wallet API.

---

## Further Notes

- **WhatsApp Business API**: requiere cuenta verificada de WhatsApp Business. El proceso de aprobación de Meta puede tomar semanas — debe iniciarse en paralelo al desarrollo.
- **Manifiesto**: el contenido del Manifiesto es responsabilidad del equipo de cada venue. La plataforma lo muestra y registra la aceptación con timestamp en la membresía.
- **Modelo de comisión**: la tasa base de comisión de Dionysus sobre los donativos se define antes del lanzamiento. Es configuración del sistema, no parámetro UI en Fase 1.
- **Identidad de marca**: la plataforma se construye sin identidad propia en Fase 1. El sistema de diseño debe ser white-label — preparado para theming completo por venue.
- **Roadmap de roles**: el sistema está diseñado para agregar nuevos roles. El próximo rol planificado es `ARTIST` vía una tabla `ArtistProfile` opt-in, ortogonal al sistema de control de acceso existente.
