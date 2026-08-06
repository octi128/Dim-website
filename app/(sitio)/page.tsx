import Link from "next/link";
import EspecialidadesAccordion from "@/components/home/EspecialidadesAccordion";
import CoberturasMarquee from "@/components/home/CoberturasMarquee";
import TestimoniosPacientes from "@/components/home/TestimoniosPacientes";
import NovedadesCarrusel from "@/components/home/NovedadesCarrusel";
import "../home-v4.css";
import { PORTAL_URL } from "@/lib/contacto";
import { client } from "@/sanity/lib/client";
import { NOVEDADES_CARRUSEL_QUERY, type Novedad } from "@/sanity/lib/queries";

// Oculto junto con la sección "buscador" (ver más abajo): vuelve cuando exista
// el contenido de especialidades detrás de cada letra.
// const LETTERS = "ABCDEFGHIJLMNOPQRSTUVZ".split("");

export default async function Home() {
  // Mismo patrón que app/(sitio)/coberturas-medicas/page.tsx: `revalidate: false`
  // deja el fetch cacheado, así se resuelve en el build y la ruta sigue siendo
  // estática. `useCdn: false` sólo acá, para hornear el dato de la API y no del CDN.
  //
  // Sin guarda que corte el build, a diferencia del listado de novedades: acá el
  // carrusel es una sección entre muchas. Si no hay novedades no se renderiza la
  // sección —una sección ausente pasa desapercibida, un carrusel vacío se ve roto.
  const novedades = await client
    .withConfig({ useCdn: false })
    .fetch<Novedad[] | null>(
      NOVEDADES_CARRUSEL_QUERY,
      {},
      { next: { revalidate: false } }
    );

  return (
    <div className="home-v4">
      {/* ───────────────── SVG DEFS ───────────────── */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="ico-flask" viewBox="0 0 24 24">
          <path d="M9 3h6M10 3v7l-4 9a1 1 0 00.9 1.5h10.2a1 1 0 00.9-1.5L14 10V3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="ico-scan" viewBox="0 0 24 24">
          <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </symbol>
        <symbol id="ico-clock" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </symbol>
        <symbol id="ico-heart" viewBox="0 0 24 24">
          <path d="M12 21C12 21 3 14 3 8a5 5 0 019-3 5 5 0 019 3c0 6-9 13-9 13z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </symbol>
        <symbol id="ico-phone" viewBox="0 0 24 24">
          <path d="M5 4h4l2 5-2.5 1.5A11 11 0 0015.5 15L17 12.5l5 2v4a2 2 0 01-2 2A18 18 0 013 4a2 2 0 012-2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </symbol>
        <symbol id="ico-location" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" fill="currentColor" />
        </symbol>
        <symbol id="ico-knife" viewBox="0 0 24 24">
          <path d="M3 3l16 8-8 2-2 8L3 3z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </symbol>
      </svg>

      {/* ───────────────── HERO ──────────────────── */}
      {/* data-hero-dark="hero" identifica al hero de portada: el navbar se pone
          oscuro pero SIN la línea inferior. En el resto de secciones oscuras la
          línea sí se muestra. */}
      <section className="hero" data-hero-dark="hero">
        <div className="hero-photo-bg" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow orange">Desde 1964 · Zona Oeste y CABA</div>
              <h1>
                Saber a tiempo es<br />
                <em className="soft v-light">la tranquilidad que necesitás.</em>
              </h1>
              <div className="hero-lema">Te cuidamos hoy con la tecnología del mañana.</div>
              <p className="lead">
                Diagnóstico por imágenes, laboratorio, consultorios, cirugías y atención sin turno previo. Todo en un mismo lugar, en Zona Oeste y CABA.
              </p>
            </div>

            {/* ACCESO RÁPIDO */}
            <div className="quick-card">
              <div className="quick-card-head">
                <div className="eyebrow white">Acceso rápido</div>
                <h4>¿Qué necesitás resolver hoy?</h4>
              </div>
              <Link href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="quick-item">
                <div className="quick-item-left">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" style={{ color: "var(--orange)" }}><use href="#ico-flask" /></svg>
                  </div>
                  <div>
                    <div className="quick-item-name">Turno de laboratorio</div>
                    <div className="quick-item-desc">Resultados online en el día, según estudio</div>
                  </div>
                </div>
                <span className="quick-chevron">›</span>
              </Link>
              <Link href="/estudios-medicos-y-preparaciones" className="quick-item">
                <div className="quick-item-left">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" style={{ color: "var(--blue-2)" }}><use href="#ico-scan" /></svg>
                  </div>
                  <div>
                    <div className="quick-item-name">Preparación de estudios</div>
                    <div className="quick-item-desc">Resonancia, tomografía y más</div>
                  </div>
                </div>
                <span className="quick-chevron">›</span>
              </Link>
              <Link href="/atencion-sin-turno-previo" className="quick-item">
                <div className="quick-item-left">
                  <div className="ico" style={{ background: "rgba(242,106,33,.1)" }}>
                    <svg viewBox="0 0 24 24" style={{ color: "var(--orange)" }}><use href="#ico-clock" /></svg>
                  </div>
                  <div>
                    <div className="quick-item-name">Atención sin turno previo</div>
                    <div className="quick-item-desc">Av. Rivadavia 14252, Ramos Mejía</div>
                  </div>
                </div>
                <span className="quick-chevron">›</span>
              </Link>
              <Link href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-violet" style={{ height: 44, fontSize: 13, width: "100%", justifyContent: "center" }}>
                Reservá tu turno →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── SEDES ─────────────── */}
      <section className="sedes" data-hero-dark>
        <div className="wrap">
          <h2 className="sedes-title">Cerca tuyo, en <em className="soft v-light">cada etapa.</em></h2>
          <p className="sedes-sub">Más de 6 centros de salud en Zona Oeste y CABA para acompañarte en cada momento.</p>
          <div className="sedes-grid">
            <Link href="/nuestros-centros-y-horarios" className="sede-card" style={{ backgroundImage: "url(/home/porque-dim.jpg)" }}>
              <span className="sede-dot"><i style={{ background: "#2DD4BF" }} /></span>
              <div className="sede-card-body">
                <h3 className="sede-name">DIM Alta<br />Complejidad</h3>
                <div className="sede-desc">Espora 18, Ramos Mejía</div>
              </div>
            </Link>
            <Link href="/nuestros-centros-y-horarios" className="sede-card" style={{ backgroundImage: "url(/home/clin-guardia.jpg)" }}>
              <span className="sede-dot"><i style={{ background: "#34D399" }} /></span>
              <div className="sede-card-body">
                <h3 className="sede-name">DIM<br />Rivadavia</h3>
                <div className="sede-desc">Av. Rivadavia 14252 · Sin turno previo</div>
              </div>
            </Link>
            <Link href="/nuestros-centros-y-horarios" className="sede-card" style={{ backgroundImage: "url(/home/editorial-nina.jpg)" }}>
              <span className="sede-dot"><i style={{ background: "#7C6CF0" }} /></span>
              <div className="sede-card-body">
                <h3 className="sede-name">DIM<br />Mujer</h3>
                <div className="sede-desc">Av. Rivadavia 14282, Ramos Mejía</div>
              </div>
            </Link>
            <Link href="/nuestros-centros-y-horarios" className="sede-card" style={{ backgroundImage: "url(/odontologia-consultorio.jpg)" }}>
              <span className="sede-dot"><i style={{ background: "#F5B301" }} /></span>
              <div className="sede-card-body">
                <h3 className="sede-name">DIM<br />Odontología</h3>
                <div className="sede-desc">Av. Rivadavia 14230, Ramos Mejía</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── BENEFICIOS / BENTO ─────────────── */}
      <section className="beneficios" data-hero-dark>
        <div className="wrap">
          <div className="bento-panel">
            <div className="bento-head">
              <h2>Diagnóstico, tratamiento y seguimiento<em className="soft violet"> — todo en un solo lugar</em></h2>
              <div className="bento-head-side">
                <div className="bento-avatar" style={{ backgroundImage: "url(/home/porque-dim.jpg)" }} />
                <p>Desde 1964 acompañamos a las familias de Zona Oeste y CABA con la tecnología, los especialistas y la cercanía que cada momento necesita.</p>
              </div>
            </div>

            {/* Cada card es un solo enlace: el `Conocé más` es la señal visual,
                no un segundo link anidado (eso sería HTML inválido y duplicaría
                la parada en la navegación por teclado). */}
            <div className="bento-grid">
              <div className="bento-col bento-col--a">
                <Link href="/conocenos" className="bento-card bento-photo" style={{ backgroundImage: "url(/conocenos-hero.jpg)" }}>
                  <h3>Más de 850 médicos y 350 especialidades, en un solo lugar</h3>
                  <span className="bento-mas">Conocé más <span aria-hidden="true">→</span></span>
                </Link>
                <Link href="/atencion-sin-turno-previo" className="bento-card bento-dark">
                  <h3>Atención sin turno previo, todos los días del año</h3>
                  <div className="bento-radar" aria-hidden="true">
                    <span className="bento-radar-ring" />
                    <span className="bento-radar-ring bento-radar-ring--2" />
                    <span className="bento-radar-sweep" />
                  </div>
                  <span className="bento-mas">Conocé más <span aria-hidden="true">→</span></span>
                </Link>
              </div>

              <div className="bento-col bento-col--b">
                <Link href="/resonancia-magnetica" className="bento-card bento-blue">
                  <h3>PET/CT digital, resonancia 3T y tomografía multicorte</h3>
                  <div className="bento-stack" aria-hidden="true">
                    <span className="bento-chip bento-chip--1">Tomografía multicorte</span>
                    <span className="bento-chip bento-chip--2">Resonancia 3T</span>
                    <span className="bento-chip bento-chip--3">PET/CT Digital</span>
                  </div>
                  <span className="bento-mas">Conocé más <span aria-hidden="true">→</span></span>
                </Link>
                <Link href="/mutual-amedim" className="bento-card bento-soft">
                  <h3>100% digital: turnos, resultados y recetas desde la app</h3>
                  <div className="bento-bubbles" aria-hidden="true">
                    <span className="bento-bubble bento-bubble--dark" />
                    <span className="bento-bubble bento-bubble--light">
                      <svg viewBox="0 0 24 24"><use href="#ico-heart" /></svg>
                    </span>
                  </div>
                  <span className="bento-mas">Conocé más <span aria-hidden="true">→</span></span>
                </Link>
              </div>

              <div className="bento-col bento-col--c">
                <Link href="/coberturas-medicas" className="bento-card bento-sky">
                  <h3>Más de 104 obras sociales y prepagas</h3>
                  <div className="bento-orbit" aria-hidden="true">
                    <span className="bento-orbit-ring" />
                    <span className="bento-orbit-ring bento-orbit-ring--2" />
                    <span className="bento-orbit-ring bento-orbit-ring--3" />
                    <span className="bento-orbit-tag bento-orbit-tag--1">OSDE</span>
                    <span className="bento-orbit-tag bento-orbit-tag--2">Swiss Medical</span>
                  </div>
                  <span className="bento-mas">Conocé más <span aria-hidden="true">→</span></span>
                </Link>
                <Link href="/estudios-y-preparaciones-de-laboratorio" className="bento-card bento-photo" style={{ backgroundImage: "url(/home/clin-lab.jpg)" }}>
                  <h3>Laboratorio propio con resultados online el mismo día</h3>
                  <span className="bento-mas">Conocé más <span aria-hidden="true">→</span></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── BANDA EDITORIAL ─────────────── */}
      <section className="editorial-band" aria-hidden="true" />

      {/* ───────────────── MÉTRICAS ───────────── */}
      <section className="metricas">
        <div className="metricas-panel">
          <div className="metricas-rules" aria-hidden="true">
            <span /><span /><span /><span />
          </div>

          <div className="metricas-head">
            <h2>Más cuidado con<em className="soft violet"> menos vueltas</em></h2>
            <p>
              Al reunir médicos, estudios y laboratorio en un mismo lugar,<br />
              acortamos los tiempos de diagnóstico y evitamos derivaciones innecesarias.
            </p>
          </div>

          <div className="metricas-grid">
            <div className="metrica">
              <div className="metrica-ring metrica-ring--1">
                <div className="metrica-n">+850</div>
                <p>Médicos y especialistas certificados en un solo lugar</p>
              </div>
            </div>
            <div className="metrica">
              <div className="metrica-ring metrica-ring--2">
                <div className="metrica-n">60+</div>
                <p>Años acompañando a las familias de Zona Oeste, desde 1964</p>
              </div>
            </div>
            <div className="metrica">
              <div className="metrica-ring metrica-ring--3">
                <div className="metrica-n">+350</div>
                <p>Especialidades médicas de alta y baja complejidad</p>
              </div>
            </div>
            <div className="metrica">
              <div className="metrica-ring metrica-ring--4">
                <div className="metrica-n">+104</div>
                <p>Obras sociales y prepagas con cobertura vigente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── ESPECIALIDADES ────────── */}
      <EspecialidadesAccordion />

      {/* ───────────────── OBRAS SOCIALES (marquee) ────────── */}
      <CoberturasMarquee />

      {/* ───────────────── TESTIMONIOS ────────── */}
      <TestimoniosPacientes />

      {/* ───────────────── NOVEDADES (carrusel) ────────── */}
      {novedades && novedades.length > 0 && (
        <NovedadesCarrusel novedades={novedades} />
      )}

      {/* ───────────────── BUSCADOR / ÍNDICE ───────────────

          Oculto a pedido: las 22 letras y los 7 chips prometen "más de 350
          especialidades" que todavía no existen del otro lado del link. Se
          descomenta —junto con la constante LETTERS de arriba— cuando el
          contenido de especialidades esté cargado.

      <section className="section buscador">
        <div className="wrap">
          <div className="buscador-grid">
            <div className="buscador-col">
              <div className="eyebrow orange" style={{ marginBottom: 16 }}>Encontrá tu estudio o especialidad</div>
              <h2>Empezá por la <em className="soft violet">inicial.</em></h2>
              <p className="lead">Más de 350 especialidades y estudios, ordenados de la A a la Z.</p>
              <div className="indice-letras">
                {LETTERS.map((l) => (
                  <Link key={l} className="indice-letra" href={`/enfermedades/${l.toLowerCase()}`}>{l}</Link>
                ))}
              </div>
            </div>
            <div className="buscador-col">
              <div className="buscador-field-label">Buscar estudios y especialidades</div>
              <div className="buscador-field">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input type="text" placeholder="Resonancia, laboratorio, cardiología…" aria-label="Buscar estudios y especialidades" />
              </div>
              <div className="buscador-chips">
                <Link className="buscador-chip" href="/enfermedades/buscar">Resonancia magnética</Link>
                <Link className="buscador-chip" href="/enfermedades/buscar">Tomografía</Link>
                <Link className="buscador-chip" href="/enfermedades/buscar">PET digital</Link>
                <Link className="buscador-chip" href="/enfermedades/buscar">Ecografía</Link>
                <Link className="buscador-chip" href="/enfermedades/buscar">Mamografía</Link>
                <Link className="buscador-chip" href="/enfermedades/buscar">Laboratorio</Link>
                <Link className="buscador-chip" href="/enfermedades/buscar">Densitometría ósea</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      ─────────────────────────────────────────────────── */}
    </div>
  );
}
