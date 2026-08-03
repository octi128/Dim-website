/**
 * Carga inicial de las 16 sedes desde el código a Sanity.
 *
 *   npm run migrar:sedes              → simulacro, no escribe nada
 *   npm run migrar:sedes -- --commit  → escribe en Sanity
 *
 * ⚠️ Usa `createOrReplace`: reemplaza el documento COMPLETO. Correrlo dos veces
 * no duplica sedes, pero pisa cualquier edición hecha desde el Studio. Es un
 * import de una sola vez, no un sincronizador para usar después del go-live.
 *
 * ⚠️ El `_id` se deriva del nombre (`sede-<slug>`). Si alguien renombra una sede
 * en el Studio y este script se vuelve a correr, el slug cambia y se crea un
 * documento nuevo en vez de actualizar el viejo.
 */

import * as readline from "node:readline/promises";
import { config } from "dotenv";
import { createClient } from "@sanity/client";
import { CENTRES, type Centre } from "../lib/centres";

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

// ─────────────────────────── Mapeo ───────────────────────────

type DocumentoSede = {
  _id: string;
  _type: "sede";
  nombre: string;
  zona: string;
  direccion: string;
  mapsUrl: string;
  horarios: { semana: string; sabado: string; domingo?: string };
  servicios: string[];
  destacada: boolean;
  orden: number;
  imagen?: {
    _type: "image";
    asset: { _type: "reference"; _ref: string };
    alt: string;
  };
};

/** "DIM Dermatología & Estética" → "dim-dermatologia-estetica" */
function slugificar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function idDeSede(nombre: string): string {
  return `sede-${slugificar(nombre)}`;
}

/** Construye el documento sin la imagen: el asset se resuelve aparte. */
function mapearSede(centre: Centre, posicion: number): DocumentoSede {
  return {
    _id: idDeSede(centre.name),
    _type: "sede",
    nombre: centre.name,
    zona: centre.zone,
    direccion: centre.address,
    mapsUrl: centre.mapsUrl,
    horarios: {
      semana: centre.hours.weekday,
      sabado: centre.hours.saturday,
      // La clave se omite si la sede no abre domingos: el schema la deja opcional
      // y el listado no muestra la fila cuando falta.
      ...(centre.hours.sunday ? { domingo: centre.hours.sunday } : {}),
    },
    servicios: centre.tags,
    destacada: centre.featured ?? false,
    orden: posicion,
  };
}

// ─────────────────────────── Imágenes ───────────────────────────

/** Último segmento de la URL, con los %20 y acentos ya decodificados. */
function nombreDeArchivo(url: string): string {
  const ruta = new URL(url).pathname;
  return decodeURIComponent(ruta.split("/").pop() || "imagen");
}

async function subirImagen(url: string): Promise<string> {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status} ${respuesta.statusText}`);
  }
  const buffer = Buffer.from(await respuesta.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: nombreDeArchivo(url),
  });
  return asset._id;
}

// ─────────────────────────── Migración ───────────────────────────

async function migrar() {
  console.log(
    COMMIT
      ? "\n🚀 MODO ESCRITURA — se van a crear o reemplazar documentos en Sanity."
      : "\n🔍 SIMULACRO — no se escribe nada en Sanity ni se sube ninguna imagen."
  );
  console.log(`   Proyecto: ${projectId} · Dataset: ${dataset}`);

  if (COMMIT) {
    console.warn(
      "\n⚠️  createOrReplace reemplaza el documento completo: si alguien editó\n" +
        "    alguna de estas sedes desde el Studio, esos cambios se pierden."
    );

    // Última puerta antes de escribir. Nada de lo que sigue corre sin esto.
    if (!(await confirmar())) {
      console.log(
        "\n\n🚫 Migración cancelada. No se escribió nada en Sanity ni se subió ninguna imagen.\n"
      );
      process.exit(0);
    }
  }

  console.log(`\n   ${CENTRES.length} sedes para procesar.\n`);

  let procesadas = 0;
  let imagenesSubidas = 0;
  const errores: string[] = [];

  for (const [indice, centre] of CENTRES.entries()) {
    const orden = indice + 1;
    const documento = mapearSede(centre, orden);
    const etiqueta = `[${String(orden).padStart(2, "0")}/${CENTRES.length}] ${centre.name}`;

    // Imagen: sólo se descarga y sube en modo escritura.
    if (centre.image) {
      if (COMMIT) {
        try {
          const assetId = await subirImagen(centre.image);
          documento.imagen = {
            _type: "image",
            asset: { _type: "reference", _ref: assetId },
            alt: `Fachada ${centre.name}`,
          };
          imagenesSubidas++;
        } catch (error) {
          const detalle = error instanceof Error ? error.message : String(error);
          // La sede se crea igual, sin foto: perder la imagen es menos grave
          // que perder la sede. Queda registrada como error.
          errores.push(`${centre.name}: no se pudo subir la imagen (${detalle})`);
          console.error(`${etiqueta} — ⚠️  imagen falló: ${detalle}`);
        }
      } else {
        console.log(`${etiqueta} — descargaría ${centre.image}`);
      }
    }

    if (COMMIT) {
      try {
        await client.createOrReplace(documento);
        procesadas++;
        console.log(`${etiqueta} — ✅ ${documento._id}`);
      } catch (error) {
        const detalle = error instanceof Error ? error.message : String(error);
        errores.push(`${centre.name}: no se pudo escribir el documento (${detalle})`);
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

  console.log("\n──────────────── Resumen ────────────────");
  console.log(`Sedes procesadas:  ${procesadas} de ${CENTRES.length}`);
  console.log(
    COMMIT
      ? `Imágenes subidas:  ${imagenesSubidas}`
      : `Imágenes a subir:  ${CENTRES.filter((c) => c.image).length} (simulacro, no se subió ninguna)`
  );
  console.log(`Errores:           ${errores.length}`);

  if (errores.length > 0) {
    console.log("\nDetalle de errores:");
    for (const error of errores) console.log(`  · ${error}`);
  }

  if (!COMMIT) {
    console.log("\nEsto fue un simulacro. Para escribir de verdad:");
    console.log("  npm run migrar:sedes -- --commit");
  }

  console.log("");
  if (errores.length > 0) process.exit(1);
}

migrar().catch((error) => {
  console.error("\n❌ La migración se cortó por un error inesperado:");
  console.error(error);
  process.exit(1);
});
