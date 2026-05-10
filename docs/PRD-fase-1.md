# PRD — Dionysus Fase 1: Comunidad y Tokens para El Nido

## Problem Statement

El Nido es un venue que organiza jams musicales los sábados. Actualmente los pagos se hacen en efectivo o tarjeta dentro del espacio físico, lo cual representa un riesgo legal ya que el venue no tiene permisos de venta. No existe manera de gestionar el acceso, donativos y consumo dentro del espacio de forma digital y trazable. Escalar la comunidad es imposible bajo el modelo actual: la aprobación de nuevos miembros es manual y no estructurada, no hay registro de quién invitó a quién, y no existe historial de participación.

## Solution

Una plataforma digital que mueve todo el comercio fuera del espacio físico. Los miembros hacen sus donativos online antes o durante el evento, acumulan un balance de tokens que persiste entre eventos, y usan su QR personal para acceder al venue y canjear tokens por consumo dentro del espacio via el POS existente. El acceso a la comunidad sigue siendo curado — cualquier miembro puede invitar pero la aprobación recae siempre en un rol autorizado.

Fase 1 cubre únicamente a El Nido como venue piloto. La arquitectura está diseñada para escalar a múltiples venues, ciudades y proveedores de pago sin rediseño.

---

## User Stories

### Registro y Membresía

1. Como miembro activo, quiero generar mi liga de invitación personal, para poder compartirla con personas que quiero invitar a la comunidad.
2. Como persona interesada, quiero registrarme via la liga de invitación de un miembro, para iniciar mi solicitud de membresía.
3. Como persona en proceso de registro, quiero leer y aceptar el Manifiesto de la comunidad, para declarar explícitamente mi compromiso con sus valores.
4. Como persona en proceso de registro, quiero llenar un formulario breve con mis datos y motivaciones, para que los organizadores puedan conocerme antes de aprobarme.
5. Como persona en proceso de registro, quiero proporcionar mi número de WhatsApp, para recibir mi código de acceso a la plataforma y comunicaciones futuras.
6. Como persona en proceso de registro, quiero saber que mi solicitud está siendo revisada, para tener expectativas claras del siguiente paso.
7. Como organizador, quiero recibir una notificación por push y por WhatsApp cuando hay una nueva solicitud de membresía pendiente, para no perder solicitudes.
8. Como organizador, quiero ver el nombre, respuestas del formulario y quién invitó a cada solicitante, para tomar una decisión informada de aprobación.
9. Como organizador, quiero aprobar o rechazar una solicitud desde la plataforma, para controlar quién entra a la comunidad.
10. Como operador de puerta, quiero aprobar una solicitud de membresía en tiempo real durante un evento, para no bloquear la entrada a personas que llegaron sin haber pasado el proceso previo.
11. Como nuevo miembro aprobado, quiero recibir un mensaje de bienvenida por WhatsApp con el enlace a mi perfil y mi QR, para poder acceder a la plataforma de inmediato.
12. Como organizador, quiero dar de baja a un miembro en cualquier momento, para mantener la integridad de la comunidad.

### Autenticación

13. Como miembro, quiero iniciar sesión ingresando mi número de teléfono, para no tener que recordar una contraseña.
14. Como miembro, quiero recibir un código de un solo uso por WhatsApp al iniciar sesión, para verificar que soy el dueño del número.
15. Como miembro, quiero que mi sesión persista un tiempo razonable, para no tener que autenticarme en cada visita.

### QR del Miembro

16. Como miembro, quiero ver mi QR personal desde la plataforma en cualquier momento, para tenerlo listo cuando lo necesite.
17. Como miembro, quiero agregar mi QR a Apple Wallet, para acceder a él rápidamente desde la pantalla de bloqueo de mi iPhone sin abrir la app.
18. Como miembro, quiero agregar mi QR a Google Wallet, para acceder a él rápidamente desde mi Android sin abrir la app.
19. Como miembro, quiero que mi QR en Apple/Google Wallet se actualice automáticamente cuando mi balance cambia, para siempre ver mi saldo actual.

