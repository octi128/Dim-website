import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, CalendarDays, ArrowUpRight, Clock } from "lucide-react";
import CentresGrid from "@/components/CentresGrid";

export const metadata: Metadata = {
  title: "Nuestros Centros y Horarios — DIM Centros de Salud",
  description:
    "Conocé las 16 sedes de DIM en Ramos Mejía, Morón y Buenos Aires. Direcciones, horarios de atención y cómo llegar a cada centro de salud.",
};

const STATS = [
  { value: "16", label: "Centros de salud" },
  { value: "3", label: "Zonas de cobertura" },
  { value: "7hs", label: "Apertura más temprana" },
  { value: "+60", label: "Años cuidándote" },
];

export default function NuestrosCentrosPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        {/* Full-width background image */}
        <Image
          src="/centros-hero.jpg"
          alt="Profesionales de DIM Centros de Salud"
          fill
          sizes="100vw"
          className="object-cover object-[75%_30%]"
          priority
        />
        {/* Legibility overlays: brand-blue scrim on the text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2440]/95 via-[#103A73]/72 to-[#5636A4]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/85 via-transparent to-[#081827]/40" />
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-10 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/90">Nuestros centros y horarios</span>
          </nav>

          {/* Heading */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <MapPin size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              16 sedes · Ramos Mejía, Morón y Buenos Aires
            </div>

            <h1
              className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Nuestros centros
              <br />
              <em className="italic text-[#F26A21]">y horarios.</em>
            </h1>

            <p className="text-white/75 text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-2xl">
              Dieciséis sedes distribuidas en Zona Oeste del Gran Buenos Aires y Capital Federal. Encontrá la más cercana y conocé sus horarios de atención.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#centros"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <MapPin size={15} strokeWidth={2.25} aria-hidden="true" />
                Ver todas las sedes
              </a>
              <Link
                href="https://portal.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F4EFE7] text-[#081827] font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <CalendarDays size={15} strokeWidth={2.25} aria-hidden="true" />
                Pedir turno online
              </Link>
            </div>
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
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Centers grid (client: zone filter) ────────── */}
      <CentresGrid />

      {/* ────────── CTA band ────────── */}
      <section className="bg-white py-16 lg:py-20 border-t border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="https://portal.dim.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <CalendarDays size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3
                className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Reservá tu turno online
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Elegí la sede más conveniente y reservá desde el Portal del Paciente, disponible las 24 horas.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ir al portal de turnos
                <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/atencion-sin-turno-previo"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <Clock size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3
                className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Atención sin turno previo
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Varios centros reciben consultas y estudios urgentes por orden de llegada, sin necesidad de reserva.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver servicios disponibles
                <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/estudios-medicos-y-preparaciones"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <MapPin size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3
                className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Estudios y preparaciones
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Conocé los estudios disponibles en cada sede y cómo prepararte correctamente para cada uno.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver estudios
                <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
