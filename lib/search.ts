import { SPECIALTIES, normalize } from "@/lib/specialties";
import { STUDIES } from "@/lib/studies";
import { LAB_CATEGORIES, STUDIES_8H, STUDIES_12H } from "@/lib/lab-studies";
import { DISEASES } from "@/lib/diseases";
import { COVERAGES } from "@/lib/coverages";
import { PORTAL_URL } from "@/lib/contacto";

/**
 * Buscador global del sitio.
 *
 * Este módulo arrastra los cinco archivos de datos (≈700 entradas), así que
 * NO se importa desde el Header directamente: `SiteSearch` lo carga con
 * `import()` dinámico la primera vez que alguien abre el buscador. Si algún día
 * se importa de forma estática desde el layout, el peso pasa a todas las páginas.
 */

/**
 * Grupo bajo el que se muestra el resultado. Este orden es el desempate cuando dos
 * grupos tienen el mismo mejor puntaje.
 *
 * "Página" va primero justamente por eso: en un empate, la sección del sitio es
 * mejor respuesta que un ítem enterrado adentro de un acordeón. Con "turno" el
 * resultado útil es Portal de Turnos, no las tres modalidades de punción biopsia
 * que mencionan la palabra. Cuando la respuesta obvia gana por puntaje (buscar
 * "cardio" da Cardiología con 80) este orden no interviene.
 */
export const SEARCH_TYPES = [
  "Página",
  "Especialidad",
  "Estudio",
  "Laboratorio",
  "Enfermedad",
  "Cobertura",
] as const;

export type SearchType = (typeof SEARCH_TYPES)[number];

export interface SearchResult {
  title: string;
  /** Contexto: el estudio padre, la categoría de laboratorio, el tipo de cobertura. */
  subtitle?: string;
  type: SearchType;
  href: string;
  external?: boolean;
}

export interface SearchGroup {
  type: SearchType;
  results: SearchResult[];
}

/** Entrada del índice: el resultado más el texto por el que se puede encontrar. */
interface IndexEntry extends SearchResult {
  /** Título normalizado. Es lo que da los puntajes altos. */
  key: string;
  /** Sinónimos y texto secundario, ya normalizado. Puntaje bajo. */
  extra?: string;
}

/**
 * Las páginas del sitio se listan a mano y a propósito: son las únicas rutas
 * garantizadas por `app/`. El Footer enlaza varias que todavía no existen
 * (/dim-once, /politica, /receta-digital…), así que copiar de ahí mandaría
 * resultados a un 404.
 */
const PAGES: { title: string; href: string; keywords?: string; external?: boolean }[] = [
  { title: "Portal de Turnos", href: PORTAL_URL, keywords: "turno reservar sacar turno online cita app dim salud", external: true },
  { title: "Inicio", href: "/", keywords: "home principal dim" },
  { title: "Atención sin turno previo", href: "/atencion-sin-turno-previo", keywords: "demanda espontanea guardia sin cita walk in" },
  { title: "Cirugías", href: "/cirugia", keywords: "operacion quirofano prequirurgico internacion" },
  { title: "Cirugías estéticas", href: "/cirugias-esteticas", keywords: "plastica estetica cosmetica" },
  { title: "Coberturas médicas", href: "/coberturas-medicas", keywords: "obra social prepaga art mutual convenio afiliado" },
  { title: "Conocenos", href: "/conocenos", keywords: "quienes somos historia institucional sobre dim nosotros" },
  { title: "Contacto", href: "/contacto", keywords: "telefono whatsapp mail direccion escribinos consulta" },
  { title: "Enfermedades y afecciones", href: "/enfermedades", keywords: "sintomas patologias afeccion salud" },
  { title: "Especialidades médicas", href: "/especialidades-medicas", keywords: "medicos profesionales consulta especialista" },
  { title: "Estudios médicos y preparaciones", href: "/estudios-medicos-y-preparaciones", keywords: "imagenes diagnostico preparacion ayuno estudio" },
  { title: "Estudios y preparaciones de laboratorio", href: "/estudios-y-preparaciones-de-laboratorio", keywords: "analisis sangre orina extraccion ayuno bioquimica" },
  { title: "Laboratorios", href: "/laboratorios", keywords: "analisis clinicos extraccion resultados bioquimica" },
  { title: "Medicina nuclear", href: "/medicina-nuclear", keywords: "centellograma pet spect radioisotopos" },
  { title: "Mutual AMEDIM", href: "/mutual-amedim", keywords: "mutual asociado plan de salud amedim" },
  { title: "Novedades", href: "/novedades", keywords: "noticias blog novedad comunicados prensa" },
  { title: "Nuestros centros y horarios", href: "/nuestros-centros-y-horarios", keywords: "sucursales sedes direcciones donde estamos horario atencion" },
  { title: "Odontología", href: "/odontologia", keywords: "dentista dental muelas ortodoncia implantes" },
  { title: "Oncología", href: "/oncologia", keywords: "cancer tumor quimioterapia oncologico" },
  { title: "Resonancia magnética", href: "/resonancia-magnetica", keywords: "rmn resonancia imagenes" },
  { title: "Tomografía multicorte", href: "/tomografia-multicorte", keywords: "tac tomografia computada multicorte" },
  { title: "Trabajar en DIM", href: "/recursos-humanos", keywords: "empleo busquedas laborales rrhh cv postularme recursos humanos" },
];

