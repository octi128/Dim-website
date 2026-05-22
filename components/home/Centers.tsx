import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

const centers = [
  { name: "DIM Alta Complejidad", address: "Espora 18, Ramos Mejía", hours: "Lun–Vie 7–21h · Sáb 7–19h · Dom 8–17:30h", badge: "Principal" },
  { name: "DIM Rivadavia", address: "Av. Rivadavia 14252, Ramos Mejía", hours: "Lun–Vie 24hs · Sáb–Dom 7–18:30h", badge: "24 hs" },
  { name: "DIM Mujer", address: "Av. Rivadavia 14282, Ramos Mejía", hours: "Lun–Vie 7:30–20h · Sáb 7:30–17h", badge: "Salud femenina" },
  { name: "DIM Odontología", address: "Av. Rivadavia 14230, Ramos Mejía", hours: "Consultar horarios", badge: "Premium" },
  { name: "DIM Sede Central", address: "Belgrano 134, Ramos Mejía", hours: "Consultar horarios", badge: "" },
  { name: "DIM Once", address: "Av. Rivadavia 2198, Once, CABA", hours: "WhatsApp: 15-6205-0330", badge: "CABA" },
];

export default function Centers() {
  return (
    <section className="bg-[#FBFAF7] py-20 lg:py-28 border-t border-[#E6EAF1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
              Nuestros centros
            </div>
            <h2
              className="font-display text-[clamp(36px,5vw,60px)] font-light tracking-[-0.03em] text-[#081827] leading-tight"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Estamos <em className="italic text-[#5636A4]">cerca tuyo.</em>
            </h2>
          </div>
          <Link
            href="/nuestros-centros-y-horarios"
            className="text-sm font-medium text-[#4B4F56] hover:text-[#F26A21] transition-colors flex-shrink-0"
          >
            Ver todos los centros →
          </Link>
        </div>

        {/* Centers grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {centers.map((center) => (
            <div
              key={center.name}
              className="bg-white border border-[#E6EAF1] rounded-2xl p-5 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] hover:border-[#F26A21]/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <p className="font-semibold text-[#081827] text-sm">{center.name}</p>
                {center.badge && (
                  <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F4EFE7] text-[#4B4F56] border border-[#E6EAF1]">
                    {center.badge}
                  </span>
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2 text-xs text-[#737985]">
                  <MapPin size={11} className="text-[#F26A21] mt-0.5 flex-shrink-0" />
                  <span>{center.address}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#737985]">
                  <Clock size={11} className="text-[#F26A21] mt-0.5 flex-shrink-0" />
                  <span>{center.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/nuestros-centros-y-horarios"
            className="flex items-center justify-center bg-white border border-[#E6EAF1] hover:border-[#F26A21]/40 text-[#081827] font-semibold px-6 py-3 rounded-full text-sm transition-all"
          >
            Todos los centros y horarios
          </Link>
          <Link
            href="https://portal.dim.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-[#F26A21] hover:bg-[#C84F12] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Sacar un turno ahora
          </Link>
        </div>
      </div>
    </section>
  );
}
