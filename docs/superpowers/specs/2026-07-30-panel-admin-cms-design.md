# Panel de administración CMS — DIM Centros de Salud

**Fecha:** 2026-07-30
**Estado:** diseño aprobado, pendiente de plan de implementación

---

## Problema

El sitio de DIM es hoy 100 % estático: todo el contenido vive en archivos TypeScript versionados en git.

| Contenido | Dónde vive hoy | Volumen |
|---|---|---|
| Novedades (blog) | `lib/novedades.ts` | 43 entradas |
| Coberturas médicas | `lib/coverages.ts` | ~130 entradas |
| Sedes y horarios | array `CENTRES` dentro de `components/CentresGrid.tsx` | 16 entradas |

Cambiar una novedad, corregir la validez de una obra social o actualizar el horario de una sede requiere hoy un desarrollador, un commit y un deploy. DIM necesita poder hacerlo por su cuenta.

Este spec cubre la primera capa de datos dinámica del proyecto: base de datos, autenticación y un panel de administración con altas, bajas y modificaciones para esos tres contenidos.

## Objetivo

Un panel accesible fuera del sitio público, con login propio, donde personal de DIM administre novedades, sedes y coberturas sin intervención técnica y sin redeployar.

## Fuera de alcance

- Especialidades, estudios médicos, estudios de laboratorio y enfermedades: siguen en archivos TypeScript.
- Novedades y sedes **no** se agregan al buscador global (hoy tampoco están). Es un agregado posterior si se quiere.
- Recuperación de contraseña por mail. Se resuelve con reseteo desde la sección Usuarios.
- Programación de publicaciones a futuro.
- Roles y permisos diferenciados. Todo usuario activo puede editar las tres secciones y administrar usuarios.

---

## Decisiones tomadas

| Decisión | Elegido | Por qué |
|---|---|---|
| Hosting | Vercel | Hosting nativo de Next.js; provee Postgres (Neon) y Blob sin infraestructura extra. |
| Construcción | Propia, no CMS de terceros | Solo 3 colecciones y ~190 registros. Permite que el panel tenga la identidad DIM y evita dependencia y costo de un proveedor externo. |
| Cuentas | Varias cuentas, un solo panel | Trazabilidad de quién editó qué; dar de baja a una persona sin afectar al resto. |
| Editor de novedades | Texto con formato (WYSIWYG) | El usuario final no es técnico. |
| Imágenes | Subida desde el panel a Vercel Blob | Publicar no debe depender de alguien técnico. |
| Flujo de publicación | Borrador → publicado | Evita que algo a medio escribir salga al aire. |
| Alta de usuarios | Desde el panel | DIM se maneja solo ante altas y bajas de personal. |
| Ubicación | Ruta oculta `/admin` en el mismo proyecto | Un solo deploy, sin DNS ni código duplicado. |

---

## Arquitectura

Una sola aplicación Next.js, un solo deploy.

```
dim-website/
├── app/…                  ← sitio público, estructura sin cambios
├── app/admin/…            ← layout propio, sin Header ni Footer públicos
├── db/schema.ts           ← definición de tablas (Drizzle)
├── db/migrations/…        ← SQL versionado en git
├── db/seed.ts             ← carga inicial desde los archivos actuales
└── lib/auth/…             ← sesiones, hashing, guardas
```

**Stack añadido**

- **Postgres (Neon vía Vercel)** con **Drizzle ORM**: consultas tipadas y migraciones en archivos SQL versionados. Nunca se modifica el esquema a mano en producción.
- **Vercel Blob** para imágenes subidas desde el panel. Las imágenes que ya existen en `public/` se quedan donde están.
- **Server Actions** para todas las escrituras. No se expone ninguna API REST pública de escritura.
- **Zod** para validación, compartida entre formulario y servidor.
- **Vitest** para los tests puntuales descritos más abajo.

**Aislamiento del panel**

