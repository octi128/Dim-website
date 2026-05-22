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
              href="https://apps.apple.com"
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
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#081827] hover:bg-[#103A73] text-white rounded-xl px-5 py-3.5 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0" aria-hidden>
                <path d="M3.18 23.76c.3.17.64.24.99.2l12.49-7.17-2.66-2.66-10.82 9.63zm15.28-9.1L5.37 7.26 3.18.24C2.84.05 2.4.12 2.1.4L14.63 12 18.46 14.66zM21.4 10.6l-3.08-1.77-3.08 1.77.01 4.17 3.07 1.77 3.08-1.77-.01-4.17zm-18.22-.36C3 10.42 3 10.62 3 10.83v2.34c0 .21 0 .41.18.59l11.45-3.76-11.45-3.76z" />
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
