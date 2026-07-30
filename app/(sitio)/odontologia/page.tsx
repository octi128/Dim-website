import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Smile,
  Baby,
  ShieldCheck,
  CalendarDays,
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Odontología Premium — DIM Centros de Salud",
  description:
    "Odontología Premium en DIM: implantes dentales, blanqueamiento Philips Zoom, ortodoncia y odontopediatría. Equipo multidisciplinario en Av. Rivadavia 14230, Ramos Mejía.",
};

const WHATSAPP_URL =
  "https://wa.me/5491126551888?text=Hola%2C%20quiero%20solicitar%20un%20turno";

const ORTODONCIA_TIPOS = [
  {
    name: "Ortodoncia Convencional",
    text: "Es la más tradicional en donde se utilizan apliques metálicos en color plata conocidos como “brackets”.",
  },
  {
    name: "Ortodoncia Estética",
    text: "También contamos con opciones que son más discretas que los tradicionales metálicos como la ortodoncia de porcelana y, para los pacientes más exigentes, los brackets de zafiro.",
  },
  {
    name: "Ortodoncia Invisible",
    text: "Son una serie de placas transparentes y removibles diseñadas especialmente para cada paciente con tecnología de impresión 3D.",
  },
  {
    name: "Ortodoncia Damon System",
    text: "Es la más avanzada, ya que al no utilizar ninguna ligadura para unir el bracket al arco metálico, el diente tiene mayor movilidad lo que disminuye el tiempo de tratamiento.",
  },
];

const COBERTURAS = [
  "AMFFA",
  "Apsot",
  "Medifé",
  "Cabotaje",
  "Casa (Caja de Abogados de la Provincia de Bs.As)",
  "OSOCNA (Obra Social de Comisarios Navales)",
  "Colegio de Escribanos de la Pcia de Buenos Aires",
  "CMP (Centro Médico Pueyrredón)",
  "Hospital Alemán",
  "Medical´s",
  "Medin",
  "OSDE BINARIO",
  "OSPEA",
  "Programa de Salud",
  "Sancor Salud (A partir del plan 1000)",
];

const STATS = [
  { value: "1964", label: "Cuidándote desde" },
  { value: "4", label: "Especialidades" },
  { value: `+${COBERTURAS.length}`, label: "Coberturas médicas" },
  { value: "Premium", label: "Centro exclusivo" },
];

