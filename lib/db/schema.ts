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
  rol: text("rol", { enum: ["admin", "editor"] })
    .notNull()
    .default("editor"),
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
    creadaEn: timestamp("creada_en", { withTimezone: true })
      .notNull()
      .defaultNow(),
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
