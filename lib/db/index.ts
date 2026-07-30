import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import type { Db } from "./tipos";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error(
    "Falta DATABASE_URL. Copiá el connection string de Neon a .env.local (mirá .env.example)."
  );
}

// neon-http habla con Neon por HTTP, sin sockets: es lo que corresponde en
// funciones serverless, donde no hay dónde sostener un pool de conexiones.
export const db: Db = drizzle(url, { schema });
