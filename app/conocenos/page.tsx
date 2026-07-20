import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles, Cpu, HeartHandshake, ShieldCheck, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre DIM — Conócenos | DIM Centros de Salud",
  description:
    "Iniciamos nuestra historia en 1964 en Ramos Mejía. Hoy DIM es uno de los centros de salud referentes de la Zona Oeste, con servicios de baja, mediana y alta complejidad y atención en todas las especialidades médicas.",
};

const STATS = [
  { value: "1964", label: "Nuestros comienzos en Ramos Mejía" },
  { value: "+60", label: "Años cuidándote" },
  { value: "3", label: "Niveles: baja, mediana y alta complejidad" },
  { value: "4", label: "Pilares que nos definen" },
];

const PILARES = [
  {
    icon: Cpu,
    title: "Tecnología",
    text: "Contamos con tecnología de avanzada a nivel mundial. Gracias a esto, podemos llegar a diagnósticos más precisos en menor tiempo.",
  },
  {
    icon: HeartHandshake,
    title: "Calidez",
    text: "En DIM queremos acompañarte a vos y tus seres queridos toda la vida. De la misma manera que lo hacemos con nuestras familias, porque para ellos, buscamos lo mejor: atención personalizada y esa mirada cálida junto a un gesto amable en un momento delicado.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad",
    text: "Nos manejamos con los más altos estándares de calidad, brindando resultados exactos y seguros.",
  },
  {
    icon: GraduationCap,
    title: "Capacitación",
    text: "Contamos con un equipo profesional altamente capacitado. A su vez, capacitamos constantemente a nuestro staff para brindarte la mejor atención.",
  },
];

export default function ConocenosPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/conocenos-hero.jpg"
          alt="Equipo de profesionales de DIM Centros de Salud recorriendo las instalaciones"
          fill
          sizes="100vw"
          className="object-cover object-[50%_35%]"
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
            <span className="text-white/90">Conócenos</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Sparkles size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Calidad médica desde 1964
            </div>

            <h1
              className="font-display text-[clamp(40px,6vw,78px)] leading-[0.98] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              DIM Centros de{" "}
              <em className="italic text-[#F26A21]">Salud.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-4 max-w-lg">
              Iniciamos nuestra historia en 1964 cuando el Dr. José María Paz cumplía
              el sueño de tener su propio consultorio en Ramos Mejía. En nuestros
              comienzos, solo brindábamos el servicio de consultas médicas y estudios
              de baja complejidad.
            </p>
            <p className="text-white/80 text-lg font-light leading-relaxed max-w-lg">
              Hoy, con mucho trabajo y esfuerzo, DIM se ha transformado en uno de los
              centros de salud referentes de la Zona Oeste ofreciendo servicios de
              baja, mediana y alta complejidad, así como también atención en todas las
              especialidades médicas.
            </p>
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

      {/* ────────── Video + Filosofía ────────── */}
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
                Nuestra filosofía
              </div>
              <h2
                className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Te cuidamos hoy, con la{" "}
                <em className="italic text-[#5636A4]">tecnología del mañana.</em>
              </h2>
              <p className="text-[#4B4F56] font-light leading-relaxed text-lg mb-5">
                Desde que abrimos nuestras puertas sabíamos hacia dónde queríamos ir.
                Somos personas que sentimos orgullo y pasión por lo que hacemos, porque
                cuando uno está seguro de hacia dónde va, toma mejores decisiones.
              </p>
              <p className="text-[#4B4F56] font-light leading-relaxed text-lg">
                Es por ello que decidimos ponerte en el foco de todo lo que hacemos,
                porque tu diagnóstico depende de la tecnología y la inversión en nuestro
                equipamiento nos permite brindarte mejores imágenes y respuestas
                confiables para tu salud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Pilares ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[#F26A21] text-xs font-semibold uppercase tracking-widest mb-3">
              Lo que nos define
            </p>
            <h2
              className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Cuatro pilares en cada
              <br />
              <em className="italic text-[#5636A4]">paso que damos.</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {PILARES.map(({ icon: Icon, title, text }) => (
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
    </>
  );
}
