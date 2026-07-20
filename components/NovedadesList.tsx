"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, ArrowUpRight, Smartphone, X } from "lucide-react";
import AppStoreLink from "@/components/AppStoreLink";
import type { NewsItem } from "@/lib/novedades";

function BodyBlocks({ item }: { item: NewsItem }) {
  return (
    <>
      {item.body.map((block, i) =>
        "p" in block ? (
          <p key={i} className="text-[#4B4F56] font-light text-[15px] leading-relaxed">
            {block.p}
          </p>
        ) : (
          <ul key={i} className="space-y-2 pl-1">
            {block.list.map((li, j) => (
              <li
                key={j}
                className="flex gap-2.5 text-[#4B4F56] font-light text-[15px] leading-relaxed"
              >
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#F26A21]"
                  aria-hidden="true"
                />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
}

export default function NovedadesList({ items }: { items: NewsItem[] }) {
  const [selected, setSelected] = useState<NewsItem | null>(null);

  const close = useCallback(() => setSelected(null), []);

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
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className="group text-left bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden flex flex-col h-full hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7]"
          >
            {/* Foto de portada */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4EFE7]">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/25 to-transparent" />
              {item.featured && (
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
                  {item.date}
                </span>
              </div>

              <h3 className="font-display text-lg font-medium text-[#081827] leading-snug">
                {item.title}
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
              <Image
                src={selected.image}
                alt=""
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
                  {selected.date}
                </span>
                {selected.featured && (
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
                {selected.title}
              </h2>

              <div className="space-y-3.5 border-t border-[#E6EAF1] pt-5">
                <BodyBlocks item={selected} />

                {(selected.cta || selected.appDownload) && (
                  <div className="flex flex-wrap gap-2.5 pt-3">
                    {selected.cta &&
                      (selected.cta.external ? (
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
