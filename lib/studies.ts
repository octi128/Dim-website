export type StudyAction = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

export type Study = {
  slug: string;
  title: string;
  icon: string;
  description?: string;
  listLabel?: string;
  items?: string[];
  note?: string;
  actions: StudyAction[];
  keywords?: string;
};

const PORTAL = "https://portal.dim.com.ar/";
const SIN_TURNO = "/atencion-sin-turno-previo";

export const STUDIES: Study[] = [
  {
    slug: "pet-ct-digital",
    title: "PET - CT Digital",
    icon: "atom",
    description:
      "Combina dos estudios en uno: tomografía computarizada (CT) y tomografía por emisión de positrones (PET), ofreciendo imágenes detalladas del funcionamiento celular.",
    note: "Para más información hacé click acá o enviá la orden médica al correo exclusivo del sector: pet@dim.com.ar.",
    actions: [
      { label: "Más información", href: "/dim-pet", variant: "primary" },
      { label: "pet@dim.com.ar", href: "mailto:pet@dim.com.ar", variant: "ghost" },
    ],
  },
  {
    slug: "densitometria-osea",
    title: "Densitometría Ósea (DMO)",
    icon: "bone",
    listLabel: "Tipos de densitometrías que realizamos en nuestros centros:",
    items: ["De columna", "Corporal total", "De cuello femoral", "Con TBS o Score Ósea Trabecular"],
    note: "Solicitá el turno, subí la orden y te enviaremos la preparación por correo.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "ecodoppler",
    title: "Ecodoppler",
    icon: "heart-pulse",
    listLabel: "Principales tipos de Doppler que realizamos en nuestros centros:",
    items: [
      "Ecodoppler Cardíaco",
      "Ecodoppler Abdominal",
      "Ecodoppler Abdominal Neonatal o Pediátrico",
      "Ecodoppler Aortoiliaco",
      "Ecodoppler Arteria Temporal",
      "Ecodoppler Arterial de Miembros Inferiores",
      "Ecodoppler Arterial de Miembros Superiores",
      "Ecodoppler Venoso de Ambos Miembros Inferiores",
      "Ecodoppler Venoso de Ambos Miembros Superiores",
      "Ecodoppler Cardíaco Transesofágico con Anestesia",
      "Ecodoppler Cerebral",
      "Ecodoppler Color Arterias Oftálmicas",
      "Ecodoppler Color Cardíaco 3D",
      "Ecodoppler Color Cardíaco con Strain Rate",
      "Ecodoppler Color Cardíaco Fetal",
      "Ecodoppler Testicular",
      "Ecodoppler Tiroideo",
      "Ecodoppler Obstétrico",
      "Ecodoppler Renal",
      "Ecodoppler Hepático",
    ],
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "ecografia",
    title: "Ecografía",
    icon: "scan-line",
    listLabel: "Principales tipos de ecografías que realizamos:",
    items: [
      "Ecografía Abdominal",
      "Ecografía Ginecológica",
      "Ecografía Obstétrica",
      "Ecografía Mamaria",
      "Ecografía Renal y Vesical",
      "Ecografía Tiroidea",
      "Ecografía Pelviana",
      "Ecografía Testicular",
      "Ecografía de Partes Blandas",
      "Ecografía Neonatal y Pediátrica",
      "Ecografía Transvaginal",
      "Ecografía Prostática",
    ],
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "eco-endoscopia",
    title: "Eco Endoscopía",
    icon: "microscope",
    description: "Para este estudio necesitás una consulta previa con el profesional.",
    note: 'Reservá desde la App DIM SALUD o el portal: Consultas Médicas → "Turno Previo Eco Endoscopía".',
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "electrocardiograma",
    title: "Electrocardiograma (ECG)",
    icon: "activity",
    description:
      "Se atiende sin turno previo en nuestros centros. Requieren consulta previa con cardiología los pacientes menores de 15 años y los mayores de 15 con órdenes que indiquen 'Riesgo quirúrgico', 'RQ' o 'Evaluación cardiológica'.",
    actions: [{ label: "Ver centros y horarios", href: SIN_TURNO, variant: "primary" }],
  },
  {
    slug: "ergometria",
    title: "Ergometría de 12 Derivaciones",
    icon: "footprints",
    description:
      "Estudio cardiológico que evalúa la respuesta del corazón al esfuerzo físico mediante registro electrocardiográfico de 12 derivaciones.",
    note: "Reservá desde la App DIM SALUD o el portal de turnos.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "espirometria",
    title: "Espirometría Computarizada",
    icon: "wind",
    description:
      "Evalúa la función pulmonar. Realizamos también Prueba de Difusión y Volumen Pulmonar.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "holter",
    title: "Holter",
    icon: "watch",
    description:
      "Registro continuo de la actividad eléctrica del corazón durante 24 horas o más para detectar arritmias y trastornos del ritmo.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "presurometria",
    title: "Presurometría (MAPA)",
    icon: "gauge",
    description:
      "Monitoreo ambulatorio de presión arterial de 24 horas (MAPA) que registra valores durante actividades habituales y descanso.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "medicina-nuclear",
    title: "Medicina Nuclear",
    icon: "radiation",
    description:
      "Estudios de diagnóstico y tratamiento que utilizan pequeñas cantidades de material radiactivo para evaluar el funcionamiento de órganos y tejidos.",
    note: "Coordinación de turnos por WhatsApp: 11-3692-9671.",
    actions: [
      { label: "Más información", href: "/medicina-nuclear", variant: "primary" },
      { label: "WhatsApp 11-3692-9671", href: "https://wa.me/541136929671", variant: "ghost" },
    ],
  },
  {
    slug: "pie-scan",
    title: "Pie Scan",
    icon: "footprints",
    description:
      "Estudio computarizado de la pisada que evalúa la distribución de presiones plantares para diagnóstico y prescripción de plantillas.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "polisomnografia",
    title: "Polisomnografía",
    icon: "moon",
    listLabel: "Modalidades disponibles:",
    items: ["Polisomnografía Nocturna", "Polisomnografía Pediátrica", "Polisomnografía con Oximetría"],
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "puncion-biopsia",
    title: "Punción Biopsia",
    icon: "syringe",
    listLabel: "Modalidades y cómo gestionarlas:",
    items: [
      "Tiroidea — turno directo desde el portal.",
      'Prostática — consulta previa: Estudios → "Turno Previo Punción Biopsia Próstata".',
      'Mamaria — consulta previa: Consultas Médicas → "Turno Previo Punción Mamaria".',
    ],
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "resonancia-magnetica",
    title: "Resonancia Magnética (RMN)",
    icon: "brain",
    description: "Realizamos estudios con y sin contraste, en equipos de alta resolución.",
    listLabel: "Principales estudios disponibles:",
    items: [
      "RMN de Cerebro",
      "RMN de Abdomen",
      "RMN de Columna Cervical / Dorsal / Lumbosacra",
      "RMN de Mamas",
      "RMN de Próstata",
      "RMN de Rodilla",
      "RMN de Pelvis",
      "RMN de Tórax",
      "Protocolos especiales: Difusión, Espectroscopia, Volumetría, Tractografía y Neuronavegación",
    ],
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "tomografia-multislice",
    title: "Tomografía Multislice (TC - CT)",
    icon: "scan",
    description: "Realizamos estudios con y sin contraste.",
    listLabel: "Principales estudios disponibles:",
    items: [
      "TC Abdómino Pelviana",
      "TC Cardíaca",
      "TC Coronaria (Score de Calcio)",
      "TC Corporal Total",
      "TC de Cerebro",
      "TC de Columna",
      "TC de Tórax",
      "Angiotomografía (variantes arteriales y venosas)",
      "Colonoscopía Virtual",
    ],
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "radiografia-digital",
    title: "Radiografía Digital",
    icon: "bone",
    listLabel: "Estudios sin turno previo:",
    items: [
      "Radiografía de Tórax",
      "Radiografía de Cadera",
      "Espinograma",
      "Columna lumbar, cervical, dorsal y otras regiones",
      "Escanograma o Medición de Miembros Inferiores",
    ],
    actions: [{ label: "Ver centros y horarios", href: SIN_TURNO, variant: "primary" }],
  },
  {
    slug: "radiografia-odontologica",
    title: "Radiografía Odontológica",
    icon: "smile",
    listLabel: "Estudios disponibles:",
    items: [
      "Panorámica",
      "Senos Maxilares",
      "Seriada de ATM",
      "Cefalometría de Ricketts",
      "Articulación Temporo Mandibular (ATM)",
    ],
    note: "Atención sin turno previo en DIM Rivadavia. Lunes a viernes 07:00 a 23:00 hs. Sábados y domingos 07:00 a 17:00 hs.",
    actions: [{ label: "Ver centros y horarios", href: SIN_TURNO, variant: "primary" }],
  },
  {
    slug: "capilaroscopia",
    title: "Capilaroscopia",
    icon: "microscope",
    description:
      "Estudio no invasivo de los capilares periungueales. Se realiza únicamente en Av. Rivadavia 2198, Once.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "test-aire-espirado",
    title: "Test de Aire Espirado",
    icon: "wind",
    description: "Para este estudio necesitás una consulta previa con el profesional.",
    note: 'Reservá desde el portal: Consultas Médicas → "Turno Previo Test de Aire Espirado".',
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "uroflujometria",
    title: "Uroflujometría",
    icon: "droplets",
    description:
      "Estudio funcional urológico que mide el flujo urinario para evaluar trastornos miccionales.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "videoendoscopia",
    title: "Videoendoscopía Digestiva Alta (VEDA)",
    icon: "video",
    description: "Para este estudio necesitás una consulta previa con el profesional.",
    note: 'Reservá desde el portal: Consultas Médicas → "Turno Previo VEDA Videoendoscopía".',
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "videocolonoscopia",
    title: "Videocolonoscopía (VCC)",
    icon: "video",
    description: "Para este estudio necesitás una consulta previa con el profesional.",
    note: 'Reservá desde el portal: Consultas Médicas → "Turno Previo VCC Videocolonoscopía".',
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "videonistagmografia",
    title: "Videonistagmografía",
    icon: "eye",
    description: "Realizamos este estudio con y sin test calórico.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "ecocardiograma",
    title: "Ecocardiograma",
    icon: "heart",
    description:
      "Estudio por ultrasonido del corazón que evalúa estructura, función ventricular y valvular.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "test-cardiopulmonar",
    title: "Test Cardiopulmonar",
    icon: "activity",
    description:
      "Evaluación integrada de la respuesta cardiovascular, respiratoria y metabólica al ejercicio.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "funcion-endotelial",
    title: "Función Endotelial",
    icon: "heart-pulse",
    description:
      "Estudio vascular no invasivo que evalúa la salud del endotelio como marcador temprano de riesgo cardiovascular.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "mamografia",
    title: "Mamografía",
    icon: "scan-search",
    description:
      "Estudio radiológico de las mamas para detección temprana y diagnóstico de patología mamaria.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "elastografia",
    title: "Elastografía",
    icon: "scan-line",
    description:
      "Técnica ecográfica que mide la rigidez de los tejidos para complementar el diagnóstico de lesiones.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "evaluacion-cognitiva",
    title: "Evaluación Cognitiva",
    icon: "brain",
    description:
      "Valoración neuropsicológica de memoria, atención, lenguaje y funciones ejecutivas.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "mapeo-cerebral",
    title: "Mapeo Cerebral",
    icon: "brain",
    description:
      "Análisis cuantitativo de la actividad eléctrica cerebral mediante EEG digital procesado.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "campimetria",
    title: "Campimetría",
    icon: "eye",
    description: "Estudio del campo visual aplicado al diagnóstico de glaucoma y patologías neuroftalmológicas.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "oct",
    title: "OCT (Tomografía de Coherencia Óptica)",
    icon: "eye",
    description:
      "Tomografía retiniana de alta resolución para evaluación de mácula, nervio óptico y polo posterior.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "paquimetria-topografia",
    title: "Paquimetría y Topografía Corneal",
    icon: "eye",
    description:
      "Medición del espesor corneal y mapeo de la curvatura para evaluación pre quirúrgica y seguimiento.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "test-marcha",
    title: "Test de Marcha",
    icon: "footprints",
    description:
      "Evaluación funcional cardiovascular y respiratoria mediante caminata estandarizada.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "manometria",
    title: "Manometría",
    icon: "gauge",
    description:
      "Estudio funcional del aparato digestivo (esofágica o anorrectal) para detectar trastornos motores.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "pap-colposcopia",
    title: "PAP — Colposcopía",
    icon: "stethoscope",
    description:
      "Estudios ginecológicos de tamizaje y diagnóstico cervicovaginal.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "fibroscan",
    title: "Fibroscan",
    icon: "scan-line",
    description: "Elastografía hepática transitoria para evaluación no invasiva de fibrosis y esteatosis.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "audiologia",
    title: "Audiometría, Logoaudiometría e Impedanciometría",
    icon: "ear",
    description:
      "Estudios audiológicos completos para diagnóstico de hipoacusias y patología del oído medio.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "electroencefalograma",
    title: "Electroencefalograma (EEG)",
    icon: "brain",
    listLabel: "Modalidades disponibles:",
    items: ["EEG de Sueño", "EEG con Activación Simple", "EEG con Activación Compleja"],
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "electromiograma",
    title: "Electromiograma",
    icon: "zap",
    listLabel: "Modalidades disponibles:",
    items: ["Miembros Inferiores", "Miembros Superiores", "Facial"],
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "rehabilitacion-piso-pelvico",
    title: "Rehabilitación de Piso Pélvico",
    icon: "heart-handshake",
    description:
      "Programa kinésico especializado para incontinencia, prolapso y disfunciones del piso pélvico.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "kinesiologia",
    title: "Kinesiología (FKT)",
    icon: "heart-handshake",
    description:
      "Tratamientos kinésicos individualizados para rehabilitación traumatológica, respiratoria y neurológica.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
  {
    slug: "litotricia",
    title: "Litotricia",
    icon: "zap",
    description:
      "Tratamiento no invasivo de litiasis renal y ureteral por ondas de choque extracorpóreas.",
    actions: [{ label: "Solicitar turno", href: PORTAL, variant: "primary" }],
  },
];
