import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles, MessageCircle, Mail } from "lucide-react";
import CirugiasEsteticasList from "@/components/CirugiasEsteticasList";

export const metadata: Metadata = {
  title: "Medicina Estética y Cirugía — DIM Centros de Salud",
  description:
    "Procedimientos de medicina estética y cirugía estética seguros, cuidando tu imagen y tu salud. Cirugías plásticas, tratamientos faciales y corporales, depilación láser y más.",
};

const WHATSAPP_URL =
  "https://wa.me/5491121705181?text=Hola%2C%20quiero%20solicitar%20un%20turno";
const EMAIL = "estetica@dim.com.ar";

const STATS = [
  { value: "9", label: "Áreas de tratamiento" },
  { value: "+27", label: "Cirugías plásticas" },
  { value: "100%", label: "Procedimientos seguros" },
  { value: "+60", label: "Años cuidándote" },
];

export default function CirugiasEsteticasPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/cirugias-esteticas-hero.jpg"
          alt="Tratamiento de medicina estética facial en DIM"
          fill
          sizes="100vw"
          className="object-cover object-[60%_35%]"
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
            <Link href="/cirugia" className="hover:text-white transition-colors">
              Cirugía
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/90">Cirugías estéticas</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Sparkles size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Medicina estética y cirugía
            </div>

            <h1
              className="font-display text-[clamp(40px,6vw,78px)] leading-[0.98] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Medicina estética
              <br />
              <em className="italic text-[#F26A21]">y cirugía.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-4 max-w-lg">
              A través de nuestro servicio de cirugía estética te ofrecemos
              procedimientos seguros cuidando tu imagen y tu salud.
            </p>
            <p className="text-white/70 text-base font-light leading-relaxed mb-8 max-w-lg">
              Cada persona es única como cada tratamiento. Por eso, contamos con
              profesionales altamente capacitados en medicina estética, los
              cuales te asesorarán en todo momento.
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
                href="#tratamientos"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                Ver tratamientos
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

      {/* ────────── Solicitá turno (medios) ────────── */}
      <section className="bg-white border-b border-[#E6EAF1] py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <p className="text-[#081827] font-display text-xl lg:text-2xl font-light leading-snug">
              Solicitá turno por los <em className="italic text-[#5636A4]">siguientes medios:</em>
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 bg-[#FBFAF7] border border-[#E6EAF1] rounded-2xl p-5 hover:border-[#F26A21]/40 transition-colors"
            >
              <span className="w-11 h-11 shrink-0 rounded-xl bg-[#F4EFE7] flex items-center justify-center">
                <MessageCircle size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-widest text-[#737985]">
                  WhatsApp
                </span>
                <span className="block text-[#081827] font-medium group-hover:text-[#103A73] transition-colors">
                  Escribinos por WhatsApp
                </span>
              </span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-3.5 bg-[#FBFAF7] border border-[#E6EAF1] rounded-2xl p-5 hover:border-[#F26A21]/40 transition-colors"
            >
              <span className="w-11 h-11 shrink-0 rounded-xl bg-[#F4EFE7] flex items-center justify-center">
                <Mail size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-widest text-[#737985]">
                  Email
                </span>
                <span className="block text-[#081827] font-medium group-hover:text-[#103A73] transition-colors break-all">
                  {EMAIL}
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ────────── Tratamientos ────────── */}
      <section id="tratamientos" className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Nuestros procedimientos
            </div>
            <h2
              className="font-display text-[clamp(32px,4vw,52px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Tipos de cirugías
              <br />
              <em className="italic text-[#5636A4]">y tratamientos estéticos.</em>
            </h2>
          </div>

          <CirugiasEsteticasList />
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="bg-[#FBFAF7] pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-12">
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                  Medicina estética
                </p>
                <h3
                  className="font-display text-[clamp(28px,3.5vw,44px)] font-light text-white leading-tight tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Cuidamos tu imagen
                  <br />
                  <em className="italic text-[#F26A21]">y tu salud.</em>
                </h3>
                <p className="text-white/60 font-light leading-relaxed max-w-md">
                  Profesionales altamente capacitados te asesorarán en todo
                  momento. Escribinos y coordiná tu consulta.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-7 py-4 rounded-full text-sm transition-colors"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Solicitar turno
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-4 rounded-full text-sm transition-colors"
                >
                  <Mail size={15} aria-hidden="true" />
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
