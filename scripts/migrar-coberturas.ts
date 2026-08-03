/**
 * Carga inicial de las 104 coberturas médicas desde el código a Sanity.
 *
 *   npm run migrar:coberturas              → simulacro, no escribe nada
 *   npm run migrar:coberturas -- --commit  → escribe en Sanity
 *
 * ⚠️ Usa `createOrReplace`: reemplaza el documento COMPLETO. Correrlo dos veces
 * no duplica coberturas, pero pisa cualquier edición hecha desde el Studio. Es
 * un import de una sola vez, no un sincronizador para usar después del go-live.
 *
 * ⚠️ El `_id` se deriva del nombre (`cobertura-<slug>`). Si alguien renombra una
 * cobertura en el Studio y este script se vuelve a correr, el slug cambia y se
 * crea un documento nuevo en vez de actualizar el viejo.
 *
 * `lib/coverages.ts` NO se toca ni se borra: sigue siendo la fuente del listado,
 * de los STATS de la página y del índice del buscador global.
 */

import * as readline from "node:readline/promises";
import { config } from "dotenv";
import { createClient } from "@sanity/client";
import { COVERAGES, type Coverage } from "../lib/coverages";

// tsx no carga .env.local solo, igual que drizzle-kit.
config({ path: ".env.local" });

const COMMIT = process.argv.includes("--commit");

/** Fecha de API fija: si cambia el comportamiento de Sanity, este script no se entera. */
const API_VERSION = "2026-08-03";

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

// ─────────────────────── Destacadas ───────────────────────

/**
 * Las que aparecen en el carrusel del home.
 *
 * Los nombres tienen que coincidir EXACTAMENTE con los de `lib/coverages.ts`.
 * Son las 10 de las 14 marcas del marquee que matchean con el listado: OSDE,
 * Medifé, Accord Salud y Premedic quedan afuera porque en el listado no existen
 * o están escritas distinto. Esa discrepancia se resuelve con el cliente.
 */
const DESTACADAS = [
  "Swiss Medical",
  "Galeno",
  "Sancor Salud",
  "AVALIAN",
  "OMINT",
  "Medicus",
  "Unión Personal",
  "Prevención Salud",
  "IOMA",
  "OSDEPYM",
];

const NOMBRES_DESTACADOS = new Set(DESTACADAS);

/**
 * Corta el script si alguna destacada no existe en COVERAGES.
 *
 * Corre antes de la confirmación y también en simulacro: una destacada que se
 * pierde por una diferencia de escritura no se nota hasta que el home aparece
 * incompleto, así que es mejor fallar acá y en voz alta.
 */
function validarDestacadas() {
  const existentes = new Set(COVERAGES.map((c) => c.name));
  const faltantes = DESTACADAS.filter((nombre) => !existentes.has(nombre));

  if (faltantes.length > 0) {
    console.error(
      `\n❌ ${faltantes.length} cobertura(s) de la lista de destacadas no existen en lib/coverages.ts:\n`
    );
    for (const nombre of faltantes) console.error(`   · "${nombre}"`);
    console.error(
      "\n   La comparación es exacta. Revisá acentos, mayúsculas y nombre completo.\n" +
        "   No se escribió nada en Sanity.\n"
    );
    process.exit(1);
  }

  // Chequeo simétrico: si alguien duplicó una entrada en DESTACADAS, el conteo
  // final no va a dar y conviene enterarse antes de escribir.
  const marcadas = COVERAGES.filter((c) => NOMBRES_DESTACADOS.has(c.name)).length;
  if (marcadas !== DESTACADAS.length) {
    console.error(
      `\n❌ Se esperaban ${DESTACADAS.length} destacadas pero coinciden ${marcadas}.\n` +
        "   Probablemente haya un nombre repetido en la lista. No se escribió nada.\n"
    );
    process.exit(1);
  }

  console.log(
    `\n✅ Las ${DESTACADAS.length} coberturas destacadas existen en lib/coverages.ts.`
  );
}

// ─────────────────────────── Mapeo ───────────────────────────