- `middleware.ts` cubre `/admin/*`: sin sesión válida, redirige a `/admin/login`.
- `/admin/*` responde con `noindex, nofollow`.
- No se agrega a ningún sitemap ni se enlaza desde el sitio público.
- El layout de `/admin` no monta Header ni Footer del sitio.

**Requiere del titular de la cuenta:** provisionar la base Neon y el store de Blob desde Vercel, y cargar las variables de entorno correspondientes.

---

## Modelo de datos

Seis tablas.

### `novedades`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | serial PK | |
| `titulo` | text | |
| `fecha` | date | fecha real; el sitio deriva la etiqueta "Julio 2026" |
| `cuerpo_html` | text | HTML sanitizado |
| `imagen_url` | text | ruta en `public/` o URL de Blob |
| `cta_label` | text nullable | |
| `cta_href` | text nullable | |
| `cta_external` | boolean | |
| `app_download` | boolean | badge de descarga de la app |
| `destacada` | boolean | aparece en el home |
| `estado` | enum `borrador` \| `publicada` | |
| `creado_en` / `actualizado_en` | timestamp | |
| `actualizado_por` | FK → `usuarios.id` nullable | |

**Cambio respecto de hoy:** la fecha pasa de texto libre (`"Julio 2026"`) a fecha real. El sitio la renderiza igual, pero el orden deja de depender del `id` y se vuelve confiable.

**Sin `slug`:** el sitio no tiene páginas individuales de novedad — `/novedades` las muestra en una grilla y las abre en un modal. Agregar un slug sería un campo que nadie usa. Si más adelante cada novedad tiene su URL propia, se agrega entonces.

### `sedes`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | serial PK | |
| `nombre` | text | |
| `zona` | enum `Ramos Mejía` \| `Morón` \| `Buenos Aires` | |
| `direccion` | text | |
| `maps_url` | text | |
| `imagen_url` | text nullable | |
| `horario_semana` | text | ej. `"7:00 – 21:00"` o `"Abierto 24 horas"` |
| `horario_sabado` | text | |
| `horario_domingo` | text nullable | |
| `etiquetas` | text[] | ej. `["Imágenes", "Laboratorio"]` |
| `destacada` | boolean | |
| `orden` | integer | posición dentro de su zona |
| `activa` | boolean | desactivar oculta del sitio sin borrar |
| `actualizado_en` | timestamp | |
| `actualizado_por` | FK → `usuarios.id` nullable | |

Las tres zonas son fijas y no se administran desde el panel: agregar una zona nueva implica un cambio de código, porque el filtro del sitio y el agrupamiento del listado dependen de ellas. Con 16 sedes en 3 zonas estables, un ABM de zonas sería complejidad sin uso.

### `coberturas`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | serial PK | |
| `nombre` | text unique | |
| `validez` | integer | 30, 60 o 90 |
| `tipo` | enum `Prepaga` \| `Obra Social` \| `ART` \| `Mutual` \| `Hospital` \| `Programa` | |
| `actualizado_en` | timestamp | |
| `actualizado_por` | FK → `usuarios.id` nullable | |

Los seis tipos y los tres valores de validez (30, 60, 90) son fijos, por la misma razón que las zonas: el sitio los usa para colorear etiquetas y filtrar. Se eligen de una lista, no se escriben.

### `usuarios`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | serial PK | |
| `nombre` | text | |
| `email` | text unique | |
| `password_hash` | text | bcrypt |
| `activo` | boolean | |
| `creado_en` | timestamp | |

### `sesiones`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | text PK | hash del token; el token en claro solo vive en la cookie |
| `usuario_id` | FK → `usuarios.id` on delete cascade | |
| `expira_en` | timestamp | 7 días |
| `creada_en` | timestamp | |

### `intentos_login`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | serial PK | |
| `email` | text | |
| `intentado_en` | timestamp | |

Se limpian los registros con más de una hora de antigüedad al consultar.

---

## Pantallas del panel

Layout propio: fondo, tipografía y paleta DIM, sin el Header ni el Footer del sitio público.

