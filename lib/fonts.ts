import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// Las fuentes viven acá y no en el layout porque `next/font` deduplica por
// módulo: si dos layouts las instanciaran por separado, Next bajaría dos veces
// el mismo archivo y generaría dos variables CSS distintas.
export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const variablesDeFuentes = `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`;
