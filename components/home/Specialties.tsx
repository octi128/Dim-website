import Link from "next/link";
import {
  HeartPulse,
  Magnet,
  FlaskConical,
  ScanLine,
  Atom,
  Smile,
  Stethoscope,
  Ribbon,
  type LucideIcon,
} from "lucide-react";

const mainServices: {
  Icon: LucideIcon;
  label: string;
  sub: string;
  href: string;
}[] = [
  {
    Icon: HeartPulse,
    label: "Especialidades Médicas",
    sub: "+350 especialidades disponibles",
    href: "/especialidades-medicas",
  },
  {
    Icon: Magnet,
    label: "Resonancia Magnética",
    sub: "12 resonadores · Philips 3T",
    href: "/resonancia-magnetica",
  },
  {
    Icon: FlaskConical,
    label: "Laboratorio",
    sub: "Resultados online · Solo 2hs ayuno",
    href: "/laboratorios",
  },
  {
    Icon: ScanLine,
    label: "Tomografía Computada",
    sub: "128 cortes · Alta definición",
    href: "/tomografia-multicorte",
  },
  {
    Icon: Atom,
    label: "Medicina Nuclear",
    sub: "PET-CT Digital · Oncología",
    href: "/medicina-nuclear",
  },
  {
    Icon: Smile,
    label: "Odontología",
    sub: "DIM Odontología Premium",
    href: "/odontologia",
  },
  {
    Icon: Stethoscope,
    label: "Cirugías",
    sub: "3 quirófanos · Ambulatorio",
    href: "/cirugia",
  },
  {
    Icon: Ribbon,
    label: "Oncología",
    sub: "Alianza Instituto Fleming",
    href: "/oncologia",
  },
];

function ServiceCard({ Icon, label, sub, href }: typeof mainServices[0]) {
  return (
    <Link
      href={href}
      className="group bg-white border border-[#E6EAF1] rounded-2xl p-5 flex flex-col gap-3 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(242,106,33,.08)] transition-all duration-200"
    >
      <div className="w-10 h-10 bg-[#FBFAF7] rounded-xl flex items-center justify-center group-hover:bg-[#F4EFE7] transition-colors">
        <Icon size={20} className="text-[#F26A21]" strokeWidth={1.75} />
      </div>
      <div>
        <p className="font-semibold text-[#081827] text-sm leading-tight group-hover:text-[#F26A21] transition-colors">
          {label}
        </p>
        <p className="text-xs text-[#737985] mt-0.5">{sub}</p>
      </div>
    </Link>
  );
}

export default function Specialties() {
  return (
    <section className="bg-[#FBFAF7] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
            Nuestros servicios
          </div>
          <h2
            className="font-display text-[clamp(36px,5vw,64px)] font-light tracking-[-0.03em] text-[#081827] mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Encontrá el servicio
            <br />
            que <em className="italic text-[#5636A4]">necesitás.</em>
          </h2>
          <p className="text-[#4B4F56] font-light max-w-lg mx-auto">
            Más de 350 especialidades médicas y los estudios de mayor complejidad de Zona Oeste en un mismo lugar.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* First 4 */}
          {mainServices.slice(0, 4).map((s) => (
            <ServiceCard key={s.href} {...s} />
          ))}

          {/* Feature card — spans 2 cols */}
          <Link
            href="/especialidades-medicas"
            className="col-span-2 bg-gradient-to-br from-[#103A73] to-[#5636A4] rounded-2xl p-7 flex flex-col justify-between min-h-[180px] group hover:opacity-95 transition-opacity"
          >
            <div>
              <p className="text-white/60 text-[10px] font-mono font-medium uppercase tracking-widest mb-2">+350 especialidades</p>
              <h3
                className="font-display text-white text-3xl lg:text-4xl font-light leading-tight tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Especialistas <em className="italic">para cada necesidad.</em>
              </h3>
            </div>
            <div className="flex items-center justify-between mt-6">
              <p className="text-white/60 text-sm">750+ profesionales médicos</p>
              <span className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
                Ver especialidades →
              </span>
            </div>
          </Link>

          {/* Last 4 */}
          {mainServices.slice(4).map((s) => (
            <ServiceCard key={s.href} {...s} />
          ))}
        </div>

        {/* Footer link */}
        <div className="text-center mt-10">
          <Link
            href="/estudios-medicos-y-preparaciones"
            className="text-sm font-medium text-[#4B4F56] hover:text-[#F26A21] transition-colors"
          >
            Ver todos los estudios y preparaciones →
          </Link>
        </div>
      </div>
    </section>
  );
}
