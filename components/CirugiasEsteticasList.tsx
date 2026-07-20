"use client";

import { useState, useMemo } from "react";
import {
  Search,
  X,
  Plus,
  Minus,
  MessageCircle,
  Scissors,
  Sparkles,
  Wind,
  Flower2,
  Droplets,
  Zap,
  Activity,
  Waves,
  Tag,
  type LucideIcon,
} from "lucide-react";

const TURNO_URL =
  "https://wa.me/5491171529032?text=Hola%2C%20quiero%20solicitar%20un%20turno";
const PRESUPUESTO_URL = "https://wa.me/5491171529032";

type Category = {
  name: string;
  icon: LucideIcon;
  description?: string;
  items?: string[];
  cta?: { label: string; href: string };
};

const CATEGORIES: Category[] = [
  {
    name: "Cirugías plásticas",
    icon: Scissors,
    items: [
      "Explantación mamaria",
      "Ginecomastia",
      "Implante Mamario",
      "Implante capilar",
      "Mastopexia",
      "Reducción mamaria",
      "Lipoescultura",
      "Lipoaspiración",
      "Lipotransferencia",
      "Rinoplastia",
      "Auriculoplastia",
      "Lifting",
      "Blefaroplastia",
      "Mini-dermolipectomía abdominal",
      "Dermolipectomía",
      "Clitoroplastía",
      "Estrechamiento vaginal",
      "Cirugía para incontinencia urinaria",
      "Labioplastia de labios mayores",
      "Labioplastia de labios menores",
      "Cirugía para enfermedad de Peyronie",
      "Prótesis de pene",
      "Alargamiento peneano",
      "Pene oculto",
      "Engrosamiento peneano",
      "Engrosamiento del glande",
      "Escrotoplastia",
    ],
  },
  {
    name: "Tratamientos Faciales",
    icon: Sparkles,
    items: [
      "Toxina Botulínica (Botox)",
      "Dermaplaning",
      "Dermapen",
      "Rellenos faciales (Ácido Hialurónico) en labios, ojeras, pómulos, región mandibular, región mentoniana y surcos nasogenianos",
      "Bioestimuladores Faciales (indicado para suavizar líneas finas y rejuvenecer el rostro)",
      "Mesoterapia Facial",
      "Cosmetología Facial (indicado para acné, involución cutánea, rosácea, piel sensible, envejecimiento, arrugas y/o flacidez)",
      "Punta de Diamante (limpieza facial)",
      "Tratamiento para lesiones pigmentarias (láser Candela)",
    ],
  },
  {
    name: "Mesoterapia Capilar",
    icon: Wind,
    description:
      "Es un tratamiento de bioestimulación que favorece la reactivación de las células capilares y de esta manera controlar la caída, fortalecer el cabello y asegurar que no va a volver a repetirse la caída del mismo.",
  },
  {
    name: "Cosmetología Corporal",
    icon: Flower2,
    items: [
      "Masaje descontracturante de cuerpo completo",
      "Masajes reductores por zona",
      "Drenaje Linfático Manual",
      "Drenaje Linfático Botas (Presoterapia)",
      "Mesoterapia Corporal",
      "Criolipolisis Plana",
    ],
  },
  {
    name: "Plasma Rico en Plaquetas Facial - Capilar y Corporal",
    icon: Droplets,
    description:
      "Está indicado para: Caída y fortalecimiento capilar, Cicatrices de acné, Rejuvenecimiento, Prevención del envejecimiento, Celulitis y Estrías.",
  },
  {
    name: "Remodelación Corporal Sin Cirugía (Evolve X)",
    icon: Zap,
    description:
      "Es una nueva tecnología que combina 2 procedimientos, la radiofrecuencia y la estimulación muscular eléctrica (EMS). Se utiliza para disminuir celulitis, reducir adiposidad localizada, o aumentar la tonificación muscular.",
  },
  {
    name: "Tratamientos para varices y arañitas",
    icon: Activity,
    description:
      "Las varices y las arañas vasculares son manifestaciones de la insuficiencia venosa crónica. La diferencia es el tamaño y la apariencia. Algunos tratamientos son:",
    items: ["Escleroterapia / Espuma", "Láser Transdérmico (Candela)"],
  },
  {
    name: "Candela — Un nuevo concepto en depilación",
    icon: Waves,
    description:
      "Elimina el vello de forma rápida, eficaz y segura en todo tipo de pieles y pelos. Es totalmente indoloro gracias a su sistema de frío controlado, que acompaña cada emisión del láser y protege la piel durante la aplicación. La cantidad y duración de las sesiones dependerá de la zona a tratar y de las características biológicas de cada persona.",
  },
  {
    name: "Valores",
    icon: Tag,
    description: "Para consultar los valores de nuestros tratamientos hacé click en el botón.",
    cta: { label: "Presupuestos", href: PRESUPUESTO_URL },
  },
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function CirugiasEsteticasList() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const q = normalize(query.trim());

  const filtered = useMemo(() => {
    if (!q) return CATEGORIES.map((c, i) => ({ cat: c, index: i }));
    return CATEGORIES.map((c, i) => ({ cat: c, index: i })).filter(
      ({ cat }) =>
        normalize(cat.name).includes(q) ||
        cat.description?.toLowerCase().includes(q) ||
        cat.items?.some((it) => normalize(it).includes(q))
    );
  }, [q]);

  const isSearching = q.length > 0;

  return (
    <div>
      {/* ── Search ── */}
      <div className="bg-white border border-[#E6EAF1] rounded-2xl p-5 mb-8 shadow-sm">
        <label
          htmlFor="estetica-search"
          className="block text-sm font-medium text-[#4B4F56] mb-3"
        >
          Buscá un tratamiento:
        </label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737985] pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="estetica-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Depilación, Botox, Lipoescultura…"
            aria-label="Buscar tratamiento estético"
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
                      {cat.description && (
                        <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-4">
                          {cat.description}
                        </p>
                      )}
                      {cat.items && (
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
                      )}
                      {cat.cta ? (
                        <a
                          href={cat.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#081827] hover:bg-[#103A73] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                        >
                          <MessageCircle size={15} aria-hidden="true" />
                          {cat.cta.label}
                        </a>
                      ) : (
                        <a
                          href={TURNO_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                        >
                          <MessageCircle size={15} aria-hidden="true" />
                          Solicitar turno
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#4B4F56] font-medium mb-1">No encontramos ese tratamiento</p>
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
