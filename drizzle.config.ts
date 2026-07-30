import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit corre fuera de Next, así que no hereda la carga automática de
// `.env.local`. Hay que pedirla a mano o `DATABASE_URL` llega vacía.
config({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // `generate` no se conecta a nada; sólo `migrate` y `studio` usan esto.
    url: process.env.DATABASE_URL ?? "",
  },
});
