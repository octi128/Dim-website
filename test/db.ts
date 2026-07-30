import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "@/lib/db/schema";
import type { Db } from "@/lib/db/tipos";

// Una base nueva y vacía por test. PGlite sin argumentos arranca en memoria,
// así que no deja archivos y no hay estado compartido entre tests. Aplica las
// mismas migraciones que producción: si una migración está mal, los tests se
// enteran antes que Neon.
export async function dbDePrueba(): Promise<Db> {
  const cliente = new PGlite();
  const db = drizzle(cliente, { schema });
  await migrate(db, { migrationsFolder: "./drizzle" });
  return db;
}
