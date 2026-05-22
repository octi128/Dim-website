import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Heart,
  Stethoscope,
  Zap,
  Bone,
  ScanLine,
  Activity,
  FlaskConical,
} from "lucide-react";

export const metadata = {
  title: "Atención sin turno previo — DIM Centros de Salud",
  description:
    "Tu salud no puede esperar. Acercate a DIM sin reserva previa para clínica médica, radiología, electrocardiograma, traumatología, tomografía y más. Por orden de llegada.",
};

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Clínica Médica",
    note: null,
    locations: [
      {
        name: "DIM Sede Central",
        address: "Belgrano 136, Ramos Mejía",
        hours: "Lun–Vie 8–19h · Sáb 7–13h",
      },
      {
        name: "DIM Rivadavia",
        address: "Av. Rivadavia 14252",
        hours: "Lun–Vie 7–22h · Sáb–Dom–Fer 7–18h",
      },
      {
        name: "DIM Alta Complejidad",
        address: "Espora 18",
        hours: "Lun–Vie 8–20h · Sáb–Dom–Fer 7–13h",
      },
      {
        name: "DIM Ramos Norte",
        address: "Ardoino 640",
        hours: "Lun–Vie 7–20h · Sáb 7–17h",
      },
    ],
  },
  {
    icon: Heart,
    title: "Ginecología",
    note: null,
    locations: [
      {
        name: "DIM Mujer",
        address: "Av. Rivadavia 14282",
        hours: "Lun–Vie 8–18h · Sáb 8–12h",
      },
    ],
  },
  {
    icon: Activity,
    title: "Electrocardiograma",
    note: "Pacientes mayores de 15 años",
    locations: [
      {
        name: "DIM Sede Central",
        address: "Belgrano 136, Ramos Mejía",
        hours: "Lun–Vie 8–19h · Sáb 7–13h",
      },
      {
        name: "DIM Rivadavia",
        address: "Av. Rivadavia 14252",
        hours: "Lun–Vie 7–22h · Sáb–Dom–Fer 7–18h",
      },
      {
        name: "DIM Alta Complejidad",
        address: "Espora 18",
        hours: "Lun–Vie 8–20h · Sáb–Dom–Fer 7–13h",
      },
    ],
  },
  {
    icon: Zap,
    title: "Radiología",
    note: null,
    locations: [
      {
        name: "DIM Sede Central",
        address: "Belgrano 136, Ramos Mejía",
        hours: "Lun–Vie 7–20h · Sáb 7–13h",
      },
      {
        name: "DIM Rivadavia",
        address: "Av. Rivadavia 14252",
        hours: "Lun–Vie 7–22h · Sáb–Dom–Fer 7–18h",
      },
      {
        name: "DIM Alta Complejidad",
        address: "Espora 18",
        hours: "Lun–Vie 8–20h · Sáb–Dom–Fer 7–13h",
      },
      {
        name: "DIM Ramos Norte",
        address: "Ardoino 640",
        hours: "Lun–Vie 7–20h · Sáb 7–17h",
      },
      {
        name: "DIM Morón",
        address: "Morón",
        hours: "Lun–Vie 8–18h · Sáb 8–12h",
      },
      {
        name: "DIM Liniers",
        address: "Liniers",
        hours: "Lun–Sáb 7–13h",
      },
    ],
  },
  {
    icon: Bone,
    title: "Traumatología",
    note: "Pacientes mayores de 16 años",
    locations: [
      {
        name: "DIM Morón",
        address: "Morón",
        hours: "Lun–Vie 8–18h · Sáb 8–12h",
      },
      {
        name: "DIM Rivadavia",
        address: "Av. Rivadavia 14252",
        hours: "Lun–Vie 8–20h · Sáb 8–14h · Dom 9–13h",
      },
    ],
  },
  {
    icon: ScanLine,
    title: "Radiología Odontológica",
    note: "Panorámica, sinusal, ATM y cefalometría",
    locations: [
      {
        name: "DIM Rivadavia",
        address: "Av. Rivadavia 14252",
        hours: "Lun–Vie 7–22h · Sáb–Dom–Fer 7–18h",
      },
    ],
  },
  {
    icon: ScanLine,
    title: "Tomografía",
    note: "Sin contraste · Por orden de llegada",
    locations: [
      {
        name: "DIM Sede Central",
        address: "Belgrano 136, Ramos Mejía",
        hours: "Lun–Vie 7–21:50h",
      },
      {
        name: "DIM Rivadavia",
        address: "Av. Rivadavia 14252",
        hours: "Lun–Vie 7–21:50h · Sáb–Dom–Fer 7–18h",
      },
      {
        name: "DIM Alta Complejidad",
        address: "Espora 18",
        hours: "Lun–Vie 8–20h",
      },
      {
        name: "DIM Ramos Norte",
        address: "Ardoino 640",
        hours: "Lun–Vie 7–20h",
      },
    ],
  },
  {
    icon: FlaskConical,
    title: "Mamografía",
    note: "Requiere orden médica · Tomosíntesis con turno previo",
    locations: [
      {
        name: "DIM Mujer",
        address: "Av. Rivadavia 14282",
        hours: "Lun–Vie 8–18h · Sáb 8–12h",
      },
      {
        name: "DIM Sede Central",
        address: "Belgrano 136, Ramos Mejía",
        hours: "Lun–Vie 8–17h",
      },
      {
        name: "DIM Rivadavia",
        address: "Av. Rivadavia 14252",
        hours: "Lun–Vie 8–20h · Sáb 8–13h",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Densitometría",
    note: null,
    locations: [
      {
        name: "DIM Mujer",
        address: "Av. Rivadavia 14282",
        hours: "Lun–Vie 8–18h · Sáb 8–12h",
      },
      {
        name: "DIM Sede Central",
        address: "Belgrano 136, Ramos Mejía",
        hours: "Lun–Vie 8–17h",
      },
    ],
  },
];

export default function AtencionSinTurnoPrevioPage() {
  return (
    <>
      {/* ────────── Hero ────────── */}
      <section className="relative bg-gradient-to-br from-[#103A73] via-[#1956A6] to-[#5636A4] overflow-hidden">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-10 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Atención sin turno previo</span>
          </nav>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
                <Clock size={12} strokeWidth={2.25} className="text-[#F26A21]" />
                Por orden de llegada · Sin reserva previa
              </div>

              <h1
                className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Atención sin
                <br />
                <em className="italic text-[#F26A21]">turno previo.</em>
              </h1>

              <p className="text-white/75 text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-xl">
                Tu salud es nuestra prioridad. Desde 1964 atendemos consultas y estudios que no pueden esperar — acercate a cualquiera de nuestros centros y te atendemos el mismo día.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#servicios"
                  className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  <MapPin size={15} strokeWidth={2.25} />
                  Ver centros y horarios
                </Link>
                <Link
                  href="https://portal.dim.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#F4EFE7] text-[#081827] font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  <CalendarDays size={15} strokeWidth={2.25} />
                  Pedir turno online
                </Link>
              </div>
            </div>

            {/* Right: image with floating badges */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_80px_rgba(8,24,39,.4)]">
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80"
                  alt="Sala de espera DIM Centros de Salud"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/85 via-[#081827]/15 to-transparent" />

                {/* Floating info chip */}
                <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-3 max-w-[230px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21]" />
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/80">
                      Horario de cierre
                    </p>
                  </div>
                  <p className="text-white text-[12px] font-light leading-snug">
                    El horario de fin de atención puede variar según el flujo de pacientes del día.
                  </p>
                </div>

                {/* Bottom stats badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <div className="grid grid-cols-3 divide-x divide-white/15">
                    <div className="pr-3">
                      <p
                        className="font-display text-2xl font-medium text-white"
                        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                      >
                        9
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/65 leading-tight mt-0.5">Servicios</p>
                    </div>
                    <div className="px-3">
                      <p
                        className="font-display text-2xl font-medium text-white"
                        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                      >
                        +6
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/65 leading-tight mt-0.5">Centros</p>
                    </div>
                    <div className="pl-3">
                      <p
                        className="font-display text-2xl font-medium text-white"
                        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                      >
                        1964
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/65 leading-tight mt-0.5">Fundación</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip (always visible) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mt-14 lg:mt-20 border-t border-white/15 pt-8">
            <div>
              <p
                className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                9
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Servicios disponibles</p>
            </div>
            <div>
              <p
                className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                +6
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Centros habilitados</p>
            </div>
            <div>
              <p
                className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                7hs
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Apertura más temprana</p>
            </div>
            <div>
              <p
                className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                +60
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">Años cuidándote</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Important notice ────────── */}
      <div className="bg-[#F4EFE7] border-b border-[#E6D8C8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#F26A21] flex items-center justify-center flex-shrink-0">
              <Clock size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <p className="text-[#4B4F56] text-sm font-light leading-relaxed">
              <strong className="font-semibold text-[#081827]">Importante:</strong>{" "}
              La atención es por orden de llegada. El horario de finalización puede adelantarse según el volumen de pacientes del día. Te recomendamos verificar disponibilidad antes de acercarte.
            </p>
          </div>
        </div>
      </div>

      {/* ────────── Services grid ────────── */}
      <section id="servicios" className="bg-[#FBFAF7] py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section heading */}
          <div className="mb-10 lg:mb-14">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21] mr-2" />
              Servicios habilitados
            </div>
            <h2
              className="font-display text-3xl lg:text-[44px] font-light text-[#081827] tracking-[-0.02em] leading-tight mb-3"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              ¿Qué podés hacer{" "}
              <em className="italic text-[#5636A4]">sin turno?</em>
            </h2>
            <p className="text-[#4B4F56] font-light text-base lg:text-lg leading-relaxed max-w-2xl">
              Nueve servicios disponibles en distintos centros de la red DIM — sin necesidad de reserva previa. Chequeá los horarios de cada sede.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden hover:border-[#D8DEE8] hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
                >
                  {/* Card header */}
                  <div className="px-6 pt-6 pb-5 border-b border-[#F0F3F7]">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F4EFE7] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={18} className="text-[#F26A21]" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3
                          className="font-display text-lg lg:text-xl font-medium text-[#081827] leading-snug tracking-[-0.01em]"
                          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                        >
                          {service.title}
                        </h3>
                        {service.note && (
                          <p className="text-[#737985] text-xs font-light mt-1">{service.note}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="divide-y divide-[#F0F3F7]">
                    {service.locations.map((loc) => (
                      <div key={loc.name} className="px-6 py-4">
                        <div className="flex items-start gap-2.5">
                          <MapPin
                            size={13}
                            className="text-[#F26A21] mt-0.5 flex-shrink-0"
                            strokeWidth={2}
                          />
                          <div className="min-w-0">
                            <p className="text-[#081827] font-semibold text-sm leading-snug">
                              {loc.name}
                            </p>
                            <p className="text-[#737985] text-xs font-light mt-0.5">
                              {loc.address}
                            </p>
                            <p className="text-[#4B4F56] text-xs font-medium mt-1 font-mono">
                              {loc.hours}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────── Help footer band ────────── */}
      <section className="bg-white py-16 lg:py-20 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {/* Turno online */}
            <Link
              href="https://portal.dim.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <CalendarDays size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <h3
                className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Reservá tu turno online
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Para estudios que requieren turno podés reservar desde el Portal del Paciente, disponible las 24 horas.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ir al portal de turnos
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </span>
            </Link>

            {/* Estudios médicos */}
            <Link
              href="/estudios-medicos-y-preparaciones"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <Stethoscope size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <h3
                className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Estudios y preparaciones
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Conocé los +{25} estudios médicos que realizamos y cómo prepararte para cada uno.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver estudios y preparaciones
                <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            {/* Coberturas */}
            <Link
              href="/coberturas-medicas"
              className="group bg-white border border-[#E6EAF1] rounded-2xl p-7 lg:p-8 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                <ShieldCheck size={20} className="text-[#F26A21]" strokeWidth={1.75} />
              </div>
              <h3
                className="font-display text-xl lg:text-2xl font-light text-[#081827] leading-tight tracking-[-0.01em] mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Tu cobertura médica
              </h3>
              <p className="text-[#4B4F56] font-light text-sm leading-relaxed mb-5">
                Consultá las +90 obras sociales y prepagas con las que trabajamos en toda la red DIM.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#F26A21] font-semibold text-sm group-hover:text-[#C84F12] transition-colors">
                Ver coberturas
                <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
