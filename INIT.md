# Dionysus Digital Platform

# Objectivo
El objetivo de la plataforma es generar una comunidad digital que le permita
poder gestionar eventos, talleres, conexion con artistas en pro de las artes

# Contexto
Estamos creando una comunidad con el proposito de poder hacer eventos musicales
donde ahorita nuestra principal actividad es hacer jams los sabados.
Por el momento no es posible escalar la comunidad por algunas restricciones
El objetivo es tener una plataforma donde podamos gestionar el tema de pagos
para que no ocurran dentro del espacio.
A partir de esto realmente crece la idea de empezar a gestionar a una comunidad
mas grande donde se puedan hacer eventos en otros espacios, donde podamos
conectar musicos con mas musicos, donde alguien tambien pueda tomar 
rol de organizador y de igual manera hacer sus propios eventos musicales,
o de juego de cartas, o de barro, etc.
La idea es que a traves de la plataforma te puedas enterar de eventos que estan sucediendo
Donde puedas conectar con otros artistas o poder invitarlos a tu evento
o poder colaborar con ellos para hacer lo que gustes crear
Adicional tambien sirve para promocion de tus eventos que estes creando
tambien sirve para espacios para poner a disposicion su espacio y poder 
hacer uso de este y ya tener artistas que quieran tocar
Es como conectar el espacio, con la gente, con los musicos, o 
con el espectaculo
O tambien servicios adicionales que puedan ser necesarios como comida, luces,
producciones, grabaciones o gente que tenga talento para crear
O que quieras organizar tu taller dentro de algun espacio
Termina siendo como un marketplace donde todo esto ocurre y la plataforma te ayuda a gestionar tu evento o taller
Para el caso en particular de El Nido que es un venue que hasta ahora ha sido
el espacio que ha gestionado a la comunidad, quiere poder tambien hacer sus eventos
dentro de esta plataforma
Aqui lo busca el espacio es que la transaccionalidad sea por fuera del espacio y vender de cierta manera la idea de que aqui es un espacio autogestionado por los donativos de la comunidad y con estos donativos les da acceso a tokens para poder comprar alimentos, bebidas, merch, etc dentro del espacio
El acceso a la comunidad independientemente de lo que busques tiene que ser autorizado por los organizadores del espacio, no cualquiera puede ser parte de la comunidad
El principal medio de comunicacion es via un numero telefonico
Habra que hacer diferentes formularios dependiendo de lo que busques
O diferentes pathways dependiendo si eres musico o si eres una banda de musicos, o si haces talleres o se simplifica simplemente primero como para ser parte de la comunidad
La idea es que la plataforma se pueda escalar y se pueda usar por diferentes venues, organizadores, musicos y pues se pueda llevar a mas ciudades

Tengo otro sistema ya implementado como POS que se puede usar para el dia del evento para gestionar inventario, ventas, etc y ver como se integra con este sistema para el tema de creditos, etc.
- Aqui como oportunidad de monetizacion de igual manera se puede hacer renta del sistema para utilizarlo en el dia del evento
- A este sistema habra que hacerle modificaciones para que pueda funcionar offline, en caso de eventos masivos las redes se atoran y estar yendo al servidor puede causar impedimentos para operar

Como contexto adicional por el momento tanto El Nido como esta plataforma no tienen identidad de marca, asi que lo que construyamos va a ser lo suficientemente generico en lo que a la par vamos construyendo la identidad, asi que la plataforma debe estar preparada para poder cambiar su identidad.

# Historias de usuario

## Como usuario
- Puedo compartir mi liga para invitar a alguien a la comunidad
- Todos los miembros de la comunidad estan ligados a quien lo invito

## Como usuario operador del evento
- Puedo hacer ventas en el sistema

## Como usuario admin del evento
- Puedo agregar creditos a la cuenta de un usuario
- Puedo cancelar alguna orden de creditos
- Puedo ver las transacciones que se han hecho en el sistema

## Como usuario miembro de la comunidad
- Puedo ver los eventos cerca de mi para poder participar en ellos
- Una vez adentro del evento puede ver su pagina que incluye multimedia sobre el espacio, informacion del venue y pues puedes encontrar el boton para contribuir al espacio
- Dependiendo del evento puedes comprar tu acceso al evento o puedes dar donativos para el evento
- Al realizar una "compra" debes recibir tu boleto digital que usaras para poder acceder al evento y de misma manera tu codigo es el que usaras para realizar transacciones adentro del venue
    - Esta funcionalidad va a depender del tipo de evento, si fue de covers pues quizas no lo ocupen y adentro vendan consumo.
    - Pero para el caso de El Nido este QR es el que tiene tu saldo que usas para intercambiar por bebidas, comida y merch

