import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
  Radiation,
  Gauge,
  Layers,
  ScanLine,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tomografía Multicorte (Multislice) — DIM Centros de Salud",
  description:
    "Tomografías multislice con ultra baja dosis de radiación: 70% menos que los tomógrafos convencionales. Tomógrafo Philips Ingenuity de 128 cortes, imágenes en alta definición y reconstrucciones 3D.",
};

const WHATSAPP_URL = "https://wa.me/5491166485555";
const WHATSAPP_LABEL = "11-6648-5555";
const PORTAL_URL = "https://portal.dim.com.ar/";

const STATS = [
  { value: "70%", label: "Menos radiación que un tomógrafo convencional" },
  { value: "128", label: "Cortes del Philips Ingenuity" },
  { value: "3D", label: "Reconstrucciones volumétricas" },
  { value: "+60", label: "Años cuidándote" },
];

const HIGHLIGHTS = [
  {
    icon: Radiation,
    title: "Ultra baja dosis",
    text: "70% menos radiación que los tomógrafos convencionales, cuidando a cada paciente.",
  },
  {
    icon: Gauge,
    title: "Dosis modulada",
    text: "El Philips Ingenuity de 128 cortes utiliza solo la cantidad necesaria para una excelente calidad de imagen.",
  },
  {
    icon: Layers,
    title: "Reconstrucciones 3D",
    text: "Secuencias volumétricas que permiten reprocesar las imágenes y llegar a la patología en distintos planos.",
  },
];

const EQUIPOS = [
  "1 Tomógrafo Access 16",
  "1 Tomógrafo Brilliance 16",
  "1 Tomógrafo Ingenuity 128",
];

export default function TomografiaMulticortePage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/tomografia-multicorte-hero.jpg"
          alt="Profesionales de DIM analizando imágenes de tomografía multicorte en la consola de diagnóstico"
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
            <span className="text-white/90">Tomografía Multicorte</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Sparkles size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Ultra baja dosis de radiación
            </div>

            <h1
              className="font-display text-[clamp(40px,6vw,78px)] leading-[0.98] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Tomografía Multicorte
              <br />
              <em className="italic text-[#F26A21]">(Multislice).</em>
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
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                Portal de Turnos
                <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
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

      {/* ────────── Video + Tecnología ────────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-[#E6EAF1] bg-[#081827]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/9cPBYf-ygu8"
                title="Video Institucional DIM"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div>
              <div className="inline-flex items-center border border-[#E6EAF1] bg-[#FBFAF7] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
                Última tecnología
              </div>
              <h2
                className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Diagnósticos rápidos
                <br />
                <em className="italic text-[#5636A4]">y precisos.</em>
              </h2>
              <p className="text-[#4B4F56] font-light leading-relaxed text-lg mb-5">
                Realizamos tomografías multislice con ultra baja dosis de radiación:
                70% menos que los tomógrafos convencionales. Gracias a nuestros
                equipos de última tecnología, obtenemos imágenes en alta definición
                para llegar a diagnósticos rápidos y precisos.
              </p>
              <p className="text-[#4B4F56] font-light leading-relaxed text-lg mb-5">
                El tomógrafo Philips Ingenuity de 128 cortes permite modular la
                dosis, utilizando solo la cantidad necesaria para obtener una
                excelente calidad de imagen y disminuir la exposición al paciente.
              </p>
              <p className="text-[#4B4F56] font-light leading-relaxed text-lg">
                Esto nos brinda la posibilidad de tratar a tiempo distintas
                patologías, acotando el tiempo de espera para la realización de
                estudios gracias a esta técnica. Los estudios se obtienen con
                secuencias volumétricas, lo que nos permite reprocesar las imágenes y
                llegar a la patología en distintos planos, con reconstrucciones 3D
                que facilitan el diagnóstico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Highlights ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white border border-[#E6EAF1] rounded-2xl p-7 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-medium text-[#081827] leading-snug mb-2">
                  {title}
                </h3>
                <p className="text-[#4B4F56] font-light text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Nuestros equipos ────────── */}
      <section className="bg-[#FBFAF7] pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-12">
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                Nuestros equipos
              </p>
              <h3
                className="font-display text-[clamp(26px,3.2vw,40px)] font-light text-white leading-tight tracking-tight mb-8"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Tecnología multislice
                <br />
                <em className="italic text-[#F26A21]">a tu disposición.</em>
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {EQUIPOS.map((equipo) => (
                  <div
                    key={equipo}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-5"
                  >
                    <span className="w-10 h-10 shrink-0 rounded-xl bg-[#F26A21]/15 flex items-center justify-center">
                      <ScanLine size={18} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-white font-medium leading-snug">{equipo}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
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
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-4 rounded-full text-sm transition-colors"
                >
                  Portal de Turnos
                  <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
