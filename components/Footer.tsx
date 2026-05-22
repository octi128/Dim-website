import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock } from "lucide-react";

const cols = [
  {
    title: "Navegación",
    links: [
      { label: "Portal de Turnos", href: "https://portal.dim.com.ar", external: true },
      { label: "Especialidades Médicas", href: "/especialidades-medicas" },
      { label: "Laboratorio", href: "/laboratorios" },
      { label: "Resonancia Magnética", href: "/resonancia-magnetica" },
      { label: "Coberturas Médicas", href: "/coberturas-medicas" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Medicina Nuclear", href: "/medicina-nuclear" },
      { label: "Tomografía Computada", href: "/tomografia-multicorte" },
      { label: "Odontología", href: "/odontologia" },
      { label: "Cirugías", href: "/cirugia" },
      { label: "DIM Once", href: "/dim-once" },
      { label: "Atención sin turno", href: "/atencion-sin-turno-previo" },
    ],
  },
  {
    title: "Sobre DIM",
    links: [
      { label: "Conocenos", href: "/conocenos" },
      { label: "Novedades", href: "/novedades" },
      { label: "Docencia", href: "/educacion" },
      { label: "Fundación DIM", href: "https://fundaciondim.com.ar", external: true },
      { label: "Trabajar en DIM", href: "/recursos-humanos" },
      { label: "Comité de Ética", href: "/comite-de-etica" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
      { label: "Contactanos", href: "/contacto" },
      { label: "Receta Digital", href: "/receta-digital" },
      { label: "Pacientes Prioritarios", href: "/pacientes-prioritarios" },
      { label: "DIM Verde", href: "/dim-verde" },
      { label: "Política de Privacidad", href: "/politica" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/dimcentrosdesalud" },
  { label: "Facebook", href: "https://facebook.com/dimcentrosdesalud" },
  { label: "YouTube", href: "https://youtube.com/c/dimcentrosdesalud" },
  { label: "LinkedIn", href: "https://ar.linkedin.com/company/dimcentrosdesalud" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F4EFE7] pb-8 pt-2 px-6 lg:px-8">
      {/* Main card */}
      <div className="max-w-7xl mx-auto bg-white border border-[#E6EAF1] rounded-3xl overflow-hidden">
        {/* Top: brand + contact */}
        <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-10 border-b border-[#E6EAF1]">
          {/* Brand */}
          <div>
            <Image
              src="/dim-logo.svg"
              alt="DIM Centros de Salud"
              width={100}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <p className="text-[#4B4F56] font-light text-sm leading-relaxed max-w-xs mb-5">
              Líderes en imágenes médicas, consultas y laboratorios desde 1964. Zona Oeste del Gran Buenos Aires.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[#737985]">
                <Mail size={13} className="text-[#F26A21] flex-shrink-0" />
                <a href="mailto:turnos@dim.com.ar" className="hover:text-[#F26A21] transition-colors">turnos@dim.com.ar</a>
              </div>
            </div>
          </div>

          {/* Contact + app */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Contact */}
            <div className="bg-[#FBFAF7] border border-[#E6EAF1] rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-sm">
                <Phone size={14} className="text-[#F26A21] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#737985] text-xs">Central de Turnos</p>
                  <p className="font-bold text-[#081827]">5554-8888</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <Phone size={14} className="text-[#F26A21] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#737985] text-xs">WhatsApp</p>
                  <p className="font-bold text-[#081827]">11-6648-5555</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <Clock size={14} className="text-[#F26A21] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#737985] text-xs">Atención</p>
                  <p className="font-medium text-[#081827] text-xs">Lun–Vie 8–20h · Sáb 8–13h</p>
                </div>
              </div>
            </div>

            {/* App downloads */}
            <div className="flex flex-col gap-2.5">
              <p className="text-[#737985] text-[10px] font-mono font-medium uppercase tracking-wider mb-1">App DIM Salud</p>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#081827] hover:bg-[#103A73] text-white rounded-xl px-4 py-3 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div className="text-white/50 text-[9px] leading-none">Descargá en el</div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#081827] hover:bg-[#103A73] text-white rounded-xl px-4 py-3 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
                  <path d="M3.18 23.76c.3.17.64.24.99.2l12.49-7.17-2.66-2.66-10.82 9.63zm15.28-9.1L5.37 7.26 3.18.24C2.84.05 2.4.12 2.1.4L14.63 12 18.46 14.66zM21.4 10.6l-3.08-1.77-3.08 1.77.01 4.17 3.07 1.77 3.08-1.77-.01-4.17zm-18.22-.36C3 10.42 3 10.62 3 10.83v2.34c0 .21 0 .41.18.59l11.45-3.76-11.45-3.76z" />
                </svg>
                <div>
                  <div className="text-white/50 text-[9px] leading-none">Disponible en</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 lg:p-10">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-[#081827] font-mono font-semibold text-[10px] uppercase tracking-wider mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[#737985] hover:text-[#F26A21] text-sm font-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E6EAF1] px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#737985]">© DIM Salud — Todos los derechos reservados desde 1964</p>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-xs text-[#737985] hover:text-[#F26A21] transition-colors font-medium">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