### Donativos y Tokens

20. Como miembro, quiero ver los eventos próximos de El Nido con su monto mínimo sugerido de donativo, para saber cuánto contribuir.
21. Como miembro, quiero hacer un donativo para un evento específico via tarjeta de crédito/débito, para obtener acceso y agregar tokens a mi balance.
22. Como miembro, quiero hacer un donativo via OXXO, para poder pagar en efectivo sin ir al venue.
23. Como miembro, quiero que mis tokens se acrediten automáticamente a mi balance al confirmarse el pago, para no depender de nadie para usarlos.
24. Como miembro, quiero ver mi balance de tokens en tiempo real, para saber cuánto tengo disponible.
25. Como miembro, quiero ver el historial de mis donativos y mis compras con tokens, para llevar registro de mi participación.
26. Como miembro, quiero agregar tokens adicionales a mi balance en cualquier momento (no solo en eventos), para no quedarme sin saldo dentro del venue.

### Acceso al Evento

27. Como operador de puerta, quiero escanear el QR de un miembro al llegar al evento, para verificar que hizo su donativo mínimo para ese evento.
28. Como operador de puerta, quiero ver claramente si el miembro tiene acceso válido o no, para tomar la decisión de entrada en segundos.
29. Como operador de puerta, quiero ver el balance actual de tokens del miembro al escanear su QR, para darle contexto sobre su saldo.
30. Como miembro, quiero que el acceso sea verificado en menos de 3 segundos, para no generar fila en la puerta.

### Cajero de Tokens

31. Como cajero de tokens, quiero buscar a un miembro por nombre o número de teléfono, para agregar tokens a su balance cuando pagan en efectivo.
32. Como cajero de tokens, quiero agregar un monto específico de tokens al balance de un miembro, para reflejar el efectivo recibido.
33. Como cajero de tokens, quiero que cada operación quede registrada en el sistema, para que exista trazabilidad de los ingresos en efectivo.
34. Como cajero de tokens, quiero poder registrar a un miembro nuevo en el momento y agregarle su donativo mínimo, para atender a personas que llegan sin haber pasado por el flujo digital.

### Integración con POS

35. Como operador de POS, quiero escanear el QR de un miembro para ver su balance de tokens disponible, para saber si puede cubrir la compra.
36. Como operador de POS, quiero descontar tokens del balance de un miembro al concretar una venta, para registrar el consumo.
37. Como miembro, quiero recibir confirmación inmediata de que se descontaron tokens de mi balance al comprar, para tener tranquilidad de que el sistema funcionó.

### Gestión de Eventos (Organizador)

38. Como organizador, quiero crear un evento con fecha, hora, descripción y monto mínimo de donativo, para publicarlo en la plataforma.
39. Como organizador, quiero marcar si un evento es exclusivo para miembros o abierto al público, para controlar la visibilidad.
40. Como organizador, quiero ver cuántos miembros han hecho su donativo para un evento próximo, para estimar la asistencia.
41. Como organizador, quiero ver el total de donativos recaudados por evento, para tener visibilidad financiera.
42. Como organizador, quiero cancelar o posponer un evento, para comunicar cambios a los miembros que ya donaron.

### Administración de la Plataforma

43. Como admin de la plataforma, quiero gestionar los roles de los usuarios (Organizador, Operador de Puerta, Cajero de Tokens, Operador de POS), para controlar los permisos de cada persona.
44. Como admin de la plataforma, quiero ver todas las transacciones (donativos, top-ups, descuentos de POS), para auditar el sistema.
45. Como admin de la plataforma, quiero ver el grafo de referrals (quién invitó a quién), para entender cómo crece la comunidad.

---

## Implementation Decisions

### Módulos a construir

**1. Módulo de Auth**
Gestiona identidad basada en número de teléfono. Genera y valida OTPs enviados via WhatsApp Business API. Emite tokens de sesión. El número de teléfono es el identificador primario del usuario — no existe email/contraseña.

