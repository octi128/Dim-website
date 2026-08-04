import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, Calendar, Search } from "lucide-react";
import { searchSite, countResults } from "@/lib/search";
import BuscarInput from "@/components/BuscarInput";
import { PORTAL_URL } from "@/lib/contacto";

export const metadata: Metadata = {
  title: "Buscar — DIM Centros de Salud",
  description:
    "Buscá especialidades médicas, estudios, prácticas de laboratorio, enfermedades y coberturas en DIM Centros de Salud.",
  // Una página de resultados no aporta nada al índice de Google y genera una URL
  // distinta por consulta.
  robots: { index: false, follow: true },
};

/** Atajos para la pantalla vacía y para cuando no hay resultados. */
const SHORTCUTS = [
  { label: "Especialidades médicas", href: "/especialidades-medicas" },
  { label: "Estudios y preparaciones", href: "/estudios-medicos-y-preparaciones" },
  { label: "Laboratorio", href: "/estudios-y-preparaciones-de-laboratorio" },
  { label: "Coberturas médicas", href: "/coberturas-medicas" },
  { label: "Enfermedades y afecciones", href: "/enfermedades" },
  { label: "Centros y horarios", href: "/nuestros-centros-y-horarios" },
];

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  // Sin límite por grupo: acá se muestra todo, el recorte es cosa de la vista
  // instantánea del header.
  const groups = searchSite(query);
  const total = countResults(groups);

  return (
    <>
      <section className="bg-gradient-to-br from-[#103A73] via-[#1956A6] to-[#5636A4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <nav
            className="flex items-center gap-1.5 text-white/60 text-xs mb-8 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-white/90">Buscar</span>
          </nav>

          <div className="max-w-2xl">
            <h1
              className="font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-4"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Buscar en DIM
            </h1>
            <p className="text-white/75 text-base lg:text-lg font-light mb-8 leading-relaxed">
              Especialidades, estudios, prácticas de laboratorio, enfermedades y
              coberturas, todo en un solo lugar.
            </p>
            <BuscarInput defaultValue={query} />
          </div>
        </div>
      </section>

      <section className="bg-[#FBFAF7] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-start">
            <div>
              {!query ? (
                <>
                  <p className="text-[#4B4F56] mb-6">
                    Escribí lo que buscás, o empezá por una de estas secciones:
                  </p>
                  <ShortcutList />
                </>
              ) : total === 0 ? (
                <>
                  <p className="text-sm text-[#737985] mb-2">
                    Sin resultados para{" "}
                    <span className="text-[#081827] font-medium">“{query}”</span>
                  </p>
                  <p className="text-sm text-[#4B4F56] mb-6">
                    Revisá que esté bien escrito o mirá estas secciones:
                  </p>
                  <ShortcutList />
                  <p className="text-sm text-[#4B4F56] mt-8">
                    Si no encontrás lo que necesitás,{" "}
                    <Link href="/contacto" className="text-[#F26A21] font-medium hover:underline">
                      contactanos
                    </Link>{" "}
                    y te ayudamos.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#737985] mb-8">
                    {total} resultado{total !== 1 ? "s" : ""} para{" "}
                    <span className="text-[#081827] font-medium">“{query}”</span>
                  </p>

                  <div className="space-y-10">
                    {groups.map((group) => (
                      <div key={group.type}>
                        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F26A21] mb-1">
                          {group.type}
                        </h2>
                        <p className="text-xs text-[#737985] mb-3">
                          {group.results.length} resultado
                          {group.results.length !== 1 ? "s" : ""}
                        </p>
                        <ul>
                          {group.results.map((r, i) => (
                            <li
                              key={`${r.href}-${r.title}`}
                              className={
                                i < group.results.length - 1 ? "border-b border-[#E6EAF1]" : ""
                              }
                            >
                              <Link
                                href={r.href}
                                target={r.external ? "_blank" : undefined}
                                rel={r.external ? "noopener noreferrer" : undefined}
                                className="flex items-center gap-3 py-3.5 group"
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[#103A73] group-hover:text-[#F26A21] font-medium text-base underline underline-offset-2 decoration-[#103A73]/30 group-hover:decoration-[#F26A21] transition-colors">
                                    {r.title}
                                  </span>
                                  {r.subtitle && (
                                    <span className="block text-xs text-[#737985] mt-0.5">
                                      {r.subtitle}
                                    </span>
                                  )}
                                </span>
                                {r.external && (
                                  <ArrowUpRight
                                    size={14}
                                    className="text-[#737985] shrink-0"
                                    aria-hidden
                                  />
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <aside className="space-y-4">
              <div className="bg-white border border-[#E6EAF1] rounded-2xl p-6 shadow-sm">
                <p className="text-[10px] font-mono font-semibold text-[#F26A21] uppercase tracking-widest mb-3">
                  ¿Ya sabés qué necesitás?
                </p>
                <p className="text-sm text-[#4B4F56] leading-relaxed mb-5">
                  Reservá tu turno online desde el portal o desde la App DIM SALUD.
                </p>
                <Link
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold py-3 rounded-xl text-sm transition-colors duration-200"
                >
                  <Calendar size={14} aria-hidden />
                  Pedí tu turno online
                </Link>
              </div>

              <div className="bg-[#F4EFE7] border border-[#E6EAF1] rounded-2xl p-5">
                <p className="text-xs text-[#737985] leading-relaxed">
                  Los resultados incluyen especialidades, estudios, prácticas de
                  laboratorio, enfermedades, coberturas y páginas del sitio. La
                  información sobre enfermedades es educativa y no reemplaza la
                  consulta médica.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function ShortcutList() {
  return (
    <ul className="grid sm:grid-cols-2 gap-2.5">
      {SHORTCUTS.map((s) => (
        <li key={s.href}>
          <Link
            href={s.href}
            className="flex items-center gap-2.5 bg-white border border-[#E6EAF1] rounded-xl px-4 py-3 text-sm text-[#081827] hover:border-[#F26A21]/50 hover:text-[#F26A21] transition-colors"
          >
            <Search size={14} className="text-[#F26A21] shrink-0" aria-hidden />
            {s.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
