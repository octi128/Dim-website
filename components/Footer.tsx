import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Clock } from "lucide-react";
import type { Configuracion } from "@/sanity/lib/queries";
import {
  PORTAL_URL,
  plataformaLabel,
  telefonoLabel,
  telefonoUrl,
  whatsappLabel,
  whatsappUrl,
} from "@/lib/contacto";

const cols = [
  {
    title: "Navegación",
    links: [
      { label: "Portal de Turnos", href: PORTAL_URL, external: true },
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
      { label: "Contactanos", href: "/contacto" },
      { label: "Receta Digital", href: "/receta-digital" },
      { label: "Pacientes Prioritarios", href: "/pacientes-prioritarios" },
      { label: "DIM Verde", href: "/dim-verde" },
      { label: "Política de Privacidad", href: "/politica" },
    ],
  },
];

const legal = [
  { label: "Política de Privacidad", href: "/politica" },
  { label: "Comité de Ética", href: "/comite-de-etica" },
  { label: "Contactanos", href: "/contacto" },
];

// Los datos de contacto llegan por props: el Footer no consulta Sanity. La
// consulta vive en app/(sitio)/layout.tsx, que es el único que lo renderiza y
// el que además va a alimentar al Header (que es cliente y no puede pedirlos).
export default function Footer({
  configuracion,
}: {
  configuracion: Configuracion;
}) {
  return (
    <footer className="bg-[#F4EFE7] pb-8 pt-2 px-4 sm:px-6 lg:px-8">
      {/* Tarjeta única, siempre centrada y con tope de 1600px.
          Sobre el azul de marca los divisores y los paneles se resuelven con
          blancos translúcidos: así siguen al fondo si alguna vez cambia de tono,
          en vez de quedar fijados a un gris que solo funciona sobre blanco. */}
      <div className="max-w-[1600px] mx-auto bg-[#103A73] rounded-3xl overflow-hidden">
        {/* ── Tier 1: columnas de enlaces + panel de la app ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-16 px-5 py-8 sm:p-10 lg:p-14 border-b border-white/12">
          {/* Columnas de navegación */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 md:gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <p className="text-white font-mono font-semibold text-[10px] uppercase tracking-[0.14em] mb-4">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-white/70 hover:text-[#FBC08E] text-sm font-light transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Panel destacado: turnos, contacto y descarga de la app.
              Ocupa el lugar del bloque "Stay in the loop" de la referencia. */}
          <div className="bg-white/[0.07] border border-white/12 rounded-2xl p-5 sm:p-6 flex flex-col">
            <p className="text-[#C5B7EE] font-mono font-medium text-[10px] uppercase tracking-[0.16em] mb-2">
              App DIM Salud
            </p>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-5">
              Pedí turnos, accedé a tus resultados y llevá tu historial médico
              siempre con vos.
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href="https://apps.apple.com/ar/app/dim-salud-turnos-y-resultados/id1627335644"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#081827] hover:bg-[#1956A6] text-white rounded-xl px-4 py-3 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div className="text-white/50 text-[9px] leading-none">Descargá en el</div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=ar.com.dim.portalturnos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#081827] hover:bg-[#1956A6] text-white rounded-xl px-4 py-3 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden>
                  <path d="M3 2 L14 12 L3 22 Z" fill="#00C3FF" />
                  <path d="M3 2 L18 8.5 L14 12 Z" fill="#FF3D47" />
                  <path d="M3 22 L18 15.5 L14 12 Z" fill="#00E676" />
                  <path d="M14 12 L18 8.5 L21 12 L18 15.5 Z" fill="#FFD500" />
                </svg>
                <div>
                  <div className="text-white/50 text-[9px] leading-none">Disponible en</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </a>
            </div>

            {/* Contacto rápido */}
            <div className="mt-6 pt-5 border-t border-white/12 space-y-3">
              <a
                href={telefonoUrl(configuracion.telefonoCentral)}
                className="flex items-center gap-2.5 group"
              >
                <Phone size={14} className="text-[#FBC08E] flex-shrink-0" />
                <span className="text-white/65 text-xs">Central de Turnos</span>
                <span className="ml-auto font-bold text-white text-sm group-hover:text-[#FBC08E] transition-colors">
                  {telefonoLabel(configuracion.telefonoCentral)}
                </span>
              </a>
              <a
                href={whatsappUrl(configuracion.whatsappCentral)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group"
              >
                <MessageCircle size={14} className="text-[#FBC08E] flex-shrink-0" />
                <span className="text-white/65 text-xs">WhatsApp</span>
                <span className="ml-auto font-bold text-white text-sm group-hover:text-[#FBC08E] transition-colors">
                  {whatsappLabel(configuracion.whatsappCentral)}
                </span>
              </a>
              <div className="flex items-center gap-2.5">
                <Clock size={14} className="text-[#FBC08E] flex-shrink-0" />
                <span className="text-white/65 text-xs">Atención</span>
                <span className="ml-auto font-medium text-white text-xs">
                  Lun–Vie 8–20h · Sáb 8–13h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tier 2: marca + redes ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 px-5 py-8 sm:p-10 lg:px-14 lg:py-10 border-b border-white/12">
          <div className="max-w-md">
            {/* La versión blanca del logotipo: la original es azul oscuro y sobre
                este fondo desaparecía. */}
            <Image
              src="/dim-logotipo-white.svg"
              alt="DIM Centros de Salud"
              width={110}
              height={56}
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/70 font-light text-sm leading-relaxed mb-3">
              Líderes en imágenes médicas, consultas y laboratorios desde 1964.
              Zona Oeste del Gran Buenos Aires.
            </p>
            <a
              href={`mailto:${configuracion.emailTurnos}`}
              className="text-sm text-white/65 hover:text-[#FBC08E] transition-colors"
            >
              {configuracion.emailTurnos}
            </a>
          </div>

          <div className="flex items-center gap-5 md:gap-6">
            {(configuracion.redes ?? []).map((red) => (
              <a
                key={red._key}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/75 hover:text-[#FBC08E] transition-colors"
              >
                {plataformaLabel(red.plataforma)}
              </a>
            ))}
          </div>
        </div>

        {/* ── Tier 3: barra legal ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-10 lg:px-14 py-5">
          <p className="text-xs text-white/55">
            © DIM Salud — Todos los derechos reservados desde 1964
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legal.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-white/60 hover:text-[#FBC08E] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
