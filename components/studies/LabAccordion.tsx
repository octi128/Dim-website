"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, ArrowUpRight, X, Clock } from "lucide-react";
import type { LabCategory } from "@/lib/lab-studies";
import StudyIcon from "./StudyIcon";

interface Props {
  categories: LabCategory[];
}

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function categoryMatches(cat: LabCategory, q: string) {
  const haystack = normalize(
    [cat.title, cat.description, cat.note ?? "", (cat.items ?? []).join(" ")].join(" ")
  );
  return haystack.includes(q);
}

export default function LabAccordion({ categories }: Props) {
  const [query, setQuery] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const q = normalize(query.trim());
  const filtered = useMemo(() => {
    if (!q) return categories;
    return categories.filter((c) => categoryMatches(c, q));
  }, [categories, q]);

  // When user types, expand all matching categories that contain a matching item
  const itemsFiltered = (cat: LabCategory): string[] | undefined => {
    if (!q || !cat.items) return cat.items;
    return cat.items.filter((it) => normalize(it).includes(q));
  };

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737985] pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ej. Glucemia, Vitamina B1, Curva..."
          className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm bg-white border border-[#E6EAF1] outline-none focus:ring-2 focus:ring-[#103A73]/15 focus:border-[#103A73] transition-all placeholder:text-[#737985] text-[#081827]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[#737985] hover:text-[#081827] hover:bg-[#F4EFE7] transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X size={14} strokeWidth={2.25} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#737985]">
          {q ? `${filtered.length} categorías coinciden` : `${categories.length} categorías de estudios`}
        </p>
        {openSlug && (
          <button
            type="button"
            onClick={() => setOpenSlug(null)}
            className="text-xs font-medium text-[#103A73] hover:text-[#F26A21] transition-colors"
          >
            Cerrar todo
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-[#E6EAF1] rounded-2xl p-10 text-center">
          <p className="font-display text-2xl font-light text-[#081827] mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            No encontramos resultados para <em className="italic text-[#5636A4]">«{query}»</em>
          </p>
          <p className="text-sm text-[#4B4F56] font-light mb-5">
            Probá con otra palabra o consultá el listado completo.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            Ver todos los estudios
          </button>
        </div>
      )}

      <div className="space-y-2.5">
        {filtered.map((cat) => {
          const open = openSlug === cat.slug || !!q;
          const items = itemsFiltered(cat);
          return (
            <div
              key={cat.slug}
              className={[
                "bg-white border rounded-2xl overflow-hidden transition-colors duration-200",
                open ? "border-[#103A73]/30 shadow-[0_8px_32px_rgba(8,24,39,.06)]" : "border-[#E6EAF1] hover:border-[#D8DEE8]",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => setOpenSlug(openSlug === cat.slug ? null : cat.slug)}
                className="w-full flex items-center gap-4 text-left px-5 lg:px-6 py-5 group"
                aria-expanded={open}
              >
                <span
                  className={[
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                    open ? "bg-[#F26A21] text-white" : "bg-[#F4EFE7] text-[#F26A21]",
                  ].join(" ")}
                >
                  <StudyIcon name={cat.icon} className="" size={18} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-display text-lg lg:text-xl font-medium text-[#081827] tracking-[-0.01em] leading-snug" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                    {cat.title}
                  </span>
                  {cat.fastingHours !== undefined && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-mono uppercase tracking-widest text-[#737985]">
                      <Clock size={10} strokeWidth={2.25} />
                      {cat.fastingHours} hs de ayuno
                    </span>
                  )}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className={["text-[#737985] flex-shrink-0 transition-transform duration-200", open ? "rotate-180 text-[#103A73]" : ""].join(" ")}
                />
              </button>

              {open && (
                <div className="px-5 lg:px-6 pb-6 pt-1 border-t border-[#E6EAF1]/60">
                  <div className="pl-14 pr-2 pt-5 space-y-4">
                    <p className="text-[#4B4F56] font-light text-[15px] leading-relaxed">{cat.description}</p>

                    {items && items.length > 0 && (
                      <div>
                        <p className="text-[#081827] font-semibold text-sm mb-2.5">
                          {q ? `${items.length} estudios coinciden:` : "Estudios incluidos:"}
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                          {items.map((item) => (
                            <li key={item} className="flex gap-2.5 text-[#4B4F56] font-light text-[14px] leading-relaxed">
                              <span className="w-1 h-1 rounded-full bg-[#F26A21] mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {cat.note && (
                      <p className="text-[#4B4F56] font-light text-[14px] leading-relaxed bg-[#FBFAF7] border border-[#E6EAF1] rounded-xl px-4 py-3">
                        <span className="font-semibold text-[#081827]">Recordá: </span>
                        {cat.note}
                      </p>
                    )}

                    {cat.scheduleHref && (
                      <div className="pt-1">
                        <Link
                          href={cat.scheduleHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                        >
                          Solicitar turno
                          <ArrowUpRight size={14} strokeWidth={2.25} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
