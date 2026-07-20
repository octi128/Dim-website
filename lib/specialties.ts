export interface Specialty {
  name: string;
  /** Nombre alternativo con el que se busca el turno en el portal / App DIM SALUD. */
  alias?: string;
}

/**
 * Especialidades médicas de DIM.
 * Fuente: https://dim.com.ar/especialidades-medicas/index.html
 */
export const SPECIALTIES: Specialty[] = [
  { name: "Clínica médica" },
  { name: "Alergia" },
  { name: "Medicina Genética", alias: "Genética Médica" },
  { name: "Andrología e Infertilidad", alias: "Andrología" },
  { name: "Cardiología" },
  { name: "Insuficiencia cardíaca" },
  { name: "Cefalea" },
  { name: "Cirugía General" },
  { name: "Cirugía Cabeza y Cuello" },
  { name: "Cirugía Vascular" },
  { name: "Cirugía Plástica" },
  { name: "Ginecología" },
  { name: "Proctología" },
  { name: "Cosmiatría" },
  { name: "Deportología" },
  { name: "Dermatología" },
  { name: "Diabetología" },
  { name: "Electrofisiología" },
  { name: "Endocrinología" },
  { name: "Flebología" },
  { name: "Oncología" },
  { name: "Esteatosis Hepática" },
  { name: "Gastroenterología", alias: "Gastroentelogía" },
  { name: "Síndrome metabólico - Obesidad", alias: "Obesidad" },
  { name: "Neurología" },
  { name: "Memoria" },
  { name: "Hematología" },
  { name: "Hepatología" },
  { name: "Hígado Graso" },
  { name: "Hipertensión Arterial" },
  { name: "Neurocirugía" },
  { name: "Mastología" },
  { name: "Medicina del Sueño" },
  { name: "Nefrología" },
  { name: "Psicología" },
  { name: "Neumonología" },
  { name: "Oftalmología" },
  { name: "Medicina Familiar" },
  { name: "Reumatología" },
  { name: "Osteoporosis" },
  { name: "Nutrición" },
  { name: "Podología" },
  { name: "Obstetricia" },
  { name: "Obstetricia de Alto Riesgo" },
  { name: "Pediatría" },
  { name: "Urología" },
  { name: "Otorrinolaringología" },
  { name: "Infectología" },
  { name: "Gerontología" },
  { name: "Cirugía torácica" },
  { name: "Páncreas - Vías Biliares" },
  { name: "Cirugía de tobillo y pie" },
  { name: "Cirugía oftalmológica" },
  { name: "Traumatología de cadera" },
  { name: "Traumatología de hombro" },
  { name: "Traumatología de rodilla" },
  { name: "Traumatología de columna" },
  { name: "Tratamiento del dolor" },
  { name: "Traumatología miembros superiores" },
  { name: "Traumatología miembros inferiores" },
  { name: "Cirugía maxilofacial" },
  { name: "Cirugía plástica genital" },
  { name: "Control de marcapasos", alias: "Marcapasos" },
  { name: "Nutrición alimentación vegetariana y vegana" },
  { name: "Nutrición especialista en embarazo" },
  { name: "Nutrición y diabetes" },
  { name: "Sexología" },
  { name: "Sobrepeso y obesidad" },
];

/** Normaliza texto para búsquedas: minúsculas y sin acentos. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
