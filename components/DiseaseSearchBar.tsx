"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface Props {
  defaultValue?: string;
  variant?: "default" | "hero";
}

export default function DiseaseSearchBar({ defaultValue = "", variant = "default" }: Props) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/enfermedades/buscar?q=${encodeURIComponent(q)}`);
  }

  const isHero = variant === "hero";

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737985] pointer-events-none"
      />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar"
        className={[
          "w-full pl-10 pr-4 py-3 rounded-full text-sm outline-none transition-all",
          "placeholder:text-[#737985] text-[#081827] bg-white",
          isHero
            ? "border border-white/80 shadow-sm focus:ring-2 focus:ring-white/40"
            : "border border-[#D8DEE8] focus:ring-2 focus:ring-[#103A73]/20 focus:border-[#103A73]",
        ].join(" ")}
      />
    </form>
  );
}
