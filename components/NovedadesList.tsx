"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Calendar, ChevronRight, ArrowUpRight, Smartphone, X } from "lucide-react";
import AppStoreLink from "@/components/AppStoreLink";
import { urlFor } from "@/sanity/lib/image";
import { mesYAnio } from "@/lib/fecha";
import type { Novedad } from "@/sanity/lib/queries";

/** Un href de Sanity es externo si sale del sitio. El schema sólo admite `/…` o `https://…`. */
function esExterno(href: string) {
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
 * migrado, pero el schema los ofrece en el editor: sin estos componentes,
 * la primera novedad que use uno saldría con los estilos por defecto del
 * navegador en medio del texto.
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

export default function NovedadesList({ novedades }: { novedades: Novedad[] }) {
  const [selected, setSelected] = useState<Novedad | null>(null);

  const close = useCallback(() => setSelected(null), []);

  // Al llegar con #novedad-<slug> (por ejemplo desde el carrusel del home)
  // abrimos esa novedad. Limpiamos el hash enseguida para que al cerrar el modal
  // la URL quede consistente y no vuelva a abrirse.
  useEffect(() => {
    const match = window.location.hash.match(/^#novedad-([a-z0-9-]+)$/);
    if (!match) return;
    const novedad = novedades.find((n) => n.slug === match[1]);
    if (!novedad) return;
    setSelected(novedad);
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }, [novedades]);

  // Cerrar con Escape + bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    if (!selected) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected, close]);

  return (
    <>
      {/* ────────── Grid de tarjetas ────────── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {novedades.map((item) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setSelected(item)}
            className="group text-left bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden flex flex-col h-full hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7]"
          >
            {/* Foto de portada */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4EFE7]">
              {/* Decorativa: la portada es una foto genérica de la categoría,
                  compartida por varias novedades. El título de la tarjeta es el
                  que nombra el contenido, y el alt acá sólo alargaría el nombre
                  accesible del botón. En el modal sí se usa el alt de Sanity. */}
              <Image
                src={urlFor(item.portada).url()}
                alt=""
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/25 to-transparent" />
              {item.destacada && (
                <span className="absolute left-3 top-3 font-mono text-[9px] font-semibold uppercase tracking-widest text-white bg-[#F26A21] rounded-full px-2.5 py-1 shadow-sm">
                  Nuevo
                </span>
              )}
            </div>

            {/* Contenido */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-1.5 text-[#F26A21] mb-3">
                <Calendar size={13} strokeWidth={2} aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-widest">
                  {mesYAnio(item.fecha)}
                </span>
              </div>

              <h3 className="font-display text-lg font-medium text-[#081827] leading-snug">
                {item.titulo}
              </h3>

              <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#5636A4] group-hover:text-[#F26A21] transition-colors">
                Ver más
                <ChevronRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ────────── Modal / Overlay ────────── */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
          onClick={close}
        >
          {/* Backdrop translúcido */}
          <div
            className="absolute inset-0 bg-[#081827]/55 backdrop-blur-sm backdrop-enter"
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[88vh] sm:max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-[0_24px_80px_rgba(8,24,39,.28)] modal-enter"
          >
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm border border-[#E6EAF1] text-[#4B4F56] hover:text-[#081827] hover:border-[#F26A21]/50 transition-colors"
            >
              <X size={18} strokeWidth={2.25} aria-hidden="true" />
            </button>

            {/* Foto de portada del modal */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F4EFE7] rounded-t-3xl">
              {/* Acá sí lleva el alt de Sanity: la imagen se presenta sola, a
                  tamaño grande, y no está compitiendo con el nombre de un control. */}
              <Image
                src={urlFor(selected.portada).url()}
                alt={selected.portada.alt}
                fill
                sizes="(max-width:640px) 100vw, 672px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/50 via-transparent to-transparent" />
              {/* Handle mobile sobre la imagen */}
              <div
                className="sm:hidden absolute left-1/2 top-3 -translate-x-1/2 h-1 w-10 rounded-full bg-white/80"
                aria-hidden="true"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-1.5 text-[#F26A21] mb-3">
                <Calendar size={13} strokeWidth={2} aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-widest">
                  {mesYAnio(selected.fecha)}
                </span>
                {selected.destacada && (
                  <span className="ml-1 font-mono text-[9px] font-semibold uppercase tracking-widest text-[#5636A4] bg-[#5636A4]/10 rounded-full px-2 py-0.5">
                    Nuevo
                  </span>
                )}
              </div>

              <h2
                id="news-modal-title"
                className="font-display text-2xl sm:text-3xl font-medium text-[#081827] leading-tight tracking-[-0.02em] pr-8 mb-5"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                {selected.titulo}
              </h2>

              <div className="space-y-3.5 border-t border-[#E6EAF1] pt-5">
                <PortableText value={selected.cuerpo} components={CUERPO} />

                {(selected.cta || selected.appDownload) && (
                  <div className="flex flex-wrap gap-2.5 pt-3">
                    {selected.cta &&
                      (esExterno(selected.cta.href) ? (
                        <a
                          href={selected.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#103A73] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B2440] transition-colors"
                        >
                          {selected.cta.label}
                          <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={selected.cta.href}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#103A73] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B2440] transition-colors"
                        >
                          {selected.cta.label}
                          <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden="true" />
                        </Link>
                      ))}

                    {selected.appDownload && (
                      <AppStoreLink className="inline-flex items-center gap-1.5 rounded-full border border-[#E6EAF1] bg-[#FBFAF7] px-5 py-2.5 text-sm font-semibold text-[#081827] hover:border-[#F26A21]/50 transition-colors">
                        <Smartphone
                          size={14}
                          strokeWidth={2.25}
                          className="text-[#F26A21]"
                          aria-hidden="true"
                        />
                        Descargar App DIM SALUD
                      </AppStoreLink>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