### `/admin/login`
Email y contraseña. Nada más. Sin recuperación por mail: el reseteo lo hace otro usuario desde Usuarios.

### `/admin`
Accesos a las tres secciones de contenido, cantidad de borradores pendientes y últimos cambios con nombre de quien editó y fecha.

### `/admin/novedades`
Listado con miniatura, título, fecha y estado. Filtro todas / borradores / publicadas. Buscador por título. Acciones: editar, publicar, despublicar, borrar con confirmación que nombra la novedad.

### `/admin/novedades/nueva` y `/admin/novedades/[id]`
Formulario con:
- Título y fecha.
- Editor de texto con formato: negrita, cursiva, lista con viñetas y link. Usa la misma tipografía y estilos que el sitio, de modo que lo que se ve al escribir es lo que se publica.
- Imagen de portada: se arrastra y se sube. Valida tipo y peso en el navegador antes de subir, y de nuevo en el servidor al recibirla.
- Botón opcional: texto, destino, y si abre en pestaña nueva.
- Interruptores: destacada, badge de descarga de app.
- Guardar como borrador / Publicar.

### `/admin/sedes`
Listado agrupado por zona. Orden dentro de cada zona con flechas subir/bajar (no con un campo numérico). Alta, edición y desactivación. Desactivar oculta la sede del sitio sin borrarla.

### `/admin/coberturas`
Tabla, no un formulario por registro: son ~130 y cambian de a una. Buscador por nombre, edición en la misma fila (nombre, validez, tipo), fila de alta arriba, borrado con confirmación.

### `/admin/usuarios`
Listado con nombre, email y estado. Crear usuario, resetear contraseña, desactivar.

Dos restricciones, validadas en el servidor:
- Un usuario no puede desactivarse a sí mismo.
- No se puede dejar el panel sin ningún usuario activo.

---

## Cómo consume el sitio público

Las páginas que hoy leen archivos pasan a consultar la base desde Server Components, con el resultado cacheado por etiqueta. Al guardar en el panel, la Server Action invalida la etiqueta correspondiente y el sitio se actualiza en segundos. **Publicar no requiere redeploy.**

Lugares afectados:

| Lugar | Cambio |
|---|---|
| `/novedades` | Lee `novedades` con `estado = 'publicada'`, ordenadas por fecha desc. |
| Home | Novedades destacadas y carrusel, desde la misma fuente. |
| `/nuestros-centros-y-horarios` | `CentresGrid` deja de tener el array adentro y recibe las sedes activas por props desde el servidor. |
| `/coberturas-medicas` | Lee `coberturas`. |

### El buscador global

`lib/search.ts` arma hoy su índice importando estáticamente los cinco archivos de datos, coberturas incluidas. Al mover coberturas a la base, ese import deja de ser viable.

**Solución:** partir el índice en dos.

- **Parte estática** (especialidades, estudios, laboratorio, enfermedades, páginas): sigue exactamente como está, con los mismos imports y el mismo scoring.
- **Parte dinámica** (coberturas): llega por un endpoint JSON cacheado que `SiteSearch` pide la primera vez que se abre el buscador, en el mismo momento en que ya hace el `import()` diferido de `lib/search.ts`.

`buildIndex()` pasa a recibir las coberturas como argumento en lugar de importarlas. La misma invalidación que actualiza `/coberturas-medicas` invalida ese JSON.

Para quien usa el sitio no cambia nada: mismo tiempo de apertura del buscador, mismos resultados, mismo orden de grupos.

---

## Seguridad

