# Panel admin DIM — Base de datos y login (etapas 1 y 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que una persona autorizada pueda entrar a `dim.com.ar/admin/login`, autenticarse contra Postgres y llegar a un panel vacío pero protegido.

**Architecture:** Se separa el sitio público del panel con un route group `app/(sitio)/`, de modo que `/admin` no herede el Header ni el Footer y las 21 rutas públicas sigan prerenderizándose estáticas. Los datos viven en Neon Postgres, accedidos con Drizzle ORM; toda la capa de auth recibe la conexión por parámetro (`db: Db`) para poder testearla contra pglite en memoria sin tocar la base real. Las sesiones son tokens opacos de 32 bytes guardados en una cookie `httpOnly`; en la base sólo queda el SHA-256 del token. El login es un Server Action con validación Zod, bcrypt y freno por intentos fallidos.

**Tech Stack:** Next.js 16.2.6 (App Router, Turbopack), React 19.2.4, TypeScript 5, Tailwind CSS 4, Drizzle ORM 0.45.2 + drizzle-kit 0.31.10, @neondatabase/serverless 1.1.0, bcryptjs 3.0.3, zod 4.4.3, Vitest 4.1.10 + @electric-sql/pglite 0.5.4, tsx 4.23.1, dotenv 17.4.2.

## Global Constraints

- **Todo el texto es en español rioplatense**, con voseo y sentence case: comentarios de código, mensajes de commit, copy de la interfaz y mensajes de error. Nada de "tú" ni de Title Case.
- **Las rutas públicas tienen que seguir siendo estáticas.** `npm run build` debe seguir marcando `○ (Static)` en `/`, `/especialidades-medicas`, `/coberturas-medicas`, `/novedades`, `/nuestros-centros-y-horarios`, `/estudios-medicos-y-preparaciones` y `/estudios-y-preparaciones-de-laboratorio`. Si alguna pasa a `ƒ (Dynamic)`, la tarea está mal hecha.
- **Paleta del sitio** (usar exactamente estos valores): tinta `#081827`, crema `#FBFAF7`, arena `#F4EFE7`, azul `#103A73`, azul claro `#1956A6`, naranja `#F26A21`, naranja oscuro `#C84F12`, borde `#E6EAF1`, gris `#737985`, texto secundario `#4B4F56`.
- **Tipografías**: Fraunces (display, vía `var(--font-fraunces)`), Inter (cuerpo, es la default del body), JetBrains Mono (etiquetas y datos, vía `var(--font-jetbrains)`).
- **Nunca commitear secretos.** `DATABASE_URL` va en `.env.local`, que ya está cubierto por `.gitignore` (`.env*`).
- **No instalar `@types/bcryptjs`**: es un paquete stub deprecado, `bcryptjs@3` ya trae sus propios tipos y el stub los pisa con tipos rotos.
- **Versiones exactas** al instalar: usar los números indicados en cada tarea, sin `^`.
- **Commits frecuentes**: cada tarea termina en un commit.

## Prerrequisito externo (bloqueante)

Antes de la Tarea 3 hace falta una base Postgres de Neon:

