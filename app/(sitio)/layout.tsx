import Header from "@/components/Header";
import Footer from "@/components/Footer";

// `(sitio)` no aparece en la URL: es sólo la manera de decir "todo esto lleva
// Header y Footer". El panel vive afuera del grupo y queda limpio.
export default function LayoutSitio({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
