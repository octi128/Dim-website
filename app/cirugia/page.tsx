import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Wind,
  BedDouble,
  CalendarDays,
  ArrowUpRight,
  Sparkles,
  Eye,
  HeartPulse,
  Ear,
  Ribbon,
  Scan,
  Bone,
  Droplet,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Servicio de Cirugía — DIM Centros de Salud",
  description:
    "Servicio de Cirugía DIM: tres quirófanos equipados con tecnología de última generación y cinco habitaciones privadas. Cirugías estéticas, oftalmológicas, ginecológicas, mamarias y más.",
};

const PRACTICAS = [
  { name: "Cirugías Estéticas", icon: Sparkles },
  { name: "Cirugías Oftalmológicas", icon: Eye },
  { name: "Cirugías Ginecológicas", icon: HeartPulse },
  { name: "Cirugías Otorrinolaringológicas", icon: Ear },
  { name: "Cirugías Mamarias", icon: Ribbon },
  { name: "Cirugías Dermatológicas", icon: Scan },
  { name: "Cirugías Traumatológicas", icon: Bone },
  { name: "Cirugías Urológicas", icon: Droplet },
];

const STATS = [
  { value: "3", label: "Quirófanos equipados" },
  { value: "5", label: "Habitaciones privadas" },
  { value: "8", label: "Prácticas destacadas" },
  { value: "+60", label: "Años cuidándote" },
];

export default function CirugiaPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/cirugia-hero.jpg"
          alt="Quirófano de DIM equipado con tecnología de última generación"
          fill
          sizes="100vw"
          className="object-cover object-[62%_30%]"
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
            <span className="text-white/90">Cirugía</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <ShieldCheck size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Altos estándares de seguridad e higiene
            </div>

            <h1
              className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Servicio de
              <br />
              <em className="italic text-[#F26A21]">Cirugía.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-8 max-w-lg">
              En nuestro servicio de cirugía contamos con tres quirófanos
              totalmente equipados con tecnología de última generación.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://portal.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <CalendarDays size={15} strokeWidth={2.25} aria-hidden="true" />
                Solicitar turno
              </a>
              <a
                href="#practicas"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                Ver prácticas quirúrgicas
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

      {/* ────────── Instalaciones ────────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center border border-[#E6EAF1] bg-[#FBFAF7] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
                Nuestras instalaciones
              </div>
              <h2
                className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight mb-8"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Pensado para tu seguridad
                <br />
                <em className="italic text-[#5636A4]">y tranquilidad.</em>
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center">
                    <Wind size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <p className="text-[#4B4F56] font-light leading-relaxed pt-1">
                    Un ejemplo de ello es la presión positiva de aire, la cual
                    permite que el sector se encuentre permanentemente esterilizado
                    ya que realiza un filtrado absoluto, cumpliendo con los más
                    altos estándares de seguridad e higiene.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center">
                    <BedDouble size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <p className="text-[#4B4F56] font-light leading-relaxed pt-1">
                    Contamos con cinco habitaciones privadas con vistas a la ciudad
                    y salas especialmente equipadas para tu comodidad y la de tus
                    acompañantes. Es un servicio pensado para tu seguridad y
                    tranquilidad, con profesionales altamente capacitados, con la
                    seriedad y calidez de siempre.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[#E6EAF1] min-h-[320px] lg:min-h-[440px]">
              <Image
                src="/cirugia-habitacion.jpg"
                alt="Habitación privada del servicio de cirugía de DIM"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Prácticas quirúrgicas ────────── */}
      <section id="practicas" className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Ambulatorias
            </div>
            <h2
              className="font-display text-[clamp(32px,4vw,52px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Prácticas quirúrgicas
              <br />
              <em className="italic text-[#5636A4]">destacadas.</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PRACTICAS.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="bg-white border border-[#E6EAF1] rounded-2xl p-6 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="font-medium text-[#081827] leading-snug">{name}</h3>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/cirugias-esteticas"
              className="inline-flex items-center gap-2 bg-[#081827] hover:bg-[#103A73] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Ver más de cirugías estéticas
              <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────── Video ────────── */}
      <section className="bg-white py-16 lg:py-24 border-y border-[#E6EAF1]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-[#FBFAF7] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Conocé el servicio
            </div>
            <h2
              className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Recorré nuestro <em className="italic text-[#5636A4]">servicio de cirugía.</em>
            </h2>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#E6EAF1] shadow-[0_16px_48px_rgba(8,24,39,.10)]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/EGMJczvkOQo"
              title="DIM - Cirugía"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-12">
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                  Servicio de Cirugía
                </p>
                <h3
                  className="font-display text-[clamp(28px,3.5vw,44px)] font-light text-white leading-tight tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Coordiná tu
                  <br />
                  <em className="italic text-[#F26A21]">intervención.</em>
                </h3>
                <p className="text-white/60 font-light leading-relaxed max-w-md">
                  Nuestro equipo te acompaña en cada paso con la seriedad y calidez
                  de siempre. Reservá tu turno desde el Portal del Paciente.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
                <a
                  href="https://portal.dim.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-7 py-4 rounded-full text-sm transition-colors"
                >
                  <CalendarDays size={15} aria-hidden="true" />
                  Portal de turnos
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
        </div>
      </section>
    </>
  );
}
