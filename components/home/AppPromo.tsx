import { Smartphone, CalendarDays, FileText, Pill, Bell, type LucideIcon } from "lucide-react";

const features: { Icon: LucideIcon; label: string }[] = [
  { Icon: CalendarDays, label: "Turnos online" },
  { Icon: FileText, label: "Resultados" },
  { Icon: Pill, label: "Recetas digitales" },
  { Icon: Bell, label: "Recordatorios" },
];

export default function AppPromo() {
  return (
    <section className="bg-[#F4EFE7] py-14 border-y border-[#E6EAF1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E6EAF1] p-8 lg:p-10 grid md:grid-cols-3 gap-8 items-center">
          {/* Left */}
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 border border-[#E6EAF1] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-4">
              <Smartphone size={13} className="text-[#F26A21]" strokeWidth={2} />
              App DIM Salud
            </div>
            <h3
              className="font-display text-3xl lg:text-4xl font-light text-[#081827] leading-tight tracking-[-0.02em] mb-3"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Tu salud en la palma
              <br />de tu <em className="italic text-[#5636A4]">mano.</em>
            </h3>
            <p className="text-[#4B4F56] font-light text-sm mb-5 max-w-sm">
              Pedí turnos, mirá resultados, accedé a tus recetas y mucho más. Sin filas, sin esperas.
            </p>
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <span
                  key={f.label}
                  className="inline-flex items-center gap-1.5 bg-[#FBFAF7] border border-[#E6EAF1] rounded-full px-3 py-1.5 text-xs font-medium text-[#4B4F56]"
                >
                  <f.Icon size={12} className="text-[#F26A21]" strokeWidth={2} />
                  {f.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: download buttons */}
          <div className="flex flex-col gap-3">
            <a
              href="https://apps.apple.com/ar/app/dim-salud-turnos-y-resultados/id1627335644"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#081827] hover:bg-[#103A73] text-white rounded-xl px-5 py-3.5 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <div className="text-white/50 text-[10px] leading-none">Descargá en el</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=ar.com.dim.portalturnos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#081827] hover:bg-[#103A73] text-white rounded-xl px-5 py-3.5 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" aria-hidden>
                <path d="M3 2 L14 12 L3 22 Z" fill="#00C3FF" />
                <path d="M3 2 L18 8.5 L14 12 Z" fill="#FF3D47" />
                <path d="M3 22 L18 15.5 L14 12 Z" fill="#00E676" />
                <path d="M14 12 L18 8.5 L21 12 L18 15.5 Z" fill="#FFD500" />
              </svg>
              <div>
                <div className="text-white/50 text-[10px] leading-none">Disponible en</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
