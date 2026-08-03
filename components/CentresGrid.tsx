"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { CENTRES, type Centre, type Zone } from "@/lib/centres";

const ZONES: Zone[] = ["Todos", "Ramos Mejía", "Morón", "Buenos Aires"];

const ZONE_COUNTS: Record<Zone, number> = {
  Todos: CENTRES.length,
  "Ramos Mejía": CENTRES.filter((c) => c.zone === "Ramos Mejía").length,
  Morón: CENTRES.filter((c) => c.zone === "Morón").length,
  "Buenos Aires": CENTRES.filter((c) => c.zone === "Buenos Aires").length,
};

const ZONE_COLORS: Record<Zone, string> = {
  Todos: "#F26A21",
  "Ramos Mejía": "#103A73",
  Morón: "#5636A4",
  "Buenos Aires": "#1956A6",
};

export default function CentresGrid() {
  const [activeZone, setActiveZone] = useState<Zone>("Todos");

  const filtered =
    activeZone === "Todos" ? CENTRES : CENTRES.filter((c) => c.zone === activeZone);

  return (
    <section id="centros" className="bg-[#FBFAF7] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section heading */}
        <div className="mb-10 lg:mb-12">
          <div className="inline-flex items-center border border-[#E6EAF1] bg-white px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4B4F56] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21] mr-2" aria-hidden="true" />
            Red de centros
          </div>
          <h2
            className="font-display text-3xl lg:text-[44px] font-light text-[#081827] tracking-[-0.02em] leading-tight mb-3"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Encontrá tu sede{" "}
            <em className="italic text-[#5636A4]">más cercana.</em>
          </h2>
          <p className="text-[#4B4F56] font-light text-base lg:text-lg leading-relaxed max-w-2xl">
            Filtrá por zona para encontrar el centro que mejor se adapta a tu ubicación.
          </p>
        </div>

        {/* Zone filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filtrar por zona">
          {ZONES.map((zone) => {
            const active = activeZone === zone;
            return (
              <button
                key={zone}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveZone(zone)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#081827] text-white shadow-sm"
                    : "bg-white border border-[#E6EAF1] text-[#4B4F56] hover:border-[#D8DEE8] hover:text-[#081827]"
                }`}
              >
                {zone}
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                    active ? "bg-white/15 text-white" : "bg-[#F4EFE7] text-[#F26A21]"
                  }`}
                >
                  {ZONE_COUNTS[zone]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5"
          role="tabpanel"
          aria-label={`Centros en ${activeZone}`}
        >
          {filtered.map((centre) => (
            <CentreCard key={centre.name} centre={centre} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ZONE_GRADIENTS: Record<Zone, string> = {
  Todos: "from-[#103A73] to-[#1956A6]",
  "Ramos Mejía": "from-[#103A73] to-[#1956A6]",
  Morón: "from-[#5636A4] to-[#103A73]",
  "Buenos Aires": "from-[#1956A6] to-[#5636A4]",
};

function CentreCard({ centre }: { centre: Centre }) {
  const zoneColor = ZONE_COLORS[centre.zone];

  return (
    <article className="bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden hover:border-[#D8DEE8] hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200 flex flex-col group">
      {/* Photo or gradient banner */}
      <div className="relative h-44 overflow-hidden">
        {centre.image ? (
          <Image
            src={centre.image}
            alt={`Fachada ${centre.name}`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${ZONE_GRADIENTS[centre.zone]} flex items-end p-5`}
          >
            <span
              className="font-display text-white/20 text-5xl font-light leading-none select-none"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              aria-hidden="true"
            >
              DIM
            </span>
          </div>
        )}
        {/* Subtle bottom fade for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
        {/* Zone badge overlaid on image */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{ color: "#fff", background: `${zoneColor}cc` }}
          >
            {centre.zone}
          </span>
        </div>
        {centre.featured && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F26A21] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
              Sede principal
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Name */}
        <h3
          className="font-display text-xl font-medium text-[#081827] leading-snug tracking-[-0.02em] mb-1"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          {centre.name}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-2 mb-5 mt-1">
          <MapPin
            size={13}
            className="text-[#F26A21] mt-0.5 flex-shrink-0"
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="text-[#737985] text-sm font-light">{centre.address}</span>
        </div>

        {/* Hours */}
        <div className="bg-[#F4EFE7]/60 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-1.5 mb-3">
            <Clock size={12} className="text-[#F26A21]" strokeWidth={2} aria-hidden="true" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#4B4F56] font-medium">
              Horarios
            </span>
          </div>
          <dl className="space-y-1.5">
            <div className="flex justify-between gap-4">
              <dt className="text-xs text-[#737985] font-light whitespace-nowrap">Lun – Vie</dt>
              <dd className="text-xs text-[#081827] font-medium font-mono text-right">{centre.hours.weekday}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-xs text-[#737985] font-light whitespace-nowrap">Sábado</dt>
              <dd className="text-xs text-[#081827] font-medium font-mono text-right">{centre.hours.saturday}</dd>
            </div>
            {centre.hours.sunday && (
              <div className="flex justify-between gap-4">
                <dt className="text-xs text-[#737985] font-light whitespace-nowrap">Dom / Fer.</dt>
                <dd className="text-xs text-[#081827] font-medium font-mono text-right">{centre.hours.sunday}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {centre.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-[#4B4F56] bg-[#F0F3F7] px-2.5 py-1 rounded-full font-light"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cómo llegar CTA */}
        <div className="mt-auto">
          <a
            href={centre.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 w-full justify-center border border-[#E6EAF1] hover:border-[#F26A21]/50 hover:bg-[#FFF5EF] text-[#4B4F56] hover:text-[#F26A21] font-medium text-sm py-2.5 rounded-xl transition-all duration-200"
            aria-label={`Cómo llegar a ${centre.name} — abre Google Maps`}
          >
            <MapPin size={14} strokeWidth={2} aria-hidden="true" />
            Cómo llegar
            <ExternalLink size={12} strokeWidth={2} className="opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
