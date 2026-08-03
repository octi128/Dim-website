import type {StructureResolver} from 'sanity/structure'
import {CogIcon, DocumentTextIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.documentTypeListItem('novedad').title('Novedades').icon(DocumentTextIcon),
      S.listItem()
        .title('Configuración del sitio')
        .icon(CogIcon)
        .id('configuracionSitio')
        .child(
          S.document()
            .schemaType('configuracionSitio')
            .documentId('configuracionSitio')
            .title('Configuración del sitio'),
        ),
    ])
