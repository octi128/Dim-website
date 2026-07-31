/**
 * Texto legal de DIM, transcripto de www.dim.com.ar/politica/ sin cambios de
 * fondo. Dos aclaraciones sobre esa transcripción:
 *
 * 1. El documento original es uno solo: "Términos y Condiciones de Uso de la
 *    Aplicación / Política de Privacidad". No son dos textos separables, así
 *    que la página los publica juntos, como están.
 * 2. Todo el articulado habla de "la APP" (la app de turnos), no del sitio.
 *    Se respeta tal cual: corregirlo es una decisión del área legal de DIM,
 *    no de quien maqueta la página.
 *
 * Se arreglaron dos erratas de tipeo del original, ninguna con efecto sobre
 * el sentido: un espacio faltante en "personalizado.Ingresando" y un "a a
 * través" duplicado.
 *
 * El contenido vive acá y no dentro del componente para que actualizar el
 * texto no obligue a tocar la maqueta.
 */

export type SeccionLegal = {
  /** Ancla para el índice lateral. */
  id: string;
  titulo: string;
  /** Subtítulo dentro de la sección anterior: no entra en el índice. */
  sub?: boolean;
  parrafos: string[];
};

// A propósito no hay fecha de última actualización: el documento original no
// la trae y ponerle una inventada sería afirmar algo que nadie verificó.

