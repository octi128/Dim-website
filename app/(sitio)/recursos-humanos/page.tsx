import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowUpRight,
  Users,
  Stethoscope,
  FlaskConical,
  HardHat,
  MonitorSmartphone,
  ClipboardList,
  Wrench,
  Headphones,
  Heart,
  TrendingUp,
  Star,
  Send,
  CheckCircle2,
} from "lucide-react";
import CtaBackdrop from "@/components/CtaBackdrop";

export const metadata: Metadata = {
  title: "Trabajá en DIM — Recursos Humanos | DIM Centros de Salud",
  description:
    "Sumate al equipo de DIM Centros de Salud. Buscamos profesionales médicos, bioquímicos, técnicos, administrativos y más. Crecé con nosotros en Zona Oeste.",
};

const jobCategories = [
  {
    Icon: Stethoscope,
    title: "Profesionales Médicos",
    desc: "Médicos especialistas en todas las ramas clínicas y quirúrgicas.",
    tag: "Alta demanda",
    tagColor: "bg-[#F26A21]/10 text-[#F26A21]",
  },
  {
    Icon: FlaskConical,
    title: "Bioquímicos",
    desc: "Especialistas en laboratorio clínico, análisis y diagnóstico.",
    tag: "",
    tagColor: "",
  },
  {
    Icon: HardHat,
    title: "Arquitectos e Ingenieros",
    desc: "Proyectos de infraestructura y expansión de centros de salud.",
    tag: "",
    tagColor: "",
  },
  {
    Icon: MonitorSmartphone,
    title: "Personal Técnico",
    desc: "Tecnólogos en imágenes, técnicos de equipo médico y soporte.",
    tag: "Alta demanda",
    tagColor: "bg-[#F26A21]/10 text-[#F26A21]",
  },
  {
    Icon: ClipboardList,
    title: "Administrativos",
    desc: "Gestión de turnos, facturación, finanzas y atención al paciente.",
    tag: "",
    tagColor: "",
  },
  {
    Icon: Wrench,
    title: "Mantenimiento",
    desc: "Operadores de planta, electricistas y técnicos de instalaciones.",
    tag: "",
    tagColor: "",
  },
  {
    Icon: Headphones,
    title: "Contact Center",
    desc: "Atención telefónica, coordinación de turnos y soporte remoto.",
    tag: "",
    tagColor: "",
  },
];

const benefits = [
  {
    Icon: Heart,
    title: "Excelente clima laboral",
    desc: "Un ambiente positivo donde cada persona es valorada y escuchada.",
  },
  {
    Icon: TrendingUp,
    title: "Desarrollo profesional",
    desc: "Capacitaciones, rotaciones y oportunidades reales de crecimiento.",
  },
  {
    Icon: Star,
    title: "Propósito que importa",
    desc: "Tu trabajo impacta directamente en la salud y el bienestar de miles de personas.",
  },
  {
    Icon: Users,
    title: "Trabajo en equipo",
    desc: "Nuestra cultura se construye sobre la colaboración y el apoyo mutuo.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explorá las búsquedas",
    desc: "Ingresá al portal de empleos y revisá las posiciones disponibles.",
  },
  {
    number: "02",
    title: "Completá tu perfil",
    desc: "Cargá tu CV y completá los datos requeridos para la postulación.",
  },
  {
    number: "03",
    title: "Entrevista",
    desc: "Nuestro equipo de RRHH se pondrá en contacto para conocerte.",
  },
  {
    number: "04",
    title: "¡Bienvenido al equipo!",
    desc: "Comenzá tu carrera en DIM y crecé con nosotros.",
  },
];

