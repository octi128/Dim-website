import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  PlayCircle,
  ClipboardList,
  Home,
} from "lucide-react";

export const metadata: Metadata = {
  title: "DIM Laboratorio — Análisis Clínicos en Zona Oeste | DIM Centros de Salud",
  description:
    "Análisis clínicos con equipamiento Roche, resultados 100% online y solo 2 horas de ayuno para la mayoría de los estudios. 8 centros de laboratorio en Zona Oeste y CABA, con extracciones a domicilio en Ramos Mejía.",
};

const PORTAL_TURNO_URL = "https://portal.dim.com.ar/auth/login";
const DOMICILIO_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeZnmjqeGUjZQ017fFzieNa25p7bCmw1D8lmohRWarwYY26bQ/viewform";
const PREPARACIONES_URL = "/estudios-y-preparaciones-de-laboratorio";
const COMO_TURNO_VIDEO_URL = "https://www.youtube.com/watch?v=rtM9GcrPsu8";

const BENEFITS = [
  "Si asistís con turno tenés filas exclusivas en todos nuestros centros",
  "Resultados 100% online, listos para descargar o enviar a tu profesional",
  "Equipamiento de última generación",
];

const STATS = [
  { value: "8", label: "Centros de laboratorio" },
  { value: "2 hs", label: "De ayuno para la mayoría de análisis" },
  { value: "100%", label: "Resultados online" },
  { value: "Roche", label: "Equipamiento de última generación" },
];

type Location = {
  address: string;
  map: string;
  hours: string[];
};

const LOCATIONS: Location[] = [
  {
    address: "Av. Rivadavia 2198, Once.",
    map: "https://www.google.com/maps/place/DIM+Once/@-34.6097603,-58.4000238,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccbbb7a3ab74d:0x398df013b24cdc29!8m2!3d-34.6097647!4d-58.3974489!16s%2Fg%2F11t2z1km__?entry=ttu",
    hours: ["Lunes a sábados: 7:00 a 12:00 hs"],
  },
  {
    address: "Belgrano 136, Ramos Mejía",
    map: "https://goo.gl/maps/CA7pWLhvanqnoZSR8",
    hours: ["Lunes a Viernes: 7:00 a 18:30 hs", "Sábados: 7:00 a 12:00 hs"],
  },
  {
    address: "Av. Rivadavia 17602, Morón.",
    map: "https://maps.app.goo.gl/a5PrJdzFpRhu7s4M6",
    hours: ["Lunes a Viernes: 7:00 a 15:00 hs"],
  },
  {
    address: "Ardoino 640 (2da Rivadavia), Ramos Mejía.",
    map: "https://maps.app.goo.gl/7zDedxTjJUBuvbiN6",
    hours: ["Lunes a sábados: 7:00 a 12:00 hs"],
  },
  {
    address: "Av. Rivadavia 6001, Caballito.",
    map: "https://maps.app.goo.gl/7WgmB39qP1avUwZD8",
    hours: ["Lunes a Sábados: 7:00 a 12:00 hs."],
  },
  {
    address: "Av. Rivadavia 10964, CABA.",
    map: "https://maps.app.goo.gl/ZhMJ2Km4GVamhvmDA",
    hours: ["Lunes a viernes: 7:00 a 12:00 hs", "Sábados: 7:00 a 11:00 hs"],
  },
  {
    address: "Espora 18, Ramos Mejía",
    map: "https://goo.gl/maps/kLH61uCAZuhUG4FX9",
    hours: [
      "Lunes a viernes: 7:00 a 18:30 hs",
      "Sábados: 7:00 a 18:00 hs",
      "Domingos: 8:00 a 17:00 hs",
    ],
  },
  {
    address: "Rivadavia 14252, Ramos Mejía",
    map: "https://goo.gl/maps/7QGTCGTkuAG8VwHV6",
    hours: [
      "Lunes a viernes: 7:00 a 18:30 hs.",
      "Sábados: 7:00 a 18:00 hs",
      "Domingos: 8:00 a 18:00 hs",
    ],
  },
];

