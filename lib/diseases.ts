export interface Disease {
  name: string;
  slug: string;
  letter: string;
}

export const AVAILABLE_LETTERS = [
  "A","B","C","D","E","F","G","H","I","J","L",
  "M","N","O","P","Q","R","S","T","U","V","Z",
] as const;

export type AvailableLetter = typeof AVAILABLE_LETTERS[number];

const DISEASES: Disease[] = [
  // A
  { name: "Acné", slug: "acne", letter: "A" },
  { name: "Alergia alimentaria", slug: "alergia-alimentaria", letter: "A" },
  { name: "Alergia al látex", slug: "alergia-al-latex", letter: "A" },
  { name: "Alergia al polen", slug: "alergia-al-polen", letter: "A" },
  { name: "Alopecia", slug: "alopecia", letter: "A" },
  { name: "Alzheimer (enfermedad de)", slug: "alzheimer", letter: "A" },
  { name: "Anemia", slug: "anemia", letter: "A" },
  { name: "Anemia aplásica", slug: "anemia-aplasica", letter: "A" },
  { name: "Angina de pecho", slug: "angina-de-pecho", letter: "A" },
  { name: "Anorexia nerviosa", slug: "anorexia-nerviosa", letter: "A" },
  { name: "Ansiedad", slug: "ansiedad", letter: "A" },
  { name: "Apnea del sueño", slug: "apnea-del-sueno", letter: "A" },
  { name: "Apendicitis", slug: "apendicitis", letter: "A" },
  { name: "Arritmia cardíaca", slug: "arritmia-cardiaca", letter: "A" },
  { name: "Artritis", slug: "artritis", letter: "A" },
  { name: "Artritis reumatoide", slug: "artritis-reumatoide", letter: "A" },
  { name: "Asma", slug: "asma", letter: "A" },
  { name: "Aterosclerosis", slug: "aterosclerosis", letter: "A" },
  { name: "Autismo", slug: "autismo", letter: "A" },
  // B
  { name: "Bocio", slug: "bocio", letter: "B" },
  { name: "Bronquitis", slug: "bronquitis", letter: "B" },
  { name: "Bronquitis crónica", slug: "bronquitis-cronica", letter: "B" },
  { name: "Bulimia nerviosa", slug: "bulimia-nerviosa", letter: "B" },
  { name: "Bursitis", slug: "bursitis", letter: "B" },
  // C
  { name: "Cálculos biliares", slug: "calculos-biliares", letter: "C" },
  { name: "Cálculos renales", slug: "calculos-renales", letter: "C" },
  { name: "Cáncer colorrectal", slug: "cancer-colorrectal", letter: "C" },
  { name: "Cáncer de cuello uterino", slug: "cancer-cuello-uterino", letter: "C" },
  { name: "Cáncer de mama", slug: "cancer-de-mama", letter: "C" },
  { name: "Cáncer de piel", slug: "cancer-de-piel", letter: "C" },
  { name: "Cáncer de próstata", slug: "cancer-de-prostata", letter: "C" },
  { name: "Cáncer de pulmón", slug: "cancer-de-pulmon", letter: "C" },
  { name: "Cáncer de tiroides", slug: "cancer-de-tiroides", letter: "C" },
  { name: "Cataratas", slug: "cataratas", letter: "C" },
  { name: "Celiaquía", slug: "celiaquia", letter: "C" },
  { name: "Cirrosis hepática", slug: "cirrosis-hepatica", letter: "C" },
  { name: "Cistitis", slug: "cistitis", letter: "C" },
  { name: "Colesterol alto", slug: "colesterol-alto", letter: "C" },
  { name: "Conjuntivitis", slug: "conjuntivitis", letter: "C" },
  { name: "Crohn (enfermedad de)", slug: "enfermedad-de-crohn", letter: "C" },
  // D
  { name: "Demencia", slug: "demencia", letter: "D" },
  { name: "Depresión", slug: "depresion", letter: "D" },
  { name: "Dermatitis atópica", slug: "dermatitis-atopica", letter: "D" },
  { name: "Dermatitis de contacto", slug: "dermatitis-de-contacto", letter: "D" },
  { name: "Diabetes gestacional", slug: "diabetes-gestacional", letter: "D" },
  { name: "Diabetes tipo 1", slug: "diabetes-tipo-1", letter: "D" },
  { name: "Diabetes tipo 2", slug: "diabetes-tipo-2", letter: "D" },
  { name: "Discopatía lumbar", slug: "discopatia-lumbar", letter: "D" },
  { name: "Dislipemia", slug: "dislipemia", letter: "D" },
  { name: "Dolor crónico de espalda", slug: "dolor-cronico-espalda", letter: "D" },
  // E
  { name: "Eccema", slug: "eccema", letter: "E" },
  { name: "Embolia pulmonar", slug: "embolia-pulmonar", letter: "E" },
  { name: "Endometriosis", slug: "endometriosis", letter: "E" },
  { name: "Epilepsia", slug: "epilepsia", letter: "E" },
  { name: "Esclerosis lateral amiotrófica (ELA)", slug: "ela", letter: "E" },
  { name: "Esclerosis múltiple", slug: "esclerosis-multiple", letter: "E" },
  { name: "Espondilitis anquilosante", slug: "espondilitis-anquilosante", letter: "E" },
  { name: "Estreñimiento crónico", slug: "estrenimiento-cronico", letter: "E" },
  // F
  { name: "Fibromialgia", slug: "fibromialgia", letter: "F" },
  { name: "Fibrosis pulmonar", slug: "fibrosis-pulmonar", letter: "F" },
  { name: "Fibrosis quística", slug: "fibrosis-quistica", letter: "F" },
  { name: "Flebitis", slug: "flebitis", letter: "F" },
  // G
  { name: "Gastritis", slug: "gastritis", letter: "G" },
  { name: "Gastroenteritis", slug: "gastroenteritis", letter: "G" },
  { name: "Glaucoma", slug: "glaucoma", letter: "G" },
  { name: "Gonorrea", slug: "gonorrea", letter: "G" },
  { name: "Gota", slug: "gota", letter: "G" },
  // H
  { name: "Hemorroides", slug: "hemorroides", letter: "H" },
  { name: "Hepatitis A", slug: "hepatitis-a", letter: "H" },
  { name: "Hepatitis B", slug: "hepatitis-b", letter: "H" },
  { name: "Hepatitis C", slug: "hepatitis-c", letter: "H" },
  { name: "Hernia de disco", slug: "hernia-de-disco", letter: "H" },
  { name: "Hernia hiatal", slug: "hernia-hiatal", letter: "H" },
  { name: "Hernia inguinal", slug: "hernia-inguinal", letter: "H" },
  { name: "Herpes genital", slug: "herpes-genital", letter: "H" },
  { name: "Herpes labial", slug: "herpes-labial", letter: "H" },
  { name: "Hipertensión arterial", slug: "hipertension-arterial", letter: "H" },
  { name: "Hipertiroidismo", slug: "hipertiroidismo", letter: "H" },
  { name: "Hipotiroidismo", slug: "hipotiroidismo", letter: "H" },
  // I
  { name: "Infarto agudo de miocardio", slug: "infarto-de-miocardio", letter: "I" },
  { name: "Infección urinaria", slug: "infeccion-urinaria", letter: "I" },
  { name: "Insomnio", slug: "insomnio", letter: "I" },
  { name: "Insuficiencia cardíaca", slug: "insuficiencia-cardiaca", letter: "I" },
  { name: "Insuficiencia renal crónica", slug: "insuficiencia-renal", letter: "I" },
  { name: "Intolerancia a la lactosa", slug: "intolerancia-lactosa", letter: "I" },
  // J
  { name: "Jaqueca", slug: "jaqueca", letter: "J" },
  // L
  { name: "Leucemia", slug: "leucemia", letter: "L" },
  { name: "Linfoma de Hodgkin", slug: "linfoma-hodgkin", letter: "L" },
  { name: "Linfoma no Hodgkin", slug: "linfoma-no-hodgkin", letter: "L" },
  { name: "Lumbalgia", slug: "lumbalgia", letter: "L" },
  { name: "Lupus eritematoso sistémico", slug: "lupus", letter: "L" },
  // M
  { name: "Melanoma", slug: "melanoma", letter: "M" },
  { name: "Meningitis", slug: "meningitis", letter: "M" },
  { name: "Mieloma múltiple", slug: "mieloma-multiple", letter: "M" },
  { name: "Migraña", slug: "migrana", letter: "M" },
  { name: "Mioma uterino", slug: "mioma-uterino", letter: "M" },
  { name: "Miopía", slug: "miopia", letter: "M" },
  { name: "Mononucleosis infecciosa", slug: "mononucleosis", letter: "M" },
  // N
  { name: "Neumonía", slug: "neumonia", letter: "N" },
  { name: "Neuropatía diabética", slug: "neuropatia-diabetica", letter: "N" },
  { name: "Nódulos tiroideos", slug: "nodulos-tiroideos", letter: "N" },
  // O
  { name: "Obesidad", slug: "obesidad", letter: "O" },
  { name: "Osteoartritis", slug: "osteoartritis", letter: "O" },
  { name: "Osteoporosis", slug: "osteoporosis", letter: "O" },
  { name: "Otitis media", slug: "otitis-media", letter: "O" },
  { name: "Ovario poliquístico (síndrome de)", slug: "sindrome-ovario-poliquistico", letter: "O" },
  // P
  { name: "Pancreatitis aguda", slug: "pancreatitis-aguda", letter: "P" },
  { name: "Pancreatitis crónica", slug: "pancreatitis-cronica", letter: "P" },
  { name: "Parkinson (enfermedad de)", slug: "parkinson", letter: "P" },
  { name: "Prostatitis", slug: "prostatitis", letter: "P" },
  { name: "Psoriasis", slug: "psoriasis", letter: "P" },
  // Q
  { name: "Quiste ovárico", slug: "quiste-ovarico", letter: "Q" },
  { name: "Quiste sebáceo", slug: "quiste-sebaceo", letter: "Q" },
  // R
  { name: "Reflujo gastroesofágico", slug: "reflujo-gastroesofagico", letter: "R" },
  { name: "Rinitis alérgica", slug: "rinitis-alergica", letter: "R" },
  { name: "Rosácea", slug: "rosacea", letter: "R" },
  // S
  { name: "Sarampión", slug: "sarampion", letter: "S" },
  { name: "Sinusitis", slug: "sinusitis", letter: "S" },
  { name: "Síndrome de colon irritable", slug: "sindrome-colon-irritable", letter: "S" },
  { name: "Síndrome metabólico", slug: "sindrome-metabolico", letter: "S" },
  { name: "Síndrome de ovario poliquístico", slug: "sindrome-ovario-poliquistico-s", letter: "S" },
  // T
  { name: "Tendinitis", slug: "tendinitis", letter: "T" },
  { name: "Tiroiditis de Hashimoto", slug: "tiroiditis-hashimoto", letter: "T" },
  { name: "Toxoplasmosis", slug: "toxoplasmosis", letter: "T" },
  { name: "Trombosis venosa profunda", slug: "trombosis-venosa", letter: "T" },
  // U
  { name: "Úlcera péptica", slug: "ulcera-peptica", letter: "U" },
  { name: "Uretritis", slug: "uretritis", letter: "U" },
  { name: "Urticaria", slug: "urticaria", letter: "U" },
  // V
  { name: "Varices", slug: "varices", letter: "V" },
  { name: "Vértigo", slug: "vertigo", letter: "V" },
  { name: "VIH / SIDA", slug: "vih-sida", letter: "V" },
  { name: "Vitíligo", slug: "vitiligo", letter: "V" },
  // Z
  { name: "Zóster (herpes)", slug: "zoster-herpes", letter: "Z" },
];

function normalizeStr(str: string): string {
  return str.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function getGroupKey(name: string): string {
  const norm = normalizeStr(name);
  return norm.charAt(0).toUpperCase() + (norm.charAt(1) || "");
}

export function getDiseasesByLetter(letter: string): Disease[] {
  return DISEASES
    .filter(d => d.letter.toUpperCase() === letter.toUpperCase())
    .sort((a, b) => normalizeStr(a.name).localeCompare(normalizeStr(b.name)));
}

export function getDiseaseGroups(letter: string): { key: string; diseases: Disease[] }[] {
  const diseases = getDiseasesByLetter(letter);
  const groupMap = new Map<string, Disease[]>();

  for (const disease of diseases) {
    const key = getGroupKey(disease.name);
    if (!groupMap.has(key)) groupMap.set(key, []);
    groupMap.get(key)!.push(disease);
  }

  return Array.from(groupMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, diseases]) => ({ key, diseases }));
}

export function searchDiseases(query: string): Disease[] {
  const q = normalizeStr(query);
  if (!q) return [];
  return DISEASES
    .filter(d => normalizeStr(d.name).includes(q))
    .sort((a, b) => normalizeStr(a.name).localeCompare(normalizeStr(b.name)));
}
