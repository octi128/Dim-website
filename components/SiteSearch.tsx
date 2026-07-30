"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight, CornerDownLeft } from "lucide-react";
import type { SearchGroup, SearchResult } from "@/lib/search";

/** Tipo del módulo que se carga en diferido. */
type SearchModule = typeof import("@/lib/search");

/**
 * El índice arrastra los cinco archivos de datos del sitio. Como el Header vive
 * en el layout, importarlo de forma estática lo sumaría al bundle de TODAS las
 * páginas; con `import()` sólo lo paga quien abre el buscador.
 */
let modulePromise: Promise<SearchModule> | null = null;
function loadSearch(): Promise<SearchModule> {
  modulePromise ??= import("@/lib/search");
  return modulePromise;
}

/**
 * Espera antes de buscar. Corto porque la búsqueda es local (sin red) y lo único
 * que se evita es recorrer 700 entradas en cada tecla.
 */
const DEBOUNCE_MS = 120;

interface Props {
  /**
   * `overlay`: panel flotante del navbar de escritorio, con su propio input.
   * `inline`: dentro del menú mobile, los resultados se apilan debajo.
   */
  variant: "overlay" | "inline";
  /** Se llama al elegir un resultado, para que el contenedor se cierre. */
  onNavigate?: () => void;
  autoFocus?: boolean;
}

export default function SiteSearch({ variant, onNavigate, autoFocus }: Props) {
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<SearchGroup[]>([]);
  const [active, setActive] = useState(-1);
  const [ready, setReady] = useState(false);
  const searchRef = useRef<SearchModule | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listId = useId();

  // Se precarga al montar y no al primer tecleo: para cuando la primera letra
  // llega el índice ya está listo y no se ve un salto de "sin resultados".
  useEffect(() => {
    let alive = true;
    loadSearch().then((mod) => {
      if (!alive) return;
      searchRef.current = mod;
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Una sola lista plana con todos los resultados visibles: es sobre esto que se
  // mueven las flechas, cruzando los grupos como si fueran uno.
  const flat: SearchResult[] = groups.flatMap((g) => g.results);

  useEffect(() => {
    const mod = searchRef.current;
    if (!mod) return;
    const q = query;
    const t = setTimeout(() => {
      setGroups(mod.searchSite(q, mod.PREVIEW_PER_GROUP));
      setActive(-1);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query, ready]);

  const goToResultsPage = useCallback(() => {
    const q = query.trim();
    if (!q) return;
    onNavigate?.();
    router.push(`/buscar?q=${encodeURIComponent(q)}`);
  }, [query, onNavigate, router]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (flat.length === 0) return;
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      // Da la vuelta pasando por -1, que es "ninguno seleccionado": así se
      // vuelve a la caja de texto sin tener que borrar la selección a mano.
      setActive((i) => {
        const next = i + step;
        if (next >= flat.length) return -1;
        if (next < -1) return flat.length - 1;
        return next;
      });
      return;
    }

    if (e.key === "Enter") {
      const hit = active >= 0 ? flat[active] : null;
      if (hit) {
        e.preventDefault();
        onNavigate?.();
        if (hit.external) window.open(hit.href, "_blank", "noopener,noreferrer");
        else router.push(hit.href);
        return;
      }
      e.preventDefault();
      goToResultsPage();
      return;
    }

    if (e.key === "Escape" && query) {
      // Primer Escape limpia; el segundo ya no encuentra texto y sube al
      // contenedor, que es el que cierra el panel.
      e.stopPropagation();
      setQuery("");
    }
  }

  const showEmpty = query.trim().length >= 2 && groups.length === 0;
  const isOverlay = variant === "overlay";

  return (
    <div className={isOverlay ? "" : "mb-4"}>
      {/* ── Caja de texto ── */}
      <div
        className={`flex items-center gap-2 bg-white border rounded-full px-4 ${
          isOverlay ? "py-3 border-[#E6EAF1]" : "py-2.5 border-[#E6EAF1]"
        } focus-within:border-[#F26A21] transition-colors`}
      >
        <Search size={isOverlay ? 16 : 14} className="text-[#737985] shrink-0" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={flat.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          aria-label="Buscar en el sitio"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar especialidad, estudio o cobertura…"
          className="bg-transparent text-sm text-[#081827] outline-none flex-1 min-w-0 placeholder-[#737985]"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Limpiar búsqueda"
            className="text-[#737985] hover:text-[#081827] transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Resultados ── */}
      {(flat.length > 0 || showEmpty) && (
        <div
          className={
            isOverlay
              ? "mt-3 max-h-[min(60vh,520px)] overflow-y-auto overscroll-contain"
              : "mt-3"
          }
        >
          {showEmpty ? (
            <p className="text-sm text-[#737985] px-2 py-4">
              No encontramos nada para <span className="text-[#081827]">“{query.trim()}”</span>.
              Probá con otro término o{" "}
              <Link
                href="/contacto"
                onClick={onNavigate}
                className="text-[#F26A21] hover:underline font-medium"
              >
                escribinos
              </Link>
              .
            </p>
          ) : (
            <>
              {/* Se arma con div/role y no con ul/li: un listbox sólo admite
                  option o group como hijos, y los <li> de encabezado de grupo
                  romperían ese contrato. */}
              <div id={listId} role="listbox" aria-label="Resultados de búsqueda">
                {groups.map((group) => (
                  <div key={group.type} role="group" aria-labelledby={`${listId}-g-${group.type}`}>
                    <p
                      id={`${listId}-g-${group.type}`}
                      className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#737985] px-2 pt-3 pb-1.5"
                    >
                      {group.type}
                    </p>
                    {group.results.map((r) => {
                      // El índice global es el que usan las flechas, así que se
                      // busca sobre la lista plana y no sobre el grupo.
                      const i = flat.indexOf(r);
                      return (
                        <Link
                          key={`${r.type}-${r.href}-${r.title}`}
                          id={`${listId}-${i}`}
                          role="option"
                          aria-selected={i === active}
                          href={r.href}
                          target={r.external ? "_blank" : undefined}
                          rel={r.external ? "noopener noreferrer" : undefined}
                          onClick={onNavigate}
                          onMouseEnter={() => setActive(i)}
                          className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-colors ${
                            i === active ? "bg-[#F4EFE7]" : "hover:bg-[#F4EFE7]"
                          }`}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm text-[#081827] truncate">
                              {r.title}
                            </span>
                            {r.subtitle && (
                              <span className="block text-xs text-[#737985] truncate">
                                {r.subtitle}
                              </span>
                            )}
                          </span>
                          {r.external && (
                            <ArrowUpRight size={13} className="text-[#737985] shrink-0" aria-hidden />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={goToResultsPage}
                className="mt-2 w-full flex items-center justify-center gap-2 text-xs font-medium text-[#103A73] hover:text-[#F26A21] border-t border-[#E6EAF1] pt-3 pb-1 transition-colors"
              >
                Ver todos los resultados
                <CornerDownLeft size={12} aria-hidden />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
