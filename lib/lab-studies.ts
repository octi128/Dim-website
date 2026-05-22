export const STUDIES_8H: string[] = [
  "Curva de glucosa",
  "Ácido fólico en glóbulos rojos",
  "Ácidos biliares (cholyglycine)",
  "Calcemia",
  "Calcio iónico",
  "Calcitonina plasmática",
  "Digoxina plasmática",
  "Cofactor de ristocetina — Von Willebrand funcional",
  "Factor de Von Willebrand antigénico",
  "Glucemia post prandial",
  "IGF BP3",
  "Leucocitos postprandial",
  "Levetiracetam",
  "Osteocalcina",
  "Parathormona (molécula intacta)",
  "Protrombina 20210",
  "Renina plasmática (reposo)",
  "Resistencia a la proteína C activada",
  "Somatomedina C (IGF-1)",
  "Somatotrofina (GH)",
  "Vigabatrina",
  "Catecolaminas plasmáticas",
  "Clozapina",
  "Hidroxiprogesterona",
  "Fósforo",
  "Homocisteína",
  "Insulina",
  "Renina plasmática (de pie)",
];

export const STUDIES_12H: string[] = [
  "Lipidograma electroforético",
  "Aspecto del suero",
  "Fosfolípidos",
  "Gastrina plasmática",
  "Vitamina B1",
  "Vitamina C",
  "Vitamina E",
];

export type LabCategory = {
  slug: string;
  title: string;
  icon: string;
  description: string;
  fastingHours?: number;
  items?: string[];
  note?: string;
  scheduleHref?: string;
};

export const LAB_CATEGORIES: LabCategory[] = [
  {
    slug: "ayuno-2h",
    title: "Ayuno mínimo de 2 horas",
    icon: "coffee",
    fastingHours: 2,
    description:
      "La gran mayoría de los análisis de rutina en DIM se realizan con sólo 2 horas de ayuno. Podés desayunar liviano y venir más tarde, o programar tu turno al mediodía sin saltearte comidas.",
    note: "Tomá agua con normalidad antes de la extracción salvo indicación contraria de tu médico.",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "ayuno-8h",
    title: "Ayuno de 8 horas",
    icon: "clock",
    fastingHours: 8,
    description:
      "Algunos análisis hormonales, metabólicos y de coagulación requieren 8 horas de ayuno. Programá tu extracción a primera hora de la mañana.",
    items: STUDIES_8H,
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "ayuno-12h",
    title: "Ayuno de 12 horas",
    icon: "moon",
    fastingHours: 12,
    description:
      "Estudios específicos del perfil lipídico extendido y dosajes vitamínicos requieren 12 horas de ayuno estricto.",
    items: STUDIES_12H,
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "orina",
    title: "Estudios de orina",
    icon: "droplets",
    description:
      "Para análisis de orina simple traé la primera muestra de la mañana en un recipiente estéril. Para orina de 24 horas el laboratorio te entrega el bidón y las instrucciones cuando solicitás el turno.",
    note: "Mujeres: evitá realizar el estudio durante el período menstrual.",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "coproparasitologico",
    title: "Coproparasitológico y materia fecal",
    icon: "test-tube",
    description:
      "El estudio seriado requiere muestras de 3 días distintos. Retirá el frasco con conservante en cualquier centro DIM antes de comenzar la recolección.",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "microbiologia",
    title: "Cultivos y microbiología",
    icon: "microscope",
    description:
      "Urocultivo, hemocultivo, cultivo de fauces, exudados y antibiogramas. Cada cultivo tiene una preparación específica que se entrega al solicitar el turno.",
    note: "Para urocultivo: higiene previa con agua y jabón y recolección del chorro medio en recipiente estéril.",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "embarazo",
    title: "Subunidad β-HCG (test de embarazo)",
    icon: "heart",
    description:
      "El dosaje cuantitativo de subunidad beta de HCG en sangre no requiere ayuno y permite confirmar el embarazo con mayor sensibilidad que un test de orina.",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "pediatricos",
    title: "Estudios pediátricos",
    icon: "baby",
    description:
      "Contamos con sector pediátrico con extraccionistas especializados. Para lactantes y niños pequeños las extracciones se coordinan con horarios protegidos para minimizar la espera.",
    note: "Traé el carnet de vacunación y la orden médica. Si el niño debe estar en ayunas, ofrecele agua hasta el momento de la extracción.",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "prequirurgico",
    title: "Análisis prequirúrgicos",
    icon: "clipboard",
    description:
      "Paneles completos pre operatorios que incluyen hemograma, coagulación, función renal, hepatograma, glucemia y serologías según la cirugía. Coordinamos turnos express para entregar los resultados en 24-48 hs hábiles.",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "antidoping",
    title: "Antidoping ocupacional",
    icon: "shield-check",
    description:
      "Análisis de drogas de abuso en orina para empresas y particulares, con cadena de custodia. Se requiere DNI y orden de la empresa solicitante.",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "hormonas",
    title: "Estudios hormonales",
    icon: "activity",
    description:
      "Perfil tiroideo (TSH, T3, T4), hormonas sexuales, cortisol, prolactina, testosterona, FSH y LH. La mayoría requieren extracción matutina; algunos exigen 8 horas de ayuno (consultar listado).",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
  {
    slug: "alergia-inmunologia",
    title: "Alergia e inmunología",
    icon: "shield-check",
    description:
      "Panel de IgE específicas, ANA, FR, complemento, ANCA y autoinmunidad. La toma de muestra es estándar y los plazos de entrega varían según el panel.",
    scheduleHref: "https://portal.dim.com.ar/auth/login",
  },
];