export default function LaboratoriosPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/laboratorios-hero.jpg"
          alt="Laboratorio de análisis clínicos de DIM con equipamiento de última generación"
          fill
          sizes="100vw"
          className="object-cover object-[60%_40%]"
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
            <span className="text-white/90">Laboratorio</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Sparkles size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Análisis clínicos con equipamiento Roche
            </div>

            <h1
              className="font-display text-[clamp(40px,6vw,78px)] leading-[0.98] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              DIM <em className="italic text-[#F26A21]">Laboratorio.</em>
            </h1>

            <p className="text-white/85 text-lg font-light leading-relaxed mb-7 max-w-lg">
              ¿Tenés que hacerte análisis? En DIM lo hacés más fácil.
            </p>

            <ul className="space-y-3 mb-8">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-white/85 max-w-lg">
                  <CheckCircle2
                    size={18}
                    strokeWidth={2}
                    className="text-[#F26A21] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="font-light leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href={PORTAL_TURNO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                Quiero un turno
                <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
              </a>
              <a
                href={PREPARACIONES_URL}
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                <ClipboardList size={15} strokeWidth={2.25} aria-hidden="true" />
                Preparación de los estudios
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

      {/* ────────── Ayuno callout ────────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#F0E4D6] bg-gradient-to-br from-[#FFF6EF] to-[#FBFAF7] p-8 lg:p-12">
            <div className="grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#F26A21]/12 flex items-center justify-center shrink-0">
                <Clock size={26} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="font-display text-[clamp(24px,3vw,36px)] font-light tracking-[-0.02em] text-[#081827] leading-tight mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Solo <em className="italic text-[#F26A21]">2 horas de ayuno</em> para la mayoría de
                  los análisis.
                </h2>
                <p className="text-[#4B4F56] font-light leading-relaxed text-lg mb-6 max-w-2xl">
                  Ya no es necesario un ayuno prolongado. Vení cuando te quede cómodo: al mediodía,
                  después de un desayuno liviano o entre reuniones.
                </p>
                <a
                  href={PORTAL_TURNO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  Quiero un turno
                  <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
                </a>
                <p className="text-[#737985] text-sm mt-5 max-w-2xl">
                  Algunos estudios aún requieren ayuno prolongado. Te lo vamos a indicar al pedir el
                  turno.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Video + Extracciones a domicilio ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-[#E6EAF1] bg-[#081827]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/9BAqVuoRv2k"
                  title="DIM Laboratorio"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="text-[#4B4F56] font-light leading-relaxed text-lg mt-6">
                Utilizamos equipamiento de Roche, líder suizo en innovación biomédica. Esto nos
                permite ofrecer análisis clínicos más rápidos, confiables y precisos. Porque tu salud
                merece lo mejor.
              </p>
            </div>

            {/* Turnos a domicilio card */}
            <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-10">
              <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-[#F26A21]/15 flex items-center justify-center mb-5">
                  <Home size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3
                  className="font-display text-[clamp(24px,2.8vw,34px)] font-light text-white leading-tight tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Turnos de laboratorio
                  <br />
                  <em className="italic text-[#F26A21]">a domicilio.</em>
                </h3>
                <p className="text-white/70 font-light leading-relaxed mb-4">
                  Realizamos extracciones de laboratorio a domicilio dentro de un rango de 5 km de
                  Ramos Mejía.
                </p>
                <p className="text-white/70 font-light leading-relaxed mb-7">
                  Para solicitar el turno completá un breve formulario. Uno de nuestros
                  representantes te contactará para coordinar día y horario del turno.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={DOMICILIO_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3.5 rounded-full text-sm transition-colors"
                  >
                    <ClipboardList size={15} strokeWidth={2.25} aria-hidden="true" />
                    Solicitar turno
                  </a>
                  <a
                    href={PREPARACIONES_URL}
                    className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-6 py-3.5 rounded-full text-sm transition-colors"
                  >
                    Preparación de los estudios
                  </a>
                </div>

                <a
                  href={COMO_TURNO_VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mt-6 transition-colors"
                >
                  <PlayCircle size={16} strokeWidth={2} aria-hidden="true" />
                  ¿Cómo solicitar turno para laboratorio?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Centros de atención y horarios ────────── */}
      <section className="bg-white py-16 lg:py-24 border-t border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-10 lg:mb-14">
            <p className="text-[#737985] text-xs font-semibold uppercase tracking-widest mb-3">
              Nuestros laboratorios
            </p>
            <h2
              className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Centros de atención
              <br />
              <em className="italic text-[#5636A4]">y horarios.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.address}
                className="bg-[#FBFAF7] border border-[#E6EAF1] rounded-2xl p-6 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200 flex flex-col"
              >
                <p className="text-[#737985] text-[10px] font-mono uppercase tracking-widest mb-3">
                  DIM Laboratorio
                </p>
                <a
                  href={loc.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2 text-[#081827] font-medium leading-snug hover:text-[#F26A21] transition-colors mb-4"
                >
                  <MapPin
                    size={17}
                    strokeWidth={2}
                    className="text-[#F26A21] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{loc.address}</span>
                </a>
                <ul className="mt-auto space-y-1.5 border-t border-[#E6EAF1] pt-4">
                  {loc.hours.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-[#4B4F56] font-light text-sm"
                    >
                      <Clock size={13} className="text-[#737985] shrink-0" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
