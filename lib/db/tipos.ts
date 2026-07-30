import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import type * as schema from "./schema";

// El tipo genérico del que descienden tanto `drizzle-orm/neon-http` como
// `drizzle-orm/pglite`. Gracias a esto, las funciones de lib/auth/ reciben
// `db: Db` y corren igual contra Neon en producción y contra Postgres en
// memoria en los tests, sin mocks ni ramas condicionales.
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;
