/**
 * Carga inicial de las 41 novedades desde el código a Sanity.
 *
 *   npm run migrar:novedades              → simulacro, no escribe nada
 *   npm run migrar:novedades -- --commit  → escribe en Sanity
 *
 * ⚠️ Usa `createOrReplace`: reemplaza el documento COMPLETO. Correrlo dos veces
 * no duplica novedades, pero pisa cualquier edición hecha desde el Studio. Es un
 * import de una sola vez, no un sincronizador para usar después del go-live.
 *
 * ⚠️ El `_id` se deriva del título (`novedad-<slug>`). Si alguien reescribe el
 * título de una novedad en el Studio y este script se vuelve a correr, el slug
 * cambia y se crea un documento nuevo en vez de actualizar el viejo.
 *
 * ⚠️ El `id` numérico viejo NO se migra. El deep-link `#novedad-<id>` que usa
 * `components/NovedadesList.tsx` pasa a basarse en el slug: ese cambio es del
 * front y no lo hace este script.
 *
 * ⚠️ LAS FECHAS NO SON EXACTAS. El origen (`lib/novedades.ts`) sólo guarda mes y
 * año ("Julio 2026"): el día nunca existió. Como el schema pide un `date` y lo
 * usa para ordenar, acá inventamos un día por novedad —ver `asignarFechas()`—
 * con el único fin de reproducir el orden actual del listado. Un 2024-09-04 NO
 * significa que esa novedad se publicó el 4 de septiembre.
 *
 * Consecuencia para el front: seguir mostrando SÓLO mes y año, como hoy. Si
 * alguna vista formatea la fecha completa va a estar publicando un dato
 * inventado.
 */

import * as readline from "node:readline/promises";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { config } from "dotenv";
import { createClient } from "@sanity/client";
import { NEWS, type NewsItem } from "../lib/novedades";

// tsx no carga .env.local solo, igual que drizzle-kit.
config({ path: ".env.local" });

const COMMIT = process.argv.includes("--commit");

/** Fecha de API fija: si cambia el comportamiento de Sanity, este script no se entera. */
const API_VERSION = "2026-08-03";

/** Dónde viven las 16 portadas compartidas. */
const DIRECTORIO_IMAGENES = path.join(process.cwd(), "public", "novedades");

/** Tope del campo `resumen` en el schema. Truncamos con margen para la elipsis. */
const MAXIMO_RESUMEN = 200;
const CORTE_RESUMEN = 197;

// ─────────────────────────── Entorno ───────────────────────────

function exigirVariable(nombre: string): string {
  const valor = process.env[nombre];
  if (!valor) {
    console.error(
      `\n❌ Falta la variable de entorno ${nombre}.\n` +
        `   Agregala a .env.local antes de correr la migración.\n`
    );
    process.exit(1);
  }
  return valor;
}

const token = exigirVariable("SANITY_API_WRITE_TOKEN");
const projectId = exigirVariable("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = exigirVariable("NEXT_PUBLIC_SANITY_DATASET");

const client = createClient({
  projectId,
  dataset,
  apiVersion: API_VERSION,
  token,
  // Escribir contra el CDN no tiene sentido: siempre a la API.
  useCdn: false,
});

// ─────────────────────── Confirmación ───────────────────────

/** Lo único que deja seguir adelante. Se compara después de recortar espacios. */
const PALABRA_CONFIRMACION = "migrar";

/**
 * Bloquea hasta que la persona escriba la palabra de confirmación.
 *
 * Devuelve false ante cualquier otra cosa: palabra distinta, Enter vacío,
 * Ctrl+C, o stdin cerrado (que es lo que pasa cuando el script se corre con la
 * entrada redirigida y no hay nadie del otro lado). Ante la duda, no escribe.
 */
async function confirmar(): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // `null` significa "abortar". Como resolve es idempotente, gana el primero
  // que dispare y los demás listeners quedan sin efecto.
  let alRecibirSigint: (() => void) | undefined;

  const respuesta = await new Promise<string | null>((resolve) => {
    const abortar = () => resolve(null);
    alRecibirSigint = abortar;

    rl.on("SIGINT", abortar); // Ctrl+C con terminal interactiva
    process.on("SIGINT", abortar); // Ctrl+C sin TTY
    rl.on("close", abortar); // stdin cerrado / EOF

    rl.question(
      `\n   Escribí "${PALABRA_CONFIRMACION}" y Enter para continuar (cualquier otra cosa cancela): `
    ).then(resolve, abortar);
  });

  if (alRecibirSigint) process.removeListener("SIGINT", alRecibirSigint);
  rl.close();

  return respuesta !== null && respuesta.trim() === PALABRA_CONFIRMACION;
}

