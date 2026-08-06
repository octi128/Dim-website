import {defineQuery} from 'next-sanity'
import type {PortableTextBlock} from '@portabletext/react'

/**
 * El singleton de configuración del sitio.
 *
 * Se filtra por `_id` además de por `_type`: el ítem del Studio siempre edita
 * el documento con ese id fijo, así que pedirlo explícitamente evita traer
 * cualquier otro documento del mismo tipo que hubiera quedado suelto antes de
 * que el singleton estuviera blindado.
 *
 * Acá no está la URL del portal de turnos: es infraestructura y no contenido
 * editable, así que vive como constante en `lib/contacto.ts`.
 */
export const CONFIGURACION_QUERY = defineQuery(`
  *[_type == "configuracionSitio" && _id == "configuracionSitio"][0]{
    whatsappCentral,
    telefonoCentral,
    emailTurnos,
    redes[]{_key, plataforma, url}
  }
`)

export type Red = {
  /** Clave que genera Sanity para cada ítem del array. Es la key de React. */
  _key: string
  plataforma: string
  url: string
}

export type Configuracion = {
  whatsappCentral: string
  telefonoCentral: string
  emailTurnos: string
  /** Sanity devuelve null, no [], cuando el array está vacío. */
  redes: Red[] | null
}

/**
 * Las sedes del listado de centros, ordenadas por el campo `orden`.
 *
 * De la imagen se traen el `alt` y la referencia del asset, que es lo que
 * necesita `urlFor()`. `hotspot` y `crop` viajan también: hoy no tienen efecto
 * porque el listado recorta con `object-cover`, pero no cuestan nada y evitan
 * tener que volver a tocar la query si algún día se usan.
 *
 * `videoUrl` se trae aunque el listado todavía no lo renderice, por el mismo
 * motivo. Ver la descripción del campo en el schema.
 */
export const SEDES_QUERY = defineQuery(`
  *[_type == "sede"] | order(orden asc) {
    _id,
    nombre,
    zona,
    direccion,
    mapsUrl,
    horarios{semana, sabado, domingo},
    servicios,
    imagen{alt, hotspot, crop, asset},
    videoUrl,
    destacada,
    orden
  }
`)

/**
 * Las tres zonas reales de una sede.
 *
 * El "Todos" del filtro del listado NO va acá: es un valor de interfaz, no un
 * dato de la sede. El modelo viejo los mezclaba en un solo tipo.
 */
export type Zona = 'Ramos Mejía' | 'Morón' | 'Buenos Aires'

export type ImagenSede = {
  alt: string
  asset: {_ref: string; _type: 'reference'}
}

export type Sede = {
  _id: string
  nombre: string
  zona: Zona
  direccion: string
  mapsUrl: string
  /** GROQ devuelve null (no undefined) cuando la sede no abre domingos. */
  horarios: {semana: string; sabado: string; domingo: string | null}
  servicios: string[]
  imagen: ImagenSede | null
  videoUrl: string | null
  destacada: boolean
  orden: number
}

/**
 * Las coberturas del directorio, en orden alfabético.
 *
 * El orden va por `lower(nombre)` y no por `nombre` a secas: GROQ compara los
 * strings carácter por carácter, así que `order(nombre asc)` manda todos los
 * nombres en mayúscula adelante y devuelve ACCORD, AMCI, AVALIAN… antes que
 * "Acción Médica" o "Amsterdam". Nadie lee un directorio así. Con `lower()` el
 * orden es el mismo que veía la persona usuaria hasta ahora.
 *
 * Del `logo` se traen `alt` y el asset —lo que necesita `urlFor()`—, más
 * `hotspot` y `crop`, por el mismo criterio que la imagen de la sede: hoy
 * ningún documento tiene logo cargado y el listado no lo renderiza, pero traerlo
 * no cuesta nada y evita volver a tocar la query.
 *
 * `destacada` alimenta el carrusel del home, que todavía no lee de Sanity.
 */
