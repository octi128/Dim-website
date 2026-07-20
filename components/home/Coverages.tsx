import Link from "next/link";
import { COVERAGES } from "@/lib/coverages";

const featured = [
  { name: "OSDE Binario", detail: "Planes vigentes · 60 días", accent: "#1956A6" },
  { name: "Medifé", detail: "Todos los planes · 60 días", accent: "#103A73" },
  { name: "Swiss Medical", detail: "SMG · Planes Gold y sup. · 60 días", accent: "#B94035" },
  { name: "Galeno", detail: "Planes Red y superiores · 60 días", accent: "#103A73" },
  { name: "Sancor Salud", detail: "Categorías A, B, C y D · 60 días", accent: "#6E8B7B" },
  { name: "AVALIAN", detail: "Todos los planes vigentes · 60 días", accent: "#5636A4" },
];

const total = COVERAGES.length;

export default function Coverages() {
  return (
    <section className="bg-[#FBFAF7] py-20 lg:py-28 border-t border-[#E6EAF1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-12">
          <div>
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Coberturas médicas
            </div>
            <h2
              className="font-display text-[clamp(36px,5vw,60px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              +{total} obras sociales
              <br />y <em className="italic text-[#5636A4]">prepagas.</em>
            </h2>
          </div>
          <div>
            <p className="text-[#4B4F56] font-light mb-4">
              También atendemos particulares con descuentos especiales. Órdenes con validez de 30 a 60 días según tu cobertura.
            </p>
            <Link
              href="/coberturas-medicas"
              className="text-sm font-semibold text-[#F26A21] hover:text-[#C84F12] transition-colors"
            >
              Ver todas las coberturas →
            </Link>
          </div>
        </div>

        {/* Featured coverages — card style like Luvia testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          {featured.map((cov) => (
            <div key={cov.name} className="bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-shadow">
              <div className="h-14 flex items-center justify-center" style={{ backgroundColor: cov.accent }}>
                <span className="text-white font-bold text-lg tracking-tight">{cov.name}</span>
              </div>
              <div className="p-5">
                <p className="text-[#4B4F56] text-sm font-light">{cov.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="bg-[#081827] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">¿No encontrás tu cobertura?</p>
            <p className="text-white/50 text-sm font-light">Consultanos directamente. Cubrimos más de {total} obras sociales y prepagas.</p>
          </div>
          <Link
            href="/coberturas-medicas"
            className="flex-shrink-0 bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors whitespace-nowrap"
          >
            Ver todas las coberturas
          </Link>
        </div>
      </div>
    </section>
  );
}
