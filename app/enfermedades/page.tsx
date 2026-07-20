import Link from "next/link";
import {
  ChevronRight,
  Stethoscope,
  CalendarDays,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { AVAILABLE_LETTERS } from "@/lib/diseases";
import DiseaseSearchBar from "@/components/DiseaseSearchBar";
import CtaBackdrop from "@/components/CtaBackdrop";

const LETTER_ROWS = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  ["J", "L", "M", "N", "O", "P", "Q", "R", "S"],
  ["T", "U", "V", "Z"],
] as const;

export default function EnfermedadesIndexPage() {
  return (
    <>
      {/* Hero — brand gradient */}
      <section className="bg-gradient-to-br from-[#103A73] via-[#1956A6] to-[#5636A4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: breadcrumb + title + search */}
            <div>
              <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-8 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                <ChevronRight size={12} />
                <span className="text-white/90">Enfermedades y afecciones</span>
              </nav>

              <h1
                className="font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-4"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Enfermedades y afecciones
              </h1>

              <p className="text-white/75 text-base lg:text-lg font-light mb-8 leading-relaxed">
                Respuestas fáciles de entender sobre enfermedades y afecciones.
              </p>

              <p className="text-white/90 text-sm font-semibold mb-3">
                Buscar enfermedades y afecciones
              </p>
              <DiseaseSearchBar variant="hero" />
            </div>

            {/* Right: alphabet grid */}
            <div>
              <p className="text-white/70 text-sm font-semibold mb-5 leading-snug">
                Encontrar enfermedades y afecciones según la letra con la que empiezan
              </p>
              <div className="space-y-2.5">
                {LETTER_ROWS.map((row, ri) => (
                  <div key={ri} className="flex flex-wrap gap-2">
                    {row.map((l) => (
                      <Link
                        key={l}
                        href={`/enfermedades/${l.toLowerCase()}`}
                        className="w-9 h-9 rounded-full border-2 border-white/35 text-white text-sm font-semibold flex items-center justify-center hover:border-white hover:bg-white/15 transition-all duration-200"
                      >
                        {l}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Resource cards */}
      <section className="bg-[#FBFAF7] py-16 lg:py-20 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Featured wide card */}
          <Link
            href="/especialidades-medicas"
            className="group block bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200 mb-5"
          >
            <div className="grid md:grid-cols-[1fr_minmax(0,320px)] items-stretch">
              {/* Content */}
              <div className="p-7 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                    <Stethoscope size={20} className="text-[#F26A21]" strokeWidth={1.75} />
                  </div>
                  <h3
                    className="font-display text-3xl lg:text-[34px] font-light text-[#081827] leading-tight tracking-[-0.02em] mb-3"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    Encontrá tu especialista
                  </h3>
                  <p className="text-[#4B4F56] font-light text-base leading-relaxed mb-6 max-w-md">
                    Conocé las +350 especialidades de DIM y reservá tu turno con el profesional indicado para vos.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                  Ver especialidades médicas
                  <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Visual */}
              <div className="hidden md:block relative bg-gradient-to-br from-[#103A73] to-[#5636A4] min-h-[260px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Stethoscope size={120} className="text-white/15" strokeWidth={1.25} />
                </div>
                <div className="absolute bottom-6 right-6 left-6">
                  <p className="text-white/60 text-[10px] font-mono font-medium uppercase tracking-widest mb-1">
                    +750 profesionales
                  </p>
                  <p className="text-white text-sm font-light leading-snug">
                    Especialistas certificados en toda la red DIM.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Two equal cards */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {/* Card: Reservá turno */}
            <Link
              href="https://portal.dim.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-9 flex flex-col justify-between min-h-[260px] hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                  <CalendarDays size={20} className="text-[#F26A21]" strokeWidth={1.75} />
                </div>
                <h3
                  className="font-display text-2xl lg:text-3xl font-light text-[#081827] leading-tight tracking-[-0.02em] mb-3"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Reservá tu turno online
                </h3>
                <p className="text-[#4B4F56] font-light text-sm leading-relaxed">
                  Disponible 24/7 desde el Portal del Paciente. Pedí tu turno médico o de laboratorio en minutos.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ir al portal de turnos
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </span>
            </Link>

            {/* Card: Sin turno previo */}
            <Link
              href="/atencion-sin-turno-previo"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-9 flex flex-col justify-between min-h-[260px] hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                  <Clock size={20} className="text-[#F26A21]" strokeWidth={1.75} />
                </div>
                <h3
                  className="font-display text-2xl lg:text-3xl font-light text-[#081827] leading-tight tracking-[-0.02em] mb-3"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Atención sin turno previo
                </h3>
                <p className="text-[#4B4F56] font-light text-sm leading-relaxed">
                  Acercate a DIM Rivadavia. Lunes a viernes 24hs · Sábados, domingos y feriados 7 a 18:30hs.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver disponibilidad
                <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Bottom feature banner */}
          <Link
            href="/conocenos"
            className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#081827] via-[#103A73] to-[#5636A4]"
          >
            <CtaBackdrop opacity="opacity-100" overlay="bg-gradient-to-r from-[#081827] via-[#103A73]/70 to-transparent" />
            {/* Decorative circle */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute right-10 top-10 w-40 h-40 rounded-full bg-[#F26A21]/20 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 p-8 lg:p-12 items-end">
              <div className="max-w-2xl">
                <p className="text-white/60 text-[10px] font-mono font-medium uppercase tracking-widest mb-3">
                  Desde 1964
                </p>
                <h3
                  className="font-display text-white text-3xl lg:text-[44px] font-light leading-tight tracking-[-0.02em] mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Cuidándote en Zona Oeste,{" "}
                  <em className="italic text-[#F26A21]">desde el principio.</em>
                </h3>
                <p className="text-white/75 font-light text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
                  DIM acompaña a Zona Oeste con diagnóstico por imágenes, laboratorio, consultorios y cirugía ambulatoria — todo en un mismo lugar.
                </p>
                <span className="inline-flex items-center gap-1.5 text-white font-semibold text-sm">
                  Conocé más sobre DIM
                  <ArrowRight size={15} strokeWidth={2.25} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              <span className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-full bg-white/15 group-hover:bg-[#F26A21] items-center justify-center transition-colors">
                <ArrowUpRight size={22} className="text-white" strokeWidth={2} />
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* Browse all letters strip */}
      <section className="bg-white py-12 lg:py-16 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
            <div>
              <div className="inline-flex items-center border border-[#E6EAF1] bg-[#FBFAF7] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-4">
                Directorio completo
              </div>
              <h2
                className="font-display text-3xl lg:text-4xl font-light text-[#081827] tracking-[-0.02em] leading-tight"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Explorá por <em className="italic text-[#5636A4]">letra inicial.</em>
              </h2>
            </div>
            <Link
              href="/enfermedades/buscar"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#103A73] hover:text-[#F26A21] transition-colors"
            >
              <Search size={14} strokeWidth={2.25} />
              Buscar por nombre
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {AVAILABLE_LETTERS.map((l) => (
              <Link
                key={l}
                href={`/enfermedades/${l.toLowerCase()}`}
                className="w-11 h-11 rounded-full border-2 border-[#103A73] flex items-center justify-center text-[#103A73] font-semibold text-sm hover:bg-[#103A73] hover:text-white transition-colors duration-200"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
