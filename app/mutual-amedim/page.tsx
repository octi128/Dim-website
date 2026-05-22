import Link from "next/link";
import { Check, MessageCircle, Phone, MapPin, Clock } from "lucide-react";

const benefits = [
  {
    title: "Pacientes Particulares",
    discount: "10%",
    description: "Descuento en servicios de los centros DIM",
    highlights: [
      "Descuento en imagenología",
      "Acceso a todas las sedes",
      "Validez inmediata",
    ],
    color: "from-[#1956A6] to-[#5636A4]",
    accentColor: "#1956A6",
  },
  {
    title: "Beneficio Oro",
    discount: "20%",
    description: "Descuentos escalonados en servicios DIM",
    highlights: [
      "20% en centros y ópticas",
      "20% en asistencia al viajero",
      "Hasta 40% en ortopedias",
      "Hasta 50% en farmacias",
    ],
    color: "from-[#103A73] to-[#1956A6]",
    accentColor: "#F26A21",
    featured: true,
  },
  {
    title: "Beneficio Platino",
    discount: "30%",
    description: "Máximos descuentos en cobertura integral",
    highlights: [
      "30% en centros médicos y ópticas",
      "Servicios premium con mejores porcentajes",
      "Prioridad de atención",
      "Beneficios exclusivos",
    ],
    color: "from-[#5636A4] to-[#081827]",
    accentColor: "#F26A21",
  },
];

const contactInfo = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "11-5509-3539",
    href: "https://wa.me/5491155093539",
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: "5901-2121",
    href: "tel:+5491155093539",
  },
  {
    icon: Clock,
    title: "Horarios",
    value: "Lun-Vie 8 a 16h | Sáb 8 a 12h",
    href: null,
  },
  {
    icon: MapPin,
    title: "Email",
    value: "beneficios@dim.com.ar",
    href: "mailto:beneficios@dim.com.ar",
  },
];

export const metadata = {
  title: "Programa de Beneficios AMEDIM — DIM Centros de Salud",
  description:
    "Conocé los beneficios exclusivos de AMEDIM. Descuentos especiales en servicios médicos, imagenología, laboratorios y más.",
};

