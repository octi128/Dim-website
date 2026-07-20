import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Coffee,
  CalendarDays,
  FileText,
  ArrowUpRight,
  Droplets,
  TestTube,
  MapPin,
} from "lucide-react";
import { LAB_CATEGORIES, STUDIES_8H, STUDIES_12H } from "@/lib/lab-studies";
import LabAccordion from "@/components/studies/LabAccordion";

export const metadata = {
  title: "Estudios y preparaciones de laboratorio — DIM Centros de Salud",
  description:
    "Análisis de laboratorio con ayuno mínimo de 2 horas. Conocé los estudios que sí requieren ayuno prolongado de 8 o 12 horas y solicitá tu turno online.",
};

export default function EstudiosLaboratorioPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        {/* Full-width background image */}
        <Image
          src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1600&q=80"
          alt="Profesional de laboratorio de DIM Centros de Salud"
          fill
          sizes="100vw"
          className="object-cover object-[70%_30%]"
          priority
        />
        {/* Legibility overlays: brand-blue scrim on the text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2440]/95 via-[#103A73]/72 to-[#5636A4]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/85 via-transparent to-[#081827]/40" />
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-10 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/" className="hover:text-white transition-colors">Portal de turnos</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Estudios y preparaciones de laboratorio</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Coffee size={12} strokeWidth={2.25} className="text-[#F26A21]" />
              Solo 2 horas de ayuno en la mayoría
            </div>

            <h1
              className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              ¿Ayunar?
              <br />
              <em className="italic text-[#F26A21]">Solo si es necesario.</em>
            </h1>

            <p className="text-white/80 text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-xl">
              En DIM hacemos los análisis de rutina con sólo 2 horas de ayuno. Programá tu extracción a media mañana, al mediodía o después de un desayuno liviano — sin alterar tu día.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="https://portal.dim.com.ar/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <CalendarDays size={15} strokeWidth={2.25} />
                Quiero un turno
              </Link>
              <Link
                href="#categorias"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F4EFE7] text-[#081827] font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <FileText size={15} strokeWidth={2.25} />
                Ver preparaciones
              </Link>
            </div>
          </div>

          {/* Stats strip — three fasting tiers */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-5 mt-14 lg:mt-20 border-t border-white/15 pt-8 max-w-2xl">
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>2hs</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Mayoría de estudios</p>
            </div>
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>+{STUDIES_8H.length}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Con 8hs de ayuno</p>
            </div>
            <div>
              <p className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>{STUDIES_12H.length}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Con 12hs de ayuno</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Three fasting tiers — featured ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-20 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              <Clock size={12} className="text-[#F26A21] mr-2" strokeWidth={2.25} />
              Tiempos de ayuno
            </div>
            <h2
              className="font-display text-3xl lg:text-[44px] font-light text-[#081827] tracking-[-0.02em] leading-tight mb-3 max-w-3xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Ayuno justo, <em className="italic text-[#5636A4]">sin pasar horas con hambre.</em>
            </h2>
            <p className="text-[#4B4F56] font-light text-base lg:text-lg leading-relaxed max-w-2xl">
              Solo algunos estudios específicos requieren ayuno prolongado. Para todo lo demás, basta con 2 horas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* 2hs — primary highlight */}
            <Link
              href="#categorias"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#103A73] to-[#5636A4] p-7 lg:p-8 text-white hover:shadow-[0_20px_50px_rgba(8,24,39,.15)] transition-shadow"
            >
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#F26A21]/20 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                  <Coffee size={20} strokeWidth={1.75} />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/70 mb-2">Más cómodo</p>
                <p className="font-display text-4xl font-light leading-none tracking-tight mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                  2 horas
                </p>
                <p className="text-white/80 font-light text-sm leading-relaxed mb-6">
                  La mayoría de los análisis de rutina. Podés desayunar liviano y venir más tarde.
                </p>
                <span className="inline-flex items-center gap-1.5 font-semibold text-sm">
                  Ver detalles
                  <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 8hs */}
            <Link
              href="#cat-ayuno-8h"
              className="group bg-white border border-[#E6EAF1] rounded-3xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <Clock size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#737985] mb-2">{STUDIES_8H.length} estudios</p>
              <p className="font-display text-4xl font-light text-[#081827] leading-none tracking-tight mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                8 horas
              </p>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-6">
                Hormonales, metabólicos y de coagulación que exigen extracción a primera hora.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver listado
                <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            {/* 12hs */}
            <Link
              href="#cat-ayuno-12h"
              className="group bg-white border border-[#E6EAF1] rounded-3xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <Clock size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#737985] mb-2">{STUDIES_12H.length} estudios</p>
              <p className="font-display text-4xl font-light text-[#081827] leading-none tracking-tight mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                12 horas
              </p>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-6">
                Perfil lipídico extendido y dosajes de vitaminas con ayuno estricto.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver listado
                <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────── Categories accordion ────────── */}
      <section id="categorias" className="bg-white py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          <div className="mb-10 lg:mb-12">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-[#FBFAF7] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21] mr-2" />
              Categorías y preparaciones
            </div>
            <h2
              className="font-display text-3xl lg:text-[44px] font-light text-[#081827] tracking-[-0.02em] leading-tight mb-3"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Encontrá tu estudio y su <em className="italic text-[#5636A4]">preparación.</em>
            </h2>
            <p className="text-[#4B4F56] font-light text-base lg:text-lg leading-relaxed max-w-2xl">
              Buscá un análisis específico — por ejemplo «Curva de glucosa» o «Vitamina C» — o explorá las categorías para conocer la preparación correspondiente.
            </p>
          </div>

          {/* Anchor targets so featured cards can link directly to 8h/12h */}
          <div className="space-y-2.5">
            <span id="cat-ayuno-8h" className="block -mt-32 pt-32" aria-hidden />
            <span id="cat-ayuno-12h" className="block -mt-32 pt-32" aria-hidden />
          </div>

          <LabAccordion categories={LAB_CATEGORIES} />
        </div>
      </section>

      {/* ────────── Help footer band ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-20 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Banner — cuidados previos */}
          <div className="relative rounded-3xl overflow-hidden border border-[#E6EAF1] mb-12 min-h-[340px] lg:min-h-[400px] flex">
            <Image
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80"
              alt="Equipo de laboratorio DIM"
              fill
              sizes="100vw"
              className="object-cover object-[70%_40%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B2440]/95 via-[#103A73]/70 to-[#5636A4]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/70 via-transparent to-transparent" />

            <div className="relative z-10 max-w-xl p-8 lg:p-12 self-center">
              <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-5">
                <Droplets size={12} className="text-[#F26A21]" strokeWidth={2.25} />
                Cuidados previos
              </div>
              <h3
                className="font-display text-3xl lg:text-4xl font-light text-white tracking-[-0.02em] leading-tight mb-4"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Hidratate <em className="italic text-[#F26A21]">con normalidad.</em>
              </h3>
              <p className="text-white/80 font-light text-base lg:text-lg leading-relaxed">
                El agua no rompe el ayuno. Tomá agua durante las horas previas a la extracción para facilitar la toma de muestra — salvo indicación contraria de tu médico tratante. Evitá café, mate, jugos y bebidas azucaradas.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="https://portal.dim.com.ar/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <CalendarDays size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                Reservá tu turno
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Subí la orden médica desde el Portal del Paciente y elegí el horario que mejor te convenga.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ir al portal
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </span>
            </Link>

            <Link
              href="/atencion-sin-turno-previo"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <MapPin size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                Centros y horarios
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Conocé dónde podés realizarte los análisis de laboratorio y los horarios de cada sede.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver centros
                <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link
              href="https://portal.dim.com.ar/resultados"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <TestTube size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                Retirá tus resultados
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Consultá tus resultados online desde el Portal del Paciente las 24 horas — apenas estén disponibles.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver resultados
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
