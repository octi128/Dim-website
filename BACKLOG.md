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
- **Actualización tras la migración de novedades**: el problema es más grande de
  lo que decía este ítem. Ya son **seis** las rutas que hornean datos de Sanity
  en build — se sumaron `/`, `/novedades` y las 41 de `/novedades/[slug]`. Y hay
  un segundo nivel: **`revalidate: false` guarda la respuesta en
  `.next/cache/fetch-cache`, que sobrevive entre builds**. Está verificado: se
  cargó contenido nuevo en el Studio, se corrió `npm run build` y las páginas
  salieron con el dato viejo; recién apareció después de `rm -rf .next/cache`.
  O sea que el Deploy Hook por sí solo puede no alcanzar, porque Vercel restaura
  la caché de build entre deploys. Hay que verificar en el proyecto real si el
  rebuild disparado por el webhook trae el contenido nuevo, y si no, resolverlo
  —con revalidación por tag, o forzando build limpio en ese hook—.

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

---

## 6. SEO y contenido de novedades

Las 41 páginas individuales de novedades se construyeron pensando en
posicionamiento. La estructura está, el contenido que la hace funcionar no.

### 6.1 El interlinkeado hacia páginas de servicio está sin cargar

- **Qué**: el campo `paginasRelacionadas` permite elegir hasta cuatro páginas del
  sitio que se muestran al pie de cada novedad. Hoy lo usa **una sola de las 41**
  (`yogaterapia`, que se cargó como prueba y linkea a resonancia, tomografía y
  medicina nuclear). En las otras 40 la sección no se renderiza. Sin esas
  elecciones, las novedades no reparten autoridad hacia las páginas de servicio,
  que era el objetivo del campo.
