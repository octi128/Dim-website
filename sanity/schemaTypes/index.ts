import { type SchemaTypeDefinition } from 'sanity'

import configuracionSitio from './configuracionSitio'
import novedad from './novedad'
import sede from './sede'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [configuracionSitio, sede, novedad],
}