// ─────────────────────────── Categorías ───────────────────────────

/**
 * Texto alternativo por categoría. Como las 16 portadas son provisorias y se
 * comparten entre novedades, el alt describe la categoría y no la novedad.
 *
 * Las claves de esta tabla son además la lista de categorías válidas: tienen que
 * coincidir con el dropdown de `sanity/schemaTypes/novedad.ts`.
 */
const ALT_POR_CATEGORIA = {
  audiologia: "Estudio de audiología",
  cardiologia: "Consulta de cardiología",
  dermatologia: "Consulta de dermatología",
  digital: "Persona usando la app DIM SALUD",
  general: "Centro de salud DIM",
  kinesiologia: "Sesión de kinesiología",
  laboratorio: "Laboratorio de análisis clínicos",
  nutricion: "Consulta de nutrición",
  odontologia: "Consultorio de odontología",
  oftalmologia: "Estudio oftalmológico",
  pediatria: "Consulta pediátrica",
  prevencion: "Control médico preventivo",
  psicologia: "Consulta de salud mental",
  resonancia: "Equipo de diagnóstico por imágenes",
  terapia: "Sesión de terapia",
  vacunacion: "Aplicación de una vacuna",
} as const satisfies Record<string, string>;

type Categoria = keyof typeof ALT_POR_CATEGORIA;

const CATEGORIAS_VALIDAS = Object.keys(ALT_POR_CATEGORIA) as Categoria[];

/** "/novedades/resonancia.jpg" → "resonancia" */
function categoriaDe(item: NewsItem): string {
  return path.basename(item.image, ".jpg");
}

// ─────────────────────────── Documento ───────────────────────────

type Span = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type BloquePortableText = {
  _type: "block";
  _key: string;
  style: "normal";
  markDefs: never[];
  children: Span[];
  listItem?: "bullet";
  level?: number;
};

type DocumentoNovedad = {
  _id: string;
  _type: "novedad";
  titulo: string;
  slug: { _type: "slug"; current: string };
  fecha: string;
  categoria: string;
  resumen: string;
  destacada: boolean;
  appDownload: boolean;
  cuerpo: BloquePortableText[];
  cta?: { label: string; href: string };
  portada?: {
    _type: "image";
    asset: { _type: "reference"; _ref: string };
    alt: string;
  };
};

/** "¿Cuidás tu salud mental?" → "cuidas-tu-salud-mental" */
function slugificar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    // Rango de diacríticos combinantes: "é" (NFD) queda en "e".
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    // Si el corte a 80 cayó justo sobre un guión, queda colgando.
    .replace(/-+$/, "");
}

function idDeNovedad(slug: string): string {
  return `novedad-${slug}`;
}

// ─────────────────────────── Fechas ───────────────────────────

const MESES: Record<string, string> = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

/**
 * Convierte los "Mes AAAA" del origen en fechas ISO, inventando el día.
 *
 * El origen no tiene día: sólo el orden del array (de más nueva a más vieja)
 * desempata dentro de un mismo mes. Para que `orderings: fechaDesc` del schema
 * reproduzca ese orden, a las N novedades de un mismo mes les damos días N, N-1,
 * … 1 en el orden en que aparecen. Septiembre 2024 tiene 4 → días 04, 03, 02, 01.
 *
 * Repito lo del encabezado porque es la trampa fácil de este script: el día es
 * un desempate, no una fecha de publicación. El front muestra mes y año.
 */
