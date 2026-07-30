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
