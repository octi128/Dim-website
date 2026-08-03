/**
 * Formato de los datos de contacto que vienen de Sanity.
 *
 * En el CMS los números se guardan crudos, solo dígitos: el WhatsApp como
 * `5491166485555` y el teléfono como `1155548888`. Este módulo es el único
 * lugar donde esos dígitos se convierten en algo que se muestra o se linkea.
 * Si el formato tiene que cambiar, se cambia acá y en ningún otro lado.
 *
 * Todas las funciones son puras y no dependen de React ni de Sanity.
 */

/** Prefijo internacional de celular argentino: 54 (país) + 9 (celular). */
const PREFIJO_CELULAR_AR = "549";

/** Dígitos que quedan después del prefijo: 2 de área + 8 de abonado. */
const LARGO_NACIONAL = 10;

/** Un teléfono fijo sin característica: 8 dígitos, se parte en dos mitades. */
const LARGO_ABONADO = 8;

/** Dígitos de característica en un número nacional de 10 (caso AMBA: "11"). */
const LARGO_AREA = 2;

/** Corte del abonado para mostrarlo partido: 5554-8888. */
const CORTE_ABONADO = 4;

/**
 * Link de WhatsApp. Recibe el número tal como lo valida el schema
 * (`549` + 10 dígitos) y no lo modifica: wa.me espera exactamente eso.
 */
export function whatsappUrl(numero: string): string {
  return `https://wa.me/${numero}`;
}

/**
 * Número de WhatsApp legible: `5491166485555` → `11-6648-5555`.
 *
 * Saca el prefijo internacional y parte lo que queda en área + abonado. Si el
 * número no tiene la forma esperada lo devuelve sin tocar, porque mostrarlo
 * crudo es mejor que mostrarlo mal cortado.
 */
export function whatsappLabel(numero: string): string {
  if (!numero.startsWith(PREFIJO_CELULAR_AR)) return numero;

  const nacional = numero.slice(PREFIJO_CELULAR_AR.length);
  if (nacional.length !== LARGO_NACIONAL) return numero;

  return formatearNacional(nacional);
}

/**
 * Link de teléfono. Devuelve siempre todos los dígitos que vinieron del CMS,
 * sin recortar la característica: el label se acorta, la URL nunca, porque es
 * lo que efectivamente se disca.
 */
export function telefonoUrl(numero: string): string {
  return `tel:${numero}`;
}

/**
 * Teléfono legible: `1155548888` → `5554-8888`, `55548888` → `5554-8888`.
 *
 * Solo se formatean los dos largos previstos. Cualquier otro (un 0800, una
 * característica del interior de 3 o 4 dígitos) se devuelve sin tocar: partirlo
 * con la regla de AMBA daría un número mal escrito.
 */
export function telefonoLabel(numero: string): string {
  if (numero.length === LARGO_NACIONAL) return partirAbonado(numero.slice(LARGO_AREA));
  if (numero.length === LARGO_ABONADO) return partirAbonado(numero);
  return numero;
}

/** Nombre visible de cada red social. Las claves son los `value` del schema. */
const NOMBRES_DE_RED: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  x: "X",
};

/**
 * Nombre visible de una red a partir del valor guardado en Sanity.
 * Si aparece una plataforma que el schema todavía no conoce, se muestra el
 * valor crudo en vez de dejar el link sin texto.
 */
export function plataformaLabel(plataforma: string): string {
  return NOMBRES_DE_RED[plataforma] ?? plataforma;
}

/** `1166485555` → `11-6648-5555`. Espera exactamente LARGO_NACIONAL dígitos. */
function formatearNacional(nacional: string): string {
  const area = nacional.slice(0, LARGO_AREA);
  return `${area}-${partirAbonado(nacional.slice(LARGO_AREA))}`;
}

/** `66485555` → `6648-5555`. Espera exactamente LARGO_ABONADO dígitos. */
function partirAbonado(abonado: string): string {
  return `${abonado.slice(0, CORTE_ABONADO)}-${abonado.slice(CORTE_ABONADO)}`;
}