export default function OdontologiaPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/odontologia-hero.jpg"
          alt="Odontólogo mostrando una radiografía panorámica a una paciente en DIM Odontología Premium"
          fill
          sizes="100vw"
          className="object-cover object-[70%_30%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2440]/95 via-[#103A73]/72 to-[#5636A4]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/85 via-transparent to-[#081827]/40" />
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-white/60 text-xs mb-10 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link href="/especialidades-medicas" className="hover:text-white transition-colors">
              Especialidades
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/90">Odontología</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Sparkles size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Odontología Premium
            </div>

            <h1
              className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Odontología
              <br />
              <em className="italic text-[#F26A21]">Premium.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-8 max-w-lg">
              Desde 1964 nos encontramos al cuidado de tu salud. Constantemente
              buscamos nuevas formas de superarnos para brindarte el servicio de
              excelencia que mereces.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <MessageCircle size={15} strokeWidth={2.25} aria-hidden="true" />
                Solicitar turno
              </a>
              <a
                href="https://portal.dim.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                <CalendarDays size={14} aria-hidden="true" />
                Portal de turnos
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mt-14 lg:mt-20 border-t border-white/15 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="font-display text-3xl lg:text-4xl font-medium text-white tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {s.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── About: Odontología Premium ────────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center border border-[#E6EAF1] bg-[#FBFAF7] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
                Nuestro centro
              </div>
              <h2
                className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Atención cálida y de
                <br />
                <em className="italic text-[#5636A4]">excelencia.</em>
              </h2>
              <div className="space-y-4 text-[#4B4F56] font-light leading-relaxed">
                <p>
                  En nuestro centro de Odontología Premium encontrarás la
                  atención cálida y de excelencia que nos caracteriza. El mismo
                  se encuentra equipado con tecnología de última generación y una
                  ambientación moderna para brindarte el servicio que te merecés.
                </p>
                <p>
                  Además, contamos con un equipo profesional altamente capacitado
                  compuesto por odontólogos, odontopediatras, ortodoncistas,
                  endodoncistas y cirujanos. Te brindamos un servicio integral con
                  un enfoque multidisciplinario.
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[#E6EAF1] min-h-[320px] lg:min-h-[420px]">
              <Image
                src="/odontologia-consultorio.jpg"
                alt="Consultorio de Odontología Premium de DIM con equipamiento de última generación"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Especialidades ────────── */}
      <section id="especialidades" className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Especialidades y tratamientos
            </div>
            <h2
              className="font-display text-[clamp(32px,4vw,52px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Todo lo que tu sonrisa
              <br />
              <em className="italic text-[#5636A4]">necesita.</em>
            </h2>
          </div>

          <div className="space-y-6">
            {/* Implantes Dentales */}
            <article className="bg-white border border-[#E6EAF1] rounded-3xl p-8 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#F4EFE7] flex items-center justify-center">
                  <ShieldCheck size={22} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3
                  className="font-display text-2xl lg:text-3xl font-light text-[#081827] tracking-[-0.01em] pt-1.5"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Implantes Dentales
                </h3>
              </div>
              <div className="space-y-4 text-[#4B4F56] font-light leading-relaxed max-w-3xl">
                <p>
                  El implante es de titanio, que es el material más aceptado por el
                  organismo. La intervención dura aproximadamente veinte minutos.
                  Luego se medica al paciente con antibióticos y analgésicos para
                  evitar molestias post-operatorias. Una vez colocados los
                  implantes hay que esperar un período de cuatro meses para
                  facilitar la integración de los mismos al organismo (proceso
                  denominado oseointegración) antes de colocar los dientes
                  definitivos.
                </p>
                <p>
                  Durante este período es aconsejable, si las piezas a reponer
                  tienen compromiso estético, confeccionar algún tipo de prótesis
                  provisoria.
                </p>
                <p>
                  Luego de transcurrido el período de oseointegración, se produce
                  la confección de las prótesis o coronas de porcelana definitivas.
                  La confección de los dientes definitivos puede ser de forma
                  inmediata si la calidad de los huesos del paciente es favorable.
                </p>
              </div>
            </article>

            {/* Blanqueamiento */}
            <article className="bg-white border border-[#E6EAF1] rounded-3xl p-8 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#F4EFE7] flex items-center justify-center">
                  <Sparkles size={22} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3
                  className="font-display text-2xl lg:text-3xl font-light text-[#081827] tracking-[-0.01em] pt-1.5"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Blanqueamiento
                </h3>
              </div>
              <div className="space-y-5 text-[#4B4F56] font-light leading-relaxed max-w-3xl">
                <p>
                  El blanqueamiento dental es un proceso por el cual la coloración
                  del esmalte y la dentina de los dientes son aclarados para volver
                  a tener un color más blanco y natural.
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#5636A4] mb-2">
                    Causas
                  </p>
                  <p>
                    Hay muchas causas que provocan la coloración de los dientes,
                    algunas de las más comunes incluyen el consumo reiterado de
                    comidas y bebidas altamente coloreadas. También pueden ser
                    causas de manchas y coloración, antibióticos que se han tomado
                    en la juventud o simplemente el paso de los años. El fumar
                    acelera el proceso de coloración amarillenta de los dientes.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#5636A4] mb-2">
                    Técnica de blanqueamiento
                  </p>
                  <p>
                    Las técnicas consisten en colocar un gel blanqueador sobre la
                    superficie de los dientes. Luego se aplica un haz de luz frío
                    muy potente, el cual activa el gel, diente a diente, produciendo
                    la eliminación de manchas y pigmentaciones, devolviendo a los
                    dientes su color natural. El procedimiento completo dura una
                    hora aproximadamente.
                  </p>
                </div>
                <div className="bg-[#103A73] rounded-2xl p-6 lg:p-7 !mt-6">
                  <p className="inline-flex items-center gap-2 text-white font-semibold mb-2">
                    <Sparkles size={16} className="text-[#F26A21]" aria-hidden="true" />
                    Blanqueamiento Philips Zoom
                  </p>
                  <p className="text-white/70 font-light leading-relaxed">
                    Realizamos el blanqueamiento dental más avanzado del mundo, en
                    donde se utiliza tecnología de LED azul WhiteSpeed que acelera
                    enormemente el proceso, permitiendo blanquear hasta ocho
                    tonalidades.
                  </p>
                </div>
              </div>
            </article>

            {/* Ortodoncia */}
            <article className="bg-white border border-[#E6EAF1] rounded-3xl p-8 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#F4EFE7] flex items-center justify-center">
                  <Smile size={22} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3
                  className="font-display text-2xl lg:text-3xl font-light text-[#081827] tracking-[-0.01em] pt-1.5"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Ortodoncia
                </h3>
              </div>
              <div className="space-y-4 text-[#4B4F56] font-light leading-relaxed max-w-3xl mb-8">
                <p>
                  La ortodoncia es la especialidad odontológica que se ocupa de la
                  corrección de la posición de los dientes y de los problemas de
                  maloclusión. Es la técnica por la cual se sitúan las piezas
                  dentarias de forma alineada y correcta para su función y estética.
                </p>
                <p>
                  Hoy en día, no existe límite de edad para realizarse un
                  tratamiento de ortodoncia. Cada vez son más los adultos que
                  acceden a tratamientos que no pudieron realizarse cuando eran
                  niños.
                </p>
                <p>
                  Contamos con distintos tipos de tratamientos para que, en
                  conjunto con el profesional, puedan determinar cuál es el que
                  mejor se adapta a tus necesidades:
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {ORTODONCIA_TIPOS.map((t) => (
                  <div key={t.name} className="bg-[#FBFAF7] border border-[#E6EAF1] rounded-2xl p-6">
                    <h4 className="font-semibold text-[#081827] mb-2">{t.name}</h4>
                    <p className="text-[#4B4F56] font-light text-sm leading-relaxed">
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Odontopediatría */}
            <article className="bg-white border border-[#E6EAF1] rounded-3xl p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#F4EFE7] flex items-center justify-center">
                  <Baby size={22} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3
                  className="font-display text-2xl lg:text-3xl font-light text-[#081827] tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Odontopediatría
                </h3>
                <span className="inline-flex items-center rounded-full bg-[#F26A21]/10 text-[#C84F12] text-xs font-semibold px-3 py-1">
                  Nuevo servicio
                </span>
              </div>
              <div className="space-y-4 text-[#4B4F56] font-light leading-relaxed max-w-3xl">
                <p>
                  Pensando en las necesidades de toda la familia, en DIM ofrecemos
                  un servicio de odontopediatría con profesionales altamente
                  capacitados que brindan un asesoramiento personalizado al niño y
                  sus papás en cuestiones relacionadas a una correcta higiene bucal
                  y a los últimos tratamientos de ortodoncia, entre otras cuestiones
                  de igual importancia.
                </p>
                <p>
                  Queremos ayudar a que los niños adopten hábitos saludables desde
                  una temprana edad y que accedan a la mejor tecnología disponible
                  en salud buco dental. Porque tenemos la certeza de que creando
                  consciencia y prevención a partir de hoy, damos un paso muy
                  importante en la salud del paciente en el futuro.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ────────── Coberturas médicas ────────── */}
      <section className="bg-white py-16 lg:py-24 border-y border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-[#FBFAF7] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Odontología
            </div>
            <h2
              className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Coberturas <em className="italic text-[#5636A4]">médicas.</em>
            </h2>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COBERTURAS.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 bg-[#FBFAF7] border border-[#E6EAF1] rounded-xl px-4 py-3.5"
              >
                <Check size={16} className="text-[#F26A21] shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden="true" />
                <span className="text-[#4B4F56] text-sm leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────── Contact / CTA ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-12">
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                  DIM Odontología Premium
                </p>
                <h3
                  className="font-display text-[clamp(28px,3.5vw,44px)] font-light text-white leading-tight tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Solicitá tu turno
                  <br />
                  <em className="italic text-[#F26A21]">de Odontología.</em>
                </h3>
                <p className="inline-flex items-center gap-2 text-white/70 font-light leading-relaxed mb-2">
                  <MapPin size={16} className="text-[#F26A21] shrink-0" aria-hidden="true" />
                  Av. Rivadavia 14230, Ramos Mejía
                </p>
                <p className="text-white/50 text-sm font-light leading-relaxed max-w-md">
                  WhatsApp exclusivo para turnos de Odontología Estética y
                  Ortodoncia.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-7 py-4 rounded-full text-sm transition-colors"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  WhatsApp de turnos
                </a>
                <a
                  href="mailto:odontologia@dim.com.ar"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-4 rounded-full text-sm transition-colors"
                >
                  <Mail size={15} aria-hidden="true" />
                  odontologia@dim.com.ar
                </a>
                <a
                  href="https://portal.dim.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-white/70 hover:text-white font-medium px-7 py-2 text-sm transition-colors"
                >
                  Portal de turnos
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