/** Deep link a un listado filtrable. `q` siembra el buscador interno de la página. */
function deepLink(path: string, hash: string, q: string) {
  return `${path}?q=${encodeURIComponent(q)}${hash}`;
}

const STUDIES_PATH = "/estudios-medicos-y-preparaciones";
const LAB_PATH = "/estudios-y-preparaciones-de-laboratorio";

/**
 * ¿El `item` de un estudio es el nombre de una práctica o una instrucción?
 *
 * Los `items` de `studies.ts` mezclan las dos cosas: "RMN de Cerebro" es una
 * práctica y sirve como resultado propio, pero "Tiroidea — turno directo desde el
 * portal." es una aclaración de trámite y como título de resultado se lee a
 * pescado. Las descarta por la puntuación de prosa (punto final, guion largo,
 * flecha, dos puntos) y por largo.
 *
 * Lo descartado no se vuelve imposible de encontrar: sigue dentro del texto
 * secundario del estudio padre, así que aparece igual, con el nombre del estudio
 * como título.
 */
function isPracticeName(item: string): boolean {
  if (item.length > 60) return false;
  return !/[.:—→"]/.test(item);
}

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];

  const push = (e: Omit<IndexEntry, "key" | "extra">, extra?: string) => {
    entries.push({ ...e, key: normalize(e.title), extra: extra ? normalize(extra) : undefined });
  };

  for (const s of SPECIALTIES) {
    push(
      {
        title: s.name,
        type: "Especialidad",
        href: deepLink("/especialidades-medicas", "#especialidades", s.name),
      },
      s.alias,
    );
  }

  for (const study of STUDIES) {
    push(
      {
        title: study.title,
        type: "Estudio",
        href: deepLink(STUDIES_PATH, "#estudios", study.title),
      },
      [study.keywords, study.description].filter(Boolean).join(" "),
    );

    // Las variantes de cada estudio ("Ecodoppler Cardíaco") son lo que la gente
    // escribe de verdad. Apuntan al mismo acordeón, sembrado con la variante:
    // el filtro interno del acordeón la encuentra dentro de los items.
    for (const item of (study.items ?? []).filter(isPracticeName)) {
      push({
        title: item,
        subtitle: study.title,
        type: "Estudio",
        href: deepLink(STUDIES_PATH, "#estudios", item),
      });
    }
  }

  for (const cat of LAB_CATEGORIES) {
    push(
      {
        title: cat.title,
        type: "Laboratorio",
        href: deepLink(LAB_PATH, "#categorias", cat.title),
      },
      cat.description,
    );
  }

  // Prácticas individuales con su requisito de ayuno como contexto: es el dato
  // por el que se busca ("¿la calcemia necesita ayuno?").
  const labPractices: [string, string][] = [
    ...STUDIES_8H.map((n) => [n, "Ayuno de 8 horas"] as [string, string]),
    ...STUDIES_12H.map((n) => [n, "Ayuno de 12 horas"] as [string, string]),
  ];
  for (const [name, group] of labPractices) {
    push({
      title: name,
      subtitle: group,
      type: "Laboratorio",
      href: deepLink(LAB_PATH, "#categorias", name),
    });
  }

  for (const d of DISEASES) {
    push({
      title: d.name,
      subtitle: `Enfermedades con ${d.letter}`,
      type: "Enfermedad",
      // Apunta al listado y no a `/enfermedades/enfermedad/${d.slug}`: esa ruta
      // no existe en `app/` todavía (el resto de la sección enlaza a un 404).
      // Cuando exista el detalle, cambiar esta línea por el slug.
      href: `/enfermedades/buscar?q=${encodeURIComponent(d.name)}`,
    });
  }

  for (const c of COVERAGES) {
    push({
      title: c.name,
      subtitle: `${c.tag} · orden válida ${c.validity} días`,
      type: "Cobertura",
      href: deepLink("/coberturas-medicas", "#coberturas", c.name),
    });
  }

  for (const p of PAGES) {
    push({ title: p.title, type: "Página", href: p.href, external: p.external }, p.keywords);
  }

  return entries;
}

