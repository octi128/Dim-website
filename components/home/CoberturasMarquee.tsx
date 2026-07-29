type Marca = {
  name: string;
  /** Ruta al logo (ej: "/obras-sociales/osde.svg"). Si no existe, se muestra el wordmark. */
  logo?: string;
};

const MARCAS: Marca[] = [
  { name: "OSDE" },
  { name: "Swiss Medical" },
  { name: "Galeno" },
  { name: "Medifé" },
  { name: "Sancor Salud" },
  { name: "AVALIAN" },
  { name: "OMINT" },
  { name: "Medicus" },
  { name: "Accord Salud" },
  { name: "Unión Personal" },
  { name: "Prevención Salud" },
  { name: "IOMA" },
  { name: "OSDEPYM" },
  { name: "Premedic" },
];

export default function CoberturasMarquee() {
  // Se duplica la lista para que el loop sea continuo (la pista se traslada -50%).
  const loop = [...MARCAS, ...MARCAS];

  return (
    <section className="cob-marquee" data-hero-dark aria-label="Obras sociales y prepagas con las que trabajamos">
      <div className="cob-marquee-eyebrow">Obras sociales y prepagas</div>

      <div className="cob-marquee-rail">
        <div className="cob-marquee-track">
          {loop.map((m, i) => (
            <div
              className="cob-marquee-item"
              key={`${m.name}-${i}`}
              aria-hidden={i >= MARCAS.length ? true : undefined}
            >
              {m.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.logo} alt={m.name} loading="lazy" />
              ) : (
                <span className="cob-marquee-word">{m.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
