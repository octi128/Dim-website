import Link from "next/link";
import EspecialidadesAccordion from "@/components/home/EspecialidadesAccordion";
import CoberturasMarquee from "@/components/home/CoberturasMarquee";
import TestimoniosPacientes from "@/components/home/TestimoniosPacientes";
import NovedadesCarrusel from "@/components/home/NovedadesCarrusel";
import "./home-v4.css";

const LETTERS = "ABCDEFGHIJLMNOPQRSTUVZ".split("");

export default function Home() {
  return (
    <div className="home-v4">
      {/* ───────────────── SVG DEFS ───────────────── */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="ico-calendar" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </symbol>
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
        <symbol id="ico-apple" viewBox="0 0 24 24">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.2.06 2.04.72 2.74.73.74 0 2.13-.95 3.61-.81.61.03 2.32.25 3.42 1.85-.09.06-2.04 1.19-2.02 3.56.03 2.82 2.48 3.76 2.5 3.77-.03.07-.39 1.35-1.25 2.78zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.94 1.42-.15-1.15.41-2.35 1.04-3.11z" fill="currentColor" />
        </symbol>
        <symbol id="ico-play" viewBox="0 0 24 24">
          <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
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
              <Link href="https://portal.dim.com.ar" target="_blank" rel="noopener noreferrer" className="quick-item">
                <div className="quick-item-left">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" style={{ color: "var(--violet)" }}><use href="#ico-calendar" /></svg>
                  </div>
                  <div>
                    <div className="quick-item-name">Reservá un turno</div>
                    <div className="quick-item-desc">Online y en minutos</div>
                  </div>
                </div>
                <span className="quick-chevron">›</span>
              </Link>
              <Link href="https://portal.dim.com.ar" target="_blank" rel="noopener noreferrer" className="quick-item">
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
              <Link href="https://portal.dim.com.ar" target="_blank" rel="noopener noreferrer" className="btn btn-violet" style={{ height: 44, fontSize: 13, width: "100%", justifyContent: "center" }}>
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

            <div className="bento-grid">
              <div className="bento-col bento-col--a">
                <article className="bento-card bento-photo" style={{ backgroundImage: "url(/conocenos-hero.jpg)" }}>
                  <h3>Más de 850 médicos y 350 especialidades, en un solo lugar</h3>
                </article>
                <article className="bento-card bento-dark">
                  <h3>Atención sin turno previo, todos los días del año</h3>
                  <div className="bento-radar" aria-hidden="true">
                    <span className="bento-radar-ring" />
                    <span className="bento-radar-ring bento-radar-ring--2" />
                    <span className="bento-radar-sweep" />
                  </div>
                </article>
              </div>

              <div className="bento-col bento-col--b">
                <article className="bento-card bento-blue">
                  <h3>PET/CT digital, resonancia 3T y tomografía multicorte</h3>
                  <div className="bento-stack" aria-hidden="true">
                    <span className="bento-chip bento-chip--1">Tomografía multicorte</span>
                    <span className="bento-chip bento-chip--2">Resonancia 3T</span>
                    <span className="bento-chip bento-chip--3">PET/CT Digital</span>
                  </div>
                </article>
                <article className="bento-card bento-soft">
                  <h3>100% digital: turnos, resultados y recetas desde la app</h3>
                  <div className="bento-bubbles" aria-hidden="true">
                    <span className="bento-bubble bento-bubble--dark" />
                    <span className="bento-bubble bento-bubble--light">
                      <svg viewBox="0 0 24 24"><use href="#ico-heart" /></svg>
                    </span>
                  </div>
                </article>
              </div>

              <div className="bento-col bento-col--c">
                <article className="bento-card bento-sky">
                  <h3>Más de 104 obras sociales y prepagas</h3>
                  <div className="bento-orbit" aria-hidden="true">
                    <span className="bento-orbit-ring" />
                    <span className="bento-orbit-ring bento-orbit-ring--2" />
                    <span className="bento-orbit-ring bento-orbit-ring--3" />
                    <span className="bento-orbit-tag bento-orbit-tag--1">OSDE</span>
                    <span className="bento-orbit-tag bento-orbit-tag--2">Swiss Medical</span>
                  </div>
                </article>
                <article className="bento-card bento-photo" style={{ backgroundImage: "url(/home/clin-lab.jpg)" }}>
                  <h3>Laboratorio propio con resultados online el mismo día</h3>
                </article>
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
      <NovedadesCarrusel />

      {/* ───────────────── APP ────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="app-card">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>App DIM Salud</div>
              <h2>Tu historial médico completo,<br />siempre en el <em className="soft violet">bolsillo.</em></h2>
              <p className="lead" style={{ fontSize: 16, marginTop: 14 }}>
                Con la app DIM Salud podés pedir turnos, ver tus resultados de laboratorio e imágenes, acceder a tus recetas y recibir recordatorios. Todo desde el celular, sin esperas.
              </p>
              <div className="app-features">
                <div className="app-feat">
                  <div className="ico" style={{ width: 18, height: 18, borderRadius: 4, background: "var(--line)" }}><svg viewBox="0 0 24 24" style={{ width: 10, height: 10, color: "var(--violet)" }}><use href="#ico-calendar" /></svg></div>
                  Pedí turnos online
                </div>
                <div className="app-feat">
                  <div className="ico" style={{ width: 18, height: 18, borderRadius: 4, background: "var(--line)" }}><svg viewBox="0 0 24 24" style={{ width: 10, height: 10, color: "var(--orange)" }}><use href="#ico-flask" /></svg></div>
                  Resultados de laboratorio
                </div>
                <div className="app-feat">
                  <div className="ico" style={{ width: 18, height: 18, borderRadius: 4, background: "var(--line)" }}><svg viewBox="0 0 24 24" style={{ width: 10, height: 10, color: "var(--blue-2)" }}><use href="#ico-scan" /></svg></div>
                  Imágenes y estudios digitales
                </div>
                <div className="app-feat">
                  <div className="ico" style={{ width: 18, height: 18, borderRadius: 4, background: "var(--line)" }}><svg viewBox="0 0 24 24" style={{ width: 10, height: 10, color: "var(--sage)" }}><use href="#ico-heart" /></svg></div>
                  Recetas y certificados
                </div>
              </div>
            </div>
            <div className="app-stores">
              <div className="store-btn">
                <div className="store-ico"><svg viewBox="0 0 24 24"><use href="#ico-apple" /></svg></div>
                <div>
                  <div className="store-s">Disponible en</div>
                  <div className="store-n">App Store</div>
                </div>
              </div>
              <div className="store-btn">
                <div className="store-ico"><svg viewBox="0 0 24 24"><use href="#ico-play" /></svg></div>
                <div>
                  <div className="store-s">Disponible en</div>
                  <div className="store-n">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── BUSCADOR / ÍNDICE ─────────────── */}
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
    </div>
  );
}