export const COBERTURAS_QUERY = defineQuery(`
  *[_type == "cobertura"] | order(lower(nombre) asc) {
    _id,
    nombre,
    tipo,
    vigencia,
    logo{alt, hotspot, crop, asset},
    destacada
  }
`)

/**
 * Los seis tipos de cobertura del schema.
 *
 * Convive con `CoverageTag` de `lib/coverages.ts`, que tiene los mismos seis
 * valores pero es otra cosa: aquél tipa `COVERAGE_TAGS`, la constante de UI que
 * dibuja las pestañas del filtro. Éste describe el dato que devuelve Sanity.
 * Misma unión, dos responsabilidades — igual que `Zona` y `ZonaFiltro`.
 */
export type TipoCobertura =
  | 'Prepaga'
  | 'Obra Social'
  | 'Hospital'
  | 'Mutual'
  | 'ART'
  | 'Programa'

/** Los tres valores que admite el campo, validados en el schema. */
export type VigenciaCobertura = 30 | 60 | 90

export type ImagenCobertura = {
  alt: string
  asset: {_ref: string; _type: 'reference'}
}

export type Cobertura = {
  _id: string
  nombre: string
  tipo: TipoCobertura
  vigencia: VigenciaCobertura
  /** Opcional en el schema: hoy ningún documento tiene logo cargado. */
  logo: ImagenCobertura | null
  destacada: boolean
}

/**
 * Los campos que comparten el listado de novedades y el carrusel del home. Las
 * dos vistas muestran lo mismo salvo el cuerpo, y traerlo de más no justifica
 * mantener dos proyecciones que se desincronizan.
 *
 * `slug` se aplana a string: la proyección devolvería el objeto `{current, _type}`
 * y lo único que se usa es el valor, para el deep-link `#novedad-<slug>`.
 *
 * De la portada van `alt` y el asset —lo que necesita `urlFor()`—, más `hotspot`
 * y `crop`, con el mismo criterio que sedes y coberturas.
 */
const CAMPOS_NOVEDAD = `
  _id,
  titulo,
  "slug": slug.current,
  fecha,
  categoria,
  resumen,
  portada{alt, hotspot, crop, asset},
  destacada,
  cta{label, href},
  appDownload,
  cuerpo
`

/**
 * Todas las novedades del listado, de más nueva a más vieja.
 *
 * El orden sale de `fecha`, que es un `date` completo aunque el contenido
 * original sólo tuviera mes y año: los días los inventó la migración justamente
 * para desempatar dentro de un mismo mes. Ver `lib/fecha.ts`.
 */
export const NOVEDADES_QUERY = defineQuery(`
  *[_type == "novedad"] | order(fecha desc) {${CAMPOS_NOVEDAD}}
`)

/**
 * Las ocho novedades más recientes, para el carrusel del home.
 *
 * Es cronológico puro y NO prioriza `destacada`. El campo existe y se sigue
 * usando para el badge "Nuevo", pero como fue marcado sobre las novedades que
 * en ese momento eran las más nuevas, ordenar por él sólo lograría que una
 * novedad de enero se cuele delante de tres posteriores.
 */
export const NOVEDADES_CARRUSEL_QUERY = defineQuery(`
  *[_type == "novedad"] | order(fecha desc)[0...8] {${CAMPOS_NOVEDAD}}
`)

/** Una novedad puntual, para su página propia. */
export const NOVEDAD_POR_SLUG_QUERY = defineQuery(`
  *[_type == "novedad" && slug.current == $slug][0] {${CAMPOS_NOVEDAD}}
`)

/**
 * Sólo los slugs, para `generateStaticParams`.
 *
 * El `defined()` filtra documentos a los que les falte el slug: sin él, uno solo
 * mal cargado genera la ruta `/novedades/undefined` en el build.
 */
export const SLUGS_NOVEDADES_QUERY = defineQuery(`
  *[_type == "novedad" && defined(slug.current)] {"slug": slug.current}
`)

