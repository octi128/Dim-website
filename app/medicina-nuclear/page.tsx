import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles, MessageCircle, Mail } from "lucide-react";
import MedicinaNuclearList from "@/components/MedicinaNuclearList";

export const metadata: Metadata = {
  title: "Medicina Nuclear — DIM Centros de Salud",
  description:
    "Servicio de Medicina Nuclear de DIM con tecnología de vanguardia: nueva Ventri de General Electric y Millenium Multi Geometría. Estudios de cardiología, endocrinología, nefrología, neumonología, reumatología, gastroenterología, neurología y sistema linfático.",
};

const WHATSAPP_URL = "http://wa.link/ldwg9m";
const WHATSAPP_LABEL = "11-6648-5555";
const EMAIL = "medicinanuclear@dim.com.ar";

const STATS = [
  { value: "360°", label: "Arco de movimiento Ventri" },
  { value: "8", label: "Áreas de estudio" },
  { value: "GE", label: "Tecnología General Electric" },
  { value: "+60", label: "Años cuidándote" },
];

export default function MedicinaNuclearPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/medicina-nuclear-hero.jpg"
          alt="Preparación de radiofármaco en el servicio de Medicina Nuclear de DIM"
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
            <span className="text-white/90">Medicina Nuclear</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Sparkles size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Tecnología de vanguardia
            </div>

            <h1
              className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Medicina
              <br />
              <em className="italic text-[#F26A21]">Nuclear.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-8 max-w-lg">
              Solicitá un turno por los siguientes medios:
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
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                <Mail size={15} strokeWidth={2.25} aria-hidden="true" />
                {EMAIL}
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

      {/* ────────── Tecnología (video + texto) ────────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-[#E6EAF1] bg-[#081827]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/9BAqVuoRv2k"
                title="Video Institucional DIM"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div>
              <div className="inline-flex items-center border border-[#E6EAF1] bg-[#FBFAF7] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
                Última adquisición tecnológica
              </div>
              <h2
                className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                A la vanguardia
                <br />
                <em className="italic text-[#5636A4]">tecnológica.</em>
              </h2>
              <p className="text-[#4B4F56] font-light leading-relaxed text-lg mb-5">
                Con el objetivo de permanecer a la vanguardia tecnológica, estamos
                orgullosos de presentar nuestra última adquisición en cardiología
                nuclear: la nueva Ventri de General Electric. Este equipo cuenta con
                un arco de 360° de movimiento, por lo que puede analizar fácilmente
                la totalidad de la zona a investigar, alcanzando los detalles más
                pequeños con la mayor definición.
              </p>
              <p className="text-[#4B4F56] font-light leading-relaxed text-lg">
                Además, presentamos la nueva Millenium Multi Geometría, que nos
                permite realizar estudios de medicina nuclear de distintas zonas del
                cuerpo con la dosis mínima necesaria, combinando el cuidado al
                paciente con una calidad de imagen superior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Estudios que realizamos ────────── */}
      <section id="estudios" className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Nuestros estudios
            </div>
            <h2
              className="font-display text-[clamp(32px,4vw,52px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Estudios que
              <br />
              <em className="italic text-[#5636A4]">realizamos.</em>
            </h2>
          </div>

          <MedicinaNuclearList />
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="bg-[#FBFAF7] pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-12">
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                  Medicina nuclear
                </p>
                <h3
                  className="font-display text-[clamp(28px,3.5vw,44px)] font-light text-white leading-tight tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Solicitá tu turno.
                </h3>
                <p className="text-white/60 font-light leading-relaxed max-w-md">
                  Solicitá un turno por los siguientes medios y coordiná tu estudio
                  con nuestro equipo.
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
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-4 rounded-full text-sm transition-colors break-all"
                >
                  <Mail size={15} aria-hidden="true" />
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
