import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, ChevronRight, Smartphone } from "lucide-react";
import AppStoreLink from "@/components/AppStoreLink";
import CuerpoNovedad, { esExterno } from "@/components/CuerpoNovedad";
import CtaBackdrop from "@/components/CtaBackdrop";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { mesYAnio } from "@/lib/fecha";
import { PORTAL_URL } from "@/lib/contacto";
import {
  ETIQUETA_CATEGORIA,
  NOVEDADES_RELACIONADAS_QUERY,
  NOVEDAD_POR_SLUG_QUERY,
  SLUGS_NOVEDADES_QUERY,
  type Novedad,
} from "@/sanity/lib/queries";

/**
 * Sin esto, Next.js renderiza bajo demanda cualquier slug que no haya salido de
 * `generateStaticParams`. Con `false`, las 41 páginas se hornean en el build y
 * un slug desconocido devuelve 404 sin que intervenga un servidor.
 *
 * Contrapartida: una novedad publicada en el Studio no aparece hasta el próximo
 * build. Ya es así en todo el sitio por el `revalidate: false` de los fetch.
 */
export const dynamicParams = false;

/** El cliente que usan todos los fetch de esta ruta: dato de la API, cacheado en build. */
const sanity = client.withConfig({ useCdn: false });
const CACHE_DE_BUILD = { next: { revalidate: false } } as const;

function traerNovedad(slug: string) {
  return sanity.fetch<Novedad | null>(NOVEDAD_POR_SLUG_QUERY, { slug }, CACHE_DE_BUILD);
}

export async function generateStaticParams() {
  const slugs = await sanity.fetch<{ slug: string }[] | null>(
    SLUGS_NOVEDADES_QUERY,
    {},
    CACHE_DE_BUILD
  );

  return slugs ?? [];
}

// ─────────────────────────── Metadata ───────────────────────────

