export type Block = { p: string } | { list: string[] };

export type NewsItem = {
  id: number;
  date: string;
  title: string;
  body: Block[];
  cta?: { label: string; href: string; external?: boolean };
  appDownload?: boolean;
  featured?: boolean;
  image: string;
};

const RAW_NEWS: Omit<NewsItem, "image">[] = [
  // ────────── 2026 ──────────
  {
    id: 43,
    date: "Julio 2026",
    title: "Videoconsultas médicas: atención desde donde estés",
    featured: true,
    body: [
      { p: "Sabemos que tu tiempo es valioso. Por eso incorporamos las Videoconsultas médicas: ahora podés atenderte con nuestros profesionales de manera online, desde tu casa, el trabajo o donde estés." },
      { p: "Es ideal para consultas de seguimiento, interpretación de resultados, renovación de recetas y orientación clínica, sin necesidad de trasladarte." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Consultas médicas\", elegí la modalidad \"Videoconsulta\" y seleccioná la especialidad." },
    ],
    appDownload: true,
  },
  {
    id: 42,
    date: "Junio 2026",
    title: "Sumamos Resonancia de Alto Campo 3 Tesla",
    featured: true,
    body: [
      { p: "Incorporamos un resonador de Alto Campo 3 Tesla de última generación en DIM Alta Complejidad, Espora 18, Ramos Mejía." },
      { p: "Esta tecnología permite obtener imágenes de mayor definición en menor tiempo, mejorando la precisión diagnóstica en estudios neurológicos, musculoesqueléticos, oncológicos y cardiovasculares." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Estudios\", escribí \"Resonancia\", y no olvides adjuntar la foto de la orden médica para agilizar el proceso de recepción." },
    ],
    cta: { label: "Ver Resonancia Magnética", href: "/resonancia-magnetica" },
    appDownload: true,
  },
  {
    id: 41,
    date: "Mayo 2026",
    title: "Chequeo Cardiovascular Preventivo Anual",
    featured: true,
    body: [
      { p: "Cuidar tu corazón es una prioridad. Por eso lanzamos el Chequeo Cardiovascular Preventivo Anual, pensado para detectar a tiempo factores de riesgo y prevenir enfermedades cardíacas." },
      { p: "El chequeo incluye:" },
      { list: ["Consulta con médico cardiólogo.", "Electrocardiograma.", "Laboratorio con perfil lipídico.", "Control de presión arterial.", "Evaluación de riesgo cardiovascular."] },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Consultas médicas\", escribí \"Cardiología\"." },
    ],
    appDownload: true,
  },
  {
    id: 40,
    date: "Marzo 2026",
    title: "Campaña de Vacunación Antigripal 2026",
    body: [
      { p: "Comenzó la campaña de Vacunación Antigripal 2026. Vacunarte a tiempo es la mejor forma de protegerte a vos y a tu familia antes de la llegada del invierno." },
      { p: "Recomendada especialmente para personas mayores de 65 años, embarazadas, niños pequeños y personas con enfermedades crónicas." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Consultas médicas\", escribí \"Vacunación\"." },
    ],
    appDownload: true,
  },
  {
    id: 39,
    date: "Febrero 2026",
    title: "Dengue 2026: reforcemos la prevención",
    body: [
      { p: "Ante la circulación del dengue durante la temporada de verano, reforzamos las recomendaciones para prevenir el contagio y cuidar a tu familia." },
      { list: ["Eliminá los recipientes que acumulan agua.", "Mantené patios, jardines y canaletas limpios.", "Utilizá repelente, tabletas y espirales.", "Colocá mosquiteros en puertas y ventanas."] },
      { p: "Ante síntomas como fiebre alta, dolor de cabeza y dolores musculares, consultá con tu médico. No te automediques." },
    ],
  },
  {
    id: 38,
    date: "Enero 2026",
    title: "Nueva App DIM SALUD: resultados en tiempo real",
    featured: true,
    body: [
      { p: "Estrenamos una nueva versión de la App DIM SALUD, más rápida, intuitiva y segura." },
      { p: "Ahora podés acceder a tus resultados en tiempo real, gestionar turnos, compartir informes con tu médico y recibir recordatorios, todo desde un mismo lugar." },
      { p: "Actualizá la aplicación desde tu tienda de apps y descubrí todas las novedades." },
    ],
    appDownload: true,
  },

  // ────────── 2025 ──────────
  {
    id: 37,
    date: "Octubre 2025",
    title: "Test de aire espirado pediátrico",
    body: [
      { p: "¿Tu hijo presenta hinchazón o dolor abdominal frecuente?" },
      { p: "Con el test de aire espirado pediátrico, es posible detectar patologías digestivas como el sobrecrecimiento bacteriano intestinal (SIBO) de manera rápida, indolora y no invasiva." },
      { p: "Realizamos este estudio en DIM Morón, Av. Rivadavia 17.620." },
      { p: "¿Cómo solicitar tu turno? Desde la APP DIM Salud con el usuario y contraseña del paciente, en la solapa \"Estudios\", escribí \"sibo pediátrico\"." },
    ],
    appDownload: true,
  },
  {
    id: 36,
    date: "Octubre 2025",
    title: "Yogaterapia",
    body: [
      { p: "En DIM Kinesiología de Avanzada incorporamos Yogaterapia, una disciplina terapéutica que complementa los tratamientos médicos y de rehabilitación, ayuda a:" },
      { list: ["Alivia el dolor muscular y articular.", "Mejora la movilidad y la postura.", "Reduce el estrés y favorece la relajación."] },
      { p: "Las clases se realizan en grupos reducidos en Avellaneda 40, Ramos Mejía, con el acompañamiento de profesionales especializados." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Consulta médica\", escribí \"Yogaterapia 1 vez por semana\"." },
    ],
    appDownload: true,
  },
  {
    id: 35,
    date: "Octubre 2025",
    title: "Incorporamos Kinesiología por ATM",
    body: [
      { p: "La ATM (Articulación Temporomandibular), es un tratamiento especializado para quienes presentan dolor mandibular, chasquidos, dificultad al abrir la boca o bruxismo. Estas disfunciones pueden afectar no solo la mandíbula, sino también el cuello, la cabeza y la postura general." },
      { p: "A través de técnicas manuales, ejercicios específicos y pautas de autocuidado, este tratamiento busca aliviar el dolor, mejorar la movilidad y restablecer el equilibrio funcional del sistema mandibular y postural." },
      { p: "En DIM Kinesiología de Avanzada – Avellaneda 40, Ramos Mejía" },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Consulta médica\", escribí \"ATM\"." },
    ],
    appDownload: true,
  },
  {
    id: 34,
    date: "Agosto 2025",
    title: "Nuevo Centro: DIM Dermatología & Estética Médica",
    body: [
      { p: "Te invitamos a conocer DIM Dermatología & Estética Médica, ubicado en Belgrano 162, Ramos Mejía." },
      { p: "Un equipo interdisciplinario de especialistas —dermatólogos, cosmiatras, flebólogos, entre otros— te recibirá con la mejor atención, combinando profesionalismo, seguridad y confianza en cada tratamiento." },
      { p: "Nuestra propuesta está pensada para cuidar tu salud y realzar tu bienestar, con un enfoque personalizado en cada consulta." },
      { p: "¡Te esperamos!" },
    ],
    appDownload: true,
  },
  {
    id: 33,
    date: "Julio 2025",
    title: "Análisis sin ayuno prolongado",
    body: [
      { p: "Ahora podés realizar la mayoría de tus análisis de rutina con solo 2 horas de ayuno." },
      { p: "Esto significa que ya no necesitás esperar horas: podés acercarte al mediodía, después de un desayuno liviano o incluso entre reuniones. Tené en cuenta que algunos estudios específicos todavía requieren ayuno prolongado. En esos casos, te lo vamos a indicar al momento de sacar tu turno." },
      { p: "Más simple, más cómodo, mismo resultado confiable." },
    ],
    cta: { label: "Ver estudios y preparaciones", href: "/estudios-medicos-y-preparaciones" },
    appDownload: true,
  },
  {
    id: 32,
    date: "Junio 2025",
    title: "Todos tus informes, 100% digitales con DIM Verde",
    body: [
      { p: "En DIM nos comprometemos con el cuidado del medioambiente y la mejora continua de nuestros servicios. Desde el 1° de junio, dejamos de imprimir informes: ahora podés acceder a todos tus resultados de manera rápida, segura y confidencial a través de nuestros canales digitales." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en el menú lateral, seleccioná: \"Resultados\" > \"Mis informes\". Desde allí podés visualizar, descargar o compartir tus estudios en cualquier momento." },
      { p: "Un cambio simple, con un gran impacto: Evitamos la tala de árboles, ahorramos más de 324.000 litros de agua por cada tonelada de papel y operamos bajo un Sistema de Gestión Ambiental alineado con la norma ISO 14001, avanzando hacia una huella de carbono neutra." },
      { p: "Con DIM Verde, cuidamos tu salud y también el planeta." },
    ],
    appDownload: true,
  },
  {
    id: 31,
    date: "Mayo 2025",
    title: "Resonancia en un entorno tranquilo",
    body: [
      { p: "Sabemos que cada persona vive los estudios médicos de manera diferente. Por eso, creamos un espacio especialmente pensado para tu comodidad y tranquilidad." },
      { p: "En este horario especial, disponés de más tiempo, un entorno adaptado y la compañía de un equipo especializado que estará a tu lado en cada momento." },
      { p: "Además, podés realizar tu estudio acompañado por quien elijas, haciendo que la experiencia sea más amena y relajada." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Estudios\", escribí \"Asistida\", y no olvides adjuntar la foto de la orden médica para agilizar el proceso de recepción." },
      { p: "Resonancia Asistida: un estudio pensado para vos." },
    ],
    appDownload: true,
  },
  {
    id: 30,
    date: "Enero 2025",
    title: "Cuidá tu salud antes de viajar",
    body: [
      { p: "En DIM cuidamos tu salud para que disfrutes al máximo de tu destino." },
      { p: "Por ello, incorporamos el servicio de Medicina para Viajeros diseñado para prevenir enfermedades según el lugar al que viajas y brindarte recomendaciones clave adaptadas a tus necesidades." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Consulta médica\", escribí \"Infectología\"." },
    ],
    appDownload: true,
  },
  {
    id: 29,
    date: "Enero 2025",
    title: "¿Conocés la salud de tu hígado?",
    body: [
      { p: "El hígado graso puede causar lesiones graves si no se trata a tiempo. Es por ello, que en DIM Centros de Salud realizamos el estudio de elastografía por fibroscan que permite:" },
      { list: ["Detectar fibrosis: cicatrices en el hígado que pueden avanzar a cirrosis si no se tratan.", "Evaluar el estado del hígado en pacientes con hígado graso y otras complicaciones."] },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Estudios\", escribí \"Fibroscan\", y no olvides adjuntar la foto de la orden médica para agilizar el proceso de recepción." },
    ],
    appDownload: true,
  },
  {
    id: 28,
    date: "Enero 2025",
    title: "¿Cuidás tu salud mental?",
    body: [
      { p: "Nuestro compromiso es brindarte siempre la mejor atención de forma integral." },
      { p: "El Lic. Juan David Jurado, psicólogo de nuestros centros, nos recuerda la importancia de la salud mental y cómo cuidar nuestro bienestar emocional es esencial para una vida plena." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Consultas médicas\", escribí \"Psicología\"." },
    ],
    appDownload: true,
  },
  {
    id: 26,
    date: "Octubre 2024",
    title: "¿Tenés PAMI y necesitás un turno?",
    body: [
      { p: "Si necesitás solicitar turnos de manera presencial, desde el lunes 23/09 podés hacerlo en nuestra sede DIM Ramos Norte, en Ardoino 640, Ramos Mejía." },
      { p: "Horarios de atención: Lunes a viernes 8 a 18 hs. Sábados 8 a 13 hs." },
      { p: "¿Preferís hacerlo desde casa? Podés solicitar tus turnos o realizar tus consultas a través de nuestro WhatsApp oficial: 11-6648-5555" },
      { p: "Escribí y responde con la letra \"N) Tengo PAMI\" para que podamos ayudarte." },
    ],
    cta: { label: "Escribinos por WhatsApp", href: "https://wa.me/1166485555", external: true },
  },
  {
    id: 25,
    date: "Octubre 2024",
    title: "Nuevo Estudio: Test de aliento",
    body: [
      { p: "Comenzamos a realizar este estudio para la detección de Helicobacter Pylori." },
      { p: "Este método resulta no invasivo, rápido y preciso, lo que permite a los médicos conocer la presencia de la bacteria y evaluar la respuesta al tratamiento antibiótico con solo dos muestras de aliento en 30 minutos." },
      { p: "El equipo de DIM cuenta con la tecnología necesaria para realizar esta prueba, ideal para niños, mujeres embarazadas y ancianos, debido a su naturaleza no radioactiva y su sencilla operación." },
      { p: "La detección temprana de Helicobacter Pylori es fundamental, ya que esta bacteria se relaciona con gastritis crónica, úlceras gastroduodenales y ciertos tipos de cáncer gástrico." },
      { p: "¿Cómo solicitar turno? Desde la App DIM SALUD, en la solapa \"Estudios\", escribí \"TEST DE ALIENTO DE UREA 13C HELICOBACTER PYLORI\" en el buscador." },
    ],
  },
  {
    id: 24,
    date: "Septiembre 2024",
    title: "Comenzamos a realizar Antropometría",
    body: [
      { p: "Es una herramienta que se basa en mediciones específicas del cuerpo humano para obtener datos sobre la composición corporal y las proporciones físicas. Facilita la adaptación del entrenamiento a las necesidades individuales." },
      { p: "Recordá que debés concurrir con ropa deportiva y realizar 3 horas de ayuno (líquidos y sólidos)." },
      { p: "¿Cómo solicitar turno? Desde la App DIM SALUD, en la solapa \"Estudios\", escribí \"Antropometría\" en el buscador." },
    ],
  },
  {
    id: 23,
    date: "Septiembre 2024",
    title: "¿Hace cuánto no chequeas tu salud bucal?",
    body: [
      { p: "En DIM Odontología Premium incorporamos el Control Bucal Anual, el mismo se realiza a partir de los 15 años de edad." },
      { p: "¿Cómo solicitar turno? Desde la App DIM SALUD, en la solapa \"Consultas médicas\", escribí \"control de salud bucal\" en el buscador." },
    ],
  },
  {
    id: 22,
    date: "Septiembre 2024",
    title: "Nuevo servicio: Medición de Bioimpedancia",
    body: [
      { p: "Es una técnica no invasiva que evalúa la composición corporal y permite realizar un diagnóstico real y preciso del estado nutricional." },
      { p: "Evalúa:" },
      { list: ["Talla", "Peso", "Masa magra", "Grasa visceral", "Masa muscular", "Edad metabólica", "Requerimiento energético", "Índice de masa corporal (IMC)"] },
      { p: "¿Cómo solicitar turno? Desde la App DIM SALUD, en la solapa \"Estudios\", escribí \"Bioimpedancia\" en el buscador." },
    ],
  },
  {
    id: 21,
    date: "Septiembre 2024",
    title: "¡3 cuotas sin interés en todos tus estudios médicos!",
    body: [
      { p: "Ahora podés realizar tus estudios médicos abonando en 3 cuotas sin interés. Solo tenés que presentar la tarjeta física en cualquiera de nuestros centros." },
      { p: "Seguimos trabajando para ofrecerte el acceso a una atención médica de excelencia." },
      { p: "Este beneficio no aplica para laboratorio." },
    ],
  },
  {
    id: 20,
    date: "Agosto 2024",
    title: "Nueva especialidad: Cirugía pediátrica",
    body: [
      { p: "Cuidamos la salud infantil con la tecnología más avanzada y la atención que se merecen. Ahora contamos con la especialidad de Cirugía Pediátrica en la sede DIM Mujer. El Dr. Pablo Scher, nos informa que actualmente se emplean procedimientos mínimamente invasivos que permiten una rápida recuperación y mayor cicatrización. Estos son algunos de las cirugías más frecuentes:" },
      { list: ["Hernia", "Fimosis", "Hidrocele", "Nevos", "Patologías de piel", "Frenillos cortos", "Malformaciones torácicas", "Patologías ginecológicas", "Patologías oncológicas"] },
      { p: "¿Cómo solicitar turno? Desde la App DIM SALUD, en la solapa \"Consultas médicas\", escribí \"cirugía pediátrica\" en el buscador." },
    ],
  },
  {
    id: 19,
    date: "Julio 2024",
    title: "Descubrí el estado de tu salud auditiva",
    body: [
      { p: "Te informamos que en la sede DIM Rivadavia realizamos los siguientes estudios para cuidar tu salud auditiva:" },
      { list: ["Audiometría.", "Timpanometría.", "Logoaudiometría.", "Impedanciometría."] },
      { p: "¿Cómo solicitar turno? Desde la App DIM SALUD, en la solapa \"Estudios\", escribí \"Audiometría\" en el buscador." },
    ],
  },
  {
    id: 18,
    date: "Julio 2024",
    title: "¿Te vas de viaje de egresados?",
    body: [
      { p: "Completá con uno de nuestros profesionales la planilla médica solicitada por la empresa para realizar el viaje de egresados." },
      { p: "Hacé clic aquí y completá el formulario para coordinar un turno y realizar los estudios complementarios que necesites." },
    ],
    cta: { label: "Completar formulario", href: "https://forms.gle/seNJScg395Sb6XzY8", external: true },
  },
  {
    id: 17,
    date: "Julio 2024",
    title: "Otoemisiones Acústicas",
    body: [
      { p: "Te informamos que realizamos Otoemisiones acústicas en DIM Rivadavia, el estudio ambulatorio que permite evaluar la salud auditiva en recién nacidos." },
      { p: "Por lo general, tu profesional puede solicitarlo dentro de los primeros 3 meses de vida." },
      { p: "¿Cómo solicitar el turno? Desde la App DIM SALUD, en la solapa \"Estudios\", escribí \"Otoemisiones acústicas o OEA\"." },
    ],
  },
  {
    id: 16,
    date: "Junio 2024",
    title: "Resonancias Magnéticas con valores preferenciales",
    body: [
      { p: "¿Tenes que realizar una resonancia magnética de rodilla, columna o cerebro y no tenés cobertura médica?" },
      { p: "Contamos con un 30% de descuento en días y horarios específicos." },
      { p: "¡Hablemos por WhatsApp! Hacé clic aquí y elegí la opción: A) 🧲 Resonancia MN para que podamos enviarte más detalles." },
    ],
    cta: { label: "Escribinos por WhatsApp", href: "https://wa.me/91166485555", external: true },
  },
  {
    id: 15,
    date: "Junio 2024",
    title: "Nuevo servicio de Resonancia Magnética Asistida",
    body: [
      { p: "Para vos que vivís los estudios médicos de una manera diferente, diseñamos un espacio donde tu comodidad y tranquilidad son nuestra prioridad." },
      { p: "Ahora tenemos un nuevo horario distendido, con un entorno adaptado, personal especializado a tu lado, y toda la tranquilidad que necesitás." },
      { p: "Nuestras salas de resonancia magnética son amplias y confortables, con un ambiente relajado y pensado para que te sientas en confianza." },
      { p: "Junto a la persona que te acompañe, te brindaremos apoyo y así, juntos, hacer que este momento sea más ameno." },
      { p: "Para solicitar el turno en el horario exclusivo hacé clic aquí y completá el formulario." },
    ],
    cta: { label: "Completar formulario", href: "https://docs.google.com/forms/d/e/1FAIpQLSe5A9mJ2HIO8syWXbLJ4yDBd_jOP09fH-jtT_uZL4FUJ1F6yQ/viewform", external: true },
  },
  {
    id: 14,
    date: "Junio 2024",
    title: "Nuevo servicio: Apto físico en un día",
    body: [
      { p: "Hacé tu apto físico en el día para presentar en gimnasios, instituciones recreativas y más. En nuestra sede DIM Ramos Norte, ubicada en Ardoino 640, Ramos Mejía." },
      { p: "También te puede servir cuando:" },
      { list: ["Te inscribiste en la universidad.", "Realizás prácticas deportivas de alta competencia.", "Tenés antecedentes familiares de enfermedades.", "Comenzaste un nuevo empleo y necesitas presentar un informe de salud.", "Realizás tareas que requieren esfuerzo físico o exposición a condiciones especiales en tu trabajo. El mismo incluye: Ergometría, laboratorio, radiografía, consulta clínica, doppler cardíaco y electrocardiograma."] },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Consultas médicas\", escribí \"Aptitud físcica\"." },
      { p: "¡No pierdas la oportunidad de cuidar tu salud de manera rápida y eficiente!" },
    ],
  },
  {
    id: 13,
    date: "Mayo 2024",
    title: "Densitometría mineral Ósea: ¡Extendimos el horario en DIM Belgrano!",
    body: [
      { p: "Ahora podes realizar Densitometrías sin turno previo en los siguientes centros y horarios:" },
      { list: ["📍 DIM Mujer - Av. Rivadavia 14.282, Ramos Mejía. Lunes a viernes de 8 a 14hs, sábados de 8 a 17hs.", "📍 DIM Sede Central - Belgrano 136, Ramos Mejía. Lunes a viernes de 8 a 20hs. y sábados de 8 a 13hs.", "📍 DIM Alta Complejidad - Espora 18, Ramos Mejía. Lunes a viernes de 8 a 20hs. y sábados de 8 a 17hs."] },
    ],
  },
  {
    id: 12,
    date: "Mayo 2024",
    title: "Nueva especialidad: Medicina Tradicional China",
    body: [
      { p: "Nuestro compromiso es brindarte siempre la mejor atención de forma integral. Por eso, hemos incorporado la Medicina Tradicional China." },
      { p: "Es un sistema terapéutico milenario que promueve el bienestar y complementa el tratamiento de enfermedades, fomentando el equilibrio entre cuerpo, mente y espíritu." },
      { p: "Nos enorgullece contar con la Especialista en Terapias Complementarias Isabel Toshie Adachi, experta en una variedad de técnicas, incluyendo Reflexología, Digitopuntura, Tui Na, Moxibustión y Auriculoterapia, todas destinadas a mejorar tu salud y bienestar." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Consultas médicas\", escribí \"Medicina Tradicional China\"." },
    ],
  },
  {
    id: 11,
    date: "Mayo 2024",
    title: "Nuevo servicio: Reeducación postural global (RPG)",
    body: [
      { p: "Es una técnica de reeducación postural global que se basa en la elongación de las cadenas musculares." },
      { p: "Su efecto es duradero ya que se produce una memoria en los músculos, a través de la repetición de las posturas." },
      { p: "Se trabaja junto con la respiración, haciendo hincapié en la respiración, en la cual se decoaptan las articulaciones." },
      { p: "¿Cómo solicitar el turno?: Desde la App DIM SALUD, en la solapa \"Estudios\", escribí \"Reeducación postural global\"." },
    ],
  },
  {
    id: 10,
    date: "Junio 2023",
    title: "Osteopatía en Kinesiología de Avanzada",
    body: [
      { p: "La Osteopatía en el deporte cumple un rol cada vez más importante para el cuidado integral de la salud. Por eso, te informamos que incorporamos esta especialidad en nuestra sede de Avellaneda 40, Ramos Mejía, para brindarte tratamientos que se ajusten a tu necesidad." },
      { p: "Tu equipo médico puede solicitarte la atención con Osteopatía si necesitas:" },
      { list: ["Evitar posibles lesiones.", "Mejorar tu rendimiento atlético.", "Tratar lesiones producidas por la práctica, como tendinopatías o esguinces."] },
      { p: "Si sos adulto mayor, queres mejorar la movilidad y flexibilidad de tu cuerpo, fortalecer tu sistema inmunológico o reducir el estrés y la ansiedad, también podés solicitar turno para una o más sesiones de osteopatía." },
      { p: "¡Solicitá un turno 100% online ingresando desde el Portal de Turnos!" },
    ],
    cta: { label: "Portal de Turnos", href: "https://portal.dim.com.ar", external: true },
  },
  {
    id: 8,
    date: "Junio 2023",
    title: "Chequeo de salud sexual",
    body: [
      { p: "Comenzamos a realizar el chequeo de Infecciones de Transmisión Sexual (ITS), el mismo incluye la orden médica en el día, el análisis de laboratorio y la devolución personalizada con un médico especialista en infectología. Si el chequeo requiere autorización por parte de tu cobertura, completá el formulario para que podamos gestionar tu orden médica." },
      { p: "Podés realizarlo con o sin turno previo en:" },
      { list: ["📍 DIM Rivadavia: Av. Rivadavia 14.252, Ramos Mejía. De lunes a viernes de 8 a 18 hs.", "📍 DIM Belgrano: Belgrano 136, Ramos Mejía. De lunes a viernes de 8 a 18 hs.", "📍 DIM Alta Complejidad: Espora 18, Ramos Mejía. De lunes a viernes de 8 a 17:30 hs."] },
    ],
    cta: { label: "Completar formulario", href: "https://docs.google.com/forms/d/e/1FAIpQLSeSNH3RHuIT6LETZH3INX6Z8rY48DGGUpj5hhxrrmKN9evcag/viewform?usp=send_form", external: true },
  },
  {
    id: 7,
    date: "Mayo 2023",
    title: "Expo de Salud DIM",
    body: [
      { p: "En el mes de mayo llevamos adelante la expo de salud DIM con un enfoque en la prevención cardiovascular. Se brindaron diferentes charlas sobre:" },
      { list: ["Estrés", "Obesidad", "Tabaquismo", "Hipertensión Arterial"] },
      { p: "Además, contamos con 5 stands de salud donde los profesionales interactuaron con los pacientes y brindaron toda la información necesaria para incorporar hábitos que mejoren tu calidad de vida." },
      { p: "En el siguiente video podrás visualizar qué opinaron los profesionales y pacientes sobre la expo." },
    ],
    cta: { label: "Ver video", href: "https://youtu.be/hZS3c3pD7Tg", external: true },
  },
  {
    id: 6,
    date: "Abril 2023",
    title: "Nuevo estudio: Doppler Oftalmológico",
    body: [
      { p: "Comenzamos a realizar Eco Doppler Color Oftálmico, es un estudio no invasivo utilizado para evaluar la vascularización retro-ocular y para el diagnóstico y seguimiento de diferentes patologías oftalmológicas." },
      { p: "Tu profesional puede solicitarlo, si tenés:" },
      { list: ["Glaucoma.", "Oclusión carotídea.", "Retinopatía diabética.", "Neuropatía óptica isquémica.", "Fístula carotidea-cavernosa.", "Síndrome isquémico ocular crónico.", "Vascularización de tumores oculares.", "Oclusión de la arteria central de la retina.", "Preeclampsia: determinación de su estado."] },
      { p: "Solicitá tu turno 100% online desde nuestra nueva App DIM SALUD." },
    ],
    appDownload: true,
  },
  {
    id: 5,
    date: "Abril 2023",
    title: "Esteatosis hepática en DIM",
    body: [
      { p: "La enfermedad del hígado graso no alcohólico o esteatosis hepática es actualmente una de las principales causas de patología hepática crónica y puede progresar con inflamación, fibrosis hepática y cirrosis. Por ello, la detección, el control y el tratamiento temprano son fundamentales." },
      { p: "En DIM contamos con un Equipo de Esteatosis Hepática, constituído por médicos clínicos, hepatólogos, diabetólogos, especialistas en hipertensión arterial, dislipidemia y obesidad y nutricionistas, para realizar la prevención, diagnóstico precoz, seguimiento y tratamiento de pacientes con enfermedad grasa del hígado." },
      { p: "Solicitá tu turno 100% online desde nuestra nueva App DIM SALUD en la solapa \"consultas médicas\" debes buscas \"CONSULTA ESPECIALISTA ESTEATOSIS HEPÁTICA\"." },
    ],
    appDownload: true,
  },
  {
    id: 4,
    date: "Abril 2023",
    title: "Tratamiento de deglución atípica en adultos",
    body: [
      { p: "La deglución atípica consiste en la colocación inapropiada de la lengua al momento de ingerir los alimentos." },
      { p: "La lengua presiona contra los incisivos superiores o inferiores durante la deglución, lo cual hace que con el paso del tiempo los dientes se desplacen hacia adelante, y por ese motivo tu odontólogo u ortodoncista puede derivarte a comenzar el tratamiento." },
      { p: "Solicitá turno 100% online desde la App DIM SALUD." },
    ],
  },
  {
    id: 3,
    date: "Marzo 2023",
    title: "Dengue: Reforcemos los cuidados",
    body: [
      { p: "Dado el aumento de casos positivos de infección por dengue, detallamos algunas de las recomendaciones brindadas por la Dra. Verónica Bramajo y Dra. Mercedes López, coordinadoras de clínica médica, para prevenir esta enfermedad." },
      { list: ["Mantener los patios y jardines limpios.", "Utilizar repelentes, tabletas y espirales.", "Limpiar canaletas y desagües de lluvia de los techos.", "Rellenar los floreros y portamacetas con arena húmeda."] },
    ],
  },
  {
    id: 2,
    date: "Marzo 2023",
    title: "Renovamos el servicio de Pie Scan",
    body: [
      { p: "Tu salud y la de tu familia es nuestra prioridad. Por eso actualizamos el tiempo de entrega de las plantillas al plazo de una semana realizado el estudio." },
      { p: "Renovamos el packaging para que puedas retirar tus plantillas en una bolsa más cómoda y 100% ecológica." },
      { p: "Además ahora podés elegir el modelo que mejor se adapte a tus actividades:" },
      { list: ["Urban: diseñado para la vida diaria. Material flexible y suave para soportar actividades cotidianas de exigencia media.", "Training: modelo deportivo de mayor densidad. Diseñada para una mayor resistencia. Recomendado para realizar ejercicios de alto impacto y peso.", "Running: plataforma de menor densidad. Diseñada para más confort, mayor flexibilidad. Recomendada para correr y caminatas.", "Office: plantillas de bajo espesor y perfil, diseñada para zapatos, sandalias, mocasines, etc. Ayuda a estar largos períodos de pie evitando molestias.", "Kids: plantillas pediátricas, estilo Urban. Material flexible y suave, adaptable a todo tipo de calzados. Ideal para la escuela."] },
      { p: "Ampliamos la disponibilidad horaria en la sede de Belgrano 139, Ramos Mejía." },
      { p: "Solicitá tu turno 100% online desde la app DIM SALUD." },
    ],
  },
  {
    id: 1,
    date: "Marzo 2023",
    title: "Nuevo tratamiento de Kinesiología: MEP",
    body: [
      { p: "El Lic. Juan De Chiara, profesional de nuestros centros, nos cuenta que la microelectrólisis percutánea (MEP) es una técnica que consiste en la aplicación de una corriente galvánica por medio de una aguja de acupuntura." },
      { p: "Respecto a otros tratamientos, la técnica MEP se destaca por los siguientes beneficios:" },
      { list: ["Trabaja en el foco de la lesión.", "Tiene un efecto analgésico a corto o mediano plazo.", "Equilibra el ph de la piel en la zona lesionada y regenera el tejido."] },
      { p: "Tu profesional puede solicitarla para el tratamiento de patologías tendinosas y musculares agudas y crónicas como tendinitis, fascitis plantar, roturas musculares, esguince de rodilla o tobillo, síndrome de túnel carpiano." },
      { p: "Solicitá tu turno 100% online desde la App DIM SALUD." },
    ],
  },
];

