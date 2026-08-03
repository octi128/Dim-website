import { type SchemaTypeDefinition } from 'sanity'

import cobertura from './cobertura'
import configuracionSitio from './configuracionSitio'
import novedad from './novedad'
import sede from './sede'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [configuracionSitio, sede, cobertura, novedad],
}