**2. Módulo de Membresía**
Gestiona el ciclo de vida de un miembro: generación de ligas de invitación (con referral ID embebido), formulario de solicitud, aceptación del Manifiesto (con timestamp), cola de aprobación, estados (pendiente / activo / dado de baja), y grafo de referrals. Este módulo es independiente del módulo de auth — la aprobación puede ocurrir antes de que el usuario haya iniciado sesión por primera vez.

**3. Módulo de Balance (módulo profundo)**
Gestiona el balance de tokens de cada miembro. Es una interfaz simple: `acreditar(miembro, monto, concepto)` y `debitar(miembro, monto, concepto)`. Cada operación genera una entrada inmutable en el historial de transacciones. No conoce ni a Stripe ni al POS — solo recibe instrucciones de acreditar o debitar con un concepto. Esto lo hace completamente testeable en aislamiento.

**4. Módulo de Donativos y Pagos**
Capa de abstracción sobre proveedores de pago. El primer adaptador es Stripe (tarjeta + OXXO). La interfaz es agnóstica al proveedor: `iniciarPago(monto, método, eventoId)` → webhook de confirmación → llama al Módulo de Balance para acreditar. Diseñado para agregar adaptadores (MercadoPago, etc.) sin tocar la lógica de negocio. El dinero en Fase 1 cae a una cuenta central; la arquitectura está preparada para splits automáticos por venue en fases futuras.

**5. Módulo de QR**
Genera el QR del miembro (identificador único firmado). Produce passes compatibles con Apple Wallet (PKPass) y Google Wallet (JWT). Los passes se actualizan via push update cuando cambia el balance. El QR no codifica el balance — solo la identidad del miembro. El balance siempre se consulta en tiempo real vía API.

**6. Módulo de Eventos**
Gestiona la creación, publicación y configuración de eventos. Cada ocurrencia de un evento recurrente (ej. cada sábado) es un registro independiente con su propio monto mínimo de donativo. Registra qué miembros tienen Acceso a cada evento (hicieron el donativo mínimo).

**7. Módulo de Notificaciones**
Envía mensajes via WhatsApp Business API y push notifications web. Consume eventos del sistema (nueva solicitud de membresía, miembro aprobado, donativo confirmado) y los transforma en mensajes. Desacoplado del resto via eventos — no es llamado directamente por otros módulos.

**8. API de POS**
Endpoints públicos (autenticados via API key) consumidos por el POS existente:
- `GET /members/{qr}/balance` — consultar balance
- `POST /members/{qr}/debit` — descontar tokens (idempotente por transaction ID)

**9. Módulo de Roles y Permisos**
Gestiona los roles: Admin, Organizador, Operador de Puerta, Cajero de Tokens, Operador de POS, Miembro. Cada rol tiene un conjunto de acciones permitidas. Un usuario puede tener múltiples roles.

### Decisiones arquitectónicas
- Ver ADR 0001: WhatsApp OTP como mecanismo de autenticación
- Ver ADR 0002: Abstracción de proveedores de pago
- El Módulo de Balance es inmutable por diseño: no se editan transacciones, solo se agregan. Cancelaciones se modelan como créditos de reversa.
- La plataforma no tiene identidad de marca definida en Fase 1 — el sistema de diseño debe soportar theming completo (colores, logos, nombre) por venue/comunidad desde el inicio.
- El QR identifica al miembro, no al evento. El acceso se valida consultando si el miembro tiene un donativo mínimo para el evento activo.

### Esquema de datos (conceptual)
- **Miembro**: id, teléfono, nombre, ciudad, arte, cómo_se_enteró, por_qué, referente_id, estado, manifiesto_aceptado_at, creado_at
- **Evento**: id, venue_id, nombre, fecha, duración, donativo_mínimo, tipo (miembros/público), creado_por
- **Acceso**: miembro_id, evento_id, donativo_id, otorgado_at
- **Transacción**: id, miembro_id, tipo (donativo/top-up/compra-pos/reversa), monto, concepto, referencia_externa, creado_at
- **Liga de Invitación**: id, generada_por_miembro_id, usada_por_miembro_id?, creada_at, usada_at?

