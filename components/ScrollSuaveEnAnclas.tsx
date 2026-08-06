"use client";

import { useEffect } from "react";

/**
 * Scroll suave para los anclas internos (`<a href="#seccion">`), y sólo para ellos.
 *
 * POR QUÉ EXISTE ESTO EN JS Y NO EN CSS
 *
 * Lo natural sería `html { scroll-behavior: smooth }`, y así estaba. El problema
 * es que esa propiedad la lee el contenedor que scrollea, no quien pidió el
 * scroll: CSS no puede distinguir el origen. Entonces el scroll al tope que hace
 * Next en cada navegación también salía animado, y cambiar de página desde el
 * pie de una larga se convertía en un recorrido de varios segundos por toda la
 * página anterior.
 *
 * Acotarlo con `html:has(:target)` tampoco alcanza —está medido—: el `:target`
 * sí llega a tiempo para el ancla, pero queda activo después, y cuando Next
 * navega hace `pushState` y el scroll en la misma tarea, antes de que se
 * recalculen los estilos. La regla todavía matchea en ese momento y la
 * navegación vuelve a salir animada. O sea: el bug no desaparece, se vuelve
 * intermitente y aparece sólo después de haber usado un ancla.
 *
 * Por eso el scroll suave se dispara desde el handler del click, que es el único
 * lugar donde se sabe con certeza que el scroll lo pidió un ancla.
 *
 * Es un único listener delegado en `document`, no uno por link: los 16 anclas
 * del sitio viven en 13 páginas distintas y no hace falta tocar ninguna.
 */
export default function ScrollSuaveEnAnclas() {
  useEffect(() => {
    function alHacerClick(evento: MouseEvent) {
      // Click con modificador o que no sea el botón principal: es "abrir en otra
      // pestaña", "descargar" y demás. No es nuestro asunto.
      if (
        evento.defaultPrevented ||
        evento.button !== 0 ||
        evento.metaKey ||
        evento.ctrlKey ||
        evento.shiftKey ||
        evento.altKey
      ) {
        return;
      }

      const origen = evento.target;
      if (!(origen instanceof Element)) return;

      // Sólo hrefs que ARRANCAN con "#". Un link a otra página con hash es
      // "/pagina#seccion" y no entra acá: ese lo tiene que resolver Next, porque
      // implica cambiar de ruta. Los externos tampoco entran.
      const ancla = origen.closest("a");
      if (!ancla || ancla.target === "_blank") return;

      const href = ancla.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = decodeURIComponent(href.slice(1));
      if (!id) return; // href="#" pelado, usado como placeholder

      const destino = document.getElementById(id);
      if (!destino) return; // ancla rota: que el navegador haga lo suyo

      evento.preventDefault();

      const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      destino.scrollIntoView({
        behavior: reducirMovimiento ? "auto" : "smooth",
        block: "start",
      });

      // La URL tiene que reflejar el ancla: es lo que hace que el link se pueda
      // compartir y que Atrás vuelva a donde estabas. `pushState` y no
      // `replaceState` porque un ancla nativo también agrega entrada al historial.
      history.pushState(null, "", href);

      // Mover el foco al destino. Sin esto, quien navega por teclado hace click
      // en el CTA del hero, la página baja, y el siguiente Tab sigue desde el
      // CTA en vez de desde la sección: el foco se queda arriba mientras la
      // vista está abajo. `preventScroll` es imprescindible, porque si no el
      // foco hace su propio salto y cancela la animación que acabamos de pedir.
      const yaEraFocusable = destino.hasAttribute("tabindex");
      if (!yaEraFocusable) destino.setAttribute("tabindex", "-1");
      destino.focus({ preventScroll: true });

      // El tabindex era sólo para poder enfocar una sección, que no es un
      // control. Se saca al salir para no dejar atributos raros en el DOM.
      if (!yaEraFocusable) {
        destino.addEventListener(
          "blur",
          () => destino.removeAttribute("tabindex"),
          { once: true }
        );
      }
    }

    document.addEventListener("click", alHacerClick);
    return () => document.removeEventListener("click", alHacerClick);
  }, []);

  return null;
}
