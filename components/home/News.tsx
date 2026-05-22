"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const articles = [
  { date: "Oct 2025", tag: "Pediatría", title: "Test de aire espirado pediátrico: diagnóstico sin punción", excerpt: "Alternativa no invasiva para detectar H. pylori y otras patologías digestivas en niños. Ahora disponible en DIM.", href: "/novedades" },
  { date: "Oct 2025", tag: "Bienestar", title: "Yogaterapia: el complemento ideal para la recuperación", excerpt: "Incorporamos yogaterapia como servicio complementario para pacientes en proceso de recuperación.", href: "/novedades" },
  { date: "Oct 2025", tag: "Kinesiología", title: "Nueva especialidad: Kinesiología por ATM", excerpt: "Sumamos Kinesiología especializada en Articulación Temporomandibular. Tratamientos para dolor de mandíbula y bruxismo.", href: "/novedades" },
  { date: "Sep 2025", tag: "Diagnóstico", title: "Nuevo estudio: Doppler Oftalmológico", excerpt: "Estudio no invasivo que evalúa el flujo sanguíneo en los vasos del ojo. Esencial para diagnóstico temprano de glaucoma.", href: "/novedades" },
  { date: "Ago 2025", tag: "Salud", title: "Esteatosis hepática: qué es y cómo se detecta", excerpt: "El hígado graso es una de las enfermedades hepáticas más frecuentes. Cómo detectarla a tiempo con estudios de imágenes.", href: "/novedades" },
];

export default function News() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="bg-[#F4EFE7] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left */}
          <div>
            <div className="inline-flex items-center border border-[#D8DEE8] bg-white/60 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Novedades
            </div>
            <h2
              className="font-display text-4xl font-light tracking-[-0.03em] text-[#081827] leading-tight mb-4"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Lo último <em className="italic text-[#5636A4]">de DIM.</em>
            </h2>
            <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-6">
              Nuevos servicios, incorporaciones de especialidades y artículos escritos por nuestros especialistas.
            </p>
            <Link
              href="/novedades"
              className="inline-flex items-center bg-[#081827] hover:bg-[#103A73] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            >
              Ver todas las novedades
            </Link>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-2 space-y-2">
            {articles.map((article, i) => (
              <div
                key={i}
                className="bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <div className="flex-shrink-0 text-xs text-[#737985] w-16">{article.date}</div>
                  <div className="w-px h-6 bg-[#E6EAF1] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="inline-block bg-[#F4EFE7] text-[#F26A21] text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider">
                      {article.tag}
                    </span>
                    <p className="font-semibold text-[#081827] text-sm leading-tight truncate pr-4">
                      {article.title}
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-[#737985] transition-transform duration-200 ${expanded === i ? "rotate-180 text-[#F26A21]" : ""}`}
                  />
                </button>
                {expanded === i && (
                  <div className="px-5 pb-5 border-t border-[#E6EAF1] pt-4">
                    <p className="text-[#4B4F56] text-sm font-light leading-relaxed mb-3">{article.excerpt}</p>
                    <Link href={article.href} className="text-sm font-semibold text-[#F26A21] hover:text-[#C84F12] transition-colors">
                      Leer nota completa →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