---

## Testing Decisions

Un buen test verifica comportamiento observable desde fuera del módulo, no implementación interna. No se testea que se llamó a una función; se testea que el estado resultante es correcto.

**Módulos con tests obligatorios:**

- **Módulo de Balance**: testear en aislamiento total. Casos: acreditación correcta, debitación correcta, debitación con saldo insuficiente, idempotencia de operaciones duplicadas, historial inmutable.
- **Módulo de Membresía**: testear el ciclo de vida completo — generación de liga, registro, transición de estados (pendiente → activo → dado de baja), trazabilidad de referral.
- **API de POS**: testear los dos endpoints con mocks del Módulo de Balance. Verificar autenticación via API key, idempotencia del débito, respuesta cuando el miembro no existe, respuesta cuando el balance es insuficiente.
- **Módulo de Donativos**: testear el flujo de confirmación de pago → acreditación de balance. Usar un adaptador de pago falso (stub) para no depender de Stripe en los tests.

**Módulos sin tests de unidad obligatorios en Fase 1:**
- Módulo de QR (integración con Apple/Google Wallet es mejor testeada manualmente o con tests de integración)
- Módulo de Notificaciones (testeado via integración con WhatsApp Business API en staging)

---

## Out of Scope

Los siguientes temas quedan fuera de Fase 1 y se abordan en fases posteriores:

- **Múltiples venues y ciudades**: la arquitectura los soporta pero la UI de gestión multi-venue no se construye en Fase 1.
- **Página pública del venue / landing de eventos**: en Fase 1 los eventos solo son visibles para miembros autenticados.
- **Directorio de talento y músicos**: perfil público de artistas, búsqueda, conexión entre músicos.
- **Eventos con cover (boleto)**: en Fase 1 todos los eventos son via donativo. El modelo de covers con planes (General, VIP, butacas) es Fase 2+.
- **Split automático de pagos al venue**: en Fase 1 el dinero cae a una cuenta central y la transferencia al venue es manual. La arquitectura está lista pero el flujo automático no se implementa.
- **Publicidad y marcas**: conexión de marcas con eventos/venues.
- **Soporte offline del POS**: el POS consulta la API en tiempo real. El modo offline es requerimiento de eventos masivos, fuera del scope de los jams de El Nido.
- **Gestión de inventario en POS desde Dionysus**: el POS existente gestiona su propio inventario.
- **Eventos abiertos al público general**: en Fase 1 todos los eventos son exclusivos para miembros.
- **Suscripción multi-fecha**: no existe donativo que cubra múltiples sábados. Cada evento requiere su propio donativo mínimo.

---

## Further Notes

- **Identidad de marca**: la plataforma se construye sin identidad propia en Fase 1. El sistema de diseño debe ser white-label desde el inicio — preparado para theming por comunidad/venue.
- **WhatsApp Business API**: requiere cuenta verificada de WhatsApp Business. Este proceso de aprobación de Meta puede tomar semanas — debe iniciarse en paralelo al desarrollo.
- **Apple Wallet / Google Wallet**: requieren certificados de Apple Developer y cuenta de Google Pay & Wallet Console. También necesitan tiempo de setup.
- **POS existente**: la integración requiere agregar al POS existente la capacidad de llamar a los dos endpoints de la API de Dionysus. Es una modificación pequeña del lado del POS.
- **Manifiesto**: el contenido del Manifiesto es responsabilidad del equipo de El Nido, no de la plataforma. La plataforma solo lo muestra y registra la aceptación.
- **Modelo de comisión**: la tasa base de comisión de Dionysus sobre los donativos se define antes del lanzamiento. No es un parámetro UI en Fase 1 — es configuración del sistema.