// Foto de portada por novedad (categoría temática → /public/novedades/<cat>.jpg)
const COVER_BY_ID: Record<number, string> = {
  43: "digital",
  42: "resonancia",
  41: "cardiologia",
  40: "vacunacion",
  39: "prevencion",
  38: "digital",
  37: "pediatria",
  36: "terapia",
  35: "kinesiologia",
  34: "dermatologia",
  33: "laboratorio",
  32: "digital",
  31: "resonancia",
  30: "vacunacion",
  29: "laboratorio",
  28: "psicologia",
  26: "general",
  25: "laboratorio",
  24: "nutricion",
  23: "odontologia",
  22: "nutricion",
  21: "general",
  20: "pediatria",
  19: "audiologia",
  18: "cardiologia",
  17: "audiologia",
  16: "resonancia",
  15: "resonancia",
  14: "cardiologia",
  13: "general",
  12: "terapia",
  11: "kinesiologia",
  10: "kinesiologia",
  8: "laboratorio",
  7: "general",
  6: "oftalmologia",
  5: "laboratorio",
  4: "odontologia",
  3: "prevencion",
  2: "kinesiologia",
  1: "kinesiologia",
};

export const NEWS: NewsItem[] = RAW_NEWS.map((n) => ({
  ...n,
  image: `/novedades/${COVER_BY_ID[n.id] ?? "general"}.jpg`,
}));
