import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sin esto, Turbopack deduce la raíz del workspace buscando lockfiles hacia
  // arriba y se queda con el más externo. Trabajando en un worktree de git
  // (que vive dentro del repo principal) eso da una raíz distinta de la del
  // proyecto: el worker de PostCSS termina resolviendo módulos contra el árbol
  // equivocado y falla al cargar el binario nativo de lightningcss.
  // La carpeta de este archivo siempre es la raíz correcta, acá y en Vercel.
  // Va con fileURLToPath y no con `new URL(...).pathname`: ese devuelve la ruta
  // percent-encoded y se rompe con espacios o acentos, que los hay en este repo.
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dim.com.ar",
        pathname: "/**",
      },
      {
        // Las imágenes que se cargan desde el Studio se sirven desde acá.
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
