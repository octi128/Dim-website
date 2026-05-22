import Link from "next/link";

const services = [
  {
    tag: "Resonancia Magnética",
    metric: "12",
    metricLabel: "Resonadores",
    headline: "El único Philips 3T de Zona Oeste",
    sub: "Ramos Mejía · Morón · Ciudadela. Con y sin contraste. Resultados el mismo día.",
    href: "/resonancia-magnetica",
    cta: "Sacar turno",
    bg: "from-[#103A73] to-[#081827]",
  },
  {
    tag: "DIM PET · Nuevo",
    metric: "1°",
    metricLabel: "En Argentina",
    headline: "PET/CT Digital Omni Legend™",
    sub: "El primer equipo GE Healthcare de su tipo en el país. Diagnóstico oncológico de precisión.",
    href: "/dim-pet",
    cta: "Evaluar mi situación",
    bg: "from-[#5636A4] to-[#103A73]",
  },
  {
    tag: "DIM Once",
    metric: "1 día",
    metricLabel: "Todos tus estudios",
    headline: "Centro de Salud Integral en CABA",
    sub: "Av. Rivadavia 2198, Once. Todos los estudios de control en una misma jornada.",
    href: "/dim-once",
    cta: "Conocer DIM Once",
    bg: "from-[#081827] to-[#5636A4]",
  },
];

export default function FeaturedBanners() {
  return (
    <section className="bg-[#FBFAF7] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-12">
          <div>
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Servicios destacados
            </div>
            <h2
              className="font-display text-[clamp(36px,5vw,60px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Tecnología de{" "}
              <em className="italic text-[#5636A4]">última generación.</em>
            </h2>
          </div>
          <p className="text-[#4B4F56] font-light lg:text-right">
            Equipamiento premium, alianzas estratégicas y diagnósticos de alta precisión al alcance de todos en Zona Oeste.
          </p>
        </div>

        {/* Cards row */}
        <div className="grid md:grid-cols-3 gap-4">
          {services.map((svc) => (
            <div
              key={svc.href}
              className={`bg-gradient-to-br ${svc.bg} rounded-3xl p-7 flex flex-col justify-between min-h-[380px]`}
            >
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
                  {svc.tag}
                </div>
                <div className="mb-4">
                  <span
                    className="font-display text-5xl font-light text-white block leading-none tracking-[-0.04em]"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    {svc.metric}
                  </span>
                  <span className="font-mono text-white/55 text-[9px] mt-1 block uppercase tracking-widest">{svc.metricLabel}</span>
                </div>
                <h3
                  className="font-display text-white text-xl font-light leading-tight mb-3"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {svc.headline}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{svc.sub}</p>
              </div>

              <Link
                href={svc.href}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors self-start mt-6"
              >
                {svc.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
