import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { SECCIONES } from "@/lib/legal/politica";

export const metadata: Metadata = {
  title: "Política de Privacidad y Términos de Uso | DIM Centros de Salud",
  description:
    "Términos y condiciones de uso y política de privacidad de DIM Centros de Salud. Tratamiento de datos personales según la Ley 25.326 de la República Argentina.",
};

// Solo los títulos de primer nivel arman el índice: "Fines de la recopilación"
// es una bajada de la sección anterior y meterla al mismo nivel haría parecer
// que el documento tiene una parte más de las que tiene.
const INDICE = SECCIONES.filter((s) => !s.sub);

export default function PoliticaPage() {
  return (
    <>
      {/* ────────── Hero ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2440] via-[#103A73] to-[#5636A4]/40" />
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav
            className="flex items-center gap-1.5 text-white/60 text-xs mb-10 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/90">Política de Privacidad</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <ShieldCheck
                size={12}
                strokeWidth={2.25}
                className="text-[#F26A21]"
                aria-hidden="true"
              />
              Ley 25.326 de Protección de Datos Personales
            </div>

            <h1
              className="font-display text-[clamp(36px,5.4vw,68px)] leading-[1.0] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Términos de uso y{" "}
              <em className="italic text-[#F26A21]">privacidad.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed max-w-lg">
              Las condiciones que rigen el uso de nuestra app y el tratamiento de
              los datos personales que nos confiás.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Cuerpo ────────── */}
      <section className="bg-[#FBFAF7] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-16">
            {/* Índice. Son diez secciones largas: sin una guía al costado, la
                página se lee como un muro y encontrar una cláusula puntual
                obliga a barrer todo el texto.

                En pantallas chicas se oculta: apilado ocupa media pantalla y
                empuja el documento entero hacia abajo, así que cuesta más de lo
                que ahorra. Ahí se navega scrolleando, que es lo que se hace. */}
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5636A4] mb-4">
                En esta página
              </p>
              <nav aria-label="Índice del documento">
                <ol className="space-y-2.5 border-l border-[#E6EAF1] pl-4">
                  {INDICE.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-sm font-light text-[#081827]/70 hover:text-[#F26A21] transition-colors"
                      >
                        {s.titulo}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="max-w-3xl">
              {/* Aclaración de alcance: el documento habla siempre de la app de
                  turnos. Decirlo arriba evita que alguien lo lea creyendo que
                  regula el sitio. */}
              <p className="border-l-2 border-[#F26A21] bg-white pl-5 pr-6 py-4 rounded-r-lg text-[#081827]/75 text-sm font-light leading-relaxed mb-12">
                Este documento reúne los Términos y Condiciones de Uso y la
                Política de Privacidad de la aplicación DIM Salud. Ante cualquier
                duda podés escribirnos a{" "}
                <a
                  href="mailto:turnos@dim.com.ar"
                  className="font-medium text-[#5636A4] hover:text-[#F26A21] transition-colors"
                >
                  turnos@dim.com.ar
                </a>
                .
              </p>

              {SECCIONES.map((s) => (
                <article key={s.id} id={s.id} className="scroll-mt-24 mb-11 last:mb-0">
                  {s.sub ? (
                    <h3 className="text-[#081827] text-base font-semibold mb-3">
                      {s.titulo}
                    </h3>
                  ) : (
                    <h2
                      className="font-display text-[clamp(22px,2.4vw,30px)] font-light tracking-[-0.02em] text-[#081827] mb-4"
                      style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                    >
                      {s.titulo}
                    </h2>
                  )}

                  <div className="space-y-4">
                    {s.parrafos.map((p, i) => (
                      <p
                        key={i}
                        className="text-[#081827]/75 text-[15px] font-light leading-[1.75]"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