1. Entrar a [neon.tech](https://neon.tech), crear un proyecto (región `aws-sa-east-1`, São Paulo, es la más cercana a Buenos Aires).
2. Copiar el connection string *pooled* (termina en `-pooler.<region>.aws.neon.tech/neondb?sslmode=require`).
3. Guardarlo en `.env.local` como `DATABASE_URL`.
4. En Vercel: Settings → Environment Variables → agregar `DATABASE_URL` con el mismo valor para Production, Preview y Development.

Las tareas 1 y 2 se pueden hacer sin esto. De la 3 en adelante, no.

---

## File Structure

**Reestructura del sitio público (Tarea 1)**

| Archivo | Responsabilidad |
|---|---|
| `lib/fonts.ts` | Instancias de `next/font/google`. Lo importan el layout raíz y, más adelante, cualquier layout que necesite las variables CSS. |
| `app/layout.tsx` | Sólo `<html>`, `<body>`, variables de fuentes, `globals.css` y metadata. Sin Header ni Footer. |
| `app/(sitio)/layout.tsx` | Header + `<main className="flex-1">` + Footer. Envuelve todo el sitio público. |
| `app/(sitio)/**` | Las 21 rutas públicas + `page.tsx`, movidas tal cual desde `app/`. |

**Capa de datos (Tareas 2–4)**

| Archivo | Responsabilidad |
|---|---|
| `drizzle.config.ts` | Configuración de drizzle-kit: dónde está el schema, dónde van las migraciones. |
| `lib/db/schema.ts` | Definición de tablas. En este plan: `usuarios`, `sesiones`, `intentos_login`. Las tablas de contenido llegan con sus etapas. |
| `lib/db/tipos.ts` | El tipo `Db`, común a Neon y a pglite. Vive aparte de `index.ts` para que los tests puedan importarlo sin arrastrar la conexión real. |
| `lib/db/index.ts` | La conexión Neon de producción. Sólo lo importa el código de servidor de Next, nunca los tests. |
| `drizzle/*.sql` | Migraciones generadas. Se commitean. |
| `test/db.ts` | Fábrica de bases pglite en memoria, migradas, para los tests. |
| `vitest.config.ts` | Runner de tests: entorno node y alias `@`. |

**Autenticación (Tareas 5–9)**

| Archivo | Responsabilidad |
|---|---|
| `lib/auth/passwords.ts` | Hashear y verificar contraseñas con bcrypt. Nada más. |
| `lib/auth/tokens.ts` | Generar tokens de sesión y hashearlos con SHA-256. Nada más. |
| `lib/auth/sesiones.ts` | Ciclo de vida de la sesión en la base: crear, obtener, revocar. |
| `lib/auth/intentos.ts` | Registro y freno de intentos de login fallidos. |
| `lib/auth/cookies.ts` | Único lugar que sabe cómo se llama y cómo se configura la cookie. |
| `lib/auth/sesion-actual.ts` | Puente entre la cookie y la base para los componentes de servidor. Es el único módulo de auth que importa la conexión real. |
| `scripts/crear-usuario.ts` | Script de arranque para crear el primer usuario. |

**Panel (Tareas 9–11)**

| Archivo | Responsabilidad |
|---|---|
| `app/admin/acciones.ts` | Server Actions `iniciarSesion` y `cerrarSesion`. |
| `app/admin/layout.tsx` | Fondo del panel. Envuelve login y panel autenticado. |
| `app/admin/login/page.tsx` | Pantalla de login (servidor: marca y estructura). |
| `app/admin/login/FormularioLogin.tsx` | El formulario en sí (cliente: `useActionState`, estado de error). |
| `app/admin/(panel)/layout.tsx` | Exige sesión y dibuja la barra superior con el nombre y el botón de salir. |
| `app/admin/(panel)/page.tsx` | Tablero: por ahora, un saludo y los accesos que van a existir. |
| `middleware.ts` | Corte optimista por presencia de cookie en `/admin/*`. |

---

## Task 1: Separar el sitio público del panel con un route group

Hoy `app/layout.tsx` mete Header y Footer en absolutamente todo lo que cuelgue de `app/`. Si `/admin` se crea así nomás, el panel queda con el menú del sitio arriba y el pie de página abajo. La solución de Next para esto es un *route group*: una carpeta con paréntesis que agrupa rutas bajo un layout compartido sin aparecer en la URL. `app/(sitio)/coberturas-medicas` sigue sirviéndose en `/coberturas-medicas`.

**Files:**
- Create: `lib/fonts.ts`
- Create: `app/(sitio)/layout.tsx`
- Modify: `app/layout.tsx`
- Move: las 21 carpetas de ruta + `page.tsx` de `app/` a `app/(sitio)/`
- Modify: `app/(sitio)/page.tsx` (ajuste del import de CSS)

**Interfaces:**
- Produces: `lib/fonts.ts` exporta `fraunces`, `inter`, `jetbrainsMono` (objetos de `next/font/google`) y `variablesDeFuentes: string`, una string con las tres clases `.variable` ya concatenadas.

- [ ] **Step 1: Extraer las fuentes a su propio módulo**

Crear `lib/fonts.ts`:

```ts
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
```

- [ ] **Step 2: Mover las rutas públicas al route group**

```bash
mkdir -p "app/(sitio)"
git mv app/page.tsx "app/(sitio)/page.tsx"
for d in atencion-sin-turno-previo buscar cirugia cirugias-esteticas \
         coberturas-medicas conocenos contacto enfermedades \
         especialidades-medicas estudios-medicos-y-preparaciones \
         estudios-y-preparaciones-de-laboratorio laboratorios \
         medicina-nuclear mutual-amedim novedades \
         nuestros-centros-y-horarios odontologia oncologia \
         recursos-humanos resonancia-magnetica tomografia-multicorte; do
  git mv "app/$d" "app/(sitio)/$d"
done
```

`app/layout.tsx`, `app/globals.css`, `app/home-v4.css` y `app/favicon.ico` **se quedan donde están**: los CSS son assets importados (no rutas) y `favicon.ico` sólo lo lee Next desde la raíz de `app/`.

Verificar que quedaron 21 carpetas más `page.tsx`:

```bash
ls "app/(sitio)" | wc -l   # 22
ls app                      # layout.tsx, globals.css, home-v4.css, favicon.ico, (sitio)
```

- [ ] **Step 3: Arreglar el import de CSS de la home**

`app/(sitio)/page.tsx` subió un nivel de profundidad. Cambiar la línea:

```ts
import "./home-v4.css";
```

por:

```ts
import "../home-v4.css";
```

Confirmar que no quedó ningún otro import roto:

```bash
grep -rn "home-v4.css\|globals.css" app/ | grep -v node_modules
```

Esperado: exactamente dos líneas — `app/layout.tsx` importando `./globals.css` y `app/(sitio)/page.tsx` importando `../home-v4.css`.

- [ ] **Step 4: Vaciar el layout raíz**

Reemplazar `app/layout.tsx` completo por:

```tsx
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
```

- [ ] **Step 5: Crear el layout del sitio público**

Crear `app/(sitio)/layout.tsx`:

```tsx
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
```

- [ ] **Step 6: Verificar que las rutas siguen estáticas**

```bash
rm -rf .next && npm run build
```

Esperado: build sin errores y, en la tabla de rutas, `○` (no `ƒ`) al lado de `/`, `/especialidades-medicas`, `/coberturas-medicas`, `/novedades`, `/nuestros-centros-y-horarios`, `/estudios-medicos-y-preparaciones` y `/estudios-y-preparaciones-de-laboratorio`. Las URLs no deben tener `(sitio)` en ninguna parte.

- [ ] **Step 7: Verificar en el navegador**

```bash
npm run dev
```

Abrir `http://localhost:3000`: la home tiene que verse idéntica a antes, con Header, Footer y los estilos de `home-v4.css`. Abrir `http://localhost:3000/coberturas-medicas` y confirmar lo mismo.

- [ ] **Step 8: Commit**

```bash
git add app lib/fonts.ts
git commit -m "refactor: agrupar el sitio público en el route group (sitio)

Prepara el terreno para /admin, que no tiene que heredar el Header ni el
Footer. Las URLs públicas no cambian y siguen prerenderizándose estáticas."
```

---

## Task 2: Instalar dependencias y configurar drizzle-kit y Vitest

**Files:**
- Modify: `package.json`
- Create: `drizzle.config.ts`
- Create: `vitest.config.ts`
- Create: `.env.example`

**Interfaces:**
- Produces: scripts npm `test`, `test:watch`, `db:generate`, `db:migrate`, `db:studio`. El alias `@` resuelto en Vitest hacia la raíz del proyecto, igual que en `tsconfig.json`.

- [ ] **Step 1: Instalar las dependencias de producción**

```bash
npm install drizzle-orm@0.45.2 @neondatabase/serverless@1.1.0 bcryptjs@3.0.3 zod@4.4.3
```

**No instalar `@types/bcryptjs`.** Es un stub deprecado; `bcryptjs@3` trae sus tipos propios y el stub los reemplaza por definiciones viejas que rompen la compilación.

- [ ] **Step 2: Instalar las dependencias de desarrollo**

```bash
npm install -D drizzle-kit@0.31.10 vitest@4.1.10 @electric-sql/pglite@0.5.4 tsx@4.23.1 dotenv@17.4.2
```

`@electric-sql/pglite` es Postgres compilado a WASM: corre dentro del proceso de Node, sin Docker ni servidor. Los tests de la capa de datos corren contra un Postgres de verdad, con las mismas migraciones que producción, y arrancan en milisegundos.

- [ ] **Step 3: Agregar los scripts a package.json**

En el bloque `"scripts"` de `package.json`, agregar:

```json
    "test": "vitest run",
    "test:watch": "vitest",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
```

- [ ] **Step 4: Configurar drizzle-kit**

Crear `drizzle.config.ts`:

```ts
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
```

- [ ] **Step 5: Configurar Vitest**

Crear `vitest.config.ts`:

```ts
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
```

- [ ] **Step 6: Documentar las variables de entorno**

Crear `.env.example` (este sí se commitea; `.env.local` no):

```bash
# Connection string *pooled* de Neon. Sacalo de la consola de Neon y copiá el
# mismo valor en las variables de entorno del proyecto en Vercel.
DATABASE_URL="postgresql://usuario:password@ep-algo-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"
```

- [ ] **Step 7: Verificar que no se rompió nada**

```bash
npx tsc --noEmit
npm run build
```

Esperado: ambos sin errores.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json drizzle.config.ts vitest.config.ts .env.example
git commit -m "chore: agregar Drizzle, Neon, bcrypt, Zod y Vitest

Instala el toolchain del panel admin y deja configurados drizzle-kit y el
runner de tests, que corre contra pglite (Postgres en WASM) en memoria."
```

---

## Task 3: Definir el schema de autenticación y generar la primera migración

Este plan sólo crea las tablas que hacen falta para entrar al panel. Las de contenido (`novedades`, `sedes`, `coberturas`) llegan con sus etapas de CRUD, cada una con su propia migración.

**Files:**
- Create: `lib/db/schema.ts`
- Create: `drizzle/0000_*.sql` (generado)

**Interfaces:**
- Produces: `lib/db/schema.ts` exporta las tablas `usuarios`, `sesiones`, `intentosLogin` y el tipo `Rol = "admin" | "editor"`.
- Columnas de `usuarios`: `id: string` (uuid), `email: string`, `nombre: string`, `hashPassword: string`, `rol: Rol`, `activo: boolean`, `creadoEn: Date`.
- Columnas de `sesiones`: `id: string` (hash SHA-256 hex del token), `usuarioId: string`, `expiraEn: Date`, `creadaEn: Date`.
- Columnas de `intentosLogin`: `id: string`, `email: string`, `exitoso: boolean`, `ocurridoEn: Date`.

- [ ] **Step 1: Escribir el schema**

Crear `lib/db/schema.ts`:

```ts
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export type Rol = "admin" | "editor";

export const usuarios = pgTable("usuarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  // El email es la identidad. Se guarda siempre normalizado en minúsculas:
  // normalizarEmail() en lib/auth/intentos.ts es el único lugar que decide eso.
  email: text("email").notNull().unique(),
  nombre: text("nombre").notNull(),
  hashPassword: text("hash_password").notNull(),
  rol: text("rol", { enum: ["admin", "editor"] }).notNull().default("editor"),
  // Dar de baja a alguien no borra el usuario: se apaga. Así las novedades
  // siguen teniendo autor y el historial no queda con referencias huérfanas.
  activo: boolean("activo").notNull().default(true),
  creadoEn: timestamp("creado_en", { withTimezone: true }).notNull().defaultNow(),
});

