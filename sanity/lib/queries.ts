import {defineQuery} from 'next-sanity'

/**
 * El singleton de configuración del sitio.
 *
 * Se filtra por `_id` además de por `_type`: el ítem del Studio siempre edita
 * el documento con ese id fijo, así que pedirlo explícitamente evita traer
 * cualquier otro documento del mismo tipo que hubiera quedado suelto antes de
 * que el singleton estuviera blindado.
 *
 * `portalUrl` se trae aunque el Footer todavía no lo use: lo va a consumir el
 * Header, que es donde el dato aparece cuatro veces.
 */
export const CONFIGURACION_QUERY = defineQuery(`
  *[_type == "configuracionSitio" && _id == "configuracionSitio"][0]{
    whatsappCentral,
    telefonoCentral,
    emailTurnos,
    portalUrl,
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
  portalUrl: string
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
