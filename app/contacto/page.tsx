import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Stethoscope,
  FlaskConical,
  Microscope,
  Scale,
  GraduationCap,
  Briefcase,
  Video,
  ClipboardList,
  FileText,
  MapPin,
  CreditCard,
  HeartPulse,
  Smartphone,
  ShieldCheck,
  UserPlus,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import AppStoreLink from "@/components/AppStoreLink";

export const metadata: Metadata = {
  title: "Contactanos — DIM Centros de Salud",
  description:
    "Comunicate con DIM Centros de Salud. WhatsApp Oficial 11-6648-5555, Central de Turnos 5554-8888, turnos@dim.com.ar. Atención Lun-Vie 8 a 20 h y Sáb 8 a 13 h.",
};

const WHATSAPP_LINK = "https://wa.link/kkbp74";
const WHATSAPP_WA = "https://wa.me/1166485555";
const WHATSAPP_LABEL = "11-6648-5555";
const CENTRAL_TEL = "tel:55548888";
const CENTRAL_LABEL = "5554-8888";
const HORARIOS = "Lun-Vie 8 a 20 h y Sáb 8 a 13 h";
const PORTAL_URL = "https://portal.dim.com.ar/";

const STATS = [
  { value: WHATSAPP_LABEL, label: "WhatsApp Oficial" },
  { value: CENTRAL_LABEL, label: "Central de Turnos" },
  { value: "8-20 h", label: "Lun a Vie · Sáb 8 a 13 h" },
  { value: "@dim", label: "turnos@dim.com.ar" },
];

type ContactItem = { type: "tel" | "mail" | "wa"; label: string; href: string; note?: string };
type ContactCard = { icon: typeof MessageCircle; title: string; items: ContactItem[] };

const CONTACT_CARDS: ContactCard[] = [
  {
    icon: MessageCircle,
    title: "Turnos por WhatsApp",
    items: [
      { type: "wa", label: WHATSAPP_LABEL, href: WHATSAPP_WA },
      { type: "mail", label: "altacomplejidad@dim.com.ar", href: "mailto:altacomplejidad@dim.com.ar" },
      { type: "mail", label: "turnos@dim.com.ar", href: "mailto:turnos@dim.com.ar" },
    ],
  },
  {
    icon: Stethoscope,
    title: "Odontología",
    items: [
      { type: "wa", label: WHATSAPP_LABEL, href: WHATSAPP_WA },
      { type: "mail", label: "odontologia@dim.com.ar", href: "mailto:odontologia@dim.com.ar" },
    ],
  },
  {
    icon: FlaskConical,
    title: "Laboratorio",
    items: [
      { type: "wa", label: "1166485555", href: WHATSAPP_WA, note: '("Laboratorio")' },
      { type: "mail", label: "laboratorio@dim.com.ar", href: "mailto:laboratorio@dim.com.ar" },
    ],
  },
  {
    icon: Microscope,
    title: "Cedim Centro de Investigaciones Médicas Buenos Aires",
    items: [
      { type: "tel", label: "4656-2828", href: "tel:46562828" },
      { type: "mail", label: "cedimba@gmail.com", href: "mailto:cedimba@gmail.com" },
    ],
  },
  {
    icon: Scale,
    title: "Comité de Ética",
    items: [{ type: "mail", label: "comite.etica@dim.com.ar", href: "mailto:comite.etica@dim.com.ar" }],
  },
  {
    icon: GraduationCap,
    title: "Comité de Docencia",
    items: [
      { type: "tel", label: "5299-4699", href: "tel:52994699" },
      { type: "mail", label: "docencia@dim.com.ar", href: "mailto:docencia@dim.com.ar" },
    ],
  },
  {
    icon: Briefcase,
    title: "Contrataciones y Legales",
    items: [{ type: "mail", label: "contrataciones@dim.com.ar", href: "mailto:contrataciones@dim.com.ar" }],
  },
];

type QuickLink = {
  icon: typeof Stethoscope;
  label: string;
  href: string;
  external?: boolean;
  appStore?: boolean;
};

const QUICK_LINKS: QuickLink[] = [
  { icon: Stethoscope, label: "Solicitar una consulta médica", href: PORTAL_URL, external: true },
  { icon: Video, label: "Hacer una video consulta", href: "https://dim.com.ar/video-consultas-teleconsultas/index.html", external: true },
  { icon: ClipboardList, label: "Solicitar estudios médicos", href: "/estudios-medicos-y-preparaciones" },
  { icon: FileText, label: "Hacer una receta digital", href: "https://dim.com.ar/receta-digital/index.html", external: true },
  { icon: MapPin, label: "Nuestras sedes", href: "/nuestros-centros-y-horarios" },
  { icon: FlaskConical, label: "Laboratorio", href: "/laboratorios" },
  { icon: CreditCard, label: "Quiero ser socio", href: "/mutual-amedim" },
  { icon: HeartPulse, label: "Ver todas las especialidades", href: "/especialidades-medicas" },
  { icon: Smartphone, label: "Descargar aplicación de turnos", href: "#", appStore: true },
  { icon: ShieldCheck, label: "Coberturas médicas que atendemos", href: "/coberturas-medicas" },
  { icon: UserPlus, label: "Agregar a un familiar a mi cuenta", href: PORTAL_URL, external: true },
  { icon: Building2, label: "Trabajar en DIM", href: "/recursos-humanos" },
];

