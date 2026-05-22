import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  CalendarDays,
  Mail,
  FileText,
  ArrowUpRight,
  Stethoscope,
  Clock,
  HeartPulse,
} from "lucide-react";
import { STUDIES } from "@/lib/studies";
import StudiesAccordion from "@/components/studies/StudiesAccordion";

export const metadata = {
  title: "Estudios médicos y preparaciones — DIM Centros de Salud",
  description:
    "Conocé los estudios médicos que realizamos en DIM y sus preparaciones: PET-CT, Resonancia Magnética, Tomografía, Ecodoppler, Ecografía, Densitometría, Holter, EEG y más.",
};

export default function EstudiosMedicosPage() {
  return (
    <>
      {/* ────────── Hero ────────── */}
      <section className="relative bg-gradient-to-br from-[#103A73] via-[#1956A6] to-[#5636A4] overflow-hidden">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-10 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/" className="hover:text-white transition-colors">Portal de turnos</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Estudios médicos y preparaciones</span>
          </nav>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
                <ShieldCheck size={12} strokeWidth={2.25} className="text-[#F26A21]" />
                Sujeto a tu cobertura médica y plan
              </div>

              <h1
                className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Estudios médicos
                <br />y <em className="italic text-[#F26A21]">preparaciones.</em>
              </h1>

              <p className="text-white/75 text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-xl">
                Más de {STUDIES.length} prácticas en un solo lugar — desde imágenes de alta complejidad hasta estudios funcionales. Consultá la preparación de cada estudio y solicitá tu turno online.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://portal.dim.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  <CalendarDays size={15} strokeWidth={2.25} />
                  Solicitar turno
                </Link>
                <Link
                  href="#estudios"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#F4EFE7] text-[#081827] font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  <FileText size={15} strokeWidth={2.25} />
                  Ver estudios y preparaciones
                </Link>
              </div>
            </div>

            {/* Right: doctor image with floating badge */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_80px_rgba(8,24,39,.4)]">
                <Image
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80"
                  alt="Profesional médica de DIM Centros de Salud"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/85 via-[#081827]/15 to-transparent" />

                {/* Floating coverage callout */}
                <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-3 max-w-[220px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21]" />
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/80">
                      Información clave
                    </p>
                  </div>
                  <p className="text-white text-[12px] font-light leading-snug">
                    Los turnos están sujetos al contrato con tu cobertura médica y plan.
                  </p>
                </div>

                {/* Bottom stats badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <div className="grid grid-cols-3 divide-x divide-white/15">
                    <div className="pr-3">
                      <p className="font-display text-2xl font-medium text-white" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                        +{STUDIES.length}
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/65 leading-tight mt-0.5">Estudios</p>
                    </div>
                    <div className="px-3">
                      <p className="font-display text-2xl font-medium text-white" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                        +750
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/65 leading-tight mt-0.5">Profesionales</p>
                    </div>
                    <div className="pl-3">
                      <p className="font-display text-2xl font-medium text-white" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                        +90
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/65 leading-tight mt-0.5">Coberturas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip (mobile fallback + visible always) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mt-14 lg:mt-20 border-t border-white/15 pt-8">
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                +{STUDIES.length}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Estudios disponibles</p>
            </div>
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                +90
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Coberturas médicas</p>
            </div>
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                24/7
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Portal de turnos online</p>
            </div>
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                +60
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Años cuidándote</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Studies list ────────── */}
      <section id="estudios" className="bg-[#FBFAF7] py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* Section heading */}
          <div className="mb-10 lg:mb-12">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21] mr-2" />
              Listado completo
            </div>
            <h2
              className="font-display text-3xl lg:text-[44px] font-light text-[#081827] tracking-[-0.02em] leading-tight mb-3"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Encontrá tu estudio y su <em className="italic text-[#5636A4]">preparación.</em>
            </h2>
            <p className="text-[#4B4F56] font-light text-base lg:text-lg leading-relaxed max-w-2xl">
              Buscá por nombre o explorá las prácticas disponibles. Cada estudio incluye descripción, tipos disponibles y cómo solicitar tu turno.
            </p>
          </div>

          <StudiesAccordion studies={STUDIES} />
        </div>
      </section>

      {/* ────────── Help footer band ────────── */}
      <section className="bg-white py-16 lg:py-20 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {/* PET dedicated */}
            <Link
              href="mailto:pet@dim.com.ar"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <Mail size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                Sector PET-CT
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Para coordinar tu estudio de PET-CT envianos la orden médica al correo exclusivo del sector.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                pet@dim.com.ar
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </span>
            </Link>

            {/* Atención sin turno */}
            <Link
              href="/atencion-sin-turno-previo"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <Clock size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                Estudios sin turno previo
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Radiografías, electrocardiograma y panorámica dental se realizan en DIM Rivadavia sin reserva previa.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver centros y horarios
                <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            {/* Coberturas */}
            <Link
              href="/coberturas-medicas"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <Stethoscope size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                Tu cobertura médica
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Consultá las +90 obras sociales y prepagas con las que trabajamos en toda la red DIM.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver coberturas
                <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
