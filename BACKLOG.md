# Backlog técnico — DIM Website

Deuda técnica relevada durante la migración de contenido a Sanity. Cada ítem
dice **qué** es, **dónde** está y **por qué** quedó pendiente.

Las referencias de línea corresponden al estado del repo al momento de escribir
este documento: si un archivo cambia, la línea puede correrse.

---

## 1. Fuentes de datos duplicadas

Son los casos donde el mismo dato vive en dos lugares y ya empezaron a
divergir. Es la deuda de mayor riesgo del backlog: alguien edita en Sanity, ve
el cambio en una pantalla y no en otra.

### 1.1 El buscador global sigue leyendo las coberturas del archivo

- **Qué**: la página `/coberturas-medicas` ya lee las 104 coberturas de Sanity,
  pero el buscador global las sigue indexando desde `lib/coverages.ts`. Son dos
  fuentes del mismo dato. Si se carga una cobertura nueva en el CMS, aparece en
  el directorio y no en el buscador.
- **Dónde**: [lib/search.ts:5](lib/search.ts#L5) (import) y
  [lib/search.ts:195](lib/search.ts#L195) (indexado).
- **Por qué quedó pendiente**: `lib/search.ts` arrastra los cinco archivos de
  datos (≈700 entradas) y justamente por eso no se importa de forma estática:
  [components/SiteSearch.tsx:19](components/SiteSearch.tsx#L19) lo carga con
  `import()` dinámico la primera vez que se abre el buscador. Migrar las
  coberturas a Sanity implica decidir antes cómo se resuelve ese índice —si se
  hornea en build, si se arma como ruta, o si se consulta en runtime— sin
  volver a meter ese peso en el bundle de todas las páginas. Es un cambio de
  arquitectura del buscador, no un reemplazo de import.

### 1.2 Las 4 tarjetas de sede del home están hardcodeadas

- **Qué**: el home muestra cuatro sedes escritas a mano en el JSX, sin relación
  con las sedes de Sanity. Además **no coinciden** con las cuatro marcadas como
  destacadas en el CMS:

  | Home (hardcodeado) | Destacadas en Sanity |
  | --- | --- |
  | DIM Alta Complejidad | DIM Alta Complejidad ✅ |
  | DIM Rivadavia | DIM Rivadavia ✅ |
  | DIM Mujer | DIM CEPEM ❌ |
  | DIM Odontología | DIM Sede Central ❌ |

  El flag `destacada` del schema hoy no gobierna nada.
- **Dónde**: [app/(sitio)/page.tsx:112-147](app/(sitio)/page.tsx#L112-L147).
- **Por qué quedó pendiente**: la migración de sedes cubrió el listado de
  `/nuestros-centros-y-horarios`; el home tiene su propio markup con imágenes de
  fondo y colores por tarjeta que no están modelados en el schema de `sede`.
  Conectarlo requiere decidir esos campos primero.

### 1.3 El marquee de coberturas del home tiene 14 marcas a mano

- **Qué**: la cinta de obras sociales del home lista 14 marcas hardcodeadas,
  independientes de las 104 coberturas de Sanity.
- **Dónde**: [components/home/CoberturasMarquee.tsx:9-24](components/home/CoberturasMarquee.tsx#L9-L24).
- **Por qué quedó pendiente**: el campo `destacada` del schema `cobertura` fue
  pensado exactamente para esto (hay 10 marcadas), pero el marquee muestra 14 y
  algunas de esas marcas no existen en el listado o están escritas distinto (ver
  sección 3). Hay que resolver primero las discrepancias de contenido con el
  cliente, porque migrarlo tal cual congelaría los errores.

### 1.4 El acordeón de especialidades del home tiene 5 grupos a mano

- **Qué**: el acordeón agrupa especialidades en cinco bloques escritos en el
  componente ("Clínica y prevención", "Diagnóstico por imágenes", "Salud de la
  mujer", "Cirugía y tratamientos", "Odontología"), sin relación con las 68
  especialidades de `lib/specialties.ts`.
- **Dónde**: [components/home/EspecialidadesAccordion.tsx:6](components/home/EspecialidadesAccordion.tsx#L6);
  el dato real en [lib/specialties.ts:11](lib/specialties.ts#L11).
- **Por qué quedó pendiente**: no existe todavía un modelo de agrupación. Las
  especialidades son una lista plana sin categoría, así que los cinco grupos son
  una decisión editorial que hoy no está representada en ningún dato.

---

## 2. Copy con números hardcodeados

### 2.1 "104" escrito a mano en la página de coberturas

- **Qué**: el `metadata.description` y el párrafo del hero dicen "más de 104"
  como texto fijo, mientras el STAT de la misma pantalla ya se deriva de Sanity.
  Si se publica la cobertura 105, el stat dice `+105` y el párrafo justo arriba
  sigue diciendo 104 — la contradicción queda visible en la misma pantalla.
- **Dónde**: [app/(sitio)/coberturas-medicas/page.tsx:13](app/(sitio)/coberturas-medicas/page.tsx#L13)
  y [app/(sitio)/coberturas-medicas/page.tsx:123](app/(sitio)/coberturas-medicas/page.tsx#L123).
- **Por qué quedó pendiente**: se decidió no tocar copy en la pasada de
  migración de datos. El `metadata` además requiere pasar a `generateMetadata`
  para poder leer el conteo (sigue siendo estático, pero es otro cambio). Queda
  anotado para cuando se toque el Header.

---

## 3. Discrepancias de contenido a confirmar con el cliente

Ninguna de estas se puede resolver desde el código: falta la decisión de
negocio o el dato de origen.

### 3.1 OSDE aparece en el home pero no en el listado

- **Qué**: el marquee muestra "OSDE", pero entre las 104 coberturas solo existen
  **OSDE BINARIO** y **OSDEPYM**. O falta cargar OSDE, o el marquee promete una
  cobertura que no se acepta.
- **Dónde**: [components/home/CoberturasMarquee.tsx:10](components/home/CoberturasMarquee.tsx#L10).
- **Por qué quedó pendiente**: es una pregunta comercial, no técnica. Agregarla
  o sacarla sin confirmar tiene consecuencias para el paciente.

### 3.2 Mismas coberturas escritas distinto entre el home y el listado

- **Qué**:

  | Marquee (home) | Listado (Sanity) |
  | --- | --- |
  | Medifé | Medife |
  | Accord Salud | ACCORD |
  | Premedic | Premedic Medicina Privada |

- **Dónde**: [components/home/CoberturasMarquee.tsx:9-24](components/home/CoberturasMarquee.tsx#L9-L24)
  contra los documentos `cobertura` en Sanity.
- **Por qué quedó pendiente**: hay que definir cuál es el nombre oficial de cada
  prestador antes de unificar. Es requisito para poder alimentar el marquee
  desde `destacada` (ítem 1.3).

### 3.3 Cantidad de profesionales sin fuente

- **Qué**: el repo declara tres cifras distintas — "750+ profesionales" en el
  metadata global, "850 médicos" en el home y "1500 profesionales" en
  especialidades. El sitio viejo en producción dice 750+.
- **Dónde**: [app/layout.tsx:8](app/layout.tsx#L8),
  [app/(sitio)/page.tsx:168](app/(sitio)/page.tsx#L168),
  [app/(sitio)/especialidades-medicas/page.tsx:11](app/(sitio)/especialidades-medicas/page.tsx#L11)
  y [app/(sitio)/especialidades-medicas/page.tsx:64](app/(sitio)/especialidades-medicas/page.tsx#L64).
- **Por qué quedó pendiente**: no hay fuente que respalde ninguno de los tres
  números. Es un dato que tiene que dar el cliente.

### 3.4 "+350 especialidades" contra 68 reales

- **Qué**: varias pantallas prometen "más de 350 especialidades";
  `lib/specialties.ts` tiene 68 entradas.
- **Dónde**: [app/(sitio)/page.tsx:259](app/(sitio)/page.tsx#L259),
  [app/(sitio)/enfermedades/page.tsx:103](app/(sitio)/enfermedades/page.tsx#L103),
  [app/(sitio)/enfermedades/buscar/page.tsx:146](app/(sitio)/enfermedades/buscar/page.tsx#L146),
  [app/(sitio)/enfermedades/[letra]/page.tsx:159](app/(sitio)/enfermedades/[letra]/page.tsx#L159);
  el dato en [lib/specialties.ts:11](lib/specialties.ts#L11).
- **Por qué quedó pendiente**: la diferencia puede ser que el 350 cuente
  "especialidades + estudios" y el archivo solo especialidades, o que falte
  cargar contenido. Hay una pista de que ya se detectó: el índice A-Z del home
  está comentado a propósito, con la nota de que las 22 letras "prometen más de
  350 especialidades que todavía no existen del otro lado del link"
  ([app/(sitio)/page.tsx:287](app/(sitio)/page.tsx#L287)).

### 3.5 Datos de contacto contradictorios

- **Qué**: cinco casos sueltos, todos en producción:
  - **Cirugías estéticas**: dos números de WhatsApp distintos para la misma
    sección — `5491121705181` en la página y `5491171529032` en el listado.
  - **Medicina nuclear**: usa un short link (`wa.link/ldwg9m`) que no permite
    verificar a qué número apunta, y además es `http://`.
  - **Coberturas**: el CTA de WhatsApp apunta a `5491130000000`, un placeholder
    con seis ceros que está publicado.
  - **Mutual AMEDIM**: la tarjeta de teléfono muestra "5901-2121" pero el `href`
    es `tel:+5491155093539`, que es el número de WhatsApp. El texto visible y el
    destino no coinciden.
  - **0800 999 1800**: aparece dos veces en coberturas y en ningún otro lado del
    sitio. No está claro si es la línea vigente ni a qué área corresponde.
- **Dónde**: [app/(sitio)/cirugias-esteticas/page.tsx:14](app/(sitio)/cirugias-esteticas/page.tsx#L14)
  y [components/CirugiasEsteticasList.tsx:23-24](components/CirugiasEsteticasList.tsx#L23-L24);
  [app/(sitio)/medicina-nuclear/page.tsx:13](app/(sitio)/medicina-nuclear/page.tsx#L13);
  [app/(sitio)/coberturas-medicas/page.tsx:238](app/(sitio)/coberturas-medicas/page.tsx#L238);
  [app/(sitio)/mutual-amedim/page.tsx:54-58](app/(sitio)/mutual-amedim/page.tsx#L54-L58);
  [app/(sitio)/coberturas-medicas/page.tsx:135](app/(sitio)/coberturas-medicas/page.tsx#L135)
  y [app/(sitio)/coberturas-medicas/page.tsx:231](app/(sitio)/coberturas-medicas/page.tsx#L231).
- **Por qué quedó pendiente**: cada número tiene que confirmarlo el cliente. El
  placeholder de coberturas es el más urgente: hoy manda pacientes a un número
  inexistente. Estos datos son candidatos naturales a vivir en el singleton de
  configuración de Sanity una vez confirmados.

---

## 4. Bugs preexistentes (no introducidos por la migración)

### 4.1 El link a la app manda a Google en desktop

- **Qué**: el componente decide el destino leyendo el `userAgent`. En desktop no
  matchea ni iOS ni Android, y el fallback es una búsqueda de Google
  (`google.com/search?q=descargar+DIM+Salud`) en vez de una tienda o una landing
  propia.
- **Dónde**: [components/AppStoreLink.tsx:17](components/AppStoreLink.tsx#L17).
- **Por qué quedó pendiente**: hay que definir el destino correcto para desktop
  (¿la web del portal? ¿una landing con los dos badges?). Es decisión de
  producto, no un bug de una línea.

### 4.2 Las 133 enfermedades linkean a una ruta que no existe

- **Qué**: la sección de enfermedades enlaza a
  `/enfermedades/enfermedad/<slug>`, una ruta que no existe en `app/`. Todos
  esos links dan 404.
- **Dónde**: ya está documentado en
  [lib/search.ts:188-190](lib/search.ts#L188-L190) — el buscador global lo
  esquiva a propósito apuntando al listado en lugar del detalle.
- **Por qué quedó pendiente**: falta construir la página de detalle de
  enfermedad, con su contenido. Es una feature, no un fix.

### 4.3 Cinco links del footer apuntan a rutas inexistentes

- **Qué**: DIM Once, Docencia, Receta Digital, Pacientes Prioritarios y DIM
  Verde están en el footer de todas las páginas y todos dan 404.
- **Dónde**: [components/Footer.tsx:31](components/Footer.tsx#L31),
  [:40](components/Footer.tsx#L40), [:50](components/Footer.tsx#L50),
  [:51](components/Footer.tsx#L51), [:52](components/Footer.tsx#L52).
- **Por qué quedó pendiente**: hay que decidir por cada uno si se construye la
  página o se saca del footer. Sacarlos es trivial; la pregunta es de contenido.

### 4.4 Nueve componentes huérfanos en `components/home/`

- **Qué**: `AppPromo`, `Centers`, `Coverages`, `DiseaseSearch`,
  `FeaturedBanners`, `Hero`, `News`, `Specialties` y `WhyDIM` no se importan
  desde ningún lado. Son la versión anterior de las secciones del home. No
  llegan al bundle, pero confunden: `Coverages.tsx` sigue importando
  `lib/coverages.ts` y aparece en cualquier búsqueda de "quién usa las
  coberturas".
- **Dónde**: [components/home/](components/home/).
- **Por qué quedó pendiente**: borrarlos es seguro pero conviene hacerlo en un
  commit propio y no mezclado con una migración de datos, para que el diff sea
  legible.

---

## 5. Pendientes de la migración a Sanity

### 5.1 `videoUrl` de sede no tiene render

- **Qué**: el schema de `sede` tiene un campo `videoUrl` que ninguna pantalla
  muestra. La query ya lo trae.
- **Dónde**: [sanity/schemaTypes/sede.ts](sanity/schemaTypes/sede.ts) y
  [sanity/lib/queries.ts:51](sanity/lib/queries.ts#L51). La descripción del
  campo en el Studio ya aclara que todavía no se muestra.
- **Por qué quedó pendiente**: falta definir dónde va el video (¿ficha de sede?
  ¿modal desde el listado?). El campo se dejó modelado para no tener que migrar
  el schema después.

### 5.2 Las 104 coberturas están sin logo

- **Qué**: el schema soporta logo por cobertura y el listado tiene el fallback a
  texto, pero no hay ninguna imagen cargada.
- **Dónde**: campo `logo` en
  [sanity/schemaTypes/cobertura.ts](sanity/schemaTypes/cobertura.ts); se trae en
  `COBERTURAS_QUERY` ([sanity/lib/queries.ts](sanity/lib/queries.ts)).
- **Por qué quedó pendiente**: no existe ninguna imagen de origen. Conseguir 104
  logos con derechos de uso es un trabajo de contenido, no de desarrollo. El
  listado funciona sin ellos.

### 5.3 El webhook de Sanity a Vercel no está configurado

- **Qué**: publicar en el CMS no dispara un rebuild. Como las páginas se hornean
  en build con `revalidate: false`, un cambio en Sanity **no se ve en el sitio**
  hasta el próximo deploy manual.
- **Dónde**: configuración de Vercel + Sanity (fuera del repo). El patrón de
  fetch está en [app/(sitio)/layout.tsx:25-31](app/(sitio)/layout.tsx#L25-L31),
  [app/(sitio)/nuestros-centros-y-horarios/page.tsx:26-28](app/(sitio)/nuestros-centros-y-horarios/page.tsx#L26-L28)
  y [app/(sitio)/coberturas-medicas/page.tsx:41-48](app/(sitio)/coberturas-medicas/page.tsx#L41-L48).
- **Por qué quedó pendiente**: requiere acceso al proyecto de Vercel para crear
  el Deploy Hook y pegarlo en los webhooks de Sanity. **Es bloqueante para
  entregar el CMS al cliente**: sin esto, editar en el Studio parece no tener
  efecto.

### 5.4 `portalUrl` quedó como dato huérfano en el documento de configuración

- **Qué**: la URL del portal de turnos se centralizó como constante de código en
  `lib/contacto.ts` y el campo `portalUrl` se eliminó del schema. Borrar el campo
  del schema **no borra el dato del documento**: el `configuracionSitio`
  publicado en Sanity conserva el valor. Queda invisible en el Studio y fuera de
  `CONFIGURACION_QUERY`, pero sigue presente si se consulta el documento por API.
- **Dónde**: documento `configuracionSitio` en el dataset `production`. La
  decisión está documentada en
  [lib/contacto.ts](lib/contacto.ts) y en el comentario de
  [app/(sitio)/layout.tsx](app/(sitio)/layout.tsx).
- **Por qué quedó pendiente**: no rompe nada ni requiere migración, así que
  limpiarlo no era parte del alcance. Se resuelve con un `unset` puntual sobre el
  documento cuando se haga otra pasada de mantenimiento del dataset. Queda
  anotado para que no sorprenda a quien inspeccione el documento por API y
  encuentre un campo que el schema ya no declara.