export const sesiones = pgTable(
  "sesiones",
  {
    // La primary key es el SHA-256 del token, no el token. Si alguien lee la
    // base no puede hacerse pasar por nadie. SHA-256 y no bcrypt porque el
    // token ya tiene 256 bits de entropía: no hay nada que estirar y sí hace
    // falta poder buscarlo por índice en cada request.
    id: text("id").primaryKey(),
    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    expiraEn: timestamp("expira_en", { withTimezone: true }).notNull(),
    creadaEn: timestamp("creada_en", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("sesiones_usuario_idx").on(t.usuarioId)]
);

export const intentosLogin = pgTable(
  "intentos_login",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    exitoso: boolean("exitoso").notNull(),
    ocurridoEn: timestamp("ocurrido_en", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  // El freno pregunta siempre "cuántos fallidos tuvo este email en los últimos
  // 15 minutos", así que el índice va por (email, fecha) en ese orden.
  (t) => [index("intentos_email_fecha_idx").on(t.email, t.ocurridoEn)]
);
```

- [ ] **Step 2: Generar la migración**

```bash
npm run db:generate
```

Esperado: se crea `drizzle/0000_<nombre-random>.sql` y la carpeta `drizzle/meta/`. Abrir el `.sql` y confirmar que tiene `CREATE TABLE "usuarios"`, `CREATE TABLE "sesiones"`, `CREATE TABLE "intentos_login"`, la foreign key con `ON DELETE cascade` y los dos `CREATE INDEX`.

- [ ] **Step 3: Aplicar la migración a Neon**

Con `DATABASE_URL` ya en `.env.local`:

```bash
npm run db:migrate
```

Esperado: `[✓] migrations applied successfully!`

- [ ] **Step 4: Verificar contra la base real**

```bash
npm run db:studio
```

Abre Drizzle Studio en el navegador. Confirmar que están las tres tablas y que `usuarios` está vacía. Cerrar con Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add lib/db/schema.ts drizzle
git commit -m "feat: schema de usuarios, sesiones e intentos de login

Tres tablas para autenticar. En sesiones se guarda el SHA-256 del token y
no el token, para que leer la base no alcance para hacerse pasar por nadie."
```

---

## Task 4: Cliente de base de datos y banco de pruebas con pglite

La clave de todo el resto del plan está acá: un único tipo `Db` que sirve tanto para la conexión Neon de producción como para la pglite de los tests. Toda función que toque la base lo recibe como primer parámetro. Nadie en `lib/auth/` importa la conexión real, salvo `sesion-actual.ts`, que es el borde con Next.

**Files:**
- Create: `lib/db/tipos.ts`
- Create: `lib/db/index.ts`
- Create: `test/db.ts`
- Create: `test/db.test.ts`

**Interfaces:**
- Consumes: `lib/db/schema.ts` de la Tarea 3.
- Produces: `lib/db/tipos.ts` exporta `type Db`. `lib/db/index.ts` exporta `const db: Db`. `test/db.ts` exporta `async function dbDePrueba(): Promise<Db>`.

- [ ] **Step 1: Definir el tipo compartido**

Crear `lib/db/tipos.ts`:

```ts
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import type * as schema from "./schema";

// El tipo genérico del que descienden tanto `drizzle-orm/neon-http` como
// `drizzle-orm/pglite`. Gracias a esto, las funciones de lib/auth/ reciben
// `db: Db` y corren igual contra Neon en producción y contra Postgres en
// memoria en los tests, sin mocks ni ramas condicionales.
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;
```

- [ ] **Step 2: Crear la conexión de producción**

Crear `lib/db/index.ts`:

```ts
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
```

- [ ] **Step 3: Escribir la fábrica de bases de prueba**

Crear `test/db.ts`:

```ts
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
```

- [ ] **Step 4: Escribir el test de humo**

Crear `test/db.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { usuarios } from "@/lib/db/schema";
import { dbDePrueba } from "./db";

describe("banco de pruebas", () => {
  it("arranca una base migrada y vacía", async () => {
    const db = await dbDePrueba();
    expect(await db.select().from(usuarios)).toEqual([]);
  });

  it("guarda y recupera un usuario con sus valores por defecto", async () => {
    const db = await dbDePrueba();
    await db.insert(usuarios).values({
      email: "ana@dim.com.ar",
      nombre: "Ana Rossi",
      hashPassword: "hash-de-mentira",
    });

    const [usuario] = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.email, "ana@dim.com.ar"));

    expect(usuario.nombre).toBe("Ana Rossi");
    expect(usuario.rol).toBe("editor");
    expect(usuario.activo).toBe(true);
    expect(usuario.id).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("no comparte estado entre bases", async () => {
    const primera = await dbDePrueba();
    await primera.insert(usuarios).values({
      email: "ana@dim.com.ar",
      nombre: "Ana",
      hashPassword: "x",
    });

    const segunda = await dbDePrueba();
    expect(await segunda.select().from(usuarios)).toEqual([]);
  });
});
```

- [ ] **Step 5: Correr los tests**

```bash
npm test
```

Esperado: 3 tests en verde. Si falla con "no migrations found", verificar que la carpeta `drizzle/` tenga el `.sql` de la Tarea 3 y que Vitest esté corriendo desde la raíz del proyecto.

- [ ] **Step 6: Commit**

```bash
git add lib/db test
git commit -m "feat: cliente Neon y banco de pruebas con pglite

Un solo tipo Db sirve para la conexión real y para la de los tests, así la
capa de auth se prueba contra Postgres de verdad sin mocks."
```

---

## Task 5: Contraseñas y tokens

Dos módulos chiquitos y sin dependencias de base. Son los ladrillos criptográficos: se testean solos y después los usa todo lo demás.

**Files:**
- Create: `lib/auth/passwords.ts`
- Create: `lib/auth/passwords.test.ts`
- Create: `lib/auth/tokens.ts`
- Create: `lib/auth/tokens.test.ts`

**Interfaces:**
- Produces: `lib/auth/passwords.ts` exporta `LARGO_MINIMO: number`, `hashearPassword(plano: string): Promise<string>`, `verificarPassword(plano: string, hash: string): Promise<boolean>` y `hashSenuelo(): Promise<string>`.
- Produces: `lib/auth/tokens.ts` exporta `generarToken(): string` y `hashearToken(token: string): string`.

- [ ] **Step 1: Escribir los tests de contraseñas**

Crear `lib/auth/passwords.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { LARGO_MINIMO, hashearPassword, verificarPassword } from "./passwords";

describe("contraseñas", () => {
  it("hashea y después verifica la misma contraseña", async () => {
    const hash = await hashearPassword("clinica-dim-2026");
    expect(hash).not.toBe("clinica-dim-2026");
    expect(hash.startsWith("$2")).toBe(true);
    expect(await verificarPassword("clinica-dim-2026", hash)).toBe(true);
  });

  it("rechaza una contraseña equivocada", async () => {
    const hash = await hashearPassword("clinica-dim-2026");
    expect(await verificarPassword("clinica-dim-2025", hash)).toBe(false);
  });

  it("genera un hash distinto para la misma contraseña", async () => {
    const a = await hashearPassword("clinica-dim-2026");
    const b = await hashearPassword("clinica-dim-2026");
    expect(a).not.toBe(b);
  });

  it("no deja crear contraseñas más cortas que el mínimo", async () => {
    await expect(hashearPassword("a".repeat(LARGO_MINIMO - 1))).rejects.toThrow(
      /al menos/
    );
  });
});
```

- [ ] **Step 2: Correr los tests y verlos fallar**

Run: `npx vitest run lib/auth/passwords.test.ts`
Expected: FAIL, "Failed to resolve import ./passwords"

- [ ] **Step 3: Implementar el módulo de contraseñas**

Crear `lib/auth/passwords.ts`:

```ts
import bcrypt from "bcryptjs";

// 12 rondas: unos 250 ms por hash en el hardware de Vercel. Suficientemente
// lento para que un ataque por diccionario no rinda, suficientemente rápido
// para que el login no se sienta trabado.
const RONDAS = 12;

export const LARGO_MINIMO = 10;

export async function hashearPassword(plano: string): Promise<string> {
  if (plano.length < LARGO_MINIMO) {
    throw new Error(`La contraseña necesita al menos ${LARGO_MINIMO} caracteres.`);
  }
  return bcrypt.hash(plano, RONDAS);
}

export async function verificarPassword(
  plano: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plano, hash);
}

let senuelo: Promise<string> | null = null;

// Un hash de descarte contra el cual comparar cuando el email no existe. Sin
// esto, un login con email inexistente contesta al instante y uno con email
// real tarda lo que tarda bcrypt: esa diferencia de tiempo alcanza para
// averiguar qué direcciones están dadas de alta. Se calcula una sola vez, la
// primera vez que hace falta.
export function hashSenuelo(): Promise<string> {
  senuelo ??= bcrypt.hash("senuelo-para-tiempo-constante", RONDAS);
  return senuelo;
}
```

- [ ] **Step 4: Correr los tests y verlos pasar**

Run: `npx vitest run lib/auth/passwords.test.ts`
Expected: PASS, 4 tests

- [ ] **Step 5: Escribir los tests de tokens**

Crear `lib/auth/tokens.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { generarToken, hashearToken } from "./tokens";

describe("tokens de sesión", () => {
  it("genera un token url-safe de 43 caracteres", () => {
    expect(generarToken()).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it("nunca repite un token", () => {
    const generados = new Set(Array.from({ length: 500 }, generarToken));
    expect(generados.size).toBe(500);
  });

  it("hashea de forma determinística", () => {
    const token = generarToken();
    expect(hashearToken(token)).toBe(hashearToken(token));
  });

  it("devuelve un hash hexadecimal de 64 caracteres que no contiene el token", () => {
    const token = generarToken();
    const hash = hashearToken(token);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(hash).not.toContain(token);
  });
});
```

- [ ] **Step 6: Correr los tests y verlos fallar**

Run: `npx vitest run lib/auth/tokens.test.ts`
Expected: FAIL, "Failed to resolve import ./tokens"

- [ ] **Step 7: Implementar el módulo de tokens**

Crear `lib/auth/tokens.ts`:

```ts
import { createHash, randomBytes } from "node:crypto";

// 32 bytes = 256 bits de entropía. Con eso, adivinar un token es tan
// improbable como adivinar una clave AES-256, y en base64url entra sin
// escapes en una cookie: 43 caracteres.
export function generarToken(): string {
  return randomBytes(32).toString("base64url");
}

// SHA-256 y no bcrypt: acá no hay que estirar un secreto de baja entropía
// (que es para lo que sirve bcrypt), hay que poder buscar la sesión por
// clave primaria en cada request sin quemar 250 ms.
export function hashearToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
```

- [ ] **Step 8: Correr los tests y verlos pasar**

Run: `npx vitest run lib/auth/tokens.test.ts`
Expected: PASS, 4 tests

- [ ] **Step 9: Commit**

```bash
git add lib/auth/passwords.ts lib/auth/passwords.test.ts lib/auth/tokens.ts lib/auth/tokens.test.ts
git commit -m "feat: hasheo de contraseñas con bcrypt y tokens de sesión

bcrypt de 12 rondas para las contraseñas, tokens opacos de 32 bytes con
SHA-256 para las sesiones, y un hash señuelo para que el login tarde lo
mismo exista o no el email."
```

---

## Task 6: Ciclo de vida de las sesiones

**Files:**
- Create: `lib/auth/sesiones.ts`
- Create: `lib/auth/sesiones.test.ts`

**Interfaces:**
- Consumes: `Db` de `lib/db/tipos.ts`, tablas de `lib/db/schema.ts`, `generarToken`/`hashearToken` de `lib/auth/tokens.ts`, `dbDePrueba` de `test/db.ts`.
- Produces:
  - `DURACION_SESION_MS: number`
  - `interface SesionActiva { usuarioId: string; email: string; nombre: string; rol: Rol; expiraEn: Date }`
  - `crearSesion(db: Db, usuarioId: string): Promise<{ token: string; expiraEn: Date }>`
  - `obtenerSesion(db: Db, token: string): Promise<SesionActiva | null>`
  - `revocarSesion(db: Db, token: string): Promise<void>`
  - `revocarSesionesDeUsuario(db: Db, usuarioId: string): Promise<void>`

- [ ] **Step 1: Escribir los tests**

Crear `lib/auth/sesiones.test.ts`:

```ts
import { beforeEach, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { sesiones, usuarios } from "@/lib/db/schema";
import type { Db } from "@/lib/db/tipos";
import { dbDePrueba } from "@/test/db";
import { hashearToken } from "./tokens";
import {
  crearSesion,
  obtenerSesion,
  revocarSesion,
  revocarSesionesDeUsuario,
} from "./sesiones";

let db: Db;
let usuarioId: string;

beforeEach(async () => {
  db = await dbDePrueba();
  const [usuario] = await db
    .insert(usuarios)
    .values({
      email: "ana@dim.com.ar",
      nombre: "Ana Rossi",
      hashPassword: "hash-de-mentira",
      rol: "admin",
    })
    .returning();
  usuarioId = usuario.id;
});

describe("crearSesion", () => {
  it("devuelve un token usable y guarda sólo su hash", async () => {
    const { token, expiraEn } = await crearSesion(db, usuarioId);

    expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(expiraEn.getTime()).toBeGreaterThan(Date.now());

    const [fila] = await db.select().from(sesiones);
    expect(fila.id).toBe(hashearToken(token));
    expect(fila.id).not.toBe(token);
    expect(fila.usuarioId).toBe(usuarioId);
  });
});

describe("obtenerSesion", () => {
  it("devuelve los datos del usuario para un token válido", async () => {
    const { token } = await crearSesion(db, usuarioId);
    const sesion = await obtenerSesion(db, token);

    expect(sesion).not.toBeNull();
    expect(sesion!.usuarioId).toBe(usuarioId);
    expect(sesion!.email).toBe("ana@dim.com.ar");
    expect(sesion!.nombre).toBe("Ana Rossi");
    expect(sesion!.rol).toBe("admin");
  });

  it("devuelve null para un token inventado", async () => {
    await crearSesion(db, usuarioId);
    expect(await obtenerSesion(db, "token-que-no-existe")).toBeNull();
  });

  it("devuelve null para una sesión vencida", async () => {
    const { token } = await crearSesion(db, usuarioId);
    await db
      .update(sesiones)
      .set({ expiraEn: new Date(Date.now() - 1000) })
      .where(eq(sesiones.id, hashearToken(token)));

    expect(await obtenerSesion(db, token)).toBeNull();
  });

  it("devuelve null si el usuario fue dado de baja", async () => {
    const { token } = await crearSesion(db, usuarioId);
    await db.update(usuarios).set({ activo: false }).where(eq(usuarios.id, usuarioId));

    expect(await obtenerSesion(db, token)).toBeNull();
  });
});

describe("revocarSesion", () => {
  it("invalida el token y no toca las otras sesiones", async () => {
    const primera = await crearSesion(db, usuarioId);
    const segunda = await crearSesion(db, usuarioId);

    await revocarSesion(db, primera.token);

    expect(await obtenerSesion(db, primera.token)).toBeNull();
    expect(await obtenerSesion(db, segunda.token)).not.toBeNull();
  });
});

describe("revocarSesionesDeUsuario", () => {
  it("cierra todas las sesiones abiertas de esa persona", async () => {
    const primera = await crearSesion(db, usuarioId);
    const segunda = await crearSesion(db, usuarioId);

    await revocarSesionesDeUsuario(db, usuarioId);

    expect(await obtenerSesion(db, primera.token)).toBeNull();
    expect(await obtenerSesion(db, segunda.token)).toBeNull();
  });
});

describe("borrado en cascada", () => {
  it("borra las sesiones al borrar el usuario", async () => {
    await crearSesion(db, usuarioId);
    await db.delete(usuarios).where(eq(usuarios.id, usuarioId));

    expect(await db.select().from(sesiones)).toEqual([]);
  });
});
```

- [ ] **Step 2: Correr los tests y verlos fallar**

Run: `npx vitest run lib/auth/sesiones.test.ts`
Expected: FAIL, "Failed to resolve import ./sesiones"

- [ ] **Step 3: Implementar el módulo**

Crear `lib/auth/sesiones.ts`:

```ts
import { and, eq, gt } from "drizzle-orm";
import { sesiones, usuarios, type Rol } from "@/lib/db/schema";
import type { Db } from "@/lib/db/tipos";
import { generarToken, hashearToken } from "./tokens";

// Una semana. Es un panel de trabajo interno: más corto molesta, más largo
// deja sesiones vivas dando vueltas sin necesidad.
export const DURACION_SESION_MS = 7 * 24 * 60 * 60 * 1000;

export interface SesionActiva {
  usuarioId: string;
  email: string;
  nombre: string;
  rol: Rol;
  expiraEn: Date;
}

export async function crearSesion(
  db: Db,
  usuarioId: string
): Promise<{ token: string; expiraEn: Date }> {
  const token = generarToken();
  const expiraEn = new Date(Date.now() + DURACION_SESION_MS);

  await db.insert(sesiones).values({
    id: hashearToken(token),
    usuarioId,
    expiraEn,
  });

  // El token en claro se devuelve una única vez, para meterlo en la cookie.
  // En la base nunca queda.
  return { token, expiraEn };
}

export async function obtenerSesion(
  db: Db,
  token: string
): Promise<SesionActiva | null> {
  const filas = await db
    .select({
      usuarioId: usuarios.id,
      email: usuarios.email,
      nombre: usuarios.nombre,
      rol: usuarios.rol,
      activo: usuarios.activo,
      expiraEn: sesiones.expiraEn,
    })
    .from(sesiones)
    .innerJoin(usuarios, eq(usuarios.id, sesiones.usuarioId))
    .where(
      and(eq(sesiones.id, hashearToken(token)), gt(sesiones.expiraEn, new Date()))
    )
    .limit(1);

  const fila = filas[0];
  // Dar de baja a alguien tiene que cortarle el acceso ya, sin esperar a que
  // venza la sesión. Por eso se chequea `activo` en cada lectura.
  if (!fila || !fila.activo) return null;

  return {
    usuarioId: fila.usuarioId,
    email: fila.email,
    nombre: fila.nombre,
    rol: fila.rol,
    expiraEn: fila.expiraEn,
  };
}

export async function revocarSesion(db: Db, token: string): Promise<void> {
  await db.delete(sesiones).where(eq(sesiones.id, hashearToken(token)));
}

// Para cuando alguien cambia su contraseña o se da de baja a un usuario:
// todo lo que estaba abierto se cierra.
export async function revocarSesionesDeUsuario(
  db: Db,
  usuarioId: string
): Promise<void> {
  await db.delete(sesiones).where(eq(sesiones.usuarioId, usuarioId));
}
```

- [ ] **Step 4: Correr los tests y verlos pasar**

Run: `npx vitest run lib/auth/sesiones.test.ts`
Expected: PASS, 8 tests

- [ ] **Step 5: Commit**

```bash
git add lib/auth/sesiones.ts lib/auth/sesiones.test.ts
git commit -m "feat: crear, leer y revocar sesiones

Toda función recibe la conexión por parámetro, así los tests corren contra
pglite. Dar de baja a un usuario le corta el acceso en el próximo request."
```

---

## Task 7: Freno de intentos de login

Sin esto, el formulario de login es una máquina de probar contraseñas. El límite es por email, no por IP: detrás de la red de la clínica todos comparten IP, y bloquear por IP dejaría a toda la administración afuera por culpa de una sola persona.

**Files:**
- Create: `lib/auth/intentos.ts`
- Create: `lib/auth/intentos.test.ts`

**Interfaces:**
- Consumes: `Db` de `lib/db/tipos.ts`, `intentosLogin` de `lib/db/schema.ts`, `dbDePrueba` de `test/db.ts`.
- Produces:
  - `MAX_INTENTOS: number` (5) y `VENTANA_MS: number` (15 minutos)
  - `normalizarEmail(email: string): string`
  - `registrarIntento(db: Db, email: string, exitoso: boolean): Promise<void>`
  - `estaBloqueado(db: Db, email: string): Promise<boolean>`
  - `limpiarIntentos(db: Db, email: string): Promise<void>`

- [ ] **Step 1: Escribir los tests**

Crear `lib/auth/intentos.test.ts`:

```ts
import { beforeEach, describe, expect, it } from "vitest";
import { intentosLogin } from "@/lib/db/schema";
import type { Db } from "@/lib/db/tipos";
import { dbDePrueba } from "@/test/db";
import {
  MAX_INTENTOS,
  VENTANA_MS,
  estaBloqueado,
  limpiarIntentos,
  normalizarEmail,
  registrarIntento,
} from "./intentos";

let db: Db;

beforeEach(async () => {
  db = await dbDePrueba();
});

async function fallar(veces: number, email = "ana@dim.com.ar") {
  for (let i = 0; i < veces; i++) {
    await registrarIntento(db, email, false);
  }
}

describe("normalizarEmail", () => {
  it("saca espacios y pasa a minúsculas", () => {
    expect(normalizarEmail("  Ana@DIM.com.AR ")).toBe("ana@dim.com.ar");
  });
});

describe("estaBloqueado", () => {
  it("no bloquea a alguien sin intentos", async () => {
    expect(await estaBloqueado(db, "ana@dim.com.ar")).toBe(false);
  });

  it("no bloquea antes de llegar al límite", async () => {
    await fallar(MAX_INTENTOS - 1);
    expect(await estaBloqueado(db, "ana@dim.com.ar")).toBe(false);
  });

  it("bloquea al llegar al límite", async () => {
    await fallar(MAX_INTENTOS);
    expect(await estaBloqueado(db, "ana@dim.com.ar")).toBe(true);
  });

  it("cuenta el mismo email escrito distinto", async () => {
    await fallar(MAX_INTENTOS, "  ANA@dim.com.ar  ");
    expect(await estaBloqueado(db, "ana@dim.com.ar")).toBe(true);
  });

  it("no mezcla emails distintos", async () => {
    await fallar(MAX_INTENTOS, "ana@dim.com.ar");
    expect(await estaBloqueado(db, "juan@dim.com.ar")).toBe(false);
  });

  it("no cuenta los intentos exitosos", async () => {
    for (let i = 0; i < MAX_INTENTOS; i++) {
      await registrarIntento(db, "ana@dim.com.ar", true);
    }
    expect(await estaBloqueado(db, "ana@dim.com.ar")).toBe(false);
  });

  it("ignora los intentos viejos, fuera de la ventana", async () => {
    const viejo = new Date(Date.now() - VENTANA_MS - 60_000);
    await db.insert(intentosLogin).values(
      Array.from({ length: MAX_INTENTOS }, () => ({
        email: "ana@dim.com.ar",
        exitoso: false,
        ocurridoEn: viejo,
      }))
    );

    expect(await estaBloqueado(db, "ana@dim.com.ar")).toBe(false);
  });
});

describe("limpiarIntentos", () => {
  it("destraba el email después de un login correcto", async () => {
    await fallar(MAX_INTENTOS);
    await limpiarIntentos(db, "ana@dim.com.ar");
    expect(await estaBloqueado(db, "ana@dim.com.ar")).toBe(false);
  });

  it("no toca los intentos de otros emails", async () => {
    await fallar(MAX_INTENTOS, "ana@dim.com.ar");
    await fallar(MAX_INTENTOS, "juan@dim.com.ar");

    await limpiarIntentos(db, "ana@dim.com.ar");

    expect(await estaBloqueado(db, "juan@dim.com.ar")).toBe(true);
  });
});
```

- [ ] **Step 2: Correr los tests y verlos fallar**

Run: `npx vitest run lib/auth/intentos.test.ts`
Expected: FAIL, "Failed to resolve import ./intentos"

- [ ] **Step 3: Implementar el módulo**

Crear `lib/auth/intentos.ts`:

```ts
import { and, count, eq, gt } from "drizzle-orm";
import { intentosLogin } from "@/lib/db/schema";
import type { Db } from "@/lib/db/tipos";

export const MAX_INTENTOS = 5;
export const VENTANA_MS = 15 * 60 * 1000;

// El email es la clave de todo: de la tabla usuarios, del freno y del índice.
// Normalizarlo en un solo lugar evita que "Ana@DIM.com.ar" y "ana@dim.com.ar"
// se cuenten como dos personas distintas.
export function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function registrarIntento(
  db: Db,
  email: string,
  exitoso: boolean
): Promise<void> {
  await db
    .insert(intentosLogin)
    .values({ email: normalizarEmail(email), exitoso });
}

// Se frena por email y no por IP: en la clínica todos salen por la misma IP,
// y bloquearla dejaría a toda la administración afuera por culpa de una sola
// persona que se olvidó la contraseña.
export async function estaBloqueado(db: Db, email: string): Promise<boolean> {
  const desde = new Date(Date.now() - VENTANA_MS);

  const filas = await db
    .select({ total: count() })
    .from(intentosLogin)
    .where(
      and(
        eq(intentosLogin.email, normalizarEmail(email)),
        eq(intentosLogin.exitoso, false),
        gt(intentosLogin.ocurridoEn, desde)
      )
    );

  return (filas[0]?.total ?? 0) >= MAX_INTENTOS;
}

// Se llama después de un login correcto: entrar bien borra el historial, así
// quien se equivocó tres veces y después acertó arranca de cero.
export async function limpiarIntentos(db: Db, email: string): Promise<void> {
  await db
    .delete(intentosLogin)
    .where(eq(intentosLogin.email, normalizarEmail(email)));
}
```

- [ ] **Step 4: Correr los tests y verlos pasar**

Run: `npx vitest run lib/auth/intentos.test.ts`
Expected: PASS, 10 tests

- [ ] **Step 5: Correr toda la suite**

Run: `npm test`
Expected: PASS, 29 tests en total

- [ ] **Step 6: Commit**

```bash
git add lib/auth/intentos.ts lib/auth/intentos.test.ts
git commit -m "feat: frenar el login después de 5 intentos fallidos

La ventana es de 15 minutos y se cuenta por email, no por IP: en la clínica
todos comparten IP y bloquearla dejaría afuera a toda la administración."
```

---

## Task 8: Script para crear el primer usuario

La base arranca vacía y no hay pantalla de alta todavía (eso es la etapa 7 del spec). Sin este script no hay forma de entrar al panel.

**Files:**
- Create: `scripts/crear-usuario.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `usuarios` de `lib/db/schema.ts`, `hashearPassword`/`LARGO_MINIMO` de `lib/auth/passwords.ts`, `normalizarEmail` de `lib/auth/intentos.ts`.
- Produces: el comando `npm run usuario:crear -- <email> <nombre> <rol>`.

- [ ] **Step 1: Escribir el script**

Crear `scripts/crear-usuario.ts`:

```ts
import { config } from "dotenv";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { usuarios } from "../lib/db/schema";
import { LARGO_MINIMO, hashearPassword } from "../lib/auth/passwords";
import { normalizarEmail } from "../lib/auth/intentos";

// Este script corre con tsx, fuera de Next, así que la carga de .env.local no
// viene de arriba: hay que pedirla a mano. Va adentro de main() y no al tope
// del archivo porque los imports se evalúan primero de todo; ninguno de los
// módulos de arriba lee process.env al importarse, así que el orden no
// molesta. Lo que sí importa es no importar lib/db/index.ts acá: ese lee
// DATABASE_URL al cargarse y explotaría antes de que config() llegue a correr.
async function main() {
  config({ path: ".env.local" });

  const [emailCrudo, nombre, rolCrudo = "admin"] = process.argv.slice(2);

  if (!emailCrudo || !nombre) {
    console.error(
      'Uso: npm run usuario:crear -- <email> "<nombre completo>" [admin|editor]'
    );
    process.exit(1);
  }

  if (rolCrudo !== "admin" && rolCrudo !== "editor") {
    console.error(`Rol inválido: "${rolCrudo}". Tiene que ser admin o editor.`);
    process.exit(1);
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("Falta DATABASE_URL en .env.local.");
    process.exit(1);
  }

  const email = normalizarEmail(emailCrudo);
  const db = drizzle(url, { schema: { usuarios } });

  const yaExiste = await db
    .select({ id: usuarios.id })
    .from(usuarios)
    .where(eq(usuarios.email, email))
    .limit(1);

  if (yaExiste.length > 0) {
    console.error(`Ya hay un usuario con el email ${email}.`);
    process.exit(1);
  }

  // Se pide por consola y no por argumento para que la contraseña no quede en
  // el historial del shell ni en la lista de procesos.
  const consola = createInterface({ input: stdin, output: stdout });
  const password = await consola.question(
    `Contraseña para ${email} (mínimo ${LARGO_MINIMO} caracteres): `
  );
  consola.close();

  const hashPassword = await hashearPassword(password);

  await db.insert(usuarios).values({ email, nombre, hashPassword, rol: rolCrudo });

  console.log(`Listo. ${nombre} <${email}> ya puede entrar como ${rolCrudo}.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
```

- [ ] **Step 2: Agregar el script a package.json**

En `"scripts"`, agregar:

```json
    "usuario:crear": "tsx scripts/crear-usuario.ts"
```

- [ ] **Step 3: Probar el camino de error**

```bash
npm run usuario:crear
```

Esperado: imprime el uso y sale con código 1.

```bash
npm run usuario:crear -- ana@dim.com.ar "Ana Rossi" jefa
```

Esperado: `Rol inválido: "jefa". Tiene que ser admin o editor.`

- [ ] **Step 4: Crear el primer usuario de verdad**

```bash
npm run usuario:crear -- <tu-email> "<Tu Nombre>" admin
```

Escribir una contraseña de al menos 10 caracteres cuando la pida. Esperado: `Listo. <Tu Nombre> <...> ya puede entrar como admin.`

- [ ] **Step 5: Verificar que no se puede duplicar**

Correr el mismo comando otra vez. Esperado: `Ya hay un usuario con el email ...` y salida con código 1.

- [ ] **Step 6: Commit**

```bash
git add scripts/crear-usuario.ts package.json
git commit -m "feat: script para crear el primer usuario del panel

La contraseña se pide por consola y no por argumento, así no queda en el
historial del shell ni en la lista de procesos."
```

---

## Task 9: Cookie de sesión, sesión actual y Server Actions

Acá se juntan las piezas. `cookies.ts` es el único módulo que conoce el nombre y la configuración de la cookie. `sesion-actual.ts` es el borde entre Next y la capa de datos: el único módulo de `lib/auth/` que importa la conexión real. `acciones.ts` son los dos Server Actions del login.

**Files:**
- Create: `lib/auth/cookies.ts`
- Create: `lib/auth/sesion-actual.ts`
- Create: `app/admin/acciones.ts`

**Interfaces:**
- Consumes: `obtenerSesion`, `crearSesion`, `revocarSesion`, `SesionActiva` de `lib/auth/sesiones.ts`; `verificarPassword`, `hashSenuelo` de `lib/auth/passwords.ts`; `estaBloqueado`, `limpiarIntentos`, `normalizarEmail`, `registrarIntento` de `lib/auth/intentos.ts`; `db` de `lib/db/index.ts`.
- Produces:
  - `lib/auth/cookies.ts`: `NOMBRE_COOKIE = "dim_sesion"`, `guardarCookieSesion(token: string, expiraEn: Date): Promise<void>`, `leerCookieSesion(): Promise<string | null>`, `borrarCookieSesion(): Promise<void>`
  - `lib/auth/sesion-actual.ts`: `sesionActual(): Promise<SesionActiva | null>`, `requerirSesion(): Promise<SesionActiva>`
  - `app/admin/acciones.ts`: `interface EstadoLogin { error?: string }`, `iniciarSesion(estado: EstadoLogin, datos: FormData): Promise<EstadoLogin>`, `cerrarSesion(): Promise<void>`

- [ ] **Step 1: Escribir el módulo de la cookie**

Crear `lib/auth/cookies.ts`:

```ts
import { cookies } from "next/headers";

export const NOMBRE_COOKIE = "dim_sesion";

// `httpOnly` para que ningún script pueda leer el token (si alguna vez se cuela
// un XSS, la sesión no se va con él). `sameSite: lax` para que un sitio ajeno
// no pueda disparar acciones del panel desde un formulario propio, sin romper
// la vuelta desde un link. `secure` sólo en producción, porque en localhost no
// hay HTTPS y el navegador descartaría la cookie.
export async function guardarCookieSesion(
  token: string,
  expiraEn: Date
): Promise<void> {
  const almacen = await cookies();
  almacen.set(NOMBRE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiraEn,
  });
}

export async function leerCookieSesion(): Promise<string | null> {
  const almacen = await cookies();
  return almacen.get(NOMBRE_COOKIE)?.value ?? null;
}

export async function borrarCookieSesion(): Promise<void> {
  const almacen = await cookies();
  almacen.delete(NOMBRE_COOKIE);
}
```

- [ ] **Step 2: Escribir el puente con la base**

Crear `lib/auth/sesion-actual.ts`:

```ts
import { cache } from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { leerCookieSesion } from "./cookies";
import { obtenerSesion, type SesionActiva } from "./sesiones";

// `cache` de React deduplica dentro de un mismo render: si el layout y tres
// componentes preguntan por la sesión, se hace una sola consulta.
export const sesionActual = cache(async (): Promise<SesionActiva | null> => {
  const token = await leerCookieSesion();
  if (!token) return null;
  return obtenerSesion(db, token);
});

// La regla del proyecto: cada página y cada Server Action del panel valida la
// sesión con esto. El middleware sólo mira si la cookie existe; la verdad
// sobre si vale o no está siempre acá, contra la base.
export async function requerirSesion(): Promise<SesionActiva> {
  const sesion = await sesionActual();
  if (!sesion) redirect("/admin/login");
  return sesion;
}
```

- [ ] **Step 3: Escribir los Server Actions**

Crear `app/admin/acciones.ts`:

```ts
"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { usuarios } from "@/lib/db/schema";
import { hashSenuelo, verificarPassword } from "@/lib/auth/passwords";
import { crearSesion, revocarSesion } from "@/lib/auth/sesiones";
import {
  estaBloqueado,
  limpiarIntentos,
  normalizarEmail,
  registrarIntento,
} from "@/lib/auth/intentos";
import {
  borrarCookieSesion,
  guardarCookieSesion,
  leerCookieSesion,
} from "@/lib/auth/cookies";

export interface EstadoLogin {
  error?: string;
}

// Se valida con regex y no con `.email()`: Zod 4 movió ese validador a `z.email()`
// y dejó el método encadenado como deprecado. Un regex simple no depende de la
// versión y acá alcanza — el formato exacto lo decide la base, no el formulario.
const esquemaLogin = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Escribí tu email.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Ese email no es válido."),
  password: z.string().min(1, "Escribí tu contraseña."),
});

export async function iniciarSesion(
  _estado: EstadoLogin,
  datos: FormData
): Promise<EstadoLogin> {
  const parseo = esquemaLogin.safeParse({
    email: datos.get("email"),
    password: datos.get("password"),
  });

  if (!parseo.success) {
    return { error: parseo.error.issues[0].message };
  }

  const email = normalizarEmail(parseo.data.email);
  const { password } = parseo.data;

  if (await estaBloqueado(db, email)) {
    return {
      error: "Demasiados intentos fallidos. Esperá 15 minutos y probá de nuevo.",
    };
  }

  const [usuario] = await db
    .select()
    .from(usuarios)
    .where(eq(usuarios.email, email))
    .limit(1);

  // Si el email no existe se compara igual, contra un hash de descarte: así el
  // login tarda lo mismo exista o no la cuenta y nadie puede averiguar qué
  // direcciones están dadas de alta midiendo el tiempo de respuesta.
  const hash = usuario?.activo ? usuario.hashPassword : await hashSenuelo();
  const passwordCorrecta = await verificarPassword(password, hash);

  if (!usuario || !usuario.activo || !passwordCorrecta) {
    await registrarIntento(db, email, false);
    // Un solo mensaje para los tres casos: decir "ese email no existe" es
    // regalarle a cualquiera la lista de usuarios del panel.
    return { error: "Email o contraseña incorrectos." };
  }

  await registrarIntento(db, email, true);
  await limpiarIntentos(db, email);

  const { token, expiraEn } = await crearSesion(db, usuario.id);
  await guardarCookieSesion(token, expiraEn);

  // `redirect` funciona lanzando una excepción especial que Next intercepta:
  // va al final y fuera de cualquier try/catch.
  redirect("/admin");
}

export async function cerrarSesion(): Promise<void> {
  const token = await leerCookieSesion();
  // Se borra la fila además de la cookie: si el token quedó copiado en algún
  // lado, dejar de mandarlo no alcanza para invalidarlo.
  if (token) await revocarSesion(db, token);
  await borrarCookieSesion();
  redirect("/admin/login");
}
```

- [ ] **Step 4: Verificar que compila**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 5: Verificar que la suite sigue verde**

Run: `npm test`
Expected: PASS, 29 tests. (Estos módulos no se testean con Vitest: dependen de `next/headers`, que sólo existe dentro del request de Next. Se verifican en el navegador en la Tarea 11.)

- [ ] **Step 6: Commit**

```bash
git add lib/auth/cookies.ts lib/auth/sesion-actual.ts app/admin/acciones.ts
git commit -m "feat: cookie de sesión y Server Actions de entrada y salida

El login contesta siempre lo mismo y tarda siempre lo mismo, exista o no el
email. Cerrar sesión borra la fila además de la cookie."
```

---

## Task 10: Pantalla de login

Es la única pantalla del panel que ve alguien que todavía no entró, y la primera impresión de la herramienta. La idea: un campo azul tinta a pantalla completa (el color de la marca, pero acá usado como fondo total, no como acento) y encima una sola tarjeta crema con un filo naranja arriba. La palabra clave del título va en Fraunces itálica, igual que el "médicas." del sitio público, para que se reconozca la familia. Un solo acento de color, todo lo demás en silencio.

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/login/FormularioLogin.tsx`

**Interfaces:**
- Consumes: `iniciarSesion` y `EstadoLogin` de `app/admin/acciones.ts`.
- Produces: la ruta `/admin/login`.

- [ ] **Step 1: Crear el layout del panel**

Crear `app/admin/layout.tsx`:

```tsx
// El body del layout raíz es `flex flex-col` sobre crema. Todo lo que cuelga de
// /admin se pinta sobre tinta y ocupa lo que sobra: así el panel se despega del
// sitio público de un vistazo y no hay dudas de dónde está parada la persona.
export default function LayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-1 flex flex-col bg-[#081827]">{children}</div>;
}
```

- [ ] **Step 2: Crear la página de login**

Crear `app/admin/login/page.tsx`:

```tsx
import type { Metadata } from "next";
import FormularioLogin from "./FormularioLogin";

export const metadata: Metadata = {
  title: "Ingresar — Panel DIM",
  // Esta pantalla no tiene nada que hacer en Google.
  robots: { index: false, follow: false },
};

export default function PaginaLogin() {
  return (
    <div className="flex-1 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[420px]">
        <div className="bg-[#FBFAF7] rounded-3xl border-t-4 border-[#F26A21] px-7 py-9 sm:px-9 shadow-[0_24px_80px_rgba(0,0,0,.45)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#737985] mb-4">
            DIM · Gestión de contenido
          </p>
          <h1
            className="text-[2rem] leading-[1.1] font-light text-[#081827] tracking-[-0.02em] mb-2.5"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Entrá al <em className="italic text-[#103A73]">panel</em>.
          </h1>
          <p className="text-sm text-[#4B4F56] font-light leading-relaxed mb-7">
            Desde acá se cargan las novedades, las coberturas y los datos de las sedes.
          </p>

          <FormularioLogin />
        </div>

        <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#737985] mt-6">
          Acceso sólo para el equipo de DIM
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Crear el formulario**

Crear `app/admin/login/FormularioLogin.tsx`:

```tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight } from "lucide-react";
import { iniciarSesion, type EstadoLogin } from "../acciones";

const ESTADO_INICIAL: EstadoLogin = {};

const CLASES_CAMPO =
  "w-full px-4 py-3 rounded-xl text-sm bg-white border border-[#E6EAF1] text-[#081827] placeholder:text-[#737985] outline-none transition-all focus:ring-2 focus:ring-[#103A73]/15 focus:border-[#103A73]";

function BotonEntrar() {
  // useFormStatus lee el estado del <form> que lo contiene, así que este botón
  // tiene que ser un componente aparte: adentro del mismo componente que
  // renderiza el form, `pending` siempre sería false.
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 bg-[#F26A21] hover:bg-[#C84F12] disabled:bg-[#F26A21]/60 disabled:cursor-wait text-white font-semibold px-5 py-3 rounded-full text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103A73]"
    >
      {pending ? "Entrando…" : "Entrar"}
      {!pending && <ArrowRight size={16} strokeWidth={2.25} />}
    </button>
  );
}

export default function FormularioLogin() {
  const [estado, accion] = useActionState(iniciarSesion, ESTADO_INICIAL);

  return (
    <form action={accion} className="space-y-4" noValidate>
      {estado.error && (
        <p
          role="alert"
          className="flex items-start gap-2 text-sm text-[#C84F12] bg-[#F26A21]/8 border border-[#F26A21]/30 rounded-xl px-4 py-3"
        >
          <AlertCircle size={16} strokeWidth={2.25} className="mt-0.5 flex-shrink-0" />
          <span>{estado.error}</span>
        </p>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-[#081827] mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="nombre@dim.com.ar"
          className={CLASES_CAMPO}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold text-[#081827] mb-1.5"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={CLASES_CAMPO}
        />
      </div>

      <div className="pt-1">
        <BotonEntrar />
      </div>
    </form>
  );
}
```

- [ ] **Step 4: Verificar que compila y buildea**

```bash
npx tsc --noEmit
npm run build
```

Esperado: sin errores. En la tabla de rutas, `/admin/login` aparece como `ƒ (Dynamic)` (usa cookies) y las rutas públicas siguen con `○`.

- [ ] **Step 5: Verificar en el navegador**

```bash
npm run dev
```

Abrir `http://localhost:3000/admin/login` y confirmar:

1. Fondo azul tinta a pantalla completa, sin Header ni Footer del sitio.
2. La tarjeta crema centrada, con el filo naranja arriba y "panel" en itálica.
3. Enviar el formulario vacío → mensaje "Escribí tu email."
4. Email inventado + cualquier contraseña → "Email o contraseña incorrectos."
5. El email real de la Tarea 8 con contraseña equivocada → el mismo mensaje, y la respuesta tarda lo mismo que el caso anterior.
6. Repetir el paso 5 cinco veces → "Demasiados intentos fallidos. Esperá 15 minutos y probá de nuevo."
7. Navegar con Tab: los dos campos y el botón muestran un anillo de foco visible.
8. Achicar la ventana a 375 px de ancho: la tarjeta respira y nada se desborda.

Para destrabar el email después del paso 6, en Drizzle Studio (`npm run db:studio`) borrar las filas de `intentos_login`.

- [ ] **Step 6: Commit**

```bash
git add app/admin
git commit -m "feat: pantalla de login del panel

Campo azul tinta a pantalla completa con una sola tarjeta crema. Los errores
se muestran en un aviso con role=alert y el foco de teclado siempre se ve."
```

---

## Task 11: Middleware, panel autenticado y prueba de punta a punta

El middleware corre en el edge, antes de que exista la página: no puede consultar Postgres. Sólo mira si la cookie está, y con eso evita renderizar el panel entero para alguien que ni siquiera intentó entrar. La verificación de verdad — que el token exista, no esté vencido y el usuario siga activo — la hace `requerirSesion()` contra la base, en cada página y en cada acción.

**Files:**
- Create: `middleware.ts`
- Create: `app/admin/(panel)/layout.tsx`
- Create: `app/admin/(panel)/page.tsx`

**Interfaces:**
- Consumes: `NOMBRE_COOKIE` (el valor literal `"dim_sesion"`, ver nota en el paso 1), `requerirSesion` de `lib/auth/sesion-actual.ts`, `cerrarSesion` de `app/admin/acciones.ts`.
- Produces: las rutas `/admin` (protegida) y el corte de `/admin/*` en el middleware.

- [ ] **Step 1: Escribir el middleware**

Crear `middleware.ts` en la raíz del proyecto (al lado de `next.config.ts`):

```ts
import { NextResponse, type NextRequest } from "next/server";

// El nombre va repetido a propósito y no importado de lib/auth/cookies.ts: ese
// módulo importa `next/headers`, que no existe en el runtime del middleware.
const NOMBRE_COOKIE = "dim_sesion";

export function middleware(pedido: NextRequest) {
  const { pathname } = pedido.nextUrl;

  // El login tiene que quedar afuera, si no se redirige a sí mismo para
  // siempre.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Chequeo optimista: acá sólo se ve si la cookie está, porque el middleware
  // no tiene acceso a la base. Que el token sea válido lo decide
  // requerirSesion() cuando se renderiza la página.
  if (pedido.cookies.has(NOMBRE_COOKIE)) {
    return NextResponse.next();
  }

  const destino = pedido.nextUrl.clone();
  destino.pathname = "/admin/login";
  destino.search = "";
  return NextResponse.redirect(destino);
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 2: Escribir el layout del panel autenticado**

Crear `app/admin/(panel)/layout.tsx`:

```tsx
import { requerirSesion } from "@/lib/auth/sesion-actual";
import { cerrarSesion } from "../acciones";

// `(panel)` agrupa todo lo que exige sesión. El login queda afuera del grupo,
// así que no pasa por este layout y no se pide sesión a sí mismo.
export default async function LayoutPanel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sesion = await requerirSesion();

  return (
    <div className="flex-1 flex flex-col">
      <header className="border-b border-white/10 px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3 min-w-0">
          <span
            className="text-xl font-medium text-white tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            DIM
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 truncate">
            Gestión de contenido
          </span>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="hidden sm:block text-sm text-white/70">{sesion.nombre}</span>
          <form action={cerrarSesion}>
            <button
              type="submit"
              className="text-xs font-semibold text-white/70 hover:text-[#F26A21] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26A21] rounded"
            >
              Salir
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 px-5 lg:px-8 py-10">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Escribir el tablero**

Crear `app/admin/(panel)/page.tsx`:

```tsx
import type { Metadata } from "next";
import { sesionActual } from "@/lib/auth/sesion-actual";

export const metadata: Metadata = {
  title: "Panel — DIM",
  robots: { index: false, follow: false },
};

const SECCIONES = [
  { titulo: "Novedades", detalle: "Notas, imágenes y fechas de publicación." },
  { titulo: "Coberturas", detalle: "Obras sociales, prepagas y validez de las órdenes." },
  { titulo: "Sedes", detalle: "Direcciones, teléfonos y horarios de atención." },
  { titulo: "Usuarios", detalle: "Quién entra al panel y con qué permisos." },
];

export default async function PaginaPanel() {
  // El layout ya llamó a requerirSesion(); acá sesionActual() sale del caché
  // de ese mismo render y no vuelve a consultar la base.
  const sesion = await sesionActual();

  return (
    <div className="max-w-4xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
        Sesión iniciada como {sesion?.rol}
      </p>
      <h1
        className="text-[2.25rem] leading-[1.1] font-light text-white tracking-[-0.02em] mb-3"
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
      >
        Hola, <em className="italic text-[#F26A21]">{sesion?.nombre.split(" ")[0]}</em>.
      </h1>
      <p className="text-white/60 font-light mb-10 max-w-lg">
        Todavía no hay nada para editar. Estas son las secciones que van a vivir acá.
      </p>

      <ul className="grid sm:grid-cols-2 gap-3">
        {SECCIONES.map((seccion) => (
          <li
            key={seccion.titulo}
            className="border border-white/10 rounded-2xl px-5 py-4"
          >
            <p className="text-white font-medium mb-1">{seccion.titulo}</p>
            <p className="text-sm text-white/50 font-light leading-relaxed mb-3">
              {seccion.detalle}
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              En camino
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 4: Verificar que compila y buildea**

```bash
npx tsc --noEmit
npm run build
```

Esperado: sin errores. `/admin` y `/admin/login` aparecen como `ƒ (Dynamic)`; `/`, `/especialidades-medicas`, `/coberturas-medicas`, `/novedades`, `/nuestros-centros-y-horarios`, `/estudios-medicos-y-preparaciones` y `/estudios-y-preparaciones-de-laboratorio` siguen con `○ (Static)`. Aparece una línea de `Middleware`.

- [ ] **Step 5: Prueba de punta a punta en el navegador**

```bash
npm run dev
```

Recorrer, en este orden:

1. Ir a `http://localhost:3000/admin` sin cookie → redirige a `/admin/login`. Sin bucle de redirecciones.
2. Entrar con el usuario de la Tarea 8 → llega a `/admin` y se ve "Hola, <nombre>." con las cuatro tarjetas.
3. Recargar `/admin` → sigue adentro, no vuelve a pedir login.
4. En DevTools → Application → Cookies: `dim_sesion` está, con `HttpOnly` ✓, `SameSite: Lax`, `Path: /` y expiración a 7 días. En la consola, `document.cookie` **no** la muestra.
5. En Drizzle Studio, mirar la tabla `sesiones`: hay una fila y su `id` es un hexadecimal de 64 caracteres distinto del valor de la cookie.
6. Ir a `http://localhost:3000/` → el sitio público se ve normal, con Header y Footer, sin rastros del panel.
7. Clic en "Salir" → vuelve a `/admin/login`, la cookie desapareció y la fila de `sesiones` también.
8. Volver a `/admin` → redirige al login otra vez.
9. Entrar de nuevo y, con la sesión abierta, poner `activo = false` en la fila del usuario desde Drizzle Studio. Recargar `/admin` → redirige al login, aunque la cookie siga estando. Volver a poner `activo = true`.

- [ ] **Step 6: Commit**

```bash
git add middleware.ts "app/admin/(panel)"
git commit -m "feat: proteger el panel y agregar el tablero de arranque

El middleware sólo mira si la cookie está; que el token valga y el usuario
siga activo lo decide requerirSesion() contra la base en cada render."
```

- [ ] **Step 7: Desplegar y verificar en producción**

Antes de pushear, confirmar que `DATABASE_URL` está cargada en Vercel para Production (paso 4 del prerrequisito). Después:

```bash
git push
```

Cuando termine el deploy, repetir en la URL de producción los pasos 1, 2, 4 y 7 de la verificación anterior. Chequear además que la cookie tenga `Secure` ✓ (en local no lo tiene, y está bien: no hay HTTPS).

---

## Qué queda afuera de este plan

Estas etapas del spec siguen pendientes y cada una va a necesitar su propio plan:

- **Etapa 3** — Migrar el contenido que hoy vive en el código: 43 novedades de `lib/novedades.ts`, ~130 coberturas de `lib/coverages.ts` y 16 sedes del array `CENTRES` de `components/CentresGrid.tsx`.
- **Etapas 4 a 6** — El ABM de coberturas, sedes y novedades, con subida de imágenes a Vercel Blob y sanitización de HTML del lado del servidor.
- **Etapa 7** — La pantalla de usuarios, para dar de alta gente sin el script de la Tarea 8.
- **Etapa 8** — Conectar el sitio público a la base y partir el índice del buscador global.
- **Etapa 9** — Borrar los archivos de datos que quedaron sin uso.
