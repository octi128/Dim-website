import { type SchemaTypeDefinition } from 'sanity'

import configuracionSitio from './configuracionSitio'
import novedad from './novedad'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [configuracionSitio, novedad],
}
