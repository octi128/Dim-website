import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { CONFIGURACION_QUERY, type Configuracion } from "@/sanity/lib/queries";

// `(sitio)` no aparece en la URL: es sólo la manera de decir "todo esto lleva
// Header y Footer". El panel vive afuera del grupo y queda limpio.
//
// Acá también se resuelven los datos de contacto que vienen de Sanity. Va en el
// layout y no en el Footer por dos razones: es el único lugar que lo renderiza,
// y el Header —que es un componente cliente y no puede consultar nada— va a
// necesitar `portalUrl` de la misma consulta.
export default async function LayoutSitio({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // `revalidate: false` deja el fetch cacheado para siempre: se resuelve una
  // vez durante el build y queda horneado en el HTML, así las rutas públicas
  // siguen siendo estáticas. Sin esto, el default de Next es no cachear y las
  // 24 rutas pasarían a dinámicas.
  //
  // `useCdn: false` sólo para esta llamada: en build conviene pegarle a la API
  // y no al CDN, que puede tardar en propagar un cambio recién publicado.
  const configuracion = await client
    .withConfig({ useCdn: false })
    .fetch<Configuracion | null>(
      CONFIGURACION_QUERY,
      {},
      { next: { revalidate: false } }
    );

  if (!configuracion) {
    throw new Error(
      'Falta el documento "Configuración del sitio" en Sanity: el sitio no puede ' +
        "construirse sin los datos de contacto. Entrá al Studio en /studio, abrí " +
        '"Configuración del sitio" en el menú lateral, completá WhatsApp, teléfono, ' +
        "email, portal y redes, y publicá el documento."
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer configuracion={configuracion} />
    </>
  );
}
