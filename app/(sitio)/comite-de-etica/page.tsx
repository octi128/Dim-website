import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Comité de Ética en Investigación | DIM Centros de Salud",
  description:
    "El Comité de Ética en Investigación de DIM Clínica Privada evalúa los aspectos éticos y legales de los proyectos de investigación en salud. Inscripto en el Registro Provincial bajo el Nº 031/2011.",
};

/**
 * Texto transcripto de www.dim.com.ar/comite-de-etica/. Se corrigió "Télefono"
 * (errata del original) y se separó el marco normativo en una lista: en la web
 * actual son diez instrumentos dentro de un mismo párrafo de once renglones,
 * imposible de recorrer con la vista.
 */

const SEDES = [
  { nombre: "Sede Ramos Mejía", direccion: "Belgrano 136, Ramos Mejía" },
  { nombre: "Sede Morón", direccion: "Av. Rivadavia 17624, Morón" },
];

const TELEFONOS = ["5554-8905", "5554-8904"];

const MARCO_NORMATIVO = [
  "Guías de Buenas Prácticas Clínicas (GCP) y su armonización internacional (ICH)",
  "Declaración de Nüremberg",
  "Declaración de Helsinki",
  "Declaración de Tokio",
  "Recomendaciones del Consejo de las Organizaciones Internacionales de las Ciencias Médicas (CIOMS)",
  "Organización Mundial de la Salud (OMS)",
  "Organización Panamericana de la Salud (OPS), con su Documento de las Américas",
  "Declaración Universal sobre el Genoma Humano y los Derechos Humanos",
  "Declaración Internacional sobre los Datos Genéticos Humanos (UNESCO)",
  "Reglas éticas para la investigación en países subdesarrollados, «Nuffield Council on Bioethics»",
];

export default function ComiteDeEticaPage() {
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
            <span className="text-white/90">Comité de Ética</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Scale
                size={12}
                strokeWidth={2.25}
                className="text-[#F26A21]"
                aria-hidden="true"
              />
              Registro Provincial Nº 031/2011
            </div>

            <h1
              className="font-display text-[clamp(36px,5.4vw,68px)] leading-[1.0] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Comité de Ética en{" "}
              <em className="italic text-[#F26A21]">Investigación.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed max-w-lg">
              Ninguna investigación clínica empieza en DIM sin pasar por acá. El
              comité existe para cuidar a quien decide participar en un ensayo.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Cuerpo ────────── */}
      <section className="bg-[#FBFAF7] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-16">
            <div className="max-w-3xl">
              <p className="text-[#F26A21] text-xs font-semibold uppercase tracking-widest mb-3">
                Nuestra misión
              </p>
              <h2
                className="font-display text-[clamp(26px,3.2vw,40px)] font-light tracking-[-0.03em] text-[#081827] leading-tight mb-7"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Evaluar cada proyecto
                <br />
                <em className="italic text-[#5636A4]">antes de que empiece.</em>
              </h2>

              <div className="space-y-5 text-[#081827]/75 text-[15px] font-light leading-[1.75]">
                <p>
                  La misión del Comité de Ética en Investigación de DIM Clínica
                  Privada es evaluar aspectos éticos y legales de los proyectos de
                  investigación en salud, y decidir su aprobación o no, por consenso
                  de sus miembros, con el objeto de salvaguardar la dignidad,
                  derechos, seguridad y bienestar de las personas que deciden
                  participar en un ensayo de investigación clínica.
                </p>
                <p>
                  Para cumplir su misión toma en consideración el principio de
                  justicia, y la adhesión a los valores y principios éticos
                  universalmente proclamados, incluyendo las pautas y garantías
                  exigidas por:
                </p>
              </div>

              {/* Los instrumentos del marco normativo, separados del párrafo
                  original para que se puedan recorrer de un vistazo. */}
              <ul className="mt-6 mb-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {MARCO_NORMATIVO.map((n) => (
                  <li key={n} className="flex gap-2.5">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F26A21]"
                      aria-hidden="true"
                    />
                    <span className="text-[#081827]/75 text-sm font-light leading-relaxed">
                      {n}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-5 text-[#081827]/75 text-[15px] font-light leading-[1.75]">
                <p>
                  Se suman las normas constitucionales, legales y reglamentarias
                  vigentes en la materia, y las demás normas que en el futuro las
                  sustituyan o las complementen.
                </p>
              </div>

              {/* La acreditación es el dato duro de la página: quien evalúa si
                  presentar un protocolo acá viene a buscar exactamente esto. */}
              <div className="mt-10 rounded-2xl border border-[#E6EAF1] bg-white p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5636A4] mb-4">
                  Acreditación
                </p>
                <p className="text-[#081827]/75 text-[15px] font-light leading-[1.75]">
                  El Comité de Ética en Investigación DIM Clínica Privada se
                  encuentra inscripto en el Registro Provincial de Comités de Ética
                  en Investigación, dependiente del Comité de Ética Central en
                  Investigación — Ministerio de Salud de la Provincia de Buenos
                  Aires, con fecha 26/08/2011, bajo el Nº 031/2011, Folio 95, Libro
                  Nº 1. Reacreditación del 22 de agosto de 2017.
                </p>
              </div>
            </div>

            {/* ── Panel de contacto ── */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl bg-[#103A73] p-6 sm:p-7 text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C5B7EE] mb-5">
                  Sedes
                </p>

                <ul className="space-y-4 mb-7">
                  {SEDES.map((s) => (
                    <li key={s.nombre} className="flex gap-3">
                      <MapPin
                        size={15}
                        className="mt-0.5 flex-shrink-0 text-[#FBC08E]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium">{s.nombre}</p>
                        <p className="text-white/65 text-sm font-light">
                          {s.direccion}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C5B7EE] mb-5 pt-6 border-t border-white/12">
                  Contacto
                </p>

                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Clock
                      size={15}
                      className="mt-0.5 flex-shrink-0 text-[#FBC08E]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-white/65 text-sm font-light">
                        Lunes a viernes
                      </p>
                      <p className="text-sm font-medium">9 a 17 h</p>
                      <p className="text-white/65 text-sm font-light mt-1.5">
                        Reuniones semanales:{" "}
                        <span className="font-medium text-white">miércoles</span>
                      </p>
                    </div>
                  </li>

                  {TELEFONOS.map((t) => (
                    <li key={t}>
                      <a
                        href={`tel:${t.replace(/-/g, "")}`}
                        className="flex gap-3 group"
                      >
                        <Phone
                          size={15}
                          className="mt-0.5 flex-shrink-0 text-[#FBC08E]"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium group-hover:text-[#FBC08E] transition-colors">
                          {t}
                        </span>
                      </a>
                    </li>
                  ))}

                  <li>
                    <a
                      href="mailto:comite.etica@dim.com.ar"
                      className="flex gap-3 group"
                    >
                      <Mail
                        size={15}
                        className="mt-0.5 flex-shrink-0 text-[#FBC08E]"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium break-all group-hover:text-[#FBC08E] transition-colors">
                        comite.etica@dim.com.ar
                      </span>
                    </a>
                  </li>
                </ul>

                <a
                  href="/comite-de-etica-normas-operativas.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex items-center gap-2.5 rounded-xl bg-white/[0.07] border border-white/12 px-4 py-3.5 hover:bg-white/[0.13] transition-colors"
                >
                  <FileText
                    size={16}
                    className="flex-shrink-0 text-[#FBC08E]"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold">Normas operativas</span>
                  <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-white/50">
                    PDF
                  </span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
