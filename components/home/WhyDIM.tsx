const pillars = [
  "Atención personalizada",
  "Tecnología de vanguardia",
  "Calidad certificada",
  "100% Digital",
  "Laboratorio líder",
  "750+ profesionales",
];

const stats = [
  { value: "60+", label: "Años de trayectoria", sub: "Fundado en 1964" },
  { value: "12k+", label: "Pacientes / mes", sub: "En toda la red DIM" },
  { value: "98%", label: "Resultados online", sub: "Acceso digital al instante" },
  { value: "24/7", label: "Acceso al portal", sub: "Turnos y resultados siempre" },
];

export default function WhyDIM() {
  return (
    <section className="bg-[#F4EFE7] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <div className="inline-flex items-center border border-[#D8DEE8] bg-white/60 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Por qué elegir DIM
            </div>
            <h2
              className="font-display text-[clamp(36px,5vw,64px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Escalá tu{" "}
              <em className="italic text-[#5636A4]">bienestar.</em>
            </h2>
          </div>
          <p className="text-[#4B4F56] font-light text-lg lg:text-right">
            Experiencia médica modular diseñada para atención de baja, mediana y alta complejidad bajo el mismo techo.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Left: dark feature card */}
          <div className="bg-[#081827] rounded-3xl p-8 flex flex-col justify-between min-h-[420px]">
            {/* Pillar list */}
            <div className="space-y-3 mb-8">
              {pillars.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-[#F26A21]/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F26A21]" />
                  </div>
                  <span className="text-white/80 text-sm">{p}</span>
                </div>
              ))}
            </div>

            {/* Quote block */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#F26A21] text-sm">★</span>
                ))}
              </div>
              <p className="text-white font-light text-base leading-relaxed mb-4">
                "DIM tiene todos los estudios y especialistas en un solo lugar. Desde que me atienden acá no necesito ir a ningún otro lado."
              </p>
              <div>
                <p className="text-white font-semibold text-sm">Paciente DIM</p>
                <p className="text-white/40 text-xs">Ramos Mejía, Zona Oeste</p>
              </div>
            </div>
          </div>

          {/* Right: 2×2 stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="bg-white border border-[#E6EAF1] rounded-3xl p-7 flex flex-col justify-between"
              >
                <p
                  className="font-display text-5xl lg:text-6xl font-light text-[#081827] tracking-[-0.04em]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {stat.value}
                </p>
                <div>
                  <p className="font-semibold text-[#081827] text-sm mt-4">{stat.label}</p>
                  <p className="font-mono text-[9px] text-[#737985] mt-1 uppercase tracking-widest">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
