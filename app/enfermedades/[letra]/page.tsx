import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowUp, Calendar } from "lucide-react";
import { AVAILABLE_LETTERS, getDiseaseGroups } from "@/lib/diseases";
import DiseaseSearchBar from "@/components/DiseaseSearchBar";

const LETTER_ROWS = [
  ["A","B","C","D","E","F","G","H","I"],
  ["J","L","M","N","O","P","Q","R","S"],
  ["T","U","V","Z"],
] as const;

export function generateStaticParams() {
  return AVAILABLE_LETTERS.map(l => ({ letra: l.toLowerCase() }));
}

export default async function LetraPage({
  params,
}: {
  params: Promise<{ letra: string }>;
}) {
  const { letra } = await params;
  const letter = letra.toUpperCase();

  if (!AVAILABLE_LETTERS.includes(letter as typeof AVAILABLE_LETTERS[number])) {
    notFound();
  }

  const groups = getDiseaseGroups(letter);

  return (
    <>
      {/* Brand gradient hero */}
      <section className="bg-gradient-to-br from-[#103A73] via-[#1956A6] to-[#5636A4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: breadcrumb + title + search */}
            <div>
              <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-8 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                <ChevronRight size={12} />
                <Link href="/enfermedades" className="hover:text-white transition-colors">
                  Enfermedades y afecciones
                </Link>
                <ChevronRight size={12} />
                <span className="text-white/90">Empieza con &apos;{letter}&apos;</span>
              </nav>

              <h1
                className="font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-4"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Enfermedades y afecciones
              </h1>

              <p className="text-white/75 text-base lg:text-lg font-light mb-8 leading-relaxed">
                Respuestas fáciles de entender sobre enfermedades y afecciones
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
                    {row.map(l => {
                      const isActive = l === letter;
                      return (
                        <Link
                          key={l}
                          href={`/enfermedades/${l.toLowerCase()}`}
                          className={[
                            "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200",
                            isActive
                              ? "bg-[#F26A21] text-white shadow-lg ring-2 ring-white/30"
                              : "border-2 border-white/35 text-white hover:border-white hover:bg-white/15",
                          ].join(" ")}
                        >
                          {l}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Disease list */}
      <section className="bg-[#FBFAF7] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-start">

            {/* Main: disease groups */}
            <div>
              {groups.length === 0 ? (
                <p className="text-[#737985] text-base">
                  No hay enfermedades registradas para esta letra todavía.
                </p>
              ) : (
                <div className="space-y-10">
                  {groups.map(group => (
                    <div key={group.key}>
                      <h2
                        className="font-display text-3xl font-bold text-[#081827] mb-3"
                        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                      >
                        {group.key}
                      </h2>
                      <ul>
                        {group.diseases.map((disease, i) => (
                          <li
                            key={disease.slug}
                            className={i < group.diseases.length - 1 ? "border-b border-[#E6EAF1]" : ""}
                          >
                            <Link
                              href={`/enfermedades/enfermedad/${disease.slug}`}
                              className="block py-3 text-[#103A73] hover:text-[#1956A6] font-medium text-base underline underline-offset-2 decoration-[#103A73]/40 hover:decoration-[#1956A6] transition-colors"
                            >
                              {disease.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-[#E6EAF1]">
                <a
                  href="#top"
                  className="inline-flex items-center gap-1.5 text-[#103A73] text-sm font-medium hover:text-[#1956A6] transition-colors"
                >
                  Volver arriba <ArrowUp size={13} />
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="bg-white border border-[#E6EAF1] rounded-2xl p-6 shadow-sm">
                <p className="text-[10px] font-mono font-semibold text-[#F26A21] uppercase tracking-widest mb-3">
                  ¿Necesitás atención médica?
                </p>
                <p className="text-sm text-[#4B4F56] leading-relaxed mb-5">
                  En DIM contamos con más de 350 especialidades y +750 profesionales para ayudarte.
                </p>
                <Link
                  href="https://portal.dim.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold py-3 rounded-xl text-sm transition-colors duration-200"
                >
                  <Calendar size={14} />
                  Pedí tu turno online
                </Link>
              </div>

              <div className="bg-[#F4EFE7] border border-[#E6EAF1] rounded-2xl p-5">
                <p className="text-xs text-[#737985] leading-relaxed">
                  La información de esta sección es de carácter educativo y no reemplaza la consulta médica profesional. Ante cualquier duda, consultá a tu médico.
                </p>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
}