function asignarFechas(items: NewsItem[]): string[] {
  const grupos = new Map<string, number[]>();
  for (const [indice, item] of items.entries()) {
    const posiciones = grupos.get(item.date) ?? [];
    posiciones.push(indice);
    grupos.set(item.date, posiciones);
  }

  const fechas = new Array<string>(items.length);
  const invalidas: string[] = [];

  for (const [etiqueta, posiciones] of grupos) {
    const partes = /^([A-Za-zÁÉÍÓÚÑáéíóúñ]+)\s+(\d{4})$/.exec(etiqueta.trim());
    const mes = partes ? MESES[partes[1].toLowerCase()] : undefined;

    if (!partes || !mes) {
      invalidas.push(etiqueta);
      continue;
    }

    const total = posiciones.length;
    for (const [orden, posicion] of posiciones.entries()) {
      const dia = String(total - orden).padStart(2, "0");
      fechas[posicion] = `${partes[2]}-${mes}-${dia}`;
    }
  }

  if (invalidas.length > 0) {
    console.error(
      `\n❌ Hay ${invalidas.length} fecha(s) que no siguen el patrón "Mes AAAA":\n` +
        invalidas.map((f) => `   · ${JSON.stringify(f)}`).join("\n") +
        `\n\n   Corregilas en lib/novedades.ts antes de migrar.\n`
    );
    process.exit(1);
  }

  return fechas;
}

// ─────────────────────────── Resumen ───────────────────────────

/**
 * El primer párrafo del cuerpo, recortado al tope del schema.
 *
 * Es el mismo criterio que ya usa el carrusel del home. 10 de las 41 novedades
 * arrancan con un párrafo de más de 200 caracteres, así que su resumen queda
 * truncado y conviene revisarlo a mano en el Studio: varias cortan justo donde
 * el párrafo anunciaba una lista.
 */
function resumenDe(item: NewsItem): string {
  const primero = item.body.find((bloque) => "p" in bloque);
  const texto = primero && "p" in primero ? primero.p : "";

  if (texto.length <= MAXIMO_RESUMEN) return texto;

  const recorte = texto.slice(0, CORTE_RESUMEN);
  const ultimoEspacio = recorte.lastIndexOf(" ");
  const cortado = ultimoEspacio > 0 ? recorte.slice(0, ultimoEspacio) : recorte;

  return `${cortado.trimEnd()}…`;
}

// ─────────────────────── Portable Text ───────────────────────

function armarSpan(key: string, text: string): Span {
  return { _type: "span", _key: `s${key}`, text, marks: [] };
}

/**
 * Convierte el cuerpo viejo a Portable Text.
 *
 * Los textos del origen son planos: no hay HTML ni markdown que parsear, así que
 * cada string va tal cual dentro de un span. Comillas, emojis y el ">" literal
 * del id 32 se conservan sin escapar.
 *
 * Un `{list}` se expande en un bloque por ítem: Portable Text no tiene un nodo
 * "lista", la lista es una corrida de bloques con el mismo `listItem` y `level`.
 *
 * Las `_key` se derivan de los índices (novedad, bloque, ítem) para que dos
 * corridas del script produzcan documentos idénticos.
 */
function armarCuerpo(item: NewsItem, indiceNovedad: number): BloquePortableText[] {
  const bloques: BloquePortableText[] = [];

  for (const [indiceBloque, bloque] of item.body.entries()) {
    const base = `${indiceNovedad}-${indiceBloque}`;

    if ("p" in bloque) {
      bloques.push({
        _type: "block",
        _key: `b${base}`,
        style: "normal",
        markDefs: [],
        children: [armarSpan(base, bloque.p)],
      });
      continue;
    }

    for (const [indiceItem, texto] of bloque.list.entries()) {
      const key = `${base}-${indiceItem}`;
      bloques.push({
        _type: "block",
        _key: `b${key}`,
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [armarSpan(key, texto)],
      });
    }
  }

  return bloques;
}

// ─────────────────────────── Mapeo ───────────────────────────