- **Contraseñas** hasheadas con bcrypt. Nunca almacenadas ni registradas en texto plano. Mínimo de 10 caracteres.
- **Cookie de sesión** `httpOnly`, `secure`, `sameSite=lax`. El token no es legible desde JavaScript, de modo que un script inyectado no puede robarlo. En la base se guarda su hash, no el token.
- **Cerrar sesión borra la fila de `sesiones`**: la revocación es real, no solo del lado del navegador. Desactivar un usuario invalida sus sesiones activas.
- **Freno en el login:** más de 5 intentos fallidos sobre el mismo email en 15 minutos bloquean ese email por 15 minutos. El mensaje de error no distingue entre "email inexistente" y "contraseña incorrecta".
- **Cada Server Action revalida la sesión por su cuenta.** No se asume que la pantalla ya lo verificó, porque eso se puede saltear.
- **El HTML del editor se sanitiza en el servidor antes de guardar.** Lista blanca acotada: `p`, `strong`, `em`, `ul`, `ol`, `li`, `a` (con `href` validado). Sin esto, contenido pegado desde otra fuente podría inyectar un script en el sitio público.
- **Imágenes subidas:** solo `jpeg`, `png` y `webp`, hasta 4 MB, validando el tipo real del archivo y no la extensión ni el `Content-Type` declarado. El nombre de archivo lo genera el servidor; el que envía el navegador no se usa nunca.
- **Variables de entorno** (`DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, secreto de sesión, credenciales del primer usuario) fuera de git. `.env*` ya está en `.gitignore`.

---

## Carga inicial

Script `db/seed.ts`, idempotente, que se corre una vez y deja la base con todo el contenido existente.

- **43 novedades** desde `lib/novedades.ts`: convierte los bloques `{ p }` y `{ list }` a HTML, deduce la fecha real desde la etiqueta en español (`"Julio 2026"` → `2026-07-01`), y conserva imagen, CTA, `destacada` y `appDownload`. Todas entran como `publicada`.
- **16 sedes** desde el array `CENTRES` de `components/CentresGrid.tsx`, respetando el orden actual dentro de cada zona.
- **~130 coberturas** desde `lib/coverages.ts`, sin transformación.
- **Primer usuario** a partir de variables de entorno (email y contraseña inicial). Nunca escrito en el código.

**Limpieza posterior.** Una vez migrado y verificado en el sitio, se eliminan `lib/novedades.ts`, `lib/coverages.ts` y el array `CENTRES` de `CentresGrid.tsx`. Mantener las dos fuentes conviviendo garantiza que alguien edite la equivocada y no entienda por qué el sitio no cambia.

---

## Errores y validación

- Validación con Zod, mismas reglas en el formulario y en la Server Action.
- Si el guardado falla, **el contenido escrito no se pierde**: el formulario conserva su estado.
- Los mensajes nombran la causa concreta: "Ya existe un usuario con ese email", no "Error inesperado".
- Toda acción destructiva pide confirmación nombrando el registro afectado.
- Estados visibles de guardando, éxito y error en cada formulario.

---

## Pruebas

El proyecto no tiene infraestructura de tests hoy. No se monta un aparato completo. Se cubren con Vitest los tres puntos donde un error es silencioso y caro:

1. **Sesiones** — que una sesión vencida no autorice, que cerrar sesión revoque de verdad, que desactivar un usuario invalide sus sesiones.
2. **Sanitizado del editor** — que una etiqueta `script` o un `href` con `javascript:` no sobrevivan al guardado.
3. **Conversión de la migración** — bloques a HTML y etiqueta de fecha a fecha real. Corre una sola vez sobre 43 novedades; un error se las lleva puestas a todas.

El resto (formularios, listados, filtros, orden de sedes) se verifica manualmente.

---

## Etapas sugeridas

El plan de implementación detallado se escribe aparte. El orden de dependencias es:

1. Base de datos, esquema, migraciones y conexión.
2. Autenticación: usuarios, sesiones, login, middleware, layout del panel.
3. Seed: carga inicial de los tres contenidos y del primer usuario.
4. CRUD de coberturas (el más simple; valida el patrón de Server Actions y caché).
5. CRUD de sedes.
6. CRUD de novedades, editor de texto y subida de imágenes.
7. Sección Usuarios.
8. Conexión del sitio público a la base, incluido el buscador global.
9. Limpieza de los archivos de datos que quedan sin uso.
