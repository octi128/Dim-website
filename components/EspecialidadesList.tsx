"use client";

import { useState, useMemo } from "react";
import {
  Search,
  X,
  Stethoscope,
  Flower2,
  Dna,
  Mars,
  Heart,
  HeartPulse,
  Brain,
  Scissors,
  Scan,
  GitBranch,
  Sparkles,
  Venus,
  CircleDot,
  Gem,
  Dumbbell,
  Layers,
  Syringe,
  Zap,
  Atom,
  Spline,
  Radiation,
  Droplets,
  Salad,
  Scale,
  BrainCircuit,
  BrainCog,
  Droplet,
  Activity,
  Flame,
  Slice,
  Ribbon,
  Moon,
  Bean,
  HeartHandshake,
  Wind,
  Eye,
  Users,
  Bone,
  ScanLine,
  Apple,
  Footprints,
  Baby,
  ShieldPlus,
  Blocks,
  Ear,
  Bug,
  PersonStanding,
  Bandage,
  Leaf,
  Carrot,
  VenusAndMars,
  type LucideIcon,
} from "lucide-react";
import { SPECIALTIES, normalize } from "@/lib/specialties";

/** Ícono distintivo por especialidad. Fallback: Stethoscope. */
const ICON_MAP: Record<string, LucideIcon> = {
  "Clínica médica": Stethoscope,
  Alergia: Flower2,
  "Medicina Genética": Dna,
  "Andrología e Infertilidad": Mars,
  Cardiología: Heart,
  "Insuficiencia cardíaca": HeartPulse,
  Cefalea: Brain,
  "Cirugía General": Scissors,
  "Cirugía Cabeza y Cuello": Scan,
  "Cirugía Vascular": GitBranch,
  "Cirugía Plástica": Sparkles,
  Ginecología: Venus,
  Proctología: CircleDot,
  Cosmiatría: Gem,
  Deportología: Dumbbell,
  Dermatología: Layers,
  Diabetología: Syringe,
  Electrofisiología: Zap,
  Endocrinología: Atom,
  Flebología: Spline,
  Oncología: Radiation,
  "Esteatosis Hepática": Droplets,
  Gastroenterología: Salad,
  "Síndrome metabólico - Obesidad": Scale,
  Neurología: BrainCircuit,
  Memoria: BrainCog,
  Hematología: Droplet,
  Hepatología: Activity,
  "Hígado Graso": Flame,
  "Hipertensión Arterial": Activity,
  Neurocirugía: Slice,
  Mastología: Ribbon,
  "Medicina del Sueño": Moon,
  Nefrología: Bean,
  Psicología: HeartHandshake,
  Neumonología: Wind,
  Oftalmología: Eye,
  "Medicina Familiar": Users,
  Reumatología: Bone,
  Osteoporosis: ScanLine,
  Nutrición: Apple,
  Podología: Footprints,
  Obstetricia: Baby,
  "Obstetricia de Alto Riesgo": ShieldPlus,
  Pediatría: Blocks,
  Urología: Droplet,
  Otorrinolaringología: Ear,
  Infectología: Bug,
  Gerontología: PersonStanding,
  "Cirugía torácica": Scissors,
  "Páncreas - Vías Biliares": GitBranch,
  "Cirugía de tobillo y pie": Footprints,
  "Cirugía oftalmológica": Eye,
  "Traumatología de cadera": Bone,
  "Traumatología de hombro": Bone,
  "Traumatología de rodilla": Bone,
  "Traumatología de columna": Bone,
  "Tratamiento del dolor": Bandage,
  "Traumatología miembros superiores": Bone,
  "Traumatología miembros inferiores": Bone,
  "Cirugía maxilofacial": Scan,
  "Cirugía plástica genital": Sparkles,
  "Control de marcapasos": HeartPulse,
  "Nutrición alimentación vegetariana y vegana": Leaf,
  "Nutrición especialista en embarazo": Baby,
  "Nutrición y diabetes": Carrot,
  Sexología: VenusAndMars,
  "Sobrepeso y obesidad": Scale,
};

export default function EspecialidadesList() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return SPECIALTIES;
    return SPECIALTIES.filter(
      (s) => normalize(s.name).includes(q) || (s.alias && normalize(s.alias).includes(q))
    );
  }, [query]);

  return (
    <div>
      {/* ── Search ── */}
      <div className="bg-white border border-[#E6EAF1] rounded-2xl p-5 mb-8 shadow-sm">
        <label
          htmlFor="specialty-search"
          className="block text-sm font-medium text-[#4B4F56] mb-3"
        >
          Escribí el nombre de la especialidad:
        </label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737985] pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="specialty-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Cardiología, Dermatología, Traumatología…"
            aria-label="Buscar especialidad médica"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E6EAF1] bg-[#FBFAF7] text-[#081827] placeholder:text-[#737985] text-sm focus:outline-none focus:ring-2 focus:ring-[#1956A6]/30 focus:border-[#1956A6] transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737985] hover:text-[#081827] transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* ── Results header ── */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[#737985]">
          {filtered.length === SPECIALTIES.length ? (
            <span>
              Mostrando{" "}
              <strong className="text-[#081827]">{SPECIALTIES.length}</strong>{" "}
              especialidades
            </span>
          ) : (
            <span>
              <strong className="text-[#081827]">{filtered.length}</strong> de{" "}
              {SPECIALTIES.length} especialidades
            </span>
          )}
        </p>
        {query.trim() && (
          <button
            onClick={() => setQuery("")}
            className="text-xs text-[#F26A21] hover:text-[#C84F12] font-medium flex items-center gap-1 transition-colors"
          >
            <X size={12} /> Limpiar
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((s) => {
            const Icon = ICON_MAP[s.name] ?? Stethoscope;
            return (
              <div
                key={s.name}
                className="bg-white border border-[#E6EAF1] rounded-xl p-4 flex items-center gap-3.5 hover:shadow-[0_6px_24px_rgba(8,24,39,.08)] hover:border-[#F26A21]/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-[#FFF3EC] to-[#F4EFE7] rounded-xl flex items-center justify-center group-hover:from-[#F26A21] group-hover:to-[#C84F12] transition-colors duration-200">
                  <Icon
                    size={18}
                    className="text-[#F26A21] group-hover:text-white transition-colors duration-200"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[#081827] text-sm font-medium leading-snug group-hover:text-[#103A73] transition-colors">
                  {s.name}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#4B4F56] font-medium mb-1">No encontramos esa especialidad</p>
          <p className="text-[#737985] text-sm mb-4">
            Probá con otro nombre o{" "}
            <button
              onClick={() => setQuery("")}
              className="text-[#F26A21] hover:underline font-medium"
            >
              limpiá la búsqueda
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
