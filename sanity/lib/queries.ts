import {defineQuery} from 'next-sanity'

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
