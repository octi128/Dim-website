import Link from "next/link";
import Image from "next/image";
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
      <section className="hero">
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
              <div className="hero-tech">
                <span className="hero-tech-chip">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                  PET digital GE Healthcare
                </span>
                <span className="hero-tech-chip">
                  <svg viewBox="0 0 24 24" fill="none"><use href="#ico-scan" /></svg>
                  Resonancia 3T
                </span>
                <span className="hero-tech-chip">
                  <svg viewBox="0 0 24 24" fill="none"><use href="#ico-flask" /></svg>
                  Laboratorio propio
                </span>
              </div>
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
              <Link href="https://portal.dim.com.ar" target="_blank" rel="noopener noreferrer" className="quick-item">
                <div className="quick-item-left">
                  <div className="ico" style={{ background: "rgba(16,58,115,.12)" }}>
                    <svg viewBox="0 0 24 24" style={{ color: "var(--blue)", width: 18, height: 18 }}>
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="quick-item-name">Mis resultados</div>
                    <div className="quick-item-desc">Accedé a tus estudios y análisis</div>
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

      {/* ───────────────── STRIP STATS ───────────── */}
      <div className="strip">
        <div className="strip-inner">
          <div className="strip-cell">
            <div>
              <div className="strip-n">+850</div>
              <div className="strip-l">Médicos y especialistas</div>
              <div className="strip-s">Certificados</div>
            </div>
          </div>
          <div className="strip-cell">
            <div>
              <div className="strip-n">60+</div>
              <div className="strip-l">Años de trayectoria</div>
              <div className="strip-s">Fundado en 1964</div>
            </div>
          </div>
          <div className="strip-cell">
            <div>
              <div className="strip-n">+350</div>
              <div className="strip-l">Especialidades médicas</div>
              <div className="strip-s">Alta y baja complejidad</div>
            </div>
          </div>
          <div className="strip-cell">
            <div>
              <div className="strip-n">+104</div>
              <div className="strip-l">Obras sociales y prepagas</div>
              <div className="strip-s">Actualizadas</div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── SERVICIOS ─────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="services-header">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Nuestros servicios</div>
              <h2>Tus estudios en<br />un solo <em className="soft violet">lugar.</em></h2>
            </div>
            <p className="lead" style={{ fontSize: 16 }}>
              Más de 350 especialidades y la tecnología diagnóstica disponible en los mejores centros del mundo, en Zona Oeste y CABA.
            </p>
          </div>
          <div className="services-grid">
            <div className="s-featured">
              <div className="s-featured-photo" aria-hidden="true" />
              <div className="eyebrow white">Especialistas</div>
              <h3>850+ profesionales médicos<br /><em className="soft v-light">para cada necesidad.</em></h3>
              <p>Todas las especialidades en un mismo sistema de turnos y resultados.</p>
              <Link href="/especialidades-medicas" className="btn btn-ghost-white" style={{ height: 44 }}>Ver especialidades →</Link>
            </div>
            <div className="s-card">
              <div className="ico violet-bg">
                <svg viewBox="0 0 24 24" style={{ color: "var(--violet)", width: 22, height: 22 }}><use href="#ico-scan" /></svg>
              </div>
              <div className="s-card-name">Resonancia Magnética</div>
              <div className="s-card-desc">Resonadores de 1.5 y 3 Teslas · Alta resolución diagnóstica</div>
            </div>
            <div className="s-card">
              <div className="ico orange-bg">
                <svg viewBox="0 0 24 24" style={{ color: "var(--orange)", width: 22, height: 22 }}><use href="#ico-flask" /></svg>
              </div>
              <div className="s-card-name">Laboratorio</div>
              <div className="s-card-desc">Propio de referencia · Resultados online</div>
            </div>
            <div className="s-card">
              <div className="ico" style={{ background: "rgba(16,58,115,.1)" }}>
                <svg viewBox="0 0 24 24" style={{ color: "var(--blue-2)", width: 22, height: 22 }}><use href="#ico-scan" /></svg>
              </div>
              <div className="s-card-name">Medicina Nuclear</div>
              <div className="s-card-desc">PET/CT Digital · Oncología de precisión</div>
            </div>
            <div className="s-card">
              <div className="ico" style={{ background: "rgba(110,139,123,.12)" }}>
                <svg viewBox="0 0 24 24" style={{ color: "var(--sage)", width: 22, height: 22 }}><use href="#ico-knife" /></svg>
              </div>
              <div className="s-card-name">Cirugías</div>
              <div className="s-card-desc">3 quirófanos · Procedimientos ambulatorios</div>
            </div>
            <div className="s-card">
              <div className="ico violet-bg">
                <svg viewBox="0 0 24 24" style={{ color: "var(--violet)", width: 22, height: 22 }}><use href="#ico-heart" /></svg>
              </div>
              <div className="s-card-name">Oncología</div>
              <div className="s-card-desc">Alianza Instituto Alexander Fleming</div>
            </div>
            <div className="s-card">
              <div className="ico orange-bg">
                <svg viewBox="0 0 24 24" style={{ color: "var(--orange)", width: 22, height: 22 }}><use href="#ico-clock" /></svg>
              </div>
              <div className="s-card-name">Atención sin turno previo</div>
              <div className="s-card-desc">Todos los días · Rivadavia 14252</div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── FOTO EDITORIAL ────────── */}
      <div className="foto-editorial" role="img" aria-label="Una niña sonríe junto a la técnica de DIM frente a un equipo Philips">
        <Image src="/home/editorial-nina.jpg" alt="Niña con la técnica de DIM frente a un equipo Philips, antes de su estudio" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "75% 35%", opacity: 0.82 }} priority />
        <div className="foto-editorial-overlay" aria-hidden="true" />
        <div className="foto-editorial-inner">
          <div className="foto-editorial-content">
            <div className="eyebrow orange" style={{ marginBottom: 16 }}>Tecnología de diagnóstico</div>
            <h2 style={{ color: "#fff", lineHeight: 1.06 }}>
              La tecnología más avanzada al servicio de tu <em className="soft" style={{ color: "var(--violet-light)" }}>tranquilidad.</em>
            </h2>
            <p style={{ marginTop: 20 }}>
              Resonancia 3T, PET/CT Digital y resonadores pediátricos especialmente diseñados para hacer cada estudio lo más cómodo y calmado posible.
            </p>
          </div>
        </div>
      </div>

      {/* ───────────────── DESTACADOS CLÍNICOS ─── */}
      <section className="section" style={{ background: "var(--ink)", borderTop: "none", paddingBottom: 80 }}>
        <div className="wrap on-dark">
          <div className="clinicos-header">
            <div>
              <div className="eyebrow orange" style={{ marginBottom: 16 }}>PET digital · Resonancia 3T</div>
              <h2 style={{ color: "#fff" }}>Tu salud, en alta <em className="soft v-light">resolución.</em></h2>
            </div>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 16, lineHeight: 1.65 }}>
              La precisión que necesita tu diagnóstico. Resonancia 3T, PET/CT digital y laboratorio propio, con respaldo de los principales centros de referencia del país.
            </p>
          </div>

          <div className="clinicos-grid">
            <div className="clin-card pet">
              <div className="clin-card-photo" aria-hidden="true" />
              <div>
                <div className="clin-eyebrow">DIM PET · Nuevo · Argentina</div>
                <div className="clin-big">1°</div>
                <div className="clin-big-sub">En Argentina</div>
                <div className="clin-name">PET/CT Digital Omni Legend™</div>
                <div className="clin-desc">El primer equipo GE Healthcare de este tipo en el país. Diagnóstico oncológico de alta precisión, en menos tiempo y con mayor comodidad para el paciente.</div>
              </div>
              <button className="btn btn-ghost-white" style={{ height: 44 }}>Conocer el estudio →</button>
            </div>

            <div className="clin-card lab">
              <div className="clin-card-photo" aria-hidden="true" />
              <div>
                <div className="clin-eyebrow">Laboratorio · Referencia</div>
                <div className="clin-big">1 día</div>
                <div className="clin-big-sub">Resultados online</div>
                <div className="clin-name">Saber primero. <em className="soft v-light">Curar mejor.</em></div>
                <div className="clin-desc">Más de 300 determinaciones. Resultados directamente en tu app el mismo día. Y para la mayoría de los estudios, solo necesitás 2 horas de ayuno.</div>
              </div>
              <button className="btn btn-ghost-white" style={{ height: 44 }}>Sacar turno →</button>
            </div>

            <div className="clin-card guard">
              <div className="clin-card-photo" aria-hidden="true" />
              <div>
                <div className="clin-eyebrow">Atención sin turno · Rivadavia</div>
                <div className="clin-name" style={{ fontSize: "clamp(22px,2.2vw,32px)", marginTop: 12 }}>Cuando lo necesitás, <em className="soft v-light">ya estamos.</em></div>
                <div className="clin-desc" style={{ marginTop: 16 }}>Todos los días, a cualquier hora. Con laboratorio e imágenes en el acto para resolver en el momento. Av. Rivadavia 14252, Ramos Mejía.</div>
              </div>
              <button className="btn btn-ghost-white" style={{ height: 44 }}>Cómo llegar →</button>
            </div>
          </div>

          <div className="quiro-row">
            <div className="quiro-photo-bg" aria-hidden="true" />
            <div>
              <div className="eyebrow orange" style={{ marginBottom: 10 }}>Cirugía ambulatoria</div>
              <h3 style={{ color: "#fff", fontSize: "clamp(22px,2.5vw,30px)" }}>Cirugía ambulatoria con <em className="soft v-light">alta el mismo día.</em></h3>
              <p style={{ color: "rgba(255,255,255,.6)", marginTop: 10, fontSize: 15, maxWidth: 560 }}>3 quirófanos propios para procedimientos ambulatorios, con alta el mismo día en la mayoría de los casos. DIM no realiza internación.</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 80, fontWeight: 300, color: "#fff", letterSpacing: "-.04em", lineHeight: 1 }}>3</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginTop: 4 }}>Quirófanos propios</div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── POR QUÉ DIM ─────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="porque-grid">
            <div style={{ position: "relative" }}>
              <div className="porque-foto">
                <Image src="/home/porque-dim.jpg" alt="Paciente acompañada por una profesional de DIM Salud" fill sizes="(max-width: 1040px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center 35%" }} />
                <div className="porque-foto-badge" aria-hidden="true">
                  <div className="badge-n">+2M</div>
                  <div className="badge-l">Prestaciones por año</div>
                </div>
              </div>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Por qué elegir DIM</div>
              <h2>+800 médicos.<br />Uno <em className="soft violet">cerca tuyo.</em></h2>
              <p className="lead" style={{ fontSize: 16, marginTop: 16, maxWidth: "100%" }}>
                Más de 60 años cuidando la salud de las familias de Zona Oeste y CABA. Baja, mediana y alta complejidad en un solo lugar, con la tecnología que cada diagnóstico requiere.
              </p>
              <div className="feature-list">
                <div className="feat">
                  <div className="feat-dot" />
                  <div className="feat-text"><strong>Atención personalizada en cada etapa</strong><span>De la consulta al diagnóstico, siempre acompañado</span></div>
                </div>
                <div className="feat">
                  <div className="feat-dot" />
                  <div className="feat-text"><strong>PET digital, resonancia 3T y laboratorio propio</strong><span>PET/CT digital Omni Legend de GE Healthcare</span></div>
                </div>
                <div className="feat">
                  <div className="feat-dot" />
                  <div className="feat-text"><strong>100% digital: turnos, resultados y recetas</strong><span>Desde la app o el portal web, en cualquier momento</span></div>
                </div>
                <div className="feat">
                  <div className="feat-dot" />
                  <div className="feat-text"><strong>Sede universitaria de la UBA</strong><span>Formamos médicos residentes en Diagnóstico por Imágenes desde 2014, en las mismas salas donde te atendemos.</span></div>
                </div>
                <div className="feat">
                  <div className="feat-dot" />
                  <div className="feat-text"><strong>Atención sin turno previo</strong><span>Todos los días en Av. Rivadavia, Ramos Mejía</span></div>
                </div>
                <div className="feat">
                  <div className="feat-dot" />
                  <div className="feat-text"><strong>Quirófanos propios para cirugías ambulatorias</strong><span>Alta complejidad diagnóstica y terapéutica</span></div>
                </div>
              </div>
              <div className="kpi-grid">
                <div className="kpi-box">
                  <div className="kpi-n">60+</div>
                  <div className="kpi-l">Años de trayectoria</div>
                  <div className="kpi-s">Desde 1964</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-n">98%</div>
                  <div className="kpi-l">Resultados online</div>
                  <div className="kpi-s">Acceso digital inmediato</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-n">+104</div>
                  <div className="kpi-l">Coberturas médicas</div>
                  <div className="kpi-s">Obras sociales y prepagas</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-n">+350</div>
                  <div className="kpi-l">Especialidades</div>
                  <div className="kpi-s">Alta y baja complejidad</div>
                </div>
                <div className="kpi-testi">
                  <div className="stars">★ ★ ★ ★ ★</div>
                  <p>&ldquo;DIM tiene todos los estudios y especialistas en un solo lugar. Desde que me atienden acá no necesito ir a ningún otro lado.&rdquo;</p>
                  <div className="author">Paciente DIM · Ramos Mejía</div>
                </div>
              </div>
            </div>
          </div>

          {/* BANDA DE RECONOCIMIENTOS */}
          <div className="reconocimientos-banda">
            <div className="reconoc-eyebrow">Reconocimientos institucionales</div>
            <div className="reconoc-cards">
              <div className="reconoc-card">
                <div className="reconoc-icon reconoc-icon--blue">
                  <span className="reconoc-uba">UBA</span>
                </div>
                <div className="reconoc-body">
                  <div className="reconoc-tag reconoc-tag--blue">Sede universitaria</div>
                  <div className="reconoc-title">Universidad de Buenos Aires</div>
                  <div className="reconoc-desc">Carrera de Diagnóstico por Imágenes · Sede oficial desde 2014</div>
                </div>
              </div>

              <div className="reconoc-divider" aria-hidden="true" />

              <div className="reconoc-card">
                <div className="reconoc-icon reconoc-icon--gradient">
                  <div className="reconoc-nivel-a">A</div>
                </div>
                <div className="reconoc-body">
                  <div className="reconoc-tag reconoc-tag--orange">Máximo reconocimiento</div>
                  <div className="reconoc-title">SIER Nivel A · Ministerio de Salud</div>
                  <div className="reconoc-desc">Residencia en Diagnóstico por Imágenes reconocida con Nivel A por 5 años · Disposición DI-2026-171 · Junio 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PROPÓSITO ─────────────── */}
      <div className="proposito">
        <div className="wrap">
          <div className="eyebrow orange" style={{ marginBottom: 14 }}>Nuestro propósito</div>
          <h2>
            <span className="linea">&ldquo;Ayudar a las personas a vivir más y mejor,</span>
            <span className="linea">manteniendo su salud, <em className="soft">autonomía y calidad de vida</em></span>
            <span className="linea">durante más tiempo.&rdquo;</span>
          </h2>
        </div>
      </div>

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

      {/* ───────────────── COBERTURAS ─────────────── */}
      <section className="section cob-wrap" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Coberturas</div>
          <h2>Más de 104 <em className="soft violet">coberturas</em> médicas.</h2>
          <div className="cob-grid">
            <div className="cob-card"><div className="cob-head" style={{ background: "var(--blue)" }}>OSDE</div><div className="cob-body">Todos los planes</div></div>
            <div className="cob-card"><div className="cob-head" style={{ background: "var(--blue)" }}>Medife</div><div className="cob-body">Cobertura completa</div></div>
            <div className="cob-card"><div className="cob-head" style={{ background: "var(--blue)" }}>Swiss Medical</div><div className="cob-body">Todos los planes</div></div>
            <div className="cob-card"><div className="cob-head" style={{ background: "var(--blue)" }}>Galeno</div><div className="cob-body">Alta y baja complejidad</div></div>
            <div className="cob-card"><div className="cob-head" style={{ background: "var(--blue)" }}>Sancor Salud</div><div className="cob-body">Todos los planes</div></div>
            <div className="cob-card"><div className="cob-head" style={{ background: "var(--blue)" }}>Avalian</div><div className="cob-body">Todos los planes</div></div>
          </div>
          <div className="cob-cta">
            <div>
              <p>Trabajamos con obras sociales y prepagas.</p>
              <span>OSDE · Medife · Swiss · Galeno · Sancor · PAMI · Y muchas más</span>
            </div>
            <Link href="/coberturas-medicas" className="btn btn-orange">Ver todas las coberturas</Link>
          </div>
        </div>
      </section>

      {/* ───────────────── CENTROS ─────────────── */}
      <section className="section" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="centros-head-row">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Nuestros centros</div>
              <h2>Estamos <em className="soft violet">cerca tuyo.</em></h2>
            </div>
            <Link href="/nuestros-centros-y-horarios">Ver todos los centros →</Link>
          </div>
          <div className="centros-grid">
            <div className="centro-card">
              <div className="centro-head">
                <div className="centro-name">DIM Alta Complejidad</div>
                <span className="centro-tag violet">Principal</span>
              </div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-location" /></svg>Espora 18, Ramos Mejía</div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-clock" /></svg>Lun–Vie 7–21h · Sáb 7–19h · Dom 8–17:30h</div>
            </div>
            <div className="centro-card">
              <div className="centro-head">
                <div className="centro-name">DIM Rivadavia</div>
                <span className="centro-tag alert">24 hs</span>
              </div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-location" /></svg>Av. Rivadavia 14252, Ramos Mejía</div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-clock" /></svg>Lun–Vie 24hs · Sáb–Dom 7–18:30h</div>
            </div>
            <div className="centro-card">
              <div className="centro-head">
                <div className="centro-name">DIM Mujer</div>
                <span className="centro-tag">Salud femenina</span>
              </div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-location" /></svg>Av. Rivadavia 14282, Ramos Mejía</div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-clock" /></svg>Lun–Vie 7:30–20h · Sáb 7:30–17h</div>
            </div>
            <div className="centro-card">
              <div className="centro-head">
                <div className="centro-name">DIM Odontología</div>
                <span className="centro-tag violet">Premium</span>
              </div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-location" /></svg>Av. Rivadavia 14230, Ramos Mejía</div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-clock" /></svg>Consultar horarios</div>
            </div>
            <div className="centro-card">
              <div className="centro-head">
                <div className="centro-name">DIM Sede Central</div>
              </div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-location" /></svg>Belgrano 134, Ramos Mejía</div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-clock" /></svg>Consultar horarios</div>
            </div>
            <div className="centro-card">
              <div className="centro-head">
                <div className="centro-name">DIM Once</div>
                <span className="centro-tag">CABA</span>
              </div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-location" /></svg>Av. Rivadavia 2198, Once, CABA</div>
              <div className="centro-info"><svg viewBox="0 0 24 24"><use href="#ico-phone" /></svg>WhatsApp: 15-6205-0330</div>
            </div>
          </div>
          <div className="centros-cta">
            <Link href="/nuestros-centros-y-horarios" className="btn btn-ghost">Todos los centros y horarios</Link>
            <Link href="https://portal.dim.com.ar" target="_blank" rel="noopener noreferrer" className="btn btn-orange">Sacar un turno ahora</Link>
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
