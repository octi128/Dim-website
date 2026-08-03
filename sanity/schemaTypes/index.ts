import { type SchemaTypeDefinition } from 'sanity'

import configuracionSitio from './configuracionSitio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [configuracionSitio],
}
