import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  ShieldPlus,
  Microscope,
  HeartPulse,
  ArrowUpRight,
  Send,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Servicio de Oncología — DIM Centros de Salud",
  description:
    "Calidad internacional en Zona Oeste. DIM anuncia su alianza con el Instituto Alexander Fleming (IAF), el más prestigioso de oncología en América Latina, para prevención, diagnóstico y tratamiento.",
};

const FORM_URL = "https://my.forms.app/comunicacioniaf/oncologiaiafdim";

const PILARES = [
  {
    name: "Prevención",
    icon: ShieldPlus,
    text: "Un espacio pensado para acompañarte antes, con controles y detección temprana.",
  },
  {
    name: "Diagnóstico",
    icon: Microscope,
    text: "Estudios y evaluación con el reconocimiento y la experiencia del IAF.",
  },
  {
    name: "Tratamiento",
    icon: HeartPulse,
    text: "Acompañamiento en todo momento para cuidar de tu salud y la de tu familia.",
  },
];

const STATS = [
  { value: "IAF", label: "Alianza Alexander Fleming" },
  { value: "1°", label: "Instituto oncológico de LATAM" },
  { value: "+60", label: "Años de trayectoria DIM" },
  { value: "24/7", label: "Turnos online" },
];

export default function OncologiaPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/oncologia-hero.jpg"
          alt="Profesional de oncología de DIM en consulta de planificación de tratamiento"
          fill
          sizes="100vw"
          className="object-cover object-[62%_35%]"
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
            <Link href="/especialidades-medicas" className="hover:text-white transition-colors">
              Especialidades
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/90">Oncología</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Sparkles size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Calidad Internacional en Zona Oeste
            </div>

            <h1
              className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Servicio de
              <br />
              <em className="italic text-[#F26A21]">Oncología.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-8 max-w-lg">
              Siguiendo con nuestro propósito de mejorar la vida de las personas,
              tenemos el orgullo de anunciar nuestra alianza con el primer y más
              prestigioso Instituto de Oncología en América Latina: Alexander
              Fleming.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <Send size={15} strokeWidth={2.25} aria-hidden="true" />
                Escribinos
              </a>
              <a
                href="#alianza"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                Conocé la alianza
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
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── La alianza ────────── */}
      <section id="alianza" className="bg-white py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center border border-[#E6EAF1] bg-[#FBFAF7] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
                Alianza estratégica
              </div>
              <h2
                className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                DIM + Instituto
                <br />
                <em className="italic text-[#5636A4]">Alexander Fleming.</em>
              </h2>
              <p className="text-[#4B4F56] font-light leading-relaxed text-lg">
                La sinergia entre el alto reconocimiento del IAF y la trayectoria
                de casi 60 años de DIM generará un espacio de prevención,
                diagnóstico y tratamiento para acompañarte en todo momento y
                cuidar de tu salud y la de tu familia.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[#E6EAF1] min-h-[320px] lg:min-h-[440px]">
              <Image
                src="/oncologia-alianza.jpg"
                alt="Profesional de oncología de DIM acompañando a una paciente"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Pilares ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Un espacio integral
            </div>
            <h2
              className="font-display text-[clamp(32px,4vw,52px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Prevención, diagnóstico
              <br />
              <em className="italic text-[#5636A4]">y tratamiento.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {PILARES.map(({ name, icon: Icon, text }) => (
              <div
                key={name}
                className="bg-white border border-[#E6EAF1] rounded-2xl p-7 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-medium text-[#081827] leading-snug mb-2">
                  {name}
                </h3>
                <p className="text-[#4B4F56] font-light text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Escribinos (CTA) ────────── */}
      <section className="bg-[#FBFAF7] pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-12">
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                  Atención prioritaria
                </p>
                <h3
                  className="font-display text-[clamp(28px,3.5vw,44px)] font-light text-white leading-tight tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Escribinos.
                </h3>
                <p className="text-white/60 font-light leading-relaxed max-w-md">
                  Debido a la alta demanda, queremos darte una atención prioritaria.
                  Si vos, un familiar o amigo tienen un diagnóstico oncológico y
                  quieren continuar su tratamiento con nosotros, completá el
                  formulario haciendo click en el botón.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-7 py-4 rounded-full text-sm transition-colors"
                >
                  <Send size={15} aria-hidden="true" />
                  Enviar
                </a>
                <Link
                  href="/coberturas-medicas"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-4 rounded-full text-sm transition-colors"
                >
                  Ver coberturas
                  <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
