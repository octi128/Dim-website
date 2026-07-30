import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles, MessageCircle, ClipboardList } from "lucide-react";
import ResonanciaFaq from "@/components/ResonanciaFaq";

export const metadata: Metadata = {
  title: "Resonancia Magnética en Zona Oeste — DIM Centros de Salud",
  description:
    "Estudios de resonancia magnética con y sin contraste en Ramos Mejía, Morón y Ciudadela. 12 resonadores de última generación, incluido el Philips Ingenia 3T, único en Zona Oeste.",
};

const WHATSAPP_URL = "https://wa.me/5491166485555";
const WHATSAPP_LABEL = "11-6648-5555";
const FORM_URL = "https://forms.gle/bWMVDQgThA19acUF6";

const STATS = [
  { value: "12", label: "Resonadores de última generación" },
  { value: "3T", label: "Philips Ingenia, único en Zona Oeste" },
  { value: "3", label: "Sedes: Ramos Mejía, Morón y Ciudadela" },
  { value: "+60", label: "Años cuidándote" },
];

export default function ResonanciaMagneticaPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/resonancia-magnetica-hero-v2.jpg"
          alt="Profesionales de DIM analizando imágenes de resonancia magnética en la consola de diagnóstico"
          fill
          sizes="100vw"
          className="object-cover object-[65%_35%]"
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
            <span className="text-white/90">Resonancia Magnética</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Sparkles size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Resonancia Magnética en Zona Oeste
            </div>

            <h1
              className="font-display text-[clamp(36px,5.2vw,68px)] leading-[1.0] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              ¿Necesitás hacerte una{" "}
              <em className="italic text-[#F26A21]">resonancia magnética</em> en Zona
              Oeste?
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-4 max-w-lg">
              En DIM Centros de Salud realizamos estudios de resonancia magnética
              con y sin contraste en nuestras sedes ubicadas en Ramos Mejía, Morón y
              Ciudadela.
            </p>
            <p className="text-white/80 text-lg font-light leading-relaxed mb-4 max-w-lg">
              Contamos con 12 resonadores de última generación, dentro de los que se
              destaca el Philips Ingenia 3T, único en Zona Oeste.
            </p>
            <p className="text-white/90 text-lg font-medium leading-relaxed mb-8 max-w-lg">
              ¿Cómo sacar turno?
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <MessageCircle size={15} strokeWidth={2.25} aria-hidden="true" />
                WhatsApp {WHATSAPP_LABEL}
              </a>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                <ClipboardList size={15} strokeWidth={2.25} aria-hidden="true" />
                Completá el formulario
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

      {/* ────────── Video + Preguntas frecuentes ────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-[#E6EAF1] bg-[#081827]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/elzA53RG7rI"
                  title="Video Institucional DIM"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <div>
              <h2
                className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight mb-8"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Preguntas
                <br />
                <em className="italic text-[#5636A4]">frecuentes.</em>
              </h2>

              <ResonanciaFaq />
            </div>
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
                  Resonancia magnética
                </p>
                <h3
                  className="font-display text-[clamp(28px,3.5vw,44px)] font-light text-white leading-tight tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Sacá tu turno.
                </h3>
                <p className="text-white/60 font-light leading-relaxed max-w-md">
                  Escribinos por WhatsApp o completá el formulario para que te
                  contactemos y coordines tu estudio.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-7 py-4 rounded-full text-sm transition-colors"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  WhatsApp {WHATSAPP_LABEL}
                </a>
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-4 rounded-full text-sm transition-colors"
                >
                  <ClipboardList size={15} aria-hidden="true" />
                  Completá el formulario
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
