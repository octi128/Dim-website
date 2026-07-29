"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type Testimonio = {
  id: string;
  /** Centro donde se atendió. Hace de tab, igual que los logos de empleadores del diseño de referencia. */
  centro: string;
  /** Mismo código de color que los puntos de las tarjetas de sedes. */
  dot: string;
  foto: string;
  /** background-position: las fotos son apaisadas y el recorte 4/5 hay que
      encuadrarlo a mano para que caiga sobre las caras, no sobre el fondo. */
  pos: string;
  quote: string;
  nombre: string;
  rol: string;
};

const TESTIMONIOS: Testimonio[] = [
  {
    id: "alta-complejidad",
    centro: "DIM Alta Complejidad",
    dot: "#2DD4BF",
    foto: "/home/porque-dim.jpg",
    pos: "58% 32%",
    quote:
      "Me pidieron una resonancia y un PET en la misma semana. Los dos estudios me los hicieron en el mismo edificio y el informe lo tuve online el mismo día. No tuve que andar de un lado a otro con los sobres.",
    nombre: "Mariana G.",
    rol: "Paciente · DIM Alta Complejidad",
  },
  {
    id: "rivadavia",
    centro: "DIM Rivadavia",
    dot: "#34D399",
    foto: "/home/servicios-familia.jpg",
    pos: "44% 42%",
    quote:
      "Llegué un domingo a la noche con mi hijo con fiebre y sin turno. Nos atendieron en veinte minutos y salimos con los estudios hechos. Saber que está abierto todos los días te cambia la cabeza.",
    nombre: "Diego P.",
    rol: "Paciente · DIM Rivadavia",
  },
  {
    id: "mujer",
    centro: "DIM Mujer",
    dot: "#7C6CF0",
    foto: "/home/editorial-nina.jpg",
    pos: "68% 58%",
    quote:
      "Hice todo el embarazo acá: los controles, las ecografías y el parto. Siempre me atendió el mismo equipo, así que nunca tuve que volver a contar mi historia desde cero.",
    nombre: "Carolina V.",
    rol: "Paciente · DIM Mujer",
  },
  {
    id: "odontologia",
    centro: "DIM Odontología",
    dot: "#F5B301",
    foto: "/odontologia-consultorio.jpg",
    pos: "44% 55%",
    quote:
      "Vinimos por una urgencia de mi mamá y terminamos quedándonos toda la familia. Nos arman los turnos seguidos para venir una sola vez y la obra social nos cubre casi todo.",
    nombre: "Lucía R.",
    rol: "Paciente · DIM Odontología",
  },
];

export default function TestimoniosPacientes() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const actual = TESTIMONIOS[active];

  /** Navegación con flechas dentro del tablist (patrón WAI-ARIA de tabs). */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = TESTIMONIOS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section className="testi" data-hero-dark aria-labelledby="testi-title">
      <div className="wrap">
        <div className="testi-panel">
          <div className="testi-head">
            <h2 id="testi-title">
              Historias <em className="soft v-light">reales</em> de pacientes DIM
            </h2>
            <p className="testi-lead">
              Cada año acompañamos a miles de familias de Zona Oeste y CABA.
              Estas son algunas de sus experiencias.
            </p>
            <Link href="/nuestros-centros-y-horarios" className="btn btn-lav testi-cta">
              Conocé nuestros centros
            </Link>
          </div>

          <div
            className="testi-tabs"
            role="tablist"
            aria-label="Elegí un centro para leer su testimonio"
            onKeyDown={onKeyDown}
          >
            {TESTIMONIOS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`testi-tab-${t.id}`}
                className="testi-tab"
                aria-selected={i === active}
                aria-controls={`testi-panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
              >
                <i style={{ background: t.dot }} aria-hidden="true" />
                {t.centro}
              </button>
            ))}
          </div>

          <div
            className="testi-card"
            role="tabpanel"
            id={`testi-panel-${actual.id}`}
            aria-labelledby={`testi-tab-${actual.id}`}
            tabIndex={0}
          >
            {/* Las fotos se renderizan todas y se cruzan por opacidad (mismo patrón
                que .acc-photo del acordeón): evita el parpadeo al cambiar de tab. */}
            <div className="testi-photo-wrap">
              {TESTIMONIOS.map((t, i) => (
                <div
                  key={t.id}
                  className={`testi-photo${i === active ? " is-active" : ""}`}
                  style={{ backgroundImage: `url(${t.foto})`, backgroundPosition: t.pos }}
                  aria-hidden="true"
                />
              ))}
            </div>

            <blockquote className="testi-body" key={actual.id}>
              <p className="testi-quote">“{actual.quote}”</p>
              <footer className="testi-by">
                <strong>{actual.nombre}</strong>
                <span>{actual.rol}</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
