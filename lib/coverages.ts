export type CoverageTag = "Prepaga" | "Obra Social" | "ART" | "Mutual" | "Hospital" | "Programa";

export interface Coverage {
  name: string;
  validity: 30 | 60 | 90;
  tag: CoverageTag;
}

export const COVERAGES: Coverage[] = [
  // A
  { name: "Acción Médica Urbana Rural S.A", validity: 30, tag: "Programa" },
  { name: "ACCORD", validity: 60, tag: "Prepaga" },
  { name: "AMCI", validity: 30, tag: "Mutual" },
  { name: "AMFFA", validity: 60, tag: "Mutual" },
  { name: "Amsterdam Salud S.A", validity: 30, tag: "Prepaga" },
  { name: "APM", validity: 60, tag: "Mutual" },
  { name: "Apsot", validity: 30, tag: "Mutual" },
  { name: "Asistencia Sanitaria Integral", validity: 90, tag: "Prepaga" },
  { name: "Asmepriv", validity: 30, tag: "Prepaga" },
  { name: "Asociación Argentina Mutual del Motociclista", validity: 30, tag: "Mutual" },
  { name: "Asociación de Trabajadores de la Sanidad Argentina (ATSA)", validity: 30, tag: "Obra Social" },
  { name: "Asociación Eclesiástica San Pedro", validity: 30, tag: "Obra Social" },
  { name: "Asociación Mutual Personal Jerárquicos Bancos Oficiales Nacionales", validity: 30, tag: "Mutual" },
  { name: "Asociart ART", validity: 30, tag: "ART" },
  { name: "AVALIAN", validity: 60, tag: "Prepaga" },
  // B
  { name: "Banco Medicine", validity: 60, tag: "Prepaga" },
  { name: "Banco Provincia", validity: 30, tag: "Obra Social" },
  // C
  { name: "Caja de Seguridad Social para Escribanos de la Pcia. de Bs. As.", validity: 30, tag: "Obra Social" },
  { name: "Caja Notarial de Colegios de Escribanos de la Ciudad de Bs. As.", validity: 30, tag: "Obra Social" },
  { name: "CASA (Caja de Abogados de la Prov. de Bs. As.)", validity: 30, tag: "Obra Social" },
  { name: "CEMIC", validity: 60, tag: "Hospital" },
  { name: "CEMKO", validity: 60, tag: "Prepaga" },
  { name: "CMP (Centro Médico Pueyrredón)", validity: 30, tag: "Prepaga" },
  { name: "COBER", validity: 30, tag: "Prepaga" },
  { name: "COMEI", validity: 60, tag: "Obra Social" },
  { name: "Corporación Médica Asistencial", validity: 30, tag: "Prepaga" },
  // D
  { name: "Dasuten", validity: 30, tag: "Mutual" },
  { name: "Dirección de Servicios Sociales UNLP", validity: 30, tag: "Obra Social" },
  { name: "Doctored", validity: 30, tag: "Prepaga" },
  // E
  { name: "Endocter", validity: 30, tag: "Prepaga" },
  { name: "Ensalud", validity: 30, tag: "Prepaga" },
  // G
  { name: "Galeno", validity: 60, tag: "Prepaga" },
  { name: "Galeno ART", validity: 30, tag: "ART" },
  // H
  { name: "Hospital Alemán", validity: 60, tag: "Hospital" },
  { name: "Hospital Británico", validity: 30, tag: "Hospital" },
  // I
  { name: "Ibero Asistencia S.A", validity: 30, tag: "Prepaga" },
  { name: "IOMA", validity: 30, tag: "Obra Social" },
  // L
  { name: "Luis Pasteur", validity: 60, tag: "Prepaga" },
  // M
  { name: "Magna Salud", validity: 30, tag: "Prepaga" },
  { name: "Medical Work", validity: 30, tag: "Prepaga" },
  { name: "Medical's", validity: 30, tag: "Prepaga" },
  { name: "Medicenter", validity: 30, tag: "Prepaga" },
  { name: "Medicus", validity: 60, tag: "Prepaga" },
  { name: "Medicus Ford", validity: 60, tag: "Prepaga" },
  { name: "Medife", validity: 60, tag: "Prepaga" },
  { name: "Medin", validity: 30, tag: "Prepaga" },
  { name: "Mita", validity: 60, tag: "Prepaga" },
  // O
  { name: "Obra Social Cámara de Empresarios de Agencias de Remises", validity: 30, tag: "Obra Social" },
  { name: "Obra Social de Actores", validity: 30, tag: "Obra Social" },
  { name: "Obra Social de Empleados Textiles y Afines", validity: 30, tag: "Obra Social" },
  { name: "Obra Social del Personal de Farmacia", validity: 30, tag: "Obra Social" },
  { name: "Obra Social del Poder Judicial", validity: 30, tag: "Obra Social" },
  { name: "Obra Social del Servicio Penitenciario Federal", validity: 30, tag: "Obra Social" },
  { name: "Obra Social Personal Gráfico", validity: 30, tag: "Obra Social" },
  { name: "Obra Social Personal Ladrillero", validity: 30, tag: "Obra Social" },
  { name: "Obra Social Personal Papeleros", validity: 30, tag: "Obra Social" },
  { name: "Obra Social Personal Televisión", validity: 30, tag: "Obra Social" },
  { name: "Obra Social Trabajadores Prensa de Bs. As.", validity: 30, tag: "Obra Social" },
  { name: "Obra Social Trabajadores Viales", validity: 30, tag: "Obra Social" },
  { name: "Obra Social Trabajadores Viales y Afines", validity: 30, tag: "Obra Social" },
  { name: "OMINT", validity: 60, tag: "Prepaga" },
  { name: "OMINT ART", validity: 30, tag: "ART" },
  { name: "OPDEA", validity: 30, tag: "Obra Social" },
  { name: "OSALARA", validity: 30, tag: "Obra Social" },
  { name: "OSCRAIA", validity: 30, tag: "Obra Social" },
  { name: "OSDE BINARIO", validity: 60, tag: "Prepaga" },
  { name: "OSDEPYM", validity: 60, tag: "Obra Social" },
  { name: "OSDIC", validity: 30, tag: "Obra Social" },
  { name: "OSDIPP", validity: 30, tag: "Obra Social" },
  { name: "OSDOP", validity: 30, tag: "Obra Social" },
  { name: "OSFATUN", validity: 30, tag: "Obra Social" },
  { name: "OSMECON MATANZA", validity: 60, tag: "Obra Social" },
  { name: "OSOCNA", validity: 30, tag: "Obra Social" },
  { name: "OSEIV", validity: 30, tag: "Obra Social" },
  { name: "OSOSS", validity: 30, tag: "Obra Social" },
  { name: "OSPATCA", validity: 30, tag: "Obra Social" },
  { name: "OSPEA", validity: 30, tag: "Obra Social" },
  { name: "OSPE", validity: 30, tag: "Obra Social" },
  { name: "OSPEDYC", validity: 60, tag: "Obra Social" },
  { name: "OSPESA", validity: 30, tag: "Obra Social" },
  { name: "OSPIN", validity: 30, tag: "Obra Social" },
  { name: "Ospoce Integral", validity: 30, tag: "Obra Social" },
  { name: "OSRJA", validity: 30, tag: "Obra Social" },
  { name: "OSSEG", validity: 30, tag: "Obra Social" },
  { name: "OSTEL", validity: 30, tag: "Obra Social" },
  // P
  { name: "Premedic Medicina Privada", validity: 30, tag: "Prepaga" },
  { name: "Prevención ART", validity: 30, tag: "ART" },
  { name: "Prevención Salud", validity: 30, tag: "Prepaga" },
  { name: "Privamed", validity: 30, tag: "Prepaga" },
  { name: "Programa de Salud Amil", validity: 30, tag: "Programa" },
  { name: "Provincia ART", validity: 30, tag: "ART" },
  // S
  { name: "SAAV", validity: 60, tag: "Mutual" },
  { name: "Sadaic", validity: 30, tag: "Mutual" },
  { name: "Sami", validity: 60, tag: "Prepaga" },
  { name: "Sami Mercedes Benz", validity: 60, tag: "Prepaga" },
  { name: "Sancor Salud", validity: 60, tag: "Prepaga" },
  { name: "Servesalud", validity: 60, tag: "Prepaga" },
  { name: "Swiss Medical", validity: 60, tag: "Prepaga" },
  { name: "Swiss Medical ART", validity: 30, tag: "ART" },
  // T
  { name: "Tarjeta Integrar Simeco", validity: 60, tag: "Prepaga" },
  // U
  { name: "UAI Salud Medicina Prepaga", validity: 30, tag: "Prepaga" },
  { name: "Unión Personal", validity: 60, tag: "Obra Social" },
  // V
  { name: "Valmed", validity: 30, tag: "Prepaga" },
  // W
  { name: "William Hope", validity: 60, tag: "Prepaga" },
];

export const COVERAGE_TAGS: CoverageTag[] = [
  "Prepaga",
  "Obra Social",
  "Hospital",
  "Mutual",
  "ART",
  "Programa",
];

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
