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