/**
 * Open Graph va sin `url` y el JSON-LD de más abajo sin `url`, sin
 * `mainEntityOfPage` y sin `publisher.logo`: los cuatro campos necesitan la URL
 * canónica del sitio y el dominio definitivo todavía no está definido. Se
 * completan —junto con `metadataBase` en `app/layout.tsx`— cuando se decida.
 *
 * La imagen sí viaja completa: `urlFor()` devuelve una URL absoluta del CDN de
 * Sanity, así que la preview al compartir por WhatsApp funciona igual.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const novedad = await traerNovedad(slug);

  if (!novedad) {
    return { title: "Novedad no encontrada | DIM Centros de Salud" };
  }

  // 1200×630 es la relación que esperan WhatsApp, Facebook y X. Se la pedimos
  // recortada al CDN en vez de mandar la original y que cada uno recorte distinto.
  const imagenCompartir = urlFor(novedad.portada).width(1200).height(630).fit("crop").url();

  return {
    title: `${novedad.titulo} | Novedades DIM`,
    description: novedad.resumen,
    openGraph: {
      title: novedad.titulo,
      description: novedad.resumen,
      type: "article",
      publishedTime: novedad.fecha,
      images: [
        {
          url: imagenCompartir,
          width: 1200,
          height: 630,
          alt: novedad.portada.alt,
        },
      ],
    },
  };
}

// ─────────────────────────── Página ───────────────────────────

export default async function NovedadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const novedad = await traerNovedad(slug);

  // `dynamicParams = false` ya filtra los slugs que no existían en el build.
  // Esto cubre el hueco entre las dos queries: que el documento se despublique
  // entre `generateStaticParams` y el render de la página.
  if (!novedad) notFound();

  const relacionadas =
    (await sanity.fetch<Novedad[] | null>(
      NOVEDADES_RELACIONADAS_QUERY,
      { slug, categoria: novedad.categoria },
      CACHE_DE_BUILD
    )) ?? [];

  const etiqueta = ETIQUETA_CATEGORIA[novedad.categoria] ?? "Novedades";
  const fecha = mesYAnio(novedad.fecha);

  // La query completa con novedades de otras categorías cuando la propia no
  // alcanza para tres. Anunciarlas como "Más sobre Dermatología" sería mentir,
  // así que el título depende de lo que realmente volvió.
  const todasAfines =
    relacionadas.length > 0 && relacionadas.every((r) => r.categoria === novedad.categoria);
  const tituloRelacionadas = todasAfines ? `Más sobre ${etiqueta}` : "Últimas novedades";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: novedad.titulo,
    description: novedad.resumen,
    image: urlFor(novedad.portada).url(),
    // El día es de desempate, no de publicación: el contenido original sólo
    // tenía mes y año. Ver `lib/fecha.ts`. En pantalla nunca se muestra completo,
    // pero schema.org pide una fecha y omitirla sería peor.
    datePublished: novedad.fecha,
    publisher: {
      "@type": "Organization",
      name: "DIM Centros de Salud",
    },
  };

  return (
    <>
      {/* El título y el resumen son contenido editable: si alguien escribiera
          "</script>" cerraría el tag y el resto se interpretaría como HTML.
          Escapar "<" lo neutraliza sin alterar los valores. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ────────── Hero ────────── */}
      <section className="relative bg-[#103A73] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2440] via-[#103A73] to-[#5636A4]/40" />
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F26A21]/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 pt-10 pb-28 lg:pt-14 lg:pb-36">
          <nav
            className="flex items-center gap-1.5 text-white/60 text-xs mb-10 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link href="/novedades" className="hover:text-white transition-colors">
              Novedades
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/90 line-clamp-1">{novedad.titulo}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90">
              {etiqueta}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#F26A21]">
              <Calendar size={13} strokeWidth={2} aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-widest">{fecha}</span>
            </span>
            {novedad.destacada && (
              <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-white bg-[#F26A21] rounded-full px-2.5 py-1">
                Nuevo
              </span>
            )}
          </div>

          <h1
            className="font-display text-[clamp(32px,4.6vw,60px)] leading-[1.03] tracking-[-0.03em] font-light text-white mb-6"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {novedad.titulo}
          </h1>

          <p className="text-white/80 text-lg font-light leading-relaxed">{novedad.resumen}</p>
        </div>
      </section>

      {/* ────────── Cuerpo ────────── */}
      <section className="bg-[#FBFAF7] pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* La portada se monta sobre el hero: el margen negativo compensa el
              padding extra que el hero reserva abajo. */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#F4EFE7] -mt-20 lg:-mt-24 shadow-[0_16px_48px_rgba(8,24,39,.16)]">
            <Image
              src={urlFor(novedad.portada).url()}
              alt={novedad.portada.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          <article className="space-y-3.5 pt-10 lg:pt-12">
            <CuerpoNovedad cuerpo={novedad.cuerpo} />
          </article>

          {(novedad.cta || novedad.appDownload) && (
            <div className="flex flex-wrap gap-2.5 pt-8">
              {novedad.cta &&
                (esExterno(novedad.cta.href) ? (
                  <a
                    href={novedad.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#103A73] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B2440] transition-colors"
                  >
                    {novedad.cta.label}
                    <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={novedad.cta.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#103A73] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B2440] transition-colors"
                  >
                    {novedad.cta.label}
                    <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden="true" />
                  </Link>
                ))}

              {novedad.appDownload && (
                <AppStoreLink className="inline-flex items-center gap-1.5 rounded-full border border-[#E6EAF1] bg-white px-5 py-2.5 text-sm font-semibold text-[#081827] hover:border-[#F26A21]/50 transition-colors">
                  <Smartphone
                    size={14}
                    strokeWidth={2.25}
                    className="text-[#F26A21]"
                    aria-hidden="true"
                  />
                  Descargar App DIM SALUD
                </AppStoreLink>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ────────── CTA de turnos ────────── */}
      <section className="bg-[#FBFAF7] pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#081827] rounded-3xl p-8 lg:p-10">
            <CtaBackdrop />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end gap-6 sm:justify-between">
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                  Turnos online
                </p>
                <h2
                  className="font-display text-[clamp(24px,3vw,36px)] font-light text-white leading-tight tracking-tight mb-3"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Sacá tu turno
                  <br />
                  <em className="italic text-[#F26A21]">100% online.</em>
                </h2>
                <p className="text-white/60 font-light leading-relaxed max-w-sm">
                  Reservá estudios y consultas desde el Portal de Turnos, sin llamar
                  ni esperar.
                </p>
              </div>

              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-7 py-4 rounded-full text-sm transition-colors"
              >
                Ir al Portal de Turnos
                <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Otras novedades ────────── */}
      {relacionadas.length > 0 && (
        <section className="bg-[#FBFAF7] pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="font-display text-[clamp(24px,3vw,36px)] font-light tracking-[-0.03em] text-[#081827] leading-tight mb-8"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              {tituloRelacionadas}
            </h2>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
              {relacionadas.map((otra) => (
                <li key={otra._id} className="h-full">
                  <Link
                    href={`/novedades/${otra.slug}`}
                    className="group block h-full bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4EFE7]">
                      {/* Decorativa: el título de la tarjeta ya nombra la novedad. */}
                      <Image
                        src={urlFor(otra.portada).url()}
                        alt=""
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/25 to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-[#F26A21] mb-3">
                        <Calendar size={13} strokeWidth={2} aria-hidden="true" />
                        <span className="font-mono text-[11px] uppercase tracking-widest">
                          {mesYAnio(otra.fecha)}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-medium text-[#081827] leading-snug">
                        {otra.titulo}
                      </h3>

                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#5636A4] group-hover:text-[#F26A21] transition-colors">
                        Leer
                        <ChevronRight
                          size={15}
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Fuera del bloque de relacionadas a propósito: la salida hacia el listado
          no puede depender de que la query haya devuelto algo. */}
      <section className="bg-[#FBFAF7] pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="pt-8 border-t border-[#E6EAF1]">
            <Link
              href="/novedades"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#5636A4] hover:text-[#F26A21] transition-colors"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Volver a todas las novedades
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