type DocumentoCobertura = {
  _id: string;
  _type: "cobertura";
  nombre: string;
  tipo: string;
  vigencia: number;
  destacada: boolean;
};

/** "Prevención Salud" → "prevencion-salud" */
function slugificar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function idDeCobertura(nombre: string): string {
  return `cobertura-${slugificar(nombre)}`;
}

/**
 * `logo` no se escribe: el modelo viejo no tiene imágenes y no hay ninguna de
 * dónde sacarlas. Las 104 arrancan con el fallback de texto.
 */
function mapearCobertura(cobertura: Coverage): DocumentoCobertura {
  return {
    _id: idDeCobertura(cobertura.name),
    _type: "cobertura",
    nombre: cobertura.name,
    tipo: cobertura.tag,
    vigencia: cobertura.validity,
    // Explícito y no omitido: el initialValue del schema sólo aplica al
    // formulario del Studio, no a las escrituras por API.
    destacada: NOMBRES_DESTACADOS.has(cobertura.name),
  };
}

// ─────────────────────────── Migración ───────────────────────────

async function migrar() {
  console.log(
    COMMIT
      ? "\n🚀 MODO ESCRITURA — se van a crear o reemplazar documentos en Sanity."
      : "\n🔍 SIMULACRO — no se escribe nada en Sanity."
  );
  console.log(`   Proyecto: ${projectId} · Dataset: ${dataset}`);

  // Antes que nada, y también en simulacro.
  validarDestacadas();

  if (COMMIT) {
    console.warn(
      "\n⚠️  createOrReplace reemplaza el documento completo: si alguien editó\n" +
        "    alguna de estas coberturas desde el Studio, esos cambios se pierden."
    );

    // Última puerta antes de escribir. Nada de lo que sigue corre sin esto.
    if (!(await confirmar())) {
      console.log("\n\n🚫 Migración cancelada. No se escribió nada en Sanity.\n");
      process.exit(0);
    }
  }

  console.log(`\n   ${COVERAGES.length} coberturas para procesar.\n`);

  let procesadas = 0;
  let destacadas = 0;
  const errores: string[] = [];

  for (const [indice, cobertura] of COVERAGES.entries()) {
    const documento = mapearCobertura(cobertura);
    const etiqueta = `[${String(indice + 1).padStart(3, "0")}/${COVERAGES.length}] ${cobertura.name}`;
    const marca = documento.destacada ? " ★" : "";

    if (COMMIT) {
      try {
        await client.createOrReplace(documento);
        procesadas++;
        if (documento.destacada) destacadas++;
        console.log(`${etiqueta} — ✅ ${documento._id}${marca}`);
      } catch (error) {
        const detalle = error instanceof Error ? error.message : String(error);
        errores.push(`${cobertura.name}: no se pudo escribir el documento (${detalle})`);
        console.error(`${etiqueta} — ❌ ${detalle}`);
      }
    } else {
      procesadas++;
      if (documento.destacada) destacadas++;
      console.log(
        `${etiqueta} — crearía ${documento._id}${marca}\n` +
          `        tipo: ${documento.tipo} · vigencia: ${documento.vigencia} días · destacada: ${documento.destacada}`
      );
    }
  }

  // ─────────────────────── Resumen ───────────────────────

  console.log("\n──────────────── Resumen ────────────────");
  console.log(`Coberturas procesadas: ${procesadas} de ${COVERAGES.length}`);
  console.log(`Destacadas marcadas:   ${destacadas} de ${DESTACADAS.length}`);
  console.log(`Errores:               ${errores.length}`);

  if (errores.length > 0) {
    console.log("\nDetalle de errores:");
    for (const error of errores) console.log(`  · ${error}`);
  }

  if (!COMMIT) {
    console.log("\nEsto fue un simulacro. Para escribir de verdad:");
    console.log("  npm run migrar:coberturas -- --commit");
  }

  console.log("");
  if (errores.length > 0) process.exit(1);
}

migrar().catch((error) => {
  console.error("\n❌ La migración se cortó por un error inesperado:");
  console.error(error);
  process.exit(1);
});
