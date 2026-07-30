"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

/**
 * Caja de búsqueda del hero de /buscar. A diferencia de `SiteSearch` no muestra
 * resultados instantáneos: la página entera ya es la lista de resultados, y un
 * panel flotante encima taparía justamente lo que se vino a leer.
 */
export default function BuscarInput({ defaultValue = "" }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/buscar?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search
        size={18}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#737985] pointer-events-none"
        aria-hidden
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ej: Cardiología, resonancia, urocultivo, OSDE…"
        aria-label="Buscar en el sitio"
        className="w-full pl-12 pr-28 py-4 rounded-full bg-white text-[#081827] placeholder-[#737985] text-sm outline-none focus:ring-2 focus:ring-white/60 transition"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F26A21] hover:bg-[#C84F12] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}
