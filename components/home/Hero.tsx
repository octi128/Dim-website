import Link from "next/link";
import {
  Calendar,
  FileText,
  Shield,
  Users,
  Stethoscope,
  Microscope,
  CalendarDays,
  TestTube,
  ClipboardList,
  Clock,
  ArrowRight,
} from "lucide-react";

const stats = [
  { Icon: Users, value: "+750", label: "Profesionales médicos", sub: "Especialistas certificados" },
  { Icon: Stethoscope, value: "+60", label: "Años cuidándote", sub: "Desde 1964 en Zona Oeste" },
  { Icon: Microscope, value: "+350", label: "Especialidades", sub: "Todas las áreas médicas" },
];

const quickLinks = [
  { Icon: CalendarDays, label: "Turno médico online", sub: "Reservá en minutos", href: "https://portal.dim.com.ar" },
  { Icon: TestTube, label: "Turno de laboratorio", sub: "Solo 2hs de ayuno", href: "/estudios-y-preparaciones-de-laboratorio" },
  { Icon: ClipboardList, label: "Preparación de estudios", sub: "Resonancia, tomografía y más", href: "/estudios-medicos-y-preparaciones" },
  { Icon: Clock, label: "Sin turno previo", sub: "Consultá disponibilidad", href: "/atencion-sin-turno-previo" },
];

export default function Hero() {
  return (
    <section className="bg-[#FBFAF7] border-b border-[#E6EAF1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 pt-16 pb-0 lg:pt-24 items-center min-h-[82vh]">
          {/* Left: copy */}
          <div className="pb-16 lg:pb-24">
            <div className="inline-flex items-center gap-2 border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21]" />
              Desde 1964 cuidando tu salud
            </div>

            <h1
              className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-[#081827] mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Todos tus estudios
              <br />y médicos{" "}
              <em className="italic text-[#F26A21]">en un solo lugar.</em>
            </h1>

            <p className="text-[#4B4F56] text-lg font-light leading-relaxed mb-8 max-w-md">
              Líderes en imágenes médicas, consultas y laboratorios en Zona Oeste. Más de 90 coberturas médicas y atención de baja, mediana y alta complejidad.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="https://portal.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors duration-200"
              >
                <Calendar size={15} />
                Quiero un turno
              </Link>
              <Link
                href="https://portal.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F4EFE7] text-[#081827] font-semibold px-6 py-3 rounded-full text-sm border border-[#E6EAF1] transition-colors duration-200"
              >
                <FileText size={15} />
                Mis Resultados
              </Link>
              <Link
                href="/coberturas-medicas"
                className="inline-flex items-center gap-2 text-[#4B4F56] hover:text-[#081827] font-medium px-4 py-3 rounded-full text-sm transition-colors duration-200"
              >
                <Shield size={15} />
                Coberturas
              </Link>
            </div>
          </div>

          {/* Right: quick access card */}
          <div className="hidden lg:flex items-center justify-center pb-16 lg:pb-24">
            <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E6EAF1] shadow-[0_24px_80px_rgba(8,24,39,.08)] overflow-hidden">
              {/* Card header */}
              <div className="bg-gradient-to-br from-[#103A73] to-[#5636A4] p-6">
                <p className="text-white/60 text-[10px] font-mono font-medium uppercase tracking-widest mb-1.5">Acceso rápido</p>
                <p className="text-white text-lg font-semibold leading-tight">¿Qué necesitás resolver hoy?</p>
              </div>
              {/* Quick links */}
              <div className="p-4 space-y-2">
                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FBFAF7] border border-transparent hover:border-[#E6EAF1] transition-all duration-150 group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-[#F4EFE7] flex items-center justify-center flex-shrink-0">
                      <item.Icon size={16} className="text-[#F26A21]" strokeWidth={2} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#081827] group-hover:text-[#F26A21] transition-colors">{item.label}</p>
                      <p className="text-xs text-[#737985] truncate">{item.sub}</p>
                    </div>
                    <ArrowRight size={14} className="text-[#D8DEE8] group-hover:text-[#F26A21] flex-shrink-0 transition-colors" strokeWidth={2.5} />
                  </Link>
                ))}
              </div>
              {/* Footer */}
              <div className="px-4 pb-4">
                <Link
                  href="https://portal.dim.com.ar"
                  target="_blank"
                  className="flex items-center justify-center w-full bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold py-3 rounded-xl text-sm transition-colors duration-200"
                >
                  Ir al portal de turnos →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 border-t border-[#E6EAF1] divide-x divide-[#E6EAF1]">
          {stats.map((stat) => (
            <div key={stat.value} className="flex items-center gap-3 py-5 px-6 first:pl-0">
              <div className="w-9 h-9 bg-[#F4EFE7] rounded-full flex items-center justify-center flex-shrink-0">
                <stat.Icon size={16} className="text-[#F26A21]" strokeWidth={2} />
              </div>
              <div>
                <p className="font-display text-xl font-medium text-[#081827]" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                  {stat.value}
                </p>
                <p className="font-mono text-[9px] text-[#737985] leading-tight uppercase tracking-widest">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
