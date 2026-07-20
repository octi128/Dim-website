import Image from "next/image";

interface CtaBackdropProps {
  /** Tailwind gradient overlay clases. Ajustar según el color base del CTA. */
  overlay?: string;
  /** Opacidad de la foto (0-100). */
  opacity?: string;
}

/**
 * Foto ambiente desvanecida para el fondo de los CTA finales.
 * Se coloca dentro de un contenedor `relative overflow-hidden`;
 * el contenido del CTA debe ir con `relative z-10`.
 */
export default function CtaBackdrop({
  overlay = "bg-gradient-to-r from-[#081827] via-[#081827]/60 to-transparent",
  opacity = "opacity-100",
}: CtaBackdropProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Image
        src="/cta-ambient.jpg"
        alt=""
        fill
        sizes="100vw"
        className={`object-cover ${opacity}`}
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