let index: IndexEntry[] | null = null;

function getIndex(): IndexEntry[] {
  if (!index) index = buildIndex();
  return index;
}

/**
 * Puntaje de relevancia, o 0 si no hay coincidencia.
 *
 * Los tramos están bien separados (100/80/60/40/15) para que el tipo de
 * coincidencia domine siempre sobre cualquier ajuste fino: un título que arranca
 * con lo que escribiste va antes que uno que lo menciona al final, sin importar
 * el largo.
 */
function score(entry: IndexEntry, q: string): number {
  const { key } = entry;
  if (key === q) return 100;
  if (key.startsWith(q)) return 80;
  // Empieza una palabra del medio: "cardiaco" encuentra "Ecodoppler Cardíaco".
  if (key.includes(` ${q}`) || key.includes(`-${q}`) || key.includes(`(${q}`)) return 60;
  if (key.includes(q)) return 40;
  if (entry.extra?.includes(q)) return 15;
  return 0;
}

/** Tope por grupo en la vista instantánea. Sin esto, "a" llenaría todo con coberturas. */
export const PREVIEW_PER_GROUP = 4;

/**
 * Busca en todo el sitio y devuelve los resultados agrupados.
 *
 * Los grupos salen ordenados por su mejor puntaje, no por un orden fijo: si
 * escribís "contacto" el grupo Página va primero, y si escribís "cardio" va
 * primero Especialidad. Un orden fijo enterraría la respuesta obvia.
 *
 * @param limitPerGroup Recorta cada grupo (vista instantánea). Omitilo en /buscar.
 */
export function searchSite(query: string, limitPerGroup?: number): SearchGroup[] {
  const q = normalize(query.trim());
  // Con una sola letra casi todo coincide y la lista no dice nada.
  if (q.length < 2) return [];

  const scored: { entry: IndexEntry; s: number }[] = [];
  for (const entry of getIndex()) {
    const s = score(entry, q);
    if (s > 0) scored.push({ entry, s });
  }

  const byType = new Map<SearchType, { entry: IndexEntry; s: number }[]>();
  for (const hit of scored) {
    const list = byType.get(hit.entry.type);
    if (list) list.push(hit);
    else byType.set(hit.entry.type, [hit]);
  }

  const groups: { group: SearchGroup; best: number }[] = [];
  for (const type of SEARCH_TYPES) {
    const hits = byType.get(type);
    if (!hits) continue;
    hits.sort((a, b) => b.s - a.s || a.entry.key.localeCompare(b.entry.key));
    groups.push({
      group: {
        type,
        results: (limitPerGroup ? hits.slice(0, limitPerGroup) : hits).map((h) => ({
          title: h.entry.title,
          subtitle: h.entry.subtitle,
          type: h.entry.type,
          href: h.entry.href,
          external: h.entry.external,
        })),
      },
      // SEARCH_TYPES ya viene en orden de preferencia, así que un Array.sort
      // estable deja ese orden como desempate cuando dos grupos empatan.
      best: hits[0].s,
    });
  }

  groups.sort((a, b) => b.best - a.best);
  return groups.map((g) => g.group);
}

/** Total de coincidencias, sin recortes. Para el contador de /buscar. */
export function countResults(groups: SearchGroup[]): number {
  return groups.reduce((n, g) => n + g.results.length, 0);
}
