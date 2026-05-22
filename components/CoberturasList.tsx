"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { COVERAGES, COVERAGE_TAGS, ALPHABET, type CoverageTag } from "@/lib/coverages";

const TAG_STYLES: Record<CoverageTag, string> = {
  Prepaga: "bg-[#1956A6]/10 text-[#1956A6]",
  "Obra Social": "bg-[#6E8B7B]/15 text-[#4a6b5a]",
  Hospital: "bg-[#103A73]/10 text-[#103A73]",
  Mutual: "bg-[#5636A4]/10 text-[#5636A4]",
  ART: "bg-[#F26A21]/10 text-[#C84F12]",
  Programa: "bg-[#4B4F56]/10 text-[#4B4F56]",
};

const VALIDITY_STYLES: Record<number, { badge: string; label: string }> = {
  30: { badge: "bg-[#E6EAF1] text-[#4B4F56]", label: "30 días" },
  60: { badge: "bg-[#1956A6]/10 text-[#1956A6]", label: "60 días" },
  90: { badge: "bg-[#5636A4]/10 text-[#5636A4]", label: "90 días" },
};

export default function CoberturasList() {
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<CoverageTag | null>(null);

  const filtered = useMemo(() => {
    return COVERAGES.filter((cov) => {
      const matchesQuery = query.trim()
        ? cov.name.toLowerCase().includes(query.trim().toLowerCase())
        : true;
      const matchesLetter = activeLetter
        ? cov.name.toUpperCase().startsWith(activeLetter)
        : true;
      const matchesTag = activeTag ? cov.tag === activeTag : true;
      return matchesQuery && matchesLetter && matchesTag;
    });
  }, [query, activeLetter, activeTag]);

  const usedLetters = useMemo(
    () => new Set(COVERAGES.map((c) => c.name[0].toUpperCase())),
    []
  );

  const clearFilters = () => {
    setQuery("");
    setActiveLetter(null);
    setActiveTag(null);
  };

  const hasFilters = query.trim() || activeLetter || activeTag;

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="bg-white border border-[#E6EAF1] rounded-2xl p-5 mb-8 shadow-sm">
        {/* Search */}
        <div className="relative mb-5">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737985] pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveLetter(null);
            }}
            placeholder="Buscá tu obra social o prepaga…"
            aria-label="Buscar cobertura médica"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E6EAF1] bg-[#FBFAF7] text-[#081827] placeholder:text-[#737985] text-sm focus:outline-none focus:ring-2 focus:ring-[#1956A6]/30 focus:border-[#1956A6] transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737985] hover:text-[#081827] transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {COVERAGE_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              aria-pressed={activeTag === tag}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTag === tag
                  ? TAG_STYLES[tag] + " ring-1 ring-current"
                  : "bg-[#F4EFE7] text-[#4B4F56] hover:bg-[#E6EAF1]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Alphabet pills */}
        <div className="flex flex-wrap gap-1" role="navigation" aria-label="Filtrar por letra">
          {ALPHABET.map((letter) => {
            const available = usedLetters.has(letter);
            return (
              <button
                key={letter}
                onClick={() => {
                  if (!available) return;
                  setActiveLetter(activeLetter === letter ? null : letter);
                  setQuery("");
                }}
                aria-pressed={activeLetter === letter}
                disabled={!available}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  activeLetter === letter
                    ? "bg-[#103A73] text-white"
                    : available
                    ? "bg-[#F4EFE7] text-[#4B4F56] hover:bg-[#E6EAF1]"
                    : "text-[#D8DEE8] cursor-default"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results header ── */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[#737985]">
          {filtered.length === COVERAGES.length ? (
            <span>
              Mostrando <strong className="text-[#081827]">{COVERAGES.length}</strong> coberturas
            </span>
          ) : (
            <span>
              <strong className="text-[#081827]">{filtered.length}</strong> de{" "}
              {COVERAGES.length} coberturas
            </span>
          )}
        </p>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#F26A21] hover:text-[#C84F12] font-medium flex items-center gap-1 transition-colors"
          >
            <X size={12} /> Limpiar filtros
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((cov) => {
            const validity = VALIDITY_STYLES[cov.validity];
            return (
              <div
                key={cov.name}
                className="bg-white border border-[#E6EAF1] rounded-xl p-4 hover:shadow-[0_4px_20px_rgba(8,24,39,.06)] hover:border-[#D8DEE8] transition-all group"
              >
                <p className="text-[#081827] text-sm font-medium leading-snug mb-3 group-hover:text-[#103A73] transition-colors">
                  {cov.name}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${TAG_STYLES[cov.tag]}`}
                  >
                    {cov.tag}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${validity.badge}`}
                    title={`Validez de la orden: ${validity.label}`}
                  >
                    {validity.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#4B4F56] font-medium mb-1">No encontramos resultados</p>
          <p className="text-[#737985] text-sm mb-4">
            Intentá con otro nombre o{" "}
            <button
              onClick={clearFilters}
              className="text-[#F26A21] hover:underline font-medium"
            >
              limpiá los filtros
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
