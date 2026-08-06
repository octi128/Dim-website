import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";

/**
 * Este archivo NO lleva `"use client"` a propósito.
 *
 * Hoy su único consumidor es la página individual de cada novedad, que es Server
 * Component: poner la directiva mandaría el cuerpo entero al bundle del cliente
 * sin ninguna razón. Sin directiva el módulo es agnóstico, así que si mañana lo
 * necesita un componente cliente también funciona ahí, sin tocar nada.
 *
 * No hay hooks, estado ni handlers: son componentes de presentación puros.
 */

/** Un href de Sanity es externo si sale del sitio. El schema sólo admite `/…` o `https://…`. */
export function esExterno(href: string) {
  return href.startsWith("https://");
}

/**
 * Cómo se pinta el cuerpo Portable Text.
 *
 * Los párrafos y las viñetas replican el markup que tenía el cuerpo cuando vivía
 * en `lib/novedades.ts`, incluido el punto naranja dibujado a mano en lugar del
 * bullet nativo.
 *
 * Los subtítulos, la lista numerada y los links no existen en el contenido
 * migrado, pero el schema los ofrece en el editor: sin estos componentes, la
 * primera novedad que use uno saldría con los estilos por defecto del navegador
 * en medio del texto.
 */
const CUERPO: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[#4B4F56] font-light text-[15px] leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h3
        className="font-display text-xl font-medium text-[#081827] leading-snug pt-2"
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
      >
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-[15px] font-semibold text-[#081827] leading-snug pt-1">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-2 pl-1">{children}</ul>,
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 text-[#4B4F56] font-light text-[15px] leading-relaxed">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-2.5 text-[#4B4F56] font-light text-[15px] leading-relaxed">
        <span
          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#F26A21]"
          aria-hidden="true"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "";
      return (
        <a
          href={href}
          {...(esExterno(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-[#5636A4] underline underline-offset-2 hover:text-[#F26A21] transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

/** El cuerpo de una novedad. Mismo render en el modal del listado y en la página propia. */
export default function CuerpoNovedad({ cuerpo }: { cuerpo: PortableTextBlock[] }) {
  return <PortableText value={cuerpo} components={CUERPO} />;
}
