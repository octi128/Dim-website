import Link from "next/link";
import { AVAILABLE_LETTERS } from "@/lib/diseases";
import DiseaseSearchBar from "@/components/DiseaseSearchBar";

const ROW1 = AVAILABLE_LETTERS.slice(0, 11); // A–L
const ROW2 = AVAILABLE_LETTERS.slice(11);    // M–Z

export default function DiseaseSearch() {
  return (
    <section id="enfermedades" className="bg-white border-b border-[#E6EAF1] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Left: alphabet navigation */}
          <div>
            <p className="text-sm font-semibold text-[#081827] mb-5 leading-snug">
              Encontrar enfermedades y afecciones según la letra con la que empiezan
            </p>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {ROW1.map(letter => (
                  <Link
                    key={letter}
                    href={`/enfermedades/${letter.toLowerCase()}`}
                    className="w-10 h-10 rounded-full border-2 border-[#103A73] flex items-center justify-center text-[#103A73] font-semibold text-sm hover:bg-[#103A73] hover:text-white transition-colors duration-200"
                  >
                    {letter}
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {ROW2.map(letter => (
                  <Link
                    key={letter}
                    href={`/enfermedades/${letter.toLowerCase()}`}
                    className="w-10 h-10 rounded-full border-2 border-[#103A73] flex items-center justify-center text-[#103A73] font-semibold text-sm hover:bg-[#103A73] hover:text-white transition-colors duration-200"
                  >
                    {letter}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: text search */}
          <div>
            <p className="text-sm font-semibold text-[#081827] mb-3">
              Buscar enfermedades y afecciones
            </p>
            <DiseaseSearchBar />
          </div>

        </div>
      </div>
    </section>
  );
}