export default function MutualAmedim() {
  return (
    <div className="bg-[#FBFAF7] min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-[#E6EAF1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 pt-16 pb-0 lg:pt-24 items-center min-h-[82vh]">
            {/* Left: Copy */}
            <div className="pb-16 lg:pb-24">
              <div className="inline-flex items-center gap-2 border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21]" />
                Programa de beneficios DIM
              </div>

              <h1
                className="font-display text-[clamp(44px,6.5vw,84px)] leading-[0.95] tracking-[-0.04em] font-light text-[#081827] mb-6"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Conocé los beneficios de
                <br />
                <em className="italic text-[#F26A21]">tu mutual AMEDIM.</em>
              </h1>

              <p className="text-[#4B4F56] text-lg font-light leading-relaxed mb-8 max-w-lg">
                Accedé a descuentos exclusivos en servicios médicos, imagenología, laboratorios y atención especializada. Sin costos adicionales.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#solicitar"
                  className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors duration-200"
                >
                  <Check size={15} />
                  Solicitar credencial
                </Link>
                <a
                  href="https://wa.me/5491155093539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#F4EFE7] text-[#081827] font-semibold px-6 py-3 rounded-full text-sm border border-[#E6EAF1] transition-colors duration-200"
                >
                  <MessageCircle size={15} />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Info card */}
            <div className="hidden lg:flex items-center justify-center pb-16 lg:pb-24">
              <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E6EAF1] shadow-[0_24px_80px_rgba(8,24,39,.08)] overflow-hidden">
                <div className="bg-gradient-to-br from-[#F26A21] to-[#C84F12] p-6">
                  <p className="text-white/70 text-[10px] font-mono font-medium uppercase tracking-widest mb-1.5">
                    Sin costo adicional
                  </p>
                  <p className="text-white text-lg font-semibold leading-tight">
                    Ahorros en todos los servicios
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  {benefits.slice(0, 2).map((benefit) => (
                    <div
                      key={benefit.title}
                      className="border-l-3 border-[#F26A21] pl-4"
                    >
                      <p className="text-[#081827] font-semibold text-sm mb-1">
                        {benefit.title}
                      </p>
                      <p className="text-[#4B4F56] text-xs">
                        Hasta {benefit.discount} de descuento
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-b border-[#E6EAF1] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="inline-flex items-baseline gap-3 mb-6">
              <span className="text-[#F26A21] text-[13px] font-mono font-semibold uppercase tracking-wider">
                Tres opciones
              </span>
            </div>
            <h2
              className="font-display text-[clamp(36px,5vw,72px)] leading-[1.02] tracking-[-0.035em] font-light text-[#081827] max-w-2xl mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Elegí el plan que mejor se adapte a tus necesidades
            </h2>
            <p className="text-[#4B4F56] text-lg font-light max-w-2xl">
              Todos los planes incluyen acceso a nuestras sedes, médicos especialistas y servicios de laboratorio.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={benefit.title}
                className={`relative rounded-2xl overflow-hidden border ${
                  benefit.featured
                    ? "border-[#F26A21] lg:scale-105 shadow-[0_24px_80px_rgba(8,24,39,.12)]"
                    : "border-[#E6EAF1] shadow-[0_8px_24px_rgba(8,24,39,.05)]"
                } bg-white transition-all duration-300 hover:shadow-[0_24px_80px_rgba(8,24,39,.12)]`}
              >
                {benefit.featured && (
                  <div className="absolute top-4 right-4 bg-[#F26A21] text-white px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider">
                    Recomendado
                  </div>
                )}

                <div
                  className={`bg-gradient-to-br ${benefit.color} p-8 text-white relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-10">
                    <svg
                      className="absolute w-96 h-96 -right-32 -top-32"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <circle cx="50" cy="50" r="40" stroke="currentColor" />
                      <circle cx="50" cy="50" r="20" stroke="currentColor" />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="text-white/70 text-[10px] font-mono font-semibold uppercase tracking-widest mb-2">
                      Plan {idx + 1}
                    </p>
                    <h3 className="text-2xl font-light mb-4 leading-tight">
                      {benefit.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-light">
                        {benefit.discount}
                      </span>
                      <span className="text-white/70">descuento</span>
                    </div>
                    <p className="text-white/80 text-sm font-light">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-[#4B4F56] text-[13px] font-mono uppercase tracking-wider font-semibold mb-6">
                    Incluye
                  </p>
                  <ul className="space-y-3">
                    {benefit.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <Check
                          size={18}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: benefit.accentColor }}
                        />
                        <span className="text-[#4B4F56] text-sm font-light leading-snug">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 border-t border-[#E6EAF1] bg-[#FBFAF7]">
                  <Link
                    href="#solicitar"
                    className={`w-full block text-center py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 ${
                      benefit.featured
                        ? "bg-[#F26A21] hover:bg-[#C84F12] text-white"
                        : "bg-white border border-[#E6EAF1] text-[#081827] hover:bg-[#FBFAF7]"
                    }`}
                  >
                    Solicitar ahora
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-b border-[#E6EAF1] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="inline-flex items-baseline gap-3 mb-6">
              <span className="text-[#F26A21] text-[13px] font-mono font-semibold uppercase tracking-wider">
                Proceso sencillo
              </span>
            </div>
            <h2
              className="font-display text-[clamp(36px,5vw,72px)] leading-[1.02] tracking-[-0.035em] font-light text-[#081827] max-w-2xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              ¿Cómo obtener tu credencial?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {[
              {
                step: "1",
                title: "Contactanos",
                description:
                  "Escribí por WhatsApp o llamá durante los horarios de atención",
              },
              {
                step: "2",
                title: "Conocé los planes",
                description:
                  "Te pasamos toda la información sobre beneficios y coberturas",
              },
              {
                step: "3",
                title: "Solicita tu credencial",
                description: "Sin costo adicional ni requisitos especiales",
              },
              {
                step: "4",
                title: "Comienza a ahorrar",
                description:
                  "Usala en todas nuestras sedes e instituciones afiliadas",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-xl border border-[#E6EAF1] p-6">
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-4 text-white font-semibold text-sm"
                    style={{ backgroundColor: "#F26A21" }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-[#081827] font-semibold mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-[#4B4F56] text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {item.step !== "4" && (
                  <div className="hidden md:block absolute -right-3 top-6 w-6 h-0.5 bg-[#E6EAF1]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="solicitar"
        className="bg-gradient-to-br from-[#103A73] to-[#5636A4] py-20 lg:py-28 border-b border-[#081827]/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2
              className="font-display text-[clamp(36px,5vw,72px)] leading-[1.02] tracking-[-0.035em] font-light text-white max-w-2xl mx-auto mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Contactanos ahora
            </h2>
            <p className="text-white/80 text-lg font-light max-w-2xl mx-auto">
              Nuestro equipo está disponible para resolver todas tus consultas sobre beneficios y planes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {contactInfo.map((contact) => {
              const Icon = contact.icon;
              return (
                <div key={contact.title}>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      target={
                        contact.href.startsWith("https") ? "_blank" : undefined
                      }
                      rel={
                        contact.href.startsWith("https")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors duration-200 block group"
                    >
                      <Icon
                        size={24}
                        className="text-[#F26A21] mb-3 group-hover:scale-110 transition-transform"
                      />
                      <p className="text-white/70 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                        {contact.title}
                      </p>
                      <p className="text-white text-sm font-semibold">
                        {contact.value}
                      </p>
                    </a>
                  ) : (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                      <Icon size={24} className="text-[#F26A21] mb-3" />
                      <p className="text-white/70 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                        {contact.title}
                      </p>
                      <p className="text-white text-sm font-semibold">
                        {contact.value}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/80 text-sm font-light">
              ¿Preguntas frecuentes?{" "}
              <a
                href="mailto:beneficios@dim.com.ar"
                className="text-[#FFD699] hover:text-white transition-colors"
              >
                Escribinos a beneficios@dim.com.ar
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="border-t border-[#E6EAF1] py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[#4B4F56] text-sm font-light mb-6 max-w-2xl mx-auto">
            La credencial AMEDIM no tiene costo adicional. Todos los beneficios se aplican directamente en el momento de la atención.
          </p>
          <Link
            href="https://portal.dim.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors duration-200"
          >
            <Check size={15} />
            Solicitar credencial AMEDIM
          </Link>
        </div>
      </section>
    </div>
  );
}