- **Dónde**: campo en
  [sanity/schemaTypes/novedad.ts:210](sanity/schemaTypes/novedad.ts#L210); render
  en [app/(sitio)/novedades/[slug]/page.tsx](app/(sitio)/novedades/[slug]/page.tsx).
- **Por qué quedó pendiente**: elegir qué linkear en cada novedad es una decisión
  editorial, una por una. No se puede derivar del contenido sin inventar
  criterios.

### 6.2 El cuerpo de las 41 novedades no tiene ningún link contextual

- **Qué**: **cero** de las 41 tienen links dentro del texto — verificado contando
  los bloques con `markDefs` en Sanity. Vienen de texto plano migrado. El schema
  ya soporta links inline en Portable Text y `CuerpoNovedad` ya los renderiza,
  con `target="_blank"` y `rel` correctos para los externos. Hay que agregarlos a
  mano desde el Studio. Un link dentro de un párrafo, rodeado de texto que le da
  contexto, pesa más para SEO que uno suelto en un bloque al pie.
- **Dónde**: anotación `link` en
  [sanity/schemaTypes/novedad.ts](sanity/schemaTypes/novedad.ts); render en
  [components/CuerpoNovedad.tsx](components/CuerpoNovedad.tsx).
- **Por qué quedó pendiente**: mismo motivo que 6.1 — es trabajo editorial sobre
  41 textos, no una transformación automatizable.

### 6.3 El bloque `ctaTurno` insertable casi no se usa

- **Qué**: el cuerpo admite insertar un bloque de llamado a la acción en
  cualquier punto del texto, con botón al Portal de Turnos. Lo usa **una sola de
  las 41** (`yogaterapia`, la de prueba). Las otras 40 tienen únicamente el CTA
  fijo del pie, que quien abandona la lectura a mitad nunca ve.
- **Dónde**: bloque en
  [sanity/schemaTypes/novedad.ts:177](sanity/schemaTypes/novedad.ts#L177); render
  en [components/CuerpoNovedad.tsx](components/CuerpoNovedad.tsx).
- **Por qué quedó pendiente**: dónde cortar el texto para meter un CTA es una
  decisión de redacción. Ponerlo automático en todas —después del primer párrafo,
  por ejemplo— sería peor que no ponerlo.

### 6.4 Falta definir el dominio canónico

- **Qué**: el proyecto no declara su propia URL en ningún lado: no hay
  `metadataBase` en `app/layout.tsx` ni variable de entorno con el dominio. Por
  eso las 41 páginas salen sin `openGraph.url`, sin `mainEntityOfPage` y sin
  `publisher.logo` en el JSON-LD. Tampoco hay `alternates.canonical` en ninguna
  página del sitio. Lo que **sí** funciona es la imagen al compartir: `urlFor()`
  devuelve una URL absoluta del CDN de Sanity, así que la preview de WhatsApp
  sale completa.
- **Dónde**: el comentario que lo documenta está en
  [app/(sitio)/novedades/[slug]/page.tsx:53](app/(sitio)/novedades/[slug]/page.tsx#L53),
  arriba de `generateMetadata`.
- **Por qué quedó pendiente**: el dominio definitivo no está decidido. Se
  prefirió omitir los campos antes que hornear una URL canónica equivocada en 41
  páginas, que es peor que no tenerla.

### 6.5 No existe `sitemap.ts` ni `robots.ts`

- **Qué**: el proyecto no tiene ninguno de los dos, ni sus equivalentes
  estáticos en `public/`. Para un sitio con 41 páginas nuevas pensadas para
  posicionar, Google no tiene un mapa de qué existe ni instrucciones de rastreo.
- **Dónde**: faltarían en [app/](app/) como `sitemap.ts` y `robots.ts`.
- **Por qué quedó pendiente**: los dos necesitan la URL canónica del sitio, así
  que dependen de 6.4. Una vez definido el dominio, los dos son cortos: las rutas
  estáticas están en `app/` y los slugs de novedades ya los devuelve
  `SLUGS_NOVEDADES_QUERY`.

### 6.6 Diez resúmenes se truncaron automáticamente al migrar

- **Qué**: el campo `resumen` tope en 200 caracteres y se llenó con el primer
  párrafo del cuerpo. En diez novedades ese párrafo era más largo y el script
  cortó en el último espacio antes de 197, agregando "…". Varias cortan justo
  donde el párrafo anunciaba una lista, así que el resumen queda colgado. Los
  diez, por slug:

  | Slug | Caracteres |
  | --- | --- |
  | `chequeo-de-salud-sexual` | 192 |
  | `comenzamos-a-realizar-antropometria` | 195 |
  | `dengue-reforcemos-los-cuidados` | 197 |
  | `esteatosis-hepatica-en-dim` | 197 |
  | `incorporamos-kinesiologia-por-atm` | 192 |
  | `nueva-especialidad-cirugia-pediatrica` | 191 |
  | `nuevo-estudio-doppler-oftalmologico` | 193 |
  | `nuevo-tratamiento-de-kinesiologia-mep` | 195 |
  | `osteopatia-en-kinesiologia-de-avanzada` | 196 |
  | `todos-tus-informes-100-digitales-con-dim-verde` | 197 |

- **Dónde**: campo `resumen` en
  [sanity/schemaTypes/novedad.ts:65](sanity/schemaTypes/novedad.ts#L65), cuya
  descripción ya avisa al editor que algunos se generaron automáticamente.
- **Por qué quedó pendiente**: reescribirlos es redacción. El resumen es lo que
  se ve en la tarjeta del listado, en el carrusel del home y como
  `og:description` al compartir, así que los diez están expuestos en tres lugares.

---

## 7. Las fechas de novedades tienen el día inventado

- **Qué**: el contenido de origen sólo guardaba mes y año ("Julio 2026"). El
  schema pide un `date` completo y lo usa para ordenar, así que la migración
  asignó un día por novedad con el único fin de reproducir el orden del listado:
  a las N novedades de un mismo mes les dio días N, N-1 … 1. **Diecinueve de las
  41 tienen un día distinto de 01**, que son las que compartían mes con otra. En
  pantalla nunca se muestra la fecha completa —`mesYAnio()` la recorta—, pero
  **el JSON-LD la publica en `datePublished` y Open Graph en `publishedTime`**.
  O sea que los buscadores y las redes reciben un día que nunca existió.
- **Dónde**: [lib/fecha.ts:39](lib/fecha.ts#L39) explica el recorte;
  [app/(sitio)/novedades/[slug]/page.tsx:144](app/(sitio)/novedades/[slug]/page.tsx#L144)
  (`datePublished`) y
  [app/(sitio)/novedades/[slug]/page.tsx:84](app/(sitio)/novedades/[slug]/page.tsx#L84)
  (`publishedTime`).
- **Por qué quedó pendiente**: omitir la fecha del JSON-LD sería peor —
  schema.org la pide para `Article` y sin ella el marcado pierde valor. La
  alternativa real es conseguir las fechas verdaderas, que es un dato que tiene
  que dar el cliente. Mientras tanto queda anotado para que nadie lo tome por
  exacto ni lo muestre completo en el front.

---

## 8. Imágenes de novedades

### 8.1 Las 16 portadas son provisorias y están compartidas

- **Qué**: hay **16 assets distintos para 41 novedades** — verificado contando
  referencias únicas en Sanity. Cada portada representa una categoría temática,
  no la novedad, y las más usadas (`kinesiologia`, `laboratorio`) se repiten en
  cinco. El schema permite una foto propia por novedad y la descripción del campo
  se lo aclara al editor, pero nadie las reemplazó.
- **Dónde**: campo `portada` en
  [sanity/schemaTypes/novedad.ts:74](sanity/schemaTypes/novedad.ts#L74).
- **Por qué quedó pendiente**: hacen falta fotos reales, que son material que
  tiene que aportar DIM. El sitio funciona igual: en las tarjetas la imagen es
  decorativa (`alt=""`) justamente porque no aporta información propia.

### 8.2 Los 16 textos alternativos se generaron automáticamente

- **Qué**: las 41 novedades tienen `alt` cargado —ninguna quedó sin él—, pero los
  textos salieron de una tabla del script de migración, uno por categoría
  ("Sesión de kinesiología", "Laboratorio de análisis clínicos"). Describen la
  categoría, no la foto, y se repiten entre novedades. En la página individual
  ese `alt` sí se usa, porque ahí la imagen se presenta sola y a tamaño grande.
- **Dónde**: campo `alt` dentro de `portada` en
  [sanity/schemaTypes/novedad.ts](sanity/schemaTypes/novedad.ts).
- **Por qué quedó pendiente**: quedan bien mientras las portadas sean genéricas,
  pero en cuanto se reemplacen por fotos propias (8.1) dejan de describir lo que
  se ve. Conviene revisarlos junto con esa carga, no antes.

---

## 9. Duplicaciones e inconsistencias asumidas

A diferencia de la sección 1, acá no hay riesgo de divergencia silenciosa de
datos: son decisiones tomadas a propósito, anotadas para que no se lean como
descuidos.

### 9.1 La lista de páginas del sitio vive en dos lugares

- **Qué**: las 16 páginas que se pueden elegir en `paginasRelacionadas` están
  escritas dos veces: como `options.list` del schema (lo que ve el editor) y como
  el mapa `PAGINAS_DEL_SITIO` (lo que usa el front para resolver el nombre
  legible). Ambas listas tienen hoy 16 entradas y coinciden.
- **Dónde**: [sanity/schemaTypes/novedad.ts:210](sanity/schemaTypes/novedad.ts#L210)
  y [sanity/lib/queries.ts:308](sanity/lib/queries.ts#L308).
- **Por qué quedó pendiente**: no se puede evitar sin que el Studio importe del
  front o al revés, y ese acoplamiento es peor que la duplicación. **Al agregar
  una página hay que tocar los dos lados.** El modo de falla es benigno y está
  elegido así: si sólo se toca el schema, el editor puede elegir la ruta pero el
  link no se renderiza —falla en silencio, no rompe la página—.

### 9.2 La grilla de novedades y el bloque de relacionadas usan markup distinto

- **Qué**: el listado de `/novedades` arma las tarjetas con un `<div>` y las
  tarjetas de "Otras novedades" de la página individual usan `<ul>`/`<li>`, con
  las mismas clases de grilla. Inconsistencia semántica menor: las dos son listas
  de novedades y deberían marcarse igual.
- **Dónde**: [components/NovedadesList.tsx:18](components/NovedadesList.tsx#L18)
  contra
  [app/(sitio)/novedades/[slug]/page.tsx:349](app/(sitio)/novedades/[slug]/page.tsx#L349).
- **Por qué quedó pendiente**: se decidió explícitamente no tocar el markup de la
  grilla al sacar el modal, para que ese diff mostrara sólo el cambio de
  comportamiento. Unificar hacia `<ul>`/`<li>` es de bajo riesgo y mejora lo que
  anuncia un lector de pantalla.

---

## 10. Limitación conocida del scroll suave en anclas

- **Qué**: el scroll suave de los anclas internos lo resuelve un componente
  cliente que engancha un listener delegado en un efecto. Eso significa que
  **depende de que React haya hidratado**: entre el primer paint y la
  hidratación, un click en un ancla cae en el salto nativo instantáneo del
  navegador. Es una ventana de milisegundos y el fallback es correcto —aterriza
  en el lugar justo, sólo que sin animación—.
- **Dónde**: [components/ScrollSuaveEnAnclas.tsx](components/ScrollSuaveEnAnclas.tsx),
  montado en [app/(sitio)/layout.tsx:50](app/(sitio)/layout.tsx#L50).
- **Por qué quedó pendiente**: es inherente a cualquier solución en JS y no tiene
  arreglo dentro de ese enfoque. La alternativa en CSS —`scroll-behavior` en
  `html`— no tiene esta ventana pero rompe las navegaciones entre páginas, que es
  un problema mucho peor y constante; está medido y documentado en el comentario
  del componente. Queda anotado para que nadie lo "arregle" volviendo al CSS.