## Como usuario que ademas de ser miembro tambien gestiona un espacio
- Puedo gestionar la pagina de mi venue
- Puedo crear eventos puntuales o tambien pueden ser repetitivos, e.g. todos los sabados
- Dentro de la pagina de mi venue puedes poner una descripcion del venue, que es
- Compartir tu mision/vision
- Debes de poder agregar tu cuenta donde se te hara el deposito de lo que ingreses a la plataforma. Este debe ser una plataforma digital para poder automatizar los pagos
- Para tu evento puedes poner como se utiliza el donativo
- Para los eventos puedo manejarlo como un tema de cover o como donativos
- Cuando hay cover puedes tener diferentes planes. General o VIP o butacas, etc.
- Cuando es donativo puedes poner un precio sugerido de donacion
- La idea igual es que te permita ver las personas que han donado a tu evento o han comprado boletos
- Puedes ver en tu evento cuanto dinero se ha juntado
- El evento puede ser unicamente para miembros de la comunidad o para publico en general
    - La diferencia es que para miembros de comunidad tienes que acceder a la plataforma y para publico en general pueden ver los eventos y comprar o donar para el evento es nada mas de si lo puedes ver desde la pagina principal o no
- Puedes ver las personas que han donado al evento, puedes ver las personas que se han interesado en tu evento
    - Aqui hay oportunidad para vender al venue igual paquetes adicionales donde les puedes vender esta informacion como un plan extra
    - Aqui igual hay que definir una estrategia de monetizacion

## Como usuario que ademas de ser miembro tambien organiza eventos
- Aqui puedes ser un usuario que de igual manera quiere organizar sus talleres, o conciertos o eventos pero no es dueño de algun venue, pero se puede anexar al venue para poder gestionar eventos
    - Asi que aqui pudiera ya ser parte de uno o muchos venues
    - Pero creo que si es importante que el venue este dado de alta
- Puedo publicar un evento para que ya se pueda ver en el sitio
- A los eventos le puedes poner una fecha y duraciones
- Puedes subir multimedia del evento
- Puedes ponerle su descripcion, esta tiene que tener formato WYGIWYS

## Como usuario de talento
- Puedo registrarme como usuario de talento para poder aparecer en el directorio de musicos
- Puedo modificar mi perfil para poder incluir mis ligas de interes, tiktok, ig, youtube, spotify, etc.
    - Aqui igual puede que haya oportunidad de monetizacion ya sea desde cobrar darte de alta como tal o quizas de un tema de promocion en la plataforma para sugerirte con los venues o para los eventos

## Como usuario de publicidad
- Debo poder ver los eventos y los venues todo igual que un usuario normal,
pero aqui lo que se busca es que puedan poner promocion en el evento
Ya sea de manera digital o en fisico en el evento, pero poder conectar
a las marcas con los eventos/venues

## Como usuario admin
- Puedo gestionar las diferentes plataforma digitales para que el usuario pueda registrar su cuenta para recibir
- Puedo definir una tasa base de comision adicional que se cobrar a parte de lo que cobra el proveedor de pagos
- Puedo gestionar a los diferentes usuarios
- Puedo autorizar a los usuarios que quieran ser parte de la comunidad
- Puedo autorizar a los venues que quieran hacer sus eventos en la comunidad
- En cualquier momento el admin puede dar de baja a usuarios y venues
- Puedo ver toda la informacion de los eventos
- El sistema debe llevar la contabilidad de las comisiones que se han obtenido de los eventos
- Hay que definir que como y cuando se le entrega el recurso de los donativos a la plataforma. Hay que ver igual tema de impuestos o ver si desde que se hace la compra se le pueda entregar directamente al negocio y unicamente generar la comision que se queda la plataforma

# Fases
- La plataforma es un proyecto a largo plazo para ir construyendo poco a poco
- Ahorita la prioridad es permitir a El Nido ya poder hacer uso de los tokens y donativos para poder tener las transacciones fuera de el espacio
- Entonces la parte de gestion de usuarios para poder ser parte de la comunidad es clave. La parte de conocer al usuario es clave. La parte de autorizar a los usuarios es clave. Poder recibir donativos
- El sistema debe estar preparado para ir creciendo poco a poco e ir agregando modulos como la gestion de venues, de ya hacer los pagos directos al negocio cosas por el estilo.

