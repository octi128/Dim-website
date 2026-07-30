import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Igual que en next.config.ts: fileURLToPath y no `new URL(...).pathname`,
// porque el checkout principal tiene espacios y acentos en la ruta y `.pathname`
// devuelve la versión percent-encoded.
const raiz = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts", "test/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": raiz,
    },
  },
});