/** Construye el documento sin la portada: el asset se resuelve aparte. */
function mapearNovedad(
  item: NewsItem,
  indice: number,
  fecha: string
): DocumentoNovedad {
  const slug = slugificar(item.title);

  return {
    _id: idDeNovedad(slug),
    _type: "novedad",
    titulo: item.title,
    slug: { _type: "slug", current: slug },
    fecha,
    categoria: categoriaDe(item),
    resumen: resumenDe(item),
    destacada: item.featured ?? false,
    appDownload: item.appDownload ?? false,
    cuerpo: armarCuerpo(item, indice),
    // `external` no se migra: el schema lo deduce de si el href arranca con
    // https:// o con /.
    ...(item.cta ? { cta: { label: item.cta.label, href: item.cta.href } } : {}),
  };
}

// ─────────────────────────── Imágenes ───────────────────────────

function rutaDeImagen(categoria: string): string {
  return path.join(DIRECTORIO_IMAGENES, `${categoria}.jpg`);
}

/**
 * Sube la portada de una categoría y cachea el assetId.
 *
 * Las 41 novedades comparten 16 archivos, así que subimos cada uno una sola vez
 * y todas las novedades de esa categoría referencian el mismo asset.
 */
const assetsPorCategoria = new Map<string, string>();

async function assetDeCategoria(categoria: string): Promise<string> {
  const cacheado = assetsPorCategoria.get(categoria);
  if (cacheado) return cacheado;

  const buffer = await readFile(rutaDeImagen(categoria));
  const asset = await client.assets.upload("image", buffer, {
    filename: `${categoria}.jpg`,
  });

  assetsPorCategoria.set(categoria, asset._id);
  return asset._id;
}

// ─────────────────────── Validaciones ───────────────────────

/** Slugs repetidos = documentos que se pisan entre sí. */
function validarSlugs(slugs: string[]) {
  const porSlug = new Map<string, string[]>();
  for (const [indice, slug] of slugs.entries()) {
    const titulos = porSlug.get(slug) ?? [];
    titulos.push(NEWS[indice].title);
    porSlug.set(slug, titulos);
  }

  const colisiones = [...porSlug.entries()].filter(([, t]) => t.length > 1);
  if (colisiones.length === 0) return;

  console.error(`\n❌ Hay ${colisiones.length} slug(s) repetidos:\n`);
  for (const [slug, titulos] of colisiones) {
    console.error(`   ${slug}`);
    for (const titulo of titulos) console.error(`     · ${titulo}`);
  }
  console.error("\n   Cambiá los títulos en lib/novedades.ts antes de migrar.\n");
  process.exit(1);
}

/** Categorías que el dropdown del schema no acepta. */
function validarCategorias(categorias: string[]) {
  const desconocidas = [...new Set(categorias)].filter(
    (categoria) => !CATEGORIAS_VALIDAS.includes(categoria as Categoria)
  );
  if (desconocidas.length === 0) return;

  console.error(
    `\n❌ Hay ${desconocidas.length} categoría(s) que no están en el schema:\n` +
      desconocidas.map((c) => `   · ${c}`).join("\n") +
      `\n\n   Válidas: ${CATEGORIAS_VALIDAS.join(", ")}\n`
  );
  process.exit(1);
}

/** Portadas que no existen en disco. Se chequea aunque sea simulacro. */
async function validarImagenes(categorias: string[]) {
  const usadas = [...new Set(categorias)];
  const faltantes: string[] = [];

  for (const categoria of usadas) {
    try {
      await readFile(rutaDeImagen(categoria));
    } catch {
      faltantes.push(rutaDeImagen(categoria));
    }
  }

  if (faltantes.length === 0) {
    console.log(`   ${usadas.length} portadas encontradas en public/novedades/.`);
    return;
  }

  console.error(
    `\n❌ Faltan ${faltantes.length} archivo(s) de portada:\n` +
      faltantes.map((f) => `   · ${f}`).join("\n") +
      "\n"
  );
  process.exit(1);
}

// ─────────────────────────── Migración ───────────────────────────

