"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { mesYAnio } from "@/lib/fecha";
import { ETIQUETA_CATEGORIA, type Novedad } from "@/sanity/lib/queries";

export default function NovedadesCarrusel({ novedades }: { novedades: Novedad[] }) {
  const rielRef = useRef<HTMLUListElement>(null);
  const [alInicio, setAlInicio] = useState(true);
  const [alFinal, setAlFinal] = useState(false);

  const sincronizar = useCallback(() => {
    const el = rielRef.current;
    if (!el) return;
    setAlInicio(el.scrollLeft <= 1);
    setAlFinal(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    sincronizar();
    window.addEventListener("resize", sincronizar);
    return () => window.removeEventListener("resize", sincronizar);
  }, [sincronizar]);

  const paso = (dir: 1 | -1) => {
    const el = rielRef.current;
    if (!el) return;
    /* Un paso = ancho de tarjeta + gap. Lo medimos del DOM para no repetir
       en JS los valores que ya están en el CSS (y que cambian por breakpoint). */
    const tarjeta = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const salto = tarjeta ? tarjeta.offsetWidth + gap : el.clientWidth * 0.8;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * salto, behavior: suave ? "smooth" : "auto" });
  };

  return (
    <section className="nov" aria-labelledby="nov-title">
      <div className="wrap">
        <div className="nov-head">
          <div className="nov-head-txt">
            <div className="eyebrow orange">Novedades DIM</div>
            <h2 id="nov-title">
              Lo que sumamos <em className="soft violet">este año</em>
            </h2>
            <p className="lead nov-lead">
              Equipos nuevos, servicios que incorporamos y campañas de
              prevención. Todo lo que va cambiando en nuestros centros.
            </p>
          </div>

          <div className="nov-nav">
            <Link href="/novedades" className="nov-all">
              Ver todas
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <div className="nov-arrows">
              <button
                type="button"
                className="nov-arrow"
                onClick={() => paso(-1)}
                disabled={alInicio}
                aria-label="Ver novedades anteriores"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                className="nov-arrow"
                onClick={() => paso(1)}
                disabled={alFinal}
                aria-label="Ver novedades siguientes"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* El riel vive fuera del .wrap para poder llegar hasta el borde de la
          ventana: la tarjeta cortada a la derecha avisa que hay más. */}
      <ul className="nov-riel" ref={rielRef} onScroll={sincronizar}>
        {novedades.map((n) => (
          <li className="nov-card" key={n._id}>
            <Link href={`/novedades#novedad-${n.slug}`} className="nov-link">
              <div className="nov-foto">
                {/* Decorativa: el título de la tarjeta ya nombra la novedad y la
                    portada es una foto genérica de la categoría. */}
                <Image
                  src={urlFor(n.portada).url()}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 74vw, 320px"
                  className="nov-img"
                />
                <span className="nov-badge">{ETIQUETA_CATEGORIA[n.categoria] ?? "Novedades"}</span>
              </div>
              <h3 className="nov-titulo">{n.titulo}</h3>
              <p className="nov-desc">{n.resumen}</p>
              <div className="nov-meta">
                <span className="nov-fecha">{mesYAnio(n.fecha)}</span>
                <span className="nov-mas">
                  Leer
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
