import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";
import NovedadesList from "@/components/NovedadesList";
import { NEWS } from "@/lib/novedades";

export const metadata: Metadata = {
  title: "Novedades de DIM | DIM Centros de Salud",
  description:
    "Conocé las últimas novedades de DIM Centros de Salud: nuevos estudios, especialidades, servicios y centros. Los avances médicos y cambios en nuestro sistema, siempre para cuidarte mejor.",
};

const STATS = [
  { value: `+${NEWS.length}`, label: "Novedades publicadas" },
  { value: "2023", label: "Novedades desde" },
  { value: "100%", label: "Turnos online" },
  { value: "App", label: "DIM SALUD" },
];

export default function NovedadesPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/novedades-hero.jpg"
          alt="Profesional de la salud utilizando una notebook junto a un estetoscopio"
          fill
          sizes="100vw"
          className="object-cover object-[70%_45%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2440]/95 via-[#103A73]/72 to-[#5636A4]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/85 via-transparent to-[#081827]/40" />
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-white/60 text-xs mb-10 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/90">Novedades</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Newspaper size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Últimas novedades
            </div>

            <h1
              className="font-display text-[clamp(40px,6vw,78px)] leading-[0.98] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Novedades de{" "}
              <em className="italic text-[#F26A21]">DIM.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed max-w-lg">
              Conocé todos los cambios en nuestro sistema, los avances médicos y mucho
              más. Nuevos estudios, especialidades, servicios y centros: seguímos
              incorporando lo mejor para cuidarte hoy, con la tecnología del mañana.
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mt-14 lg:mt-20 border-t border-white/15 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {s.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── News grid ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[#F26A21] text-xs font-semibold uppercase tracking-widest mb-3">
              Novedades DIM
            </p>
            <h2
              className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Todo lo nuevo,
              <br />
              <em className="italic text-[#5636A4]">siempre para cuidarte.</em>
            </h2>
          </div>

          <NovedadesList items={NEWS} />
        </div>
      </section>
    </>
  );
}
