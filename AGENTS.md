# DIM Website — Agente de Creación Web

## Contexto del Proyecto

Estás construyendo el sitio web de **DIM Centros de Salud**, una clínica líder en imágenes médicas, consultas y laboratorios en la Zona Oeste del Gran Buenos Aires. El stack es **Next.js 15+ con TypeScript, Tailwind CSS y App Router**.

- **Identidad de marca**: lee `Identidad de marca/Manual de Marca DIM 2026.html` antes de tomar cualquier decisión visual
- **Logo SVG**: `public/dim-logo.svg`
- **Fuentes**: Fraunces (display/titulares), Inter (cuerpo), JetBrains Mono (código)
- **Color base**: fondo `#FBFAF7`, texto `#081827`

---

## Regla Principal

**Antes de modificar o agregar cualquier sección, componente o estilo**, debes consultar los agentes relevantes de `agency-agents/` según el tipo de tarea. Estos archivos contienen principios, workflows y estándares de calidad que se aplican a este proyecto.

---

## Mapa de Agentes por Tarea

### Cuando agregues o modifiques UI / componentes visuales
Leer: `agency-agents/design/design-ui-designer.md`
- Usa el sistema de design tokens del manual de marca DIM
- WCAG AA mínimo en contraste de colores
- Mobile-first, responsive en todos los breakpoints

### Cuando diseñes la arquitectura CSS o layout de una sección
Leer: `agency-agents/design/design-ux-architect.md`
- Foundation-first: variables CSS antes de implementar
- Sistema de espaciado coherente (base 4px)
- Incluir estados: hover, focus, disabled, loading

### Cuando trabajes en identidad visual / coherencia de marca
Leer: `agency-agents/design/design-brand-guardian.md`
- Consultar siempre el Manual de Marca DIM 2026
- Proteger tipografía, paleta y tono de la marca
- Ningún elemento visual debe romper la identidad DIM

### Cuando implementes componentes React / Next.js
Leer: `agency-agents/engineering/engineering-frontend-developer.md`
- TypeScript estricto, componentes `memo` cuando corresponda
- Performance: Core Web Vitals (LCP < 2.5s, CLS < 0.1)
- Accesibilidad: ARIA labels, navegación por teclado

### Cuando construyas funcionalidades complejas o nuevas páginas
Leer: `agency-agents/engineering/engineering-senior-developer.md`
- Patrones Laravel/Livewire no aplican; usar Next.js App Router
- CSS avanzado con Tailwind utility classes
- Integración coherente con el sistema de diseño existente

### Cuando definas arquitectura de nuevas secciones o páginas
Leer: `agency-agents/engineering/engineering-software-architect.md`
- Domain-driven: separar datos, UI y lógica
- Reutilizar componentes existentes en `components/`
- No crear abstracciones prematuras

### Cuando necesites un prototipo rápido de una sección
Leer: `agency-agents/engineering/engineering-rapid-prototyper.md`
- Foco en funcionalidad core, no perfección
- Usar componentes existentes como base

### Cuando escribas o edites contenido del sitio
Leer: `agency-agents/marketing/marketing-content-creator.md`
- Tono profesional y accesible, orientado al paciente
- Jerarquía clara: título → bajada → cuerpo → CTA

### Cuando trabajes en SEO de páginas o metadata
Leer: `agency-agents/marketing/marketing-seo-specialist.md`
- Metadata descriptiva y única por página
- Structured data para clínica (Schema.org MedicalClinic)
- URLs limpias, slugs en español

### Cuando agregues micro-animaciones o elementos de personalidad
Leer: `agency-agents/design/design-whimsy-injector.md`
- Delight controlado: nunca sacrificar usabilidad
- Respetar `prefers-reduced-motion`

---

## Estructura del Proyecto

```
app/
  page.tsx              # Homepage con secciones: Hero, DiseaseSearch, Specialties...
  layout.tsx            # RootLayout con Header y Footer globales
  globals.css           # Estilos globales y variables CSS
  enfermedades/         # Sección de enfermedades/diagnósticos
components/
  Header.tsx
  Footer.tsx
  DiseaseSearchBar.tsx
  home/                 # Componentes de la homepage
lib/
  diseases.ts           # Datos de enfermedades
public/
  dim-logo.svg
Identidad de marca/
  Manual de Marca DIM 2026.html   # Fuente de verdad visual
agency-agents/          # Guías de agentes especializados
```

---

## Checklist Antes de Implementar

Antes de escribir código para cualquier modificación:

1. **Identidad**: ¿La sección respeta la paleta, tipografía y tono DIM?
2. **Agente**: ¿Consulté el agente correspondiente al tipo de tarea?
3. **Componentes**: ¿Reutilizo los componentes existentes en `components/`?
4. **Responsive**: ¿Funciona en mobile (375px), tablet (768px) y desktop (1280px)?
5. **Accesibilidad**: ¿ARIA labels, contraste WCAG AA, navegación por teclado?
6. **Performance**: ¿Imágenes optimizadas, sin bloqueos de render?
7. **TypeScript**: ¿Props tipadas, sin `any`?

---

## Next.js — Versión Actual

Lee `node_modules/next/dist/docs/` si hay duda sobre APIs o convenciones. Esta versión puede tener breaking changes respecto al training data. Respetar deprecation notices.
