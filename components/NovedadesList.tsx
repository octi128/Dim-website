import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { mesYAnio } from "@/lib/fecha";
import type { Novedad } from "@/sanity/lib/queries";

/**
 * La grilla del listado de novedades.
 *
 * Cada tarjeta linkea a la página propia de la novedad. Antes abría un modal con
 * el contenido completo, lo que obligaba a que esto fuera un componente cliente:
 * ahora no hay estado ni efectos, así que se renderiza entero en el servidor y
 * no viaja JS al navegador por las 41 tarjetas.
 */
export default function NovedadesList({ novedades }: { novedades: Novedad[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
      {novedades.map((item) => (
        <Link
          key={item._id}
          href={`/novedades/${item.slug}`}
          className="group text-left bg-white border border-[#E6EAF1] rounded-2xl overflow-hidden flex flex-col h-full hover:border-[#F26A21]/40 hover:shadow-[0_8px_32px_rgba(8,24,39,.06)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7]"
        >
          {/* Foto de portada */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4EFE7]">
            {/* Decorativa: la portada es una foto genérica de la categoría,
                compartida por varias novedades. El título de la tarjeta es el
                que nombra el contenido, y el alt acá sólo alargaría el nombre
                accesible del link. En la página de la novedad, donde la imagen
                se presenta sola y a tamaño grande, sí se usa el alt de Sanity. */}
            <Image
              src={urlFor(item.portada).url()}
              alt=""
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/25 to-transparent" />
            {item.destacada && (
              <span className="absolute left-3 top-3 font-mono text-[9px] font-semibold uppercase tracking-widest text-white bg-[#F26A21] rounded-full px-2.5 py-1 shadow-sm">
                Nuevo
              </span>
            )}
          </div>

          {/* Contenido */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-1.5 text-[#F26A21] mb-3">
              <Calendar size={13} strokeWidth={2} aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-widest">
                {mesYAnio(item.fecha)}
              </span>
            </div>

            <h3 className="font-display text-lg font-medium text-[#081827] leading-snug">
              {item.titulo}
            </h3>

            <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#5636A4] group-hover:text-[#F26A21] transition-colors">
              Ver más
              <ChevronRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
