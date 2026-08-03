'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    actions: (prev, context) =>
      context.schemaType === 'configuracionSitio'
        ? prev.filter(
            ({action}) =>
              action !== 'duplicate' && action !== 'delete' && action !== 'unpublish',
          )
        : prev,
    // configuracionSitio es un singleton: existe un único documento, con un id
    // fijo, y se edita desde el menú lateral. Sacarlo del menú de creación
    // global evita que se generen copias sueltas con otro id, que quedarían
    // invisibles en el Studio pero presentes en el dataset.
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((item) => item.templateId !== 'configuracionSitio')
        : prev,
  },
})