/**
 * Hasta tres novedades para el pie de una página individual.
 *
 * Prioriza la misma categoría y completa con las más recientes de cualquier otra,
 * en una sola query y sin ramas en el código: `order()` acepta expresiones, así
 * que `(categoria == $categoria) desc` manda las afines adelante y `fecha desc`
 * ordena dentro de cada grupo.
 *
 * Los paréntesis no son decorativos: sin ellos GROQ intenta aplicar `desc` al
 * operando derecho de la comparación y falla con "unexpected postfix operator".
 *
 * Con 4 o más de la misma categoría devuelve sólo afines; con 1 o 2 las mezcla;
 * con 0 devuelve las tres más recientes del sitio. Este último caso es real:
 * `dermatologia`, `psicologia` y `oftalmologia` tienen un único documento cada
 * una. La página cambia el título del bloque según lo que haya vuelto.
 */
export const NOVEDADES_RELACIONADAS_QUERY = defineQuery(`
  *[_type == "novedad" && slug.current != $slug]
    | order((categoria == $categoria) desc, fecha desc)[0...3] {${CAMPOS_NOVEDAD}}
`)

/**
 * Las 16 categorías del dropdown del schema.
 *
 * Son la clave, no la etiqueta: el texto que ve la persona usuaria lo resuelve
 * `ETIQUETA_CATEGORIA`, acá abajo. Vienen del modelo viejo, donde la categoría
 * estaba escondida en el nombre del archivo de la portada
 * (`/novedades/<categoria>.jpg`).
 */
export type CategoriaNovedad =
  | 'audiologia'
  | 'cardiologia'
  | 'dermatologia'
  | 'digital'
  | 'general'
  | 'kinesiologia'
  | 'laboratorio'
  | 'nutricion'
  | 'odontologia'
  | 'oftalmologia'
  | 'pediatria'
  | 'prevencion'
  | 'psicologia'
  | 'resonancia'
  | 'terapia'
  | 'vacunacion'

/**
 * Cómo se nombra cada categoría en pantalla.
 *
 * Vive acá, y no en el componente que la dibuja, porque la consumen tanto el
 * carrusel del home —que es `"use client"`— como la página individual de cada
 * novedad, que es Server Component. Un módulo con `"use client"` no sirve de
 * origen: al importarlo desde el servidor, React convierte todos sus exports en
 * referencias de cliente y el objeto deja de ser legible.
 *
 * Las claves no son un espejo de la categoría: `resonancia` se muestra como
 * "Diagnóstico por imágenes", `general` como "Institucional" y `psicologia`
 * como "Salud mental".
 */
export const ETIQUETA_CATEGORIA: Record<CategoriaNovedad, string> = {
  audiologia: 'Audiología',
  cardiologia: 'Cardiología',
  dermatologia: 'Dermatología',
  digital: 'Salud digital',
  general: 'Institucional',
  kinesiologia: 'Kinesiología',
  laboratorio: 'Laboratorio',
  nutricion: 'Nutrición',
  odontologia: 'Odontología',
  oftalmologia: 'Oftalmología',
  pediatria: 'Pediatría',
  prevencion: 'Prevención',
  psicologia: 'Salud mental',
  resonancia: 'Diagnóstico por imágenes',
  terapia: 'Terapias',
  vacunacion: 'Vacunación',
}

export type ImagenNovedad = {
  alt: string
  asset: {_ref: string; _type: 'reference'}
}

/** El botón opcional del pie de la novedad. */
export type CtaNovedad = {
  label: string
  href: string
}

export type Novedad = {
  _id: string
  titulo: string
  /** Ya aplanado por la query: el `current` del slug, sin el objeto alrededor. */
  slug: string
  /** ISO completo ("2026-07-01"), pero se muestra sólo mes y año. */
  fecha: string
  categoria: CategoriaNovedad
  resumen: string
  portada: ImagenNovedad
  destacada: boolean
  /** GROQ devuelve null (no undefined) cuando la novedad no tiene botón. */
  cta: CtaNovedad | null
  appDownload: boolean
  cuerpo: PortableTextBlock[]
}
