import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Stethoscope, Smartphone } from "lucide-react";
import EspecialidadesList from "@/components/EspecialidadesList";
import CtaBackdrop from "@/components/CtaBackdrop";

export const metadata: Metadata = {
  title: "Especialidades Médicas — DIM Centros de Salud",
  description:
    "Contamos con más de 1500 profesionales en diversas especialidades médicas. Buscá tu especialidad y sacá turno desde la App DIM SALUD o portal.dim.com.ar.",
};

const BOOKING_STEPS = [
  {
    step: "1",
    text: "Ingresá desde la App DIM SALUD o desde portal.dim.com.ar.",
  },
  {
    step: "2",
    text: "En la solapa “Consulta Médica” escribí el nombre de la especialidad.",
  },
  {
    step: "3",
    text: "Hacé clic en el botón “Siguiente” y elegí día, horario y centro.",
  },
];

export default function EspecialidadesMedicasPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        {/* Full-width background image */}
        <Image
          src="/especialidades-hero.jpg"
          alt="Profesional médico con paciente en DIM Centros de Salud"
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
          <nav
            className="flex items-center gap-1.5 text-white/60 text-xs mb-10 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/90">Especialidades médicas</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Stethoscope size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Más de 1500 profesionales
            </div>

            <h1
              className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Especialidades
              <br />
              <em className="italic text-[#F26A21]">médicas.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-8 max-w-lg">
              Contamos con más de 1500 profesionales en diversas especialidades
              médicas. Buscá la que necesitás y sacá tu turno en minutos.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#especialidades"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                Buscar especialidad
              </a>
              <a
                href="https://portal.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                <Smartphone size={14} aria-hidden="true" />
                Sacar turno online
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mt-14 lg:mt-20 border-t border-white/15 pt-8">
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>+1500</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Profesionales</p>
            </div>
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>+90</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Coberturas médicas</p>
            </div>
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>24/7</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Turnos online</p>
            </div>
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>+60</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Años cuidándote</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Cómo sacar turno ────────── */}
      <section className="bg-white border-b border-[#E6EAF1] py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#737985] text-xs font-semibold uppercase tracking-widest mb-6">
            Cómo sacar turno
          </p>
          <ol className="grid md:grid-cols-3 gap-6">
            {BOOKING_STEPS.map((s) => (
              <li key={s.step} className="flex items-start gap-3.5">
                <span
                  className="shrink-0 w-7 h-7 rounded-full bg-[#F26A21] text-white text-sm font-semibold flex items-center justify-center"
                  aria-hidden="true"
                >
                  {s.step}
                </span>
                <p className="text-[#4B4F56] text-sm font-light leading-relaxed pt-0.5">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ────────── Specialties list ────────── */}
      <section id="especialidades" className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Directorio de especialidades
            </div>
            <h2
              className="font-display text-[clamp(32px,4vw,52px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Todas nuestras
              <br />
              <em className="italic text-[#5636A4]">especialidades.</em>
            </h2>
          </div>

          <EspecialidadesList />
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="bg-[#FBFAF7] pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-12 grid lg:grid-cols-2 gap-8 items-center">
            <CtaBackdrop />
            <div className="relative z-10">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                Turnos online
              </p>
              <h3
                className="font-display text-[clamp(28px,3.5vw,44px)] font-light text-white leading-tight tracking-tight mb-4"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Sacá tu turno
                <br />
                <em className="italic text-[#F26A21]">en minutos.</em>
              </h3>
              <p className="text-white/60 font-light leading-relaxed max-w-md">
                Reservá tu consulta con el especialista que necesitás desde la App
                DIM SALUD o desde el portal, sin filas ni esperas.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
              <a
                href="https://portal.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-7 py-4 rounded-full text-sm transition-colors"
              >
                <Smartphone size={15} aria-hidden="true" />
                Sacar turno online
              </a>
              <Link
                href="/coberturas-medicas"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-4 rounded-full text-sm transition-colors"
              >
                Ver coberturas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
