"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Lee un parámetro de la URL sin sacar la página del prerenderizado.
 *
 * Existe para sembrar los filtros de los listados (especialidades, estudios,
 * laboratorio, coberturas) cuando se llega desde el buscador global con `?q=`.
 *
 * No usa las APIs de Next a propósito. Las alternativas eran peores:
 *
 * - Pasar `searchParams` desde la página la vuelve dinámica (`ƒ`), y son cuatro de
 *   las páginas más importantes del sitio: dejan de prerenderizarse y de cachearse.
 * - `useSearchParams()` obliga a un límite de Suspense y saca el listado del HTML
 *   prerenderizado. Ese listado (80 especialidades, 90 coberturas) es justamente
 *   el contenido que indexa Google.
 *
 * `useSyncExternalStore` es la forma correcta de leer algo que sólo existe en el
 * navegador desde un componente que igual se prerenderiza: el snapshot del servidor
 * es cadena vacía y el del cliente sale de la URL. React aplica el segundo durante
 * la hidratación, antes de pintar, así que no hay parpadeo. Leerlo en un `useEffect`
 * lo aplicaría después de pintar, que es exactamente el frame de más que queremos
 * evitar.
 *
 * Escucha `popstate` para que ir y volver con los botones del navegador vuelva a
 * sembrar el filtro correcto.
 */

function subscribe(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

export function useQueryParam(name: string): string {
  const getSnapshot = useCallback(
    () => new URLSearchParams(window.location.search).get(name) ?? "",
    [name],
  );

  // El snapshot del servidor es "" porque en el prerender no hay URL de navegador.
  return useSyncExternalStore(subscribe, getSnapshot, () => "");
}
