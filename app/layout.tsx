import type { Metadata } from "next";
import "./globals.css";
import { variablesDeFuentes } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "DIM Centros de Salud — Todos tus estudios y médicos en un solo lugar",
  description:
    "Líderes en imágenes médicas, consultas y laboratorios en Zona Oeste del Gran Buenos Aires. 750+ profesionales, 350+ especialidades y 90+ coberturas.",
};

// Este layout es el mínimo común entre el sitio público y el panel: html, body,
// fuentes y estilos globales. El Header y el Footer bajaron a `(sitio)`, que es
// el único lugar donde corresponden. El panel se cuelga de `app/admin`, fuera
// de ese grupo, y por eso no los hereda.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${variablesDeFuentes} h-full`}>
      <body className="min-h-full flex flex-col bg-[#FBFAF7] text-[#081827]">
        {children}
      </body>
    </html>
  );
}