async function migrar() {
  console.log(
    COMMIT
      ? "\n🚀 MODO ESCRITURA — se van a crear o reemplazar documentos en Sanity."
      : "\n🔍 SIMULACRO — no se escribe nada en Sanity ni se sube ninguna imagen."
  );
  console.log(`   Proyecto: ${projectId} · Dataset: ${dataset}`);

  // Todo lo que puede salir mal por datos, antes de tocar la red.
  console.log("\n   Validando…");
  const slugs = NEWS.map((item) => slugificar(item.title));
  const categorias = NEWS.map(categoriaDe);
  const fechas = asignarFechas(NEWS);
  validarSlugs(slugs);
  validarCategorias(categorias);
  await validarImagenes(categorias);
  console.log(`   ${NEWS.length} slugs únicos y ${NEWS.length} fechas válidas.`);

  if (COMMIT) {
    console.warn(
      "\n⚠️  createOrReplace reemplaza el documento completo: si alguien editó\n" +
        "    alguna de estas novedades desde el Studio, esos cambios se pierden."
    );

    // Última puerta antes de escribir. Nada de lo que sigue corre sin esto.
    if (!(await confirmar())) {
      console.log(
        "\n\n🚫 Migración cancelada. No se escribió nada en Sanity ni se subió ninguna imagen.\n"
      );
      process.exit(0);
    }
  }

  console.log(`\n   ${NEWS.length} novedades para procesar.\n`);

  let procesadas = 0;
  const errores: string[] = [];

  for (const [indice, item] of NEWS.entries()) {
    const orden = indice + 1;
    const documento = mapearNovedad(item, indice, fechas[indice]);
    const categoria = documento.categoria;
    const etiqueta = `[${String(orden).padStart(2, "0")}/${NEWS.length}] ${item.title}`;

    // Portada: sólo se lee y sube en modo escritura. Se reusa el asset entre
    // novedades de la misma categoría.
    if (COMMIT) {
      try {
        const yaSubida = assetsPorCategoria.has(categoria);
        const assetId = await assetDeCategoria(categoria);
        documento.portada = {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
          alt: ALT_POR_CATEGORIA[categoria as Categoria],
        };
        if (!yaSubida) console.log(`   ↑ portada ${categoria}.jpg subida`);
      } catch (error) {
        const detalle = error instanceof Error ? error.message : String(error);
        // La novedad se crea igual, sin portada: perderla es menos grave que
        // perder la novedad. Queda marcada como incompleta en el Studio, porque
        // el schema pide portada.
        errores.push(`${item.title}: no se pudo subir la portada (${detalle})`);
        console.error(`${etiqueta} — ⚠️  portada falló: ${detalle}`);
      }
    }

    if (COMMIT) {
      try {
        await client.createOrReplace(documento);
        procesadas++;
        console.log(`${etiqueta} — ✅ ${documento._id}`);
      } catch (error) {
        const detalle = error instanceof Error ? error.message : String(error);
        errores.push(`${item.title}: no se pudo escribir el documento (${detalle})`);
        console.error(`${etiqueta} — ❌ ${detalle}`);
      }
    } else {
      procesadas++;
      console.log(`${etiqueta} — crearía ${documento._id}`);
      console.log(JSON.stringify(documento, null, 2));
      console.log("");
    }
  }

  // ─────────────────────── Resumen ───────────────────────

  const portadasDistintas = new Set(categorias).size;
  const truncados = NEWS.filter((item) => {
    const primero = item.body.find((bloque) => "p" in bloque);
    return primero && "p" in primero && primero.p.length > MAXIMO_RESUMEN;
  }).length;

  console.log("\n──────────────── Resumen ────────────────");
  console.log(`Novedades procesadas: ${procesadas} de ${NEWS.length}`);
  console.log(
    COMMIT
      ? `Portadas subidas:     ${assetsPorCategoria.size} (compartidas entre las ${NEWS.length} novedades)`
      : `Portadas a subir:     ${portadasDistintas} (simulacro, no se subió ninguna)`
  );
  console.log(`Resúmenes truncados:  ${truncados} — revisalos en el Studio`);
  console.log(`Errores:              ${errores.length}`);

  if (errores.length > 0) {
    console.log("\nDetalle de errores:");
    for (const error of errores) console.log(`  · ${error}`);
  }

  if (!COMMIT) {
    console.log("\nEsto fue un simulacro. Para escribir de verdad:");
    console.log("  npm run migrar:novedades -- --commit");
  }

  console.log("");
  if (errores.length > 0) process.exit(1);
}

migrar().catch((error) => {
  console.error("\n❌ La migración se cortó por un error inesperado:");
  console.error(error);
  process.exit(1);
});