export default function RecursosHumanosPage() {
  return (
    <>
      {/* ─── Hero (banner) ─── */}
      <section className="relative bg-[#081827] overflow-hidden">
        {/* Full-width background image */}
        <Image
          src="/recursos-hero.jpg"
          alt="Equipo de profesionales de DIM Centros de Salud"
          fill
          sizes="100vw"
          className="object-cover object-[75%_30%]"
          priority
        />
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#081827]/95 via-[#103A73]/72 to-[#1956A6]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/85 via-transparent to-[#081827]/40" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#F26A21]/12 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-white/55 text-xs mb-10 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/90">Trabajá en DIM</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Users size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Más de 750 profesionales en toda la red
            </div>

            <h1
              className="font-display text-[clamp(40px,6vw,80px)] leading-[0.93] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              La única forma
              <br />
              de crecer es{" "}
              <em className="italic text-[#F26A21]">en equipo.</em>
            </h1>

            <p className="text-white/80 text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-xl">
              Somos un equipo apasionado por mejorar la salud de las personas en Zona
              Oeste. Si tenés ganas de crecer y hacer la diferencia, este es tu lugar.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://empleos.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors duration-200"
              >
                <Send size={14} aria-hidden="true" />
                Ver búsquedas activas
              </a>
              <a
                href="#categorias"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-6 py-3 rounded-full text-sm border border-white/20 transition-colors duration-200"
              >
                ¿Qué roles buscamos?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats strip ─── */}
      <section className="bg-white border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E6EAF1]">
            {[
              { value: "+750", label: "Profesionales" },
              { value: "16", label: "Centros de salud" },
              { value: "+60", label: "Años de historia" },
              { value: "7", label: "Áreas de trabajo" },
            ].map((s) => (
              <div key={s.label} className="py-6 px-6 text-center first:pl-0 last:pr-0">
                <p
                  className="font-display text-3xl font-medium text-[#081827] mb-0.5"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-[#737985] uppercase tracking-widest font-mono">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Job Categories ─── */}
      <section id="categorias" className="py-20 lg:py-28 bg-[#FBFAF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-[#F26A21] text-xs font-mono uppercase tracking-widest mb-3">
              Roles disponibles
            </p>
            <h2
              className="font-display text-[clamp(32px,4.5vw,56px)] leading-[0.97] tracking-[-0.03em] font-light text-[#081827] mb-4"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              ¿En qué área{" "}
              <em className="italic text-[#103A73]">querés trabajar?</em>
            </h2>
            <p className="text-[#4B4F56] text-lg font-light leading-relaxed">
              Buscamos talento en múltiples disciplinas. Encontrá el área que más
              se ajusta a tu perfil y postulate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobCategories.map((cat) => (
              <a
                key={cat.title}
                href="https://empleos.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-[#E6EAF1] p-6 hover:border-[#103A73]/30 hover:shadow-[0_8px_32px_rgba(16,58,115,.08)] transition-all duration-200 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center flex-shrink-0 group-hover:bg-[#103A73]/10 transition-colors">
                    <cat.Icon
                      size={20}
                      className="text-[#F26A21] group-hover:text-[#103A73] transition-colors"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  {cat.tag && (
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${cat.tagColor}`}>
                      {cat.tag}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-[#081827] font-semibold text-base mb-1.5 group-hover:text-[#103A73] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[#737985] text-sm leading-relaxed">{cat.desc}</p>
                </div>

                <div className="flex items-center gap-1.5 text-[#F26A21] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver búsquedas
                  <ArrowUpRight size={12} strokeWidth={2.5} aria-hidden="true" />
                </div>
              </a>
            ))}

            {/* CTA card */}
            <a
              href="https://empleos.dim.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-[#103A73] to-[#5636A4] rounded-2xl p-6 flex flex-col justify-between min-h-[180px] hover:shadow-[0_12px_40px_rgba(16,58,115,.25)] transition-shadow duration-200"
            >
              <div>
                <p className="text-white/55 text-[10px] font-mono uppercase tracking-widest mb-2">
                  Portal de empleos
                </p>
                <h3
                  className="font-display text-white text-2xl font-light leading-tight"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Ver todas las búsquedas activas
                </h3>
              </div>
              <div className="flex items-center justify-end mt-4">
                <span className="w-10 h-10 rounded-full bg-white/15 group-hover:bg-[#F26A21] flex items-center justify-center transition-colors">
                  <ArrowUpRight size={17} className="text-white" strokeWidth={2} />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="py-20 lg:py-28 bg-[#F4EFE7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#F26A21] text-xs font-mono uppercase tracking-widest mb-3">
                Por qué DIM
              </p>
              <h2
                className="font-display text-[clamp(32px,4.5vw,56px)] leading-[0.97] tracking-[-0.03em] font-light text-[#081827] mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Un lugar donde{" "}
                <em className="italic text-[#F26A21]">crecer de verdad.</em>
              </h2>
              <p className="text-[#4B4F56] text-lg font-light leading-relaxed mb-8">
                En DIM creemos que el bienestar de nuestro equipo se refleja
                directamente en la calidad de atención que brindan a nuestros
                pacientes. Por eso invertimos en las personas.
              </p>
              <a
                href="https://empleos.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#081827] hover:bg-[#103A73] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors duration-200"
              >
                <Send size={14} aria-hidden="true" />
                Postularme ahora
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-white rounded-2xl p-6 border border-[#E6EAF1] flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F4EFE7] flex items-center justify-center">
                    <b.Icon
                      size={18}
                      className="text-[#F26A21]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-[#081827] font-semibold text-sm mb-1">{b.title}</h3>
                    <p className="text-[#737985] text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-20 lg:py-28 bg-[#FBFAF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#F26A21] text-xs font-mono uppercase tracking-widest mb-3">
              Proceso de selección
            </p>
            <h2
              className="font-display text-[clamp(32px,4.5vw,56px)] leading-[0.97] tracking-[-0.03em] font-light text-[#081827]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              ¿Cómo es el proceso?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#E6EAF1]"
              aria-hidden="true"
            />

            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center gap-4">
                <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-[#E6EAF1] flex items-center justify-center shadow-sm">
                  {i === steps.length - 1 ? (
                    <CheckCircle2 size={22} className="text-[#F26A21]" strokeWidth={1.75} />
                  ) : (
                    <span
                      className="font-mono text-sm font-semibold text-[#103A73]"
                      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                    >
                      {step.number}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-[#081827] text-base mb-1.5">{step.title}</h3>
                  <p className="text-[#737985] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-[#081827]">
        <CtaBackdrop opacity="opacity-100" overlay="bg-gradient-to-t from-[#081827]/90 via-[#081827]/65 to-[#0d2340]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#F26A21] text-xs font-mono uppercase tracking-widest mb-4">
              Sumate al equipo
            </p>
            <h2
              className="font-display text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              ¿Listo para crecer{" "}
              <em className="italic text-[#F26A21]">con nosotros?</em>
            </h2>
            <p className="text-white/65 text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto">
              Ingresá al portal de empleos de DIM, encontrá tu búsqueda ideal y
              postulate en minutos. Nuestro equipo de RRHH revisará tu perfil.
            </p>
            <a
              href="https://empleos.dim.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-8 py-4 rounded-full text-base transition-colors duration-200"
            >
              <Send size={16} aria-hidden="true" />
              Ir al portal de empleos
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
            <p className="text-white/35 text-xs mt-6">
              empleos.dim.com.ar · Proceso 100% online
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
