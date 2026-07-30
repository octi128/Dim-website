"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import SiteSearch from "@/components/SiteSearch";

/** Duración del cierre del menú mobile. Espejo del CSS: .menu-content-exit (0.1s)
    + .menu-panel-exit (0.14s con 0.08s de retardo). Si cambia uno, cambian los dos. */
const MENU_EXIT_MS = 220;

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
  /** El panel sigue montado mientras se reproduce el cierre; sin esto React lo
      desmontaría en el mismo frame y no habría nada que animar. */
  const [mobileClosing, setMobileClosing] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  /** true sólo cuando la zona oscura activa es el hero de portada (data-hero-dark="hero"). */
  const [overMainHero, setOverMainHero] = useState(false);
  /** Panel del buscador de escritorio. En mobile el buscador va inline en el menú. */
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // El Header vive en el layout y no se vuelve a montar al navegar, así que las
  // zonas [data-hero-dark] se leen en vivo dentro de check() (nunca guardamos una
  // referencia que quede colgada al desmontarse la página anterior). Depende de
  // pathname para forzar una lectura apenas se pinta la nueva ruta.
  useEffect(() => {
    const check = () => {
      const zones = document.querySelectorAll<HTMLElement>("[data-hero-dark]");
      const navH = headerRef.current?.offsetHeight ?? 80;
      let active: HTMLElement | null = null;
      for (const z of zones) {
        const r = z.getBoundingClientRect();
        if (r.top <= navH + 8 && r.bottom > navH) {
          active = z;
          break;
        }
      }
      setOverHero(!!active);
      setOverMainHero(active?.dataset.heroDark === "hero");
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  // El buscador de escritorio cuelga del header igual que el megamenú, así que
  // comparte estos dos listeners en lugar de duplicarlos.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Al navegar se cierra el panel. El Header no se desmonta entre rutas, así que sin
  // esto quedaría abierto encima de la página nueva.
  //
  // El ajuste va en el render y no en un efecto a propósito: es el patrón de React
  // para resetear estado cuando cambia un valor de arriba. Con un efecto, el panel
  // abierto llegaría a pintarse sobre la página nueva antes de cerrarse.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setSearchOpen(false);
  }

  /** Arranca el cierre animado. No lee estado, así que los listeners que la
      capturan nunca quedan con una versión vieja. Con motion reducido cierra de
      una: la animación está anulada por CSS y esperarla sería una pausa muerta. */
  const closeMobileMenu = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMobileClosing(false);
      setMobileOpen(false);
      return;
    }
    setMobileClosing(true);
  }, []);

  // Desmontaje por temporizador y no por animationend: con motion reducido el
  // evento no se dispara nunca y el menú quedaría abierto para siempre.
  // MENU_EXIT_MS tiene que seguir al cierre de globals.css (.menu-content-exit
  // 0.1s + .menu-panel-exit 0.14s con 0.08s de retardo = 220ms).
  useEffect(() => {
    if (!mobileClosing) return;
    const t = setTimeout(() => {
      setMobileOpen(false);
      setMobileClosing(false);
    }, MENU_EXIT_MS);
    return () => clearTimeout(t);
  }, [mobileClosing]);

  // El menú mobile es un overlay fijo que tapa el viewport: si no bloqueamos el
  // scroll del body, la página sigue desplazándose por detrás. El listener de
  // resize evita el caso en que se rota a desktop con el menú abierto: el panel
  // se oculta por lg:hidden y el body quedaría trabado sin nada que lo cierre.
  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    // Acá sí es un corte seco: el panel ya se escondió por lg:hidden, animar
    // algo que nadie ve sólo retrasaría el desbloqueo del scroll.
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileClosing(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      // Al cerrar, el acordeón vuelve a cero para que no reabra expandido. Corre
      // recién en el desmontaje, o sea después del cierre: si se reseteara al
      // apretar el botón, el submenú desaparecería antes de la animación.
      setMobileExpanded(null);
    };
  }, [mobileOpen, closeMobileMenu]);

  const dark = overHero && openDropdown === null;
  const white = !dark && (scrolled || openDropdown !== null);

  /* La línea inferior #0A286E se muestra en todos lados MENOS en dos casos: sobre
     el hero de portada y con el navbar en blanco. En esos dos el borde no se quita
     sino que se pinta del color del propio header: así la altura sigue siendo 81px
     (el layout no salta al hacer scroll) y no se abre un hueco de 1px por el que
     se vería la página detrás del megamenú. */
  const borderClass = dark
    ? overMainHero
      ? "border-[#061224]"
      : "border-[#0A286E]"
    : white
    ? "border-white"
    : "border-[#0A286E]";

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${borderClass} ${
        dark ? "bg-[#061224]" : white ? "bg-white" : "bg-[#FBFAF7]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src={dark ? "/dim-logotipo-white.svg" : "/dim-logotipo.svg"}
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
                  className={`relative flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium group transition-colors ${dark ? "text-white" : "text-[#081827]"}`}
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
                      isOpen ? "rotate-180 text-[#F26A21]" : dark ? "text-white/70" : "text-[#737985]"
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
              onClick={() => {
                // Abrir el buscador cierra el megamenú: los dos son paneles
                // anclados al header y superpuestos quedarían uno sobre el otro.
                setOpenDropdown(null);
                setSearchOpen((v) => !v);
              }}
              className={`hidden md:flex items-center gap-2 transition-colors text-sm font-medium px-2 py-2 ${
                searchOpen ? "text-[#F26A21]" : dark ? "text-white hover:text-[#F26A21]" : "text-[#081827] hover:text-[#F26A21]"
              }`}
              aria-label={searchOpen ? "Cerrar buscador" : "Buscar"}
              aria-expanded={searchOpen}
              aria-controls="site-search-panel"
            >
              {searchOpen ? <X size={17} strokeWidth={2} /> : <Search size={17} strokeWidth={2} />}
            </button>

            <Link
              href="https://portal.dim.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 ${dark ? "bg-white text-[#081827] hover:bg-white/90" : "bg-[#081827] hover:bg-[#103A73] text-white"}`}
            >
              Portal de Turnos
            </Link>

            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${dark ? "text-white hover:bg-white/10" : "text-[#4B4F56] hover:bg-[#F4EFE7]"}`}
              onClick={() => {
                if (mobileClosing) {
                  // Se toca de nuevo mientras se cierra: se cancela el cierre y
                  // el panel vuelve a entrar en vez de quedar a medio camino.
                  setMobileClosing(false);
                } else if (mobileOpen) {
                  closeMobileMenu();
                } else {
                  setMobileOpen(true);
                }
              }}
              aria-label="Menú"
              aria-expanded={mobileOpen && !mobileClosing}
              aria-controls="mobile-menu"
            >
              {mobileOpen && !mobileClosing ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop backdrop — covers only the area below the navbar bar (h-20 = 80px) */}
      {openDropdown !== null && (
        <div
          className="hidden lg:block fixed top-[81px] inset-x-0 bottom-0 bg-[#081827]/25 backdrop-blur-[2px] backdrop-enter"
          onClick={() => setOpenDropdown(null)}
          aria-hidden="true"
        />
      )}

      {/* Buscador de escritorio. Panel angosto y alineado a la derecha, anclado al
          botón de la lupa; el megamenú en cambio ocupa todo el ancho. Desde md
          porque ese es el breakpoint en el que aparece la lupa. */}
      {searchOpen && (
        <>
          <div
            className="hidden md:block fixed top-[81px] inset-x-0 bottom-0 bg-[#081827]/25 backdrop-blur-[2px] backdrop-enter"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />
          <div
            id="site-search-panel"
            className="hidden md:block absolute top-[calc(100%+1px)] inset-x-0"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="ml-auto w-full max-w-md bg-white border border-[#E6EAF1] rounded-2xl shadow-[0_24px_48px_-12px_rgba(8,24,39,.18)] p-4 dropdown-enter">
                <SiteSearch
                  variant="overlay"
                  autoFocus
                  onNavigate={() => setSearchOpen(false)}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop megamenu */}
      {openDropdown !== null && (
        <div className="hidden lg:block absolute top-[calc(100%+1px)] left-0 right-0 bg-white shadow-[0_24px_48px_-12px_rgba(8,24,39,.10)] dropdown-enter">
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

      {/* Mobile menu — panel fijo que ocupa el viewport completo por debajo de la
          barra (65px = h-16 + el borde). h-[calc(100dvh-65px)] usa la unidad
          dinámica para descontar la barra de direcciones del navegador mobile; si
          el browser no entiende dvh, la declaración se descarta y queda el
          top/bottom como fallback. */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className={`lg:hidden fixed inset-x-0 top-[65px] bottom-0 h-[calc(100dvh-65px)] overflow-y-auto overscroll-contain bg-[#FBFAF7] ${
            mobileClosing ? "menu-panel-exit pointer-events-none" : "menu-panel-enter"
          }`}
        >
          <div
            className={`max-w-7xl mx-auto px-6 pt-5 pb-10 ${
              mobileClosing ? "menu-content-exit" : ""
            }`}
          >
            {/* Mobile search. Sin autoFocus a propósito: en mobile levantaría el
                teclado y taparía el menú que la persona recién abrió. */}
            <div className="menu-row-enter" style={{ animationDelay: "0.04s" }}>
              <SiteSearch variant="inline" onNavigate={closeMobileMenu} />
            </div>

            {navItems.map((nav, idx) => (
              <div
                key={nav.label}
                className="border-b border-[#E6EAF1] last:border-0 menu-row-enter"
                style={{ animationDelay: `${0.09 + idx * 0.05}s` }}
              >
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
                  <div className="menu-sub-group">
                    <div>
                      <div className="pb-3 pl-2 space-y-0.5">
                        {nav.cols.flat().map((item, i) => (
                          <Link
                            key={`mobile-${nav.label}-${item.label}`}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            className="block py-2 px-2 text-sm text-[#737985] hover:text-[#F26A21] transition-colors menu-sub-enter"
                            style={{ animationDelay: `${i * 0.02}s` }}
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div
              className="pt-4 menu-row-enter"
              style={{ animationDelay: `${0.09 + navItems.length * 0.05}s` }}
            >
              <Link
                href="https://portal.dim.com.ar"
                target="_blank"
                className="flex items-center justify-center w-full bg-[#081827] text-white font-semibold py-3 rounded-full text-sm"
                onClick={closeMobileMenu}
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