function itemIcon(type: ContactItem["type"]) {
  if (type === "tel") return Phone;
  if (type === "mail") return Mail;
  return MessageCircle;
}

export default function ContactoPage() {
  return (
    <>
      {/* ────────── Hero (banner) ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <Image
          src="/contacto-hero.jpg"
          alt="Recepción de un centro de salud DIM con señalética de pisos y servicios"
          fill
          sizes="100vw"
          className="object-cover object-[60%_40%]"
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
            <span className="text-white/90">Contacto</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 mb-7">
              <Sparkles size={12} strokeWidth={2.25} className="text-[#F26A21]" aria-hidden="true" />
              Estamos para ayudarte
            </div>

            <h1
              className="font-display text-[clamp(40px,6vw,78px)] leading-[0.98] tracking-[-0.04em] font-light text-white mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              <em className="italic text-[#F26A21]">Contactanos.</em>
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-4 max-w-lg">
              Comunicate con nosotros por WhatsApp, teléfono o email. Nuestra Central
              de Turnos atiende {HORARIOS}.
            </p>

            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2 text-white/85">
                <MessageCircle size={16} className="text-[#F26A21] shrink-0" aria-hidden="true" />
                WhatsApp Oficial:{" "}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-white underline underline-offset-2">
                  {WHATSAPP_LABEL}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/85">
                <Phone size={16} className="text-[#F26A21] shrink-0" aria-hidden="true" />
                Central de Turnos:{" "}
                <a href={CENTRAL_TEL} className="font-medium hover:text-white underline underline-offset-2">
                  {CENTRAL_LABEL}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/85">
                <Clock size={16} className="text-[#F26A21] shrink-0" aria-hidden="true" />
                {HORARIOS}
              </li>
              <li className="flex items-center gap-2 text-white/85">
                <Mail size={16} className="text-[#F26A21] shrink-0" aria-hidden="true" />
                <a href="mailto:turnos@dim.com.ar" className="font-medium hover:text-white underline underline-offset-2">
                  turnos@dim.com.ar
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <MessageCircle size={15} strokeWidth={2.25} aria-hidden="true" />
                WhatsApp {WHATSAPP_LABEL}
              </a>
              <a
                href={CENTRAL_TEL}
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                <Phone size={15} strokeWidth={2.25} aria-hidden="true" />
                Central de Turnos {CENTRAL_LABEL}
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mt-14 lg:mt-20 border-t border-white/15 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="font-display text-2xl lg:text-3xl font-medium text-white tracking-tight"
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

      {/* ────────── Canales de contacto ────────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[#F26A21] text-xs font-semibold uppercase tracking-widest mb-3">
              Todos nuestros canales
            </p>
            <h2
              className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Comunicate con el área
              <br />
              <em className="italic text-[#5636A4]">que necesites.</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTACT_CARDS.map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className="bg-white border border-[#E6EAF1] rounded-2xl p-7 hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F4EFE7] flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-medium text-[#081827] leading-snug mb-3">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => {
                    const ItemIcon = itemIcon(item.type);
                    const external = item.type !== "mail" && item.type !== "tel";
                    return (
                      <li key={item.href + item.label} className="flex items-start gap-2 text-sm">
                        <ItemIcon size={15} className="text-[#737985] shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-[#4B4F56]">
                          <a
                            href={item.href}
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="text-[#103A73] hover:text-[#F26A21] font-medium underline underline-offset-2 transition-colors"
                          >
                            {item.label}
                          </a>
                          {item.note ? <span className="text-[#737985]"> {item.note}</span> : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Consultas frecuentes ────────── */}
      <section className="bg-[#FBFAF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[#F26A21] text-xs font-semibold uppercase tracking-widest mb-3">
              Accesos rápidos
            </p>
            <h2
              className="font-display text-[clamp(28px,3.6vw,44px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Consultas <em className="italic text-[#5636A4]">frecuentes.</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_LINKS.map(({ icon: Icon, label, href, external, appStore }) => {
              const inner = (
                <>
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-[#F4EFE7] flex items-center justify-center">
                    <Icon size={18} className="text-[#F26A21]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-[#081827] font-medium text-sm leading-snug">
                    {label}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-[#737985] group-hover:text-[#F26A21] transition-colors shrink-0"
                    aria-hidden="true"
                  />
                </>
              );

              const cls =
                "group w-full flex items-center gap-3 bg-white border border-[#E6EAF1] rounded-2xl p-4 text-left hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200";

              if (appStore) {
                return (
                  <AppStoreLink key={label} className={cls}>
                    {inner}
                  </AppStoreLink>
                );
              }
              if (external) {
                return (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                );
              }
              return (
                <Link key={label} href={href} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
