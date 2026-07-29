"use client";

import { useState } from "react";
import Link from "next/link";

const GRUPOS = [
  {
    id: "clinica",
    label: "Clínica y prevención",
    image: "/especialidades-hero.jpg",
    text: "Clínica médica, cardiología, endocrinología y nutrición para el control periódico y el seguimiento de enfermedades crónicas.",
    items: ["Clínica médica", "Cardiología", "Endocrinología", "Diabetología", "Nutrición"],
  },
  {
    id: "imagenes",
    label: "Diagnóstico por imágenes",
    image: "/resonancia-magnetica-hero-v2.jpg",
    text: "Resonancia 3T, PET/CT digital, tomografía multicorte y ecografía con informes online el mismo día.",
    items: ["Resonancia magnética 3T", "PET/CT digital", "Tomografía multicorte", "Ecografía", "Medicina nuclear"],
  },
  {
    id: "mujer",
    label: "Salud de la mujer",
    image: "/home/porque-dim.jpg",
    text: "Un centro dedicado a la ginecología, la obstetricia y el diagnóstico mamario, con equipos y consultorios propios.",
    items: ["Ginecología", "Obstetricia", "Mastología", "Andrología e infertilidad"],
  },
  {
    id: "cirugia",
    label: "Cirugía y tratamientos",
    image: "/cirugia-hero.jpg",
    text: "Quirófanos propios y equipos interdisciplinarios para cirugía general, vascular, plástica y tratamientos oncológicos.",
    items: ["Cirugía general", "Cirugía vascular", "Cirugía plástica", "Proctología", "Oncología"],
  },
  {
    id: "odontologia",
    label: "Odontología",
    image: "/odontologia-hero.jpg",
    text: "Consultorios odontológicos con atención integral para toda la familia, de la prevención a la rehabilitación.",
    items: ["Odontología general", "Endodoncia", "Ortodoncia", "Implantes", "Odontopediatría"],
  },
];

export default function EspecialidadesAccordion() {
  const [active, setActive] = useState(GRUPOS[0].id);
  const current = GRUPOS.find((g) => g.id === active) ?? GRUPOS[0];

  return (
    <section className="especialidades-acc" data-hero-dark>
      <div className="wrap">
        <div className="acc-grid">
          <div className="acc-col">
            <h2>
              Toda la salud de tu familia<em className="soft v-light"> en un solo lugar</em>
            </h2>
            <p className="acc-lead">
              Más de 350 especialidades y 1500 profesionales, con estudios,
              laboratorio y quirófanos propios. Elegí un área para ver qué
              incluye.
            </p>

            <div className="acc-list">
              {GRUPOS.map((g) => {
                const open = g.id === active;
                return (
                  <div key={g.id} className={`acc-item${open ? " is-open" : ""}`}>
                    <button
                      type="button"
                      className="acc-trigger"
                      aria-expanded={open}
                      aria-controls={`acc-panel-${g.id}`}
                      onClick={() => setActive(g.id)}
                    >
                      <span>{g.label}</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                    <div id={`acc-panel-${g.id}`} className="acc-panel" hidden={!open}>
                      <div
                        className="acc-panel-photo"
                        style={{ backgroundImage: `url(${g.image})` }}
                        aria-hidden="true"
                      />
                      <p>{g.text}</p>
                      <ul>
                        {g.items.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/especialidades-medicas" className="btn btn-violet acc-cta">
              Ver todas las especialidades
            </Link>
          </div>

          <div className="acc-media">
            {GRUPOS.map((g) => (
              <div
                key={g.id}
                className={`acc-photo${g.id === active ? " is-active" : ""}`}
                style={{ backgroundImage: `url(${g.image})` }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
