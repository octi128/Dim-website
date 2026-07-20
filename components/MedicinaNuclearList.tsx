"use client";

import { useState, useMemo } from "react";
import {
  Search,
  X,
  Plus,
  Minus,
  MessageCircle,
  Heart,
  Atom,
  Bean,
  Wind,
  Bone,
  Activity,
  Brain,
  Droplets,
  type LucideIcon,
} from "lucide-react";

const TURNO_URL = "http://wa.link/ldwg9m";

type Category = {
  name: string;
  icon: LucideIcon;
  items: string[];
};

const CATEGORIES: Category[] = [
  {
    name: "Cardiología",
    icon: Heart,
    items: [
      "Radiocardiograma en reposo.",
      "Perfusión miocárdica con Sestamibi Spect Gatillado. Reposo y esfuerzo - Reposo y Dipiridamol - Reposo y Dobutamina.",
      "Reposo y prueba de hiperventilación y frío.",
    ],
  },
  {
    name: "Endocrinología",
    icon: Atom,
    items: [
      "Curva de captación tiroides con Iodo 131.",
      "Centellograma de tiroides.",
      "Barrido corporal total con Iodo 131.",
      "Barrido corporal total con Sestamibi.",
      "Barrido corporal total con MIBG - Iodo 131.",
      "Barrido corporal total con Octreotide - Tc99m.",
      "Dosis terapéuticas con Iodo 131.",
      "Tratamiento del carcinoma de tiroides.",
      "Tratamiento del hipertiroidismo.",
    ],
  },
  {
    name: "Nefrología",
    icon: Bean,
    items: [
      "Centellograma renal.",
      "Radiorrenograma basal.",
      "Radiorrenograma con prueba de Furosemida.",
      "Radiorrenograma con prueba de Captopril.",
      "Centellograma testicular.",
    ],
  },
  {
    name: "Neumonología",
    icon: Wind,
    items: [
      "Centellograma pulmonar de ventilación.",
      "Centellograma pulmonar de perfusión.",
    ],
  },
  {
    name: "Reumatología",
    icon: Bone,
    items: [
      "Spect óseo.",
      "Centellograma óseo.",
      "Centellograma óseo en 3 fases.",
      "Centellograma óseo con Galio 67.",
      "Centellograma óseo con Infectón.",
    ],
  },
  {
    name: "Gastroenterología",
    icon: Activity,
    items: [
      "Centellograma hepático.",
      "Reflujo gastroesofágico.",
      "Centellograma hepatoesplénico.",
      "Detección de mucosa gástrica ectópica (Meckel).",
      "Detección de hemorragia digestiva.",
      "Centellograma de glándulas salivales.",
      "Vaciamiento gástrico (sólido y líquido).",
    ],
  },
  {
    name: "Neurología",
    icon: Brain,
    items: ["Spect cerebral."],
  },
  {
    name: "Sistema linfático",
    icon: Droplets,
    items: [
      "Marcación de ganglio centinela.",
      "Linfografía radioisotópica de miembros inferiores.",
    ],
  },
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function MedicinaNuclearList() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const q = normalize(query.trim());

  const filtered = useMemo(() => {
    if (!q) return CATEGORIES.map((c, i) => ({ cat: c, index: i }));
    return CATEGORIES.map((c, i) => ({ cat: c, index: i })).filter(
      ({ cat }) =>
        normalize(cat.name).includes(q) ||
        cat.items.some((it) => normalize(it).includes(q))
    );
  }, [q]);

  const isSearching = q.length > 0;

  return (
    <div>
      {/* ── Search ── */}
      <div className="bg-white border border-[#E6EAF1] rounded-2xl p-5 mb-8 shadow-sm">
        <label
          htmlFor="nuclear-search"
          className="block text-sm font-medium text-[#4B4F56] mb-3"
        >
          Buscá un estudio:
        </label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737985] pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="nuclear-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Centellograma, Spect, Tiroides…"
            aria-label="Buscar estudio de medicina nuclear"
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
      </div>

      {/* ── Accordion ── */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map(({ cat, index }) => {
            const Icon = cat.icon;
            const isOpen = isSearching || openIndex === index;
            return (
              <div
                key={cat.name}
                className="bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden transition-colors hover:border-[#F26A21]/40"
              >
                <button
                  onClick={() =>
                    setOpenIndex((prev) => (prev === index ? null : index))
                  }
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <span className="w-10 h-10 shrink-0 bg-gradient-to-br from-[#FFF3EC] to-[#F4EFE7] rounded-xl flex items-center justify-center">
                    <Icon
                      size={18}
                      className="text-[#F26A21]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="flex-1 font-medium text-[#081827] leading-snug">
                    {cat.name}
                  </span>
                  <span className="shrink-0 text-[#737985]" aria-hidden="true">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="pl-14">
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-5">
                        {cat.items.map((it) => (
                          <li
                            key={it}
                            className="flex items-start gap-2 text-[#4B4F56] text-sm font-light leading-relaxed"
                          >
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F26A21] shrink-0"
                              aria-hidden="true"
                            />
                            {it}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={TURNO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                      >
                        <MessageCircle size={15} aria-hidden="true" />
                        Solicitar turno
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#4B4F56] font-medium mb-1">No encontramos ese estudio</p>
          <p className="text-[#737985] text-sm mb-4">
            Probá con otro nombre o{" "}
            <button
              onClick={() => setQuery("")}
              className="text-[#F26A21] hover:underline font-medium"
            >
              limpiá la búsqueda
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