export const SECCIONES: SeccionLegal[] = [
  {
    id: "terminos-generales",
    titulo: "Términos generales",
    parrafos: [
      "Seguidamente se expondrán los términos y condiciones de uso establecidas por DIM CENTROS DE SALUD – en adelante el CENTRO - que regirán el uso de los contenidos y servicios disponibles en esta aplicación, en adelante la APP.",
      "Al acceder y operar a través de esta APP Ud. en su carácter de USUARIO, declara que es mayor de edad y se obliga a cumplir y observar los términos y condiciones del CENTRO y que se exponen seguidamente:",
    ],
  },
  {
    id: "continuidad-del-servicio",
    titulo: "Continuidad del Servicio",
    parrafos: [
      "Atento que el proveedor de Internet resulta ser una empresa ajena al CENTRO, la interrupción en el servicio no resultará atribuible al CENTRO. Por lo que el CENTRO no se hace responsable por el continuo funcionamiento de la APP y/o sus enlaces, esto es, no garantiza su disponibilidad constante para que el USUARIO acceda al mismo. El CENTRO no se hace responsable por la interpretación de lo que se expone en la APP en forma explícita o implícita, ni del uso indebido que se haga en consecuencia, o bien los daños derivados de dicha interpretación.",
    ],
  },
  {
    id: "responsabilidades-del-usuario",
    titulo: "Responsabilidades del USUARIO",
    parrafos: [
      "El USUARIO es responsable por el buen uso del servicio, comprometiéndose expresamente a evitar cualquier tipo de acción que pueda dañar sistemas, equipos o servicios que sean accesibles directa o indirectamente a través de Internet, incluyendo la congestión intencional de enlaces o sistemas y de acuerdo a las presentes condiciones.",
      "El CENTRO no será responsable por el mal uso de las facilidades y servicios prestados debido a cortes de energía o interrupciones de cualquier índole o cualquier otra falla que no sea atribuible al CENTRO, así como tampoco por que el equipo del USUARIO se viera afectado por algún virus o por la presencia de otros elementos en los contenidos que puedan producir alteraciones en los sistemas, programas o archivos del USUARIO.",
      "El USUARIO resulta plenamente responsable tanto frente al CENTRO como a terceros por los daños y perjuicios que se produjeran como consecuencia de su accionar, el de sus dependientes o el de terceros que estuvieren conectados a la APP a través del USUARIO.",
      "El USUARIO asume la responsabilidad de mantener indemnes de cualquier daño, pérdida, gastos directos y/o indirectos u honorarios, inherentes o consecuentes que surjan en relación a la APP, su uso indebido o imposibilidad de uso, a nuestra empresa, sus funcionarios, directores, empleados y/o representantes. Así también el USUARIO asume la responsabilidad de indemnizar en el caso que correspondiere al CENTRO ante cualquier queja, reclamo extrajudicial; mediación o demanda judicial incoada por cualquier persona física o jurídica derivada de la inobservancia de las leyes o reglamentaciones o del mal uso que se haga del servicio.",
      "El CENTRO no será responsable frente al USUARIO o a terceros por los daños y perjuicios que se produjeran al USUARIO o a terceros como consecuencia del accionar de otros USUARIOS o terceros y los que resulten de la inobservancia por parte de terceros o de los USUARIOS, de las leyes o reglamentaciones o de otros hechos ilícitos o del mal uso que se haga del servicio.",
    ],
  },
  {
    id: "enlaces-externos",
    titulo: "Enlaces Externos",
    parrafos: [
      "El USUARIO reconoce que los enlaces, hipervínculos o links con otros SITIOS o archivos a los que se puede acceder desde la APP, son a su propio riesgo. El CENTRO no controla, investiga, verifica, aprueba, vigila, respalda ni hace propios los productos, y servicios, información, opiniones, datos, archivos y cualquier clase de material existente en los sitios y/o aplicaciones enlazados que no pertenezcan al CENTRO. Tales sitios y/o aplicaciones enlazados que resultan ajenos al CENTRO, se rigen por sus propios Términos y Condiciones de Uso, quedando exclusivamente a cargo del USUARIO la lectura y aceptación de dichos términos; así como de futuras actualizaciones y modificaciones introducidas a las provisiones allí contenidas. Por otra parte el CENTRO, no se hace responsable por productos o servicios ofrecidos por estas páginas de las empresas a las que se pueda acceder a través de su SITIO.",
      "La APP no contiene anuncios externos de terceros y únicamente proporcionará anuncios relacionados con el CENTRO.",
    ],
  },
  {
    id: "cookies",
    titulo: "Cookies y otras tecnologías",
    parrafos: [
      "Cuando el USUARIO interactúa en la APP, nosotros y nuestros proveedores podemos colocar cookies en su sistema. Las cookies son pequeñas unidades de datos que se envían a su navegador desde un servidor web y se almacenan en el sistema del USUARIO a los efectos de registrar datos. Por lo general, las cookies pueden hacer que Internet sea más útil, ya que almacenan información acerca de sus preferencias en un sistema en particular.",
      "Además de las cookies, nosotros y nuestros proveedores de servicio utilizamos una amplia gama de otras tecnologías, tales como etiquetas de pixeles (contadores de visitantes), imágenes en formato .GIF transparentes y otras tecnologías que forman parte de nuestro software de aplicación o de su dispositivo, para registrar información acerca de cómo interactúan los usuarios con nuestro servicio. Estas cookies y otras tecnologías pueden ayudar a personalizar el servicio para usted y ayudar a asociar sus interacciones con nuestro servicio a otra información dentro de su cuenta.",
      "La sección de Ayuda de la barra de herramientas de la mayoría de los navegadores le indicará cómo evitar que su navegador acepte nuevas cookies, cómo hacer que el navegador le avise cuando reciba una nueva cookie, o cómo desactivar las cookies por completo. Si su navegador está configurado para no aceptar cookies, no podrá recibir la experiencia completa al utilizar el servicio.",
      "Nosotros recurrimos a otros terceros, agencias de publicidad, para que presenten nuestros anuncios. Estas empresas pueden utilizar información acerca de sus visitas a este sitio web y a otros a fin de mostrarle anuncios acerca de bienes y servicios que le pueden resultar de interés.",
    ],
  },
  {
    id: "informacion-del-usuario",
    titulo: "Información específica sobre el USUARIO",
    parrafos: [
      "En ciertos casos el CENTRO tiene la necesidad de acceder a datos personales del USUARIO, como por ejemplo su nombre completo, su domicilio, su dirección de e-mail o su número de obra social o prepago, o su número telefónico (en adelante, “información personal”). El CENTRO necesita dicha información personal para poder brindar los servicios que ofrece a través de la APP. Sólo recopilaremos y/o almacenaremos su Información Personal en caso que usted nos suministre voluntariamente la misma, y mediante un proceso de aceptación. Mediante ésta aceptación, nos autoriza a su uso para los fines indicados. El CENTRO garantiza la confidencialidad de dicha información, no permitiendo que terceros ajenos a la Institución accedan a la misma. El CENTRO limita el acceso a sus datos a empleados en los que creemos tengan una razonable necesidad de contar con dicha información para proveerle productos o servicios al USUARIO o a efectos de poder realizar su trabajo. El CENTRO no vende, alquila, intercambia ni presta información personal de ninguna índole con ninguna persona o empresa.",
    ],
  },
  {
    id: "fines-de-la-recopilacion",
    titulo: "Fines de la recopilación",
    sub: true,
    parrafos: [
      "El CENTRO podría recoger información personal en la APP para: autenticar al paciente, dar un servicio al paciente, realizar encuestas entre pacientes y elaborar resultados, subscripciones, ofertas de servicios relacionados y otros intercambios de información en la APP. El propósito es conocer mejor al paciente para poder brindarle un servicio más personalizado. Ingresando su Información Personal mediante cualquier canal dentro de la APP, acepta que podemos guardar su Información Personal y/o cualquier otro dato que haya ingresado, para referencias futuras, acciones de marketing del CENTRO y sus empresas vinculadas, o bien descartar esa información en forma parcial o total luego.",
      "No obstante cualquier otra provisión en contrario en esta declaración, el CENTRO podrá divulgar información privada del USUARIO sólo en caso de: a) cumplir una exigencia legal tal como una orden de allanamiento, una citación judicial, una orden judicial; b) cumplir un requerimiento de una autoridad gubernamental o reguladora.",
    ],
  },
  {
    id: "seguridad",
    titulo: "Seguridad",
    parrafos: [
      "El CENTRO toma muy en serio la seguridad de la información y utiliza medidas administrativas, técnicas, físicas y de gestión razonables para proteger su información personal del acceso no autorizado. Por ejemplo, utilizamos Secure Sockets Layering (SSL) -un protocolo estándar en la industria- en algunas de las transmisiones que nos envía el USUARIO, a fin de cifrar cierta información personal que transmite durante el proceso de registro y de suscripción.",
      "Lamentablemente, ningún sistema de seguridad es 100% seguro. Por lo tanto, el CENTRO no garantiza la seguridad de su información y no se responsabiliza ante un acceso inapropiado. Al utilizar el servicio, incluido la APP con sus interfaces de usuario, o al transmitir información por cualquier medio, el USUARIO da su consentimiento para que el CENTRO se comunique con él en forma electrónica respecto de cuestiones de seguridad, privacidad y administrativas en relación con el uso que hace del servicio.",
      "Es responsabilidad del USUARIO proteger la confidencialidad de la información de acceso a su cuenta y restringir el acceso a la computadora o dispositivo mediante el cual accede a su cuenta de la APP. Si el USUARIO revela su contraseña a cualquier persona o comparte su cuenta o dispositivos con otras personas, debe asumir plena responsabilidad por sus actos. Siempre que sea posible, los usuarios de dispositivos públicos o compartidos deben cerrar sesión al finalizar cada visita. Si vende o devuelve un dispositivo o una computadora que usted utilizaba para ingresar a sus servicios, debe cerrar sesión y desactivar su cuenta antes de hacerlo. Si no cierra sesión o no desactiva su cuenta, los usuarios posteriores podrán acceder a la información de su cuenta.",
    ],
  },
  {
    id: "confidencialidad",
    titulo: "Confidencialidad de la Información",
    parrafos: [
      "El CENTRO y la APP cumplen con la legislación vigente en materia de Protección de Datos Personales, según lo prescripto por la Ley 25.326 vigente en la República Argentina.",
      "Sin perjuicio de ello, cualquier usuario que desee la supresión o rectificación de datos contenidos en esta APP, a los que sólo el usuario puede acceder, podrá solicitarlo dirigiéndose personalmente a la sede del titular del CENTRO, con la documentación que acredite su identidad.",
      "El CENTRO ha tomado todas las prevenciones necesarias para proteger los datos personales almacenados y cuenta con tecnología de avanzada idónea para impedir la sustracción de la misma por parte de terceros.",
      "El USUARIO debe asegurarse de contar asimismo con el software y la tecnología adecuada a los fines de evitar la sustracción o develación de información, no pudiendo responsabilizar al CENTRO en caso de producirse una filtración por causas atribuibles al usuario o su dispositivo.",
    ],
  },
  {
    id: "estudios-informatizados",
    titulo: "Advertencia: carácter de los Estudios Informatizados",
    parrafos: [
      "La información contenida en la APP reviste un carácter meramente informativo y carece de validez legal y es puesta a disposición del usuario con el fin de facilitar su acceso, y de las personas a quienes el usuario desee revelarla.",
      "El CENTRO no se hace responsable por el uso de la información que hagan el usuario y/o sus autorizados.",
      "Se deja constancia que la única información con validez legal emitida por el CENTRO es aquella documentación impresa y firmada por los profesionales médicos correspondientes.",
      "Los resultados de los Estudios y las imágenes resultantes de los mismos almacenados en la APP no reemplazan al resultado oficial sostenido en soporte papel firmado por el profesional médico responsable, que deberá ser retirado por el usuario en el domicilio de realización del estudio. Este último será el único resultado válido y vinculante para el CENTRO.",
    ],
  },
  {
    id: "modificacion",
    titulo: "Modificación de Términos y Condiciones de Uso",
    parrafos: [
      "Estos términos y condiciones de uso, la modalidad de acceso al servicio, y aquellas relacionadas o no con temas técnicos, o las mismas condiciones comerciales y de mercado que rijan los servicios ofrecidos en cualquier momento, pueden ser modificados por el CENTRO, sin necesidad de comunicación previa ni notificación ulterior alguna. Las referidas modificaciones serán realizadas en forma unilateral por el CENTRO pudiendo ser las mismas, totales o parciales. Ello así, se sugiere al USUARIO el periódico control de estos términos y condiciones de uso. Asimismo, el CENTRO se reserva el derecho de dar de baja la APP, sin previa notificación al USUARIO o bien impedir el acceso de aquellos USUARIOS que no cumplan y/o hagan cumplir las obligaciones de uso de la APP. Los datos que son recolectados o utilizados en la APP del CENTRO, están amparados por la Política de Privacidad del CENTRO. Tanto los Términos y Condiciones de Uso como la Política de Privacidad y todos aquellos textos volcados en la APP, así como el software en ella utilizado, marcas, imágenes, diseños, logotipos y cualquier otro contenido de la APP son de propiedad exclusiva del CENTRO o bien de su autor y se encuentran amparados por la Ley de Propiedad Intelectual Nº 11.723 y la Convención de Berna para la Protección de las Obras Literarias y artísticas aprobada por la Argentina mediante la Ley Nº 25.140.",
      "Estos términos y condiciones se regirán por las leyes de la República Argentina. El presente tiene carácter de acuerdo entre el USUARIO y el CENTRO. Al hacer uso de la APP el USUARIO está manifestando conocer nuestra Política de Privacidad y Términos y Condiciones de Uso de la misma. Las partes acuerdan que cualquier incidente derivado de estos términos será dirimido en la Justicia Nacional en lo Comercial de la Ciudad Autónoma de Buenos Aires.",
    ],
  },
];
