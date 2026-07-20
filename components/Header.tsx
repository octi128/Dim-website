"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

type NavLink = { label: string; href: string; external?: boolean };

type NavItem = {
  label: string;
  cols: NavLink[][];
  feature: {
    eyebrow: string;
    title: string;
    sub: string;
    href: string;
    external?: boolean;
    bg: string;
  };
};

const navItems: NavItem[] = [
  {
    label: "Portal de Turnos",
    cols: [
      [
        { label: "Ingresar al Portal Online", href: "https://portal.dim.com.ar", external: true },
        { label: "Estudios Médicos y Preparaciones", href: "/estudios-medicos-y-preparaciones" },
        { label: "Turnos de Laboratorio", href: "/estudios-y-preparaciones-de-laboratorio" },
      ],
      [
        { label: "Turnos Médicos", href: "https://portal.dim.com.ar/turnos-medicos", external: true },
        { label: "Atención sin turno previo", href: "/atencion-sin-turno-previo" },
      ],
    ],
    feature: {
      eyebrow: "Acceso rápido",
      title: "Reservá tu turno online",
      sub: "Disponible 24/7 desde el Portal del Paciente.",
      href: "https://portal.dim.com.ar",
      external: true,
      bg: "from-[#103A73] to-[#5636A4]",
    },
  },
  {
    label: "Especialidades",
    cols: [
      [
        { label: "Especialidades Médicas", href: "/especialidades-medicas" },
        { label: "Odontología", href: "/odontologia" },
        { label: "Cirugías", href: "/cirugia" },
        { label: "Oncología", href: "/oncologia" },
      ],
      [
        { label: "Medicina Nuclear", href: "/medicina-nuclear" },
        { label: "Resonancia Magnética", href: "/resonancia-magnetica" },
        { label: "Tomografía Computada", href: "/tomografia-multicorte" },
        { label: "Laboratorio", href: "/laboratorios" },
      ],
    ],
    feature: {
      eyebrow: "+350 especialidades",
      title: "Especialistas para cada necesidad",
      sub: "750+ profesionales médicos en toda la red DIM.",
      href: "/especialidades-medicas",
      bg: "from-[#5636A4] to-[#103A73]",
    },
  },
  {
    label: "Sobre DIM",
    cols: [
      [
        { label: "Centros de Salud DIM", href: "/nuestros-centros-y-horarios" },
        { label: "Coberturas Médicas", href: "/coberturas-medicas" },
        { label: "Novedades", href: "/novedades" },
        { label: "Sobre Nosotros", href: "/conocenos" },
      ],
      [
        { label: "Quiero trabajar en DIM", href: "/recursos-humanos" },
        { label: "Beneficios DIM", href: "/mutual-amedim" },
        { label: "Contactanos", href: "/contacto" },
      ],
    ],
    feature: {
      eyebrow: "Desde 1964",
      title: "Cuidándote en Zona Oeste",
      sub: "Conocé nuestra historia y nuestra red de centros.",
      href: "/conocenos",
      bg: "from-[#081827] to-[#103A73]",
    },
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenDropdown(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled || openDropdown !== null
          ? "bg-white shadow-[0_1px_0_#E6EAF1]"
          : "bg-[#FBFAF7]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/dim-logotipo.svg"
              alt="DIM Centros de Salud"
              width={80}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((nav, idx) => {
              const isOpen = openDropdown === idx;
              return (
                <button
                  key={nav.label}
                  onClick={() => setOpenDropdown(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="relative flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium text-[#081827] group"
                >
                  <span className="relative pb-1">
                    {nav.label}
                    <span
                      className={`absolute left-0 right-0 -bottom-0 h-[2px] origin-left bg-[#F26A21] transition-transform duration-200 ${
                        isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#F26A21]" : "text-[#737985]"
                    }`}
                    strokeWidth={2.25}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right: search + CTA */}
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 text-[#081827] hover:text-[#F26A21] transition-colors text-sm font-medium px-2 py-2"
              aria-label="Buscar"
            >
              <Search size={17} strokeWidth={2} />
            </button>

            <Link
              href="https://portal.dim.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center bg-[#081827] hover:bg-[#103A73] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
            >
              Portal de Turnos
            </Link>

            <button
              className="lg:hidden p-2 text-[#4B4F56] hover:bg-[#F4EFE7] rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop backdrop — covers only the area below the navbar bar (h-20 = 80px) */}
      {openDropdown !== null && (
        <div
          className="hidden lg:block fixed top-20 inset-x-0 bottom-0 bg-[#081827]/25 backdrop-blur-[2px] backdrop-enter"
          onClick={() => setOpenDropdown(null)}
          aria-hidden="true"
        />
      )}

      {/* Desktop megamenu */}
      {openDropdown !== null && (
        <div className="hidden lg:block absolute top-full left-0 right-0 bg-white border-t border-[#E6EAF1] shadow-[0_24px_48px_-12px_rgba(8,24,39,.10)] dropdown-enter">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
            <div className="grid grid-cols-12 gap-10">
              {/* Two link columns */}
              <div className="col-span-8 grid grid-cols-2 gap-x-10 gap-y-4">
                {navItems[openDropdown].cols.map((col, ci) => (
                  <ul key={ci} className="space-y-4">
                    {col.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          onClick={() => setOpenDropdown(null)}
                          className="group inline-flex items-center text-[17px] text-[#081827] hover:text-[#F26A21] transition-colors"
                        >
                          <span className="relative">
                            {item.label}
                            <span className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#F26A21] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                          </span>
                          {item.external && (
                            <ArrowUpRight
                              size={14}
                              className="ml-1.5 text-[#737985] group-hover:text-[#F26A21] transition-colors"
                              strokeWidth={2}
                            />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              {/* Feature card */}
              <Link
                href={navItems[openDropdown].feature.href}
                target={navItems[openDropdown].feature.external ? "_blank" : undefined}
                rel={navItems[openDropdown].feature.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpenDropdown(null)}
                className={`col-span-4 group relative rounded-2xl overflow-hidden bg-gradient-to-br ${navItems[openDropdown].feature.bg} p-7 flex flex-col justify-between min-h-[200px]`}
              >
                <div>
                  <p className="text-white/60 text-[10px] font-mono font-medium uppercase tracking-widest mb-2">
                    {navItems[openDropdown].feature.eyebrow}
                  </p>
                  <h3
                    className="font-display text-white text-2xl font-light leading-tight tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    {navItems[openDropdown].feature.title}
                  </h3>
                </div>
                <div className="flex items-end justify-between gap-3 mt-4">
                  <p className="text-white/70 text-sm font-light">
                    {navItems[openDropdown].feature.sub}
                  </p>
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white/15 group-hover:bg-[#F26A21] flex items-center justify-center transition-colors">
                    <ArrowUpRight size={16} className="text-white" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E6EAF1] bg-[#FBFAF7]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Mobile search */}
            <div className="flex items-center gap-2 bg-white border border-[#E6EAF1] rounded-full px-4 py-2.5 mb-4">
              <Search size={14} className="text-[#737985]" />
              <input
                type="text"
                placeholder="Buscar especialidad o estudio..."
                className="bg-transparent text-sm text-[#081827] outline-none flex-1 placeholder-[#737985]"
              />
            </div>

            {navItems.map((nav, idx) => (
              <div key={nav.label} className="border-b border-[#E6EAF1] last:border-0">
                <button
                  className="flex items-center justify-between w-full py-3.5 text-sm font-semibold text-[#081827]"
                  onClick={() => setMobileExpanded(mobileExpanded === idx ? null : idx)}
                >
                  {nav.label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-150 text-[#737985] ${mobileExpanded === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileExpanded === idx && (
                  <div className="pb-3 pl-2 space-y-0.5">
                    {nav.cols.flat().map((item) => (
                      <Link
                        key={`mobile-${nav.label}-${item.label}`}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        className="block py-2 px-2 text-sm text-[#737985] hover:text-[#F26A21] transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4">
              <Link
                href="https://portal.dim.com.ar"
                target="_blank"
                className="flex items-center justify-center w-full bg-[#081827] text-white font-semibold py-3 rounded-full text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Portal de Turnos
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
