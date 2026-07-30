import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Clock, Phone } from "lucide-react";
import CoberturasList from "@/components/CoberturasList";
import CtaBackdrop from "@/components/CtaBackdrop";
import { COVERAGES } from "@/lib/coverages";

export const metadata: Metadata = {
  title: "Coberturas Médicas — DIM Centros de Salud",
  description:
    "Conocé las más de 104 obras sociales y prepagas que atendemos en DIM. Verificá la validez de tu orden médica y consultá si tu cobertura está incluida.",
};

const prepagasCount = COVERAGES.filter((c) => c.tag === "Prepaga").length;
const obrasSocialesCount = COVERAGES.filter((c) => c.tag === "Obra Social").length;

const STATS = [
  { value: `+${COVERAGES.length}`, label: "Coberturas aceptadas" },
  { value: `${prepagasCount}`, label: "Prepagas" },
  { value: `${obrasSocialesCount}`, label: "Obras sociales" },
  { value: "30–90", label: "Días de validez de orden" },
];

const VALIDITY_INFO = [
  {
    days: "30 días",
    color: "bg-[#E6EAF1]",
    textColor: "text-[#4B4F56]",
    dot: "bg-[#737985]",
    description: "La mayoría de las obras sociales y prepagas.",
  },
  {
    days: "60 días",
    color: "bg-[#1956A6]/10",
    textColor: "text-[#1956A6]",
    dot: "bg-[#1956A6]",
    description: "Galeno, Swiss Medical, Medifé, OSDE, Sancor y más.",
  },
  {
    days: "90 días",
    color: "bg-[#5636A4]/10",
    textColor: "text-[#5636A4]",
    dot: "bg-[#5636A4]",
    description: "Asistencia Sanitaria Integral.",
  },
];

export default function CoberturasMedicasPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        {/* Full-width background image */}
        <Image
          src="/coberturas-hero.jpg"
          alt="Paciente con profesional de DIM Centros de Salud"
          fill
          sizes="100vw"
          className="object-cover object-[72%_30%]"
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
            <span className="text-white/90">Coberturas médicas</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <ShieldCheck size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Actualizadas a 2026
            </div>

            <h1
              className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Coberturas
              <br />
              <em className="italic text-[#F26A21]">médicas.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-8 max-w-lg">
              Trabajamos con más de 104 obras sociales y prepagas. Buscá la tuya,
              conocé la validez de tu orden y sacá turno sin complicaciones.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#coberturas"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                Buscar mi cobertura
              </a>
              <a
                href="tel:08009991800"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                <Phone size={14} aria-hidden="true" />
                0800 999 1800
              </a>
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

      {/* ────────── Validity info strip ────────── */}
      <section className="bg-[#081827] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2 mb-4">
            <Clock size={15} className="text-[#F26A21] shrink-0" aria-hidden="true" />
            <p className="text-white/70 text-sm font-medium">
              Validez de las órdenes médicas según tu cobertura:
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {VALIDITY_INFO.map((v) => (
              <div key={v.days} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${v.dot}`} aria-hidden="true" />
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${v.color} ${v.textColor} mb-1`}>
                    {v.days}
                  </span>
                  <p className="text-white/50 text-xs leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Coverage list ────────── */}
      <section id="coberturas" className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Directorio completo
            </div>
            <h2
              className="font-display text-[clamp(32px,4vw,52px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Todas las coberturas
              <br />
              <em className="italic text-[#5636A4]">que atendemos.</em>
            </h2>
          </div>

          <CoberturasList />
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="bg-[#FBFAF7] pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-12 grid lg:grid-cols-2 gap-8 items-center">
            <CtaBackdrop />
            <div className="relative z-10">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                Atención particular
              </p>
              <h3
                className="font-display text-[clamp(28px,3.5vw,44px)] font-light text-white leading-tight tracking-tight mb-4"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                ¿No encontrás
                <br />
                <em className="italic text-[#F26A21]">tu cobertura?</em>
              </h3>
              <p className="text-white/60 font-light leading-relaxed max-w-md">
                También atendemos pacientes particulares con aranceles especiales.
                Consultanos por teléfono o WhatsApp y te asesoramos sin compromiso.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
              <a
                href="tel:08009991800"
                className="inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-7 py-4 rounded-full text-sm transition-colors"
              >
                <Phone size={15} aria-hidden="true" />
                Llamar al 0800 999 1800
              </a>
              <a
                href="https://wa.me/5491130000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-4 rounded-full text-sm transition-colors"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
