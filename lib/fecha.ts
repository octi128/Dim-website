/**
 * Formateo de las fechas que vienen de Sanity.
 *
 * Sanity guarda `fecha` como un `date` ISO ("2026-07-01"), pero las novedades
 * se muestran —y siempre se mostraron— sólo como mes y año.
 *
 * No es una decisión estética: el contenido original nunca tuvo día. Los días
 * que hay en Sanity los inventó `scripts/migrar-novedades.ts` para desempatar
 * las novedades del mismo mes y reproducir el orden del listado. Mostrar la
 * fecha completa sería publicar un dato que no existe.
 */

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/**
 * "2026-07-01" → "Julio 2026"
 *
 * Parte el string a mano en vez de usar `Date` a propósito. `new Date("2026-07-01")`
 * se interpreta como medianoche UTC: al formatearla en la zona horaria de
 * Argentina (UTC−3) cae el 30 de junio y el mes sale mal. Además, el `es-AR` de
 * `toLocaleDateString` devuelve "julio de 2026", que no es el formato del sitio.
 *
 * Ante una fecha que no tenga la forma esperada devuelve el string original:
 * mostrar el dato crudo es preferible a romper el render de la página.
 */
export function mesYAnio(fecha: string): string {
  const [anio, mes] = fecha.split("-");
  const nombre = MESES[Number(mes) - 1];

  if (!nombre || !anio) return fecha;

  return `${nombre} ${anio}`;
}
