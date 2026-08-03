import type {StructureResolver} from 'sanity/structure'
import {CogIcon, CreditCardIcon, DocumentTextIcon, PinIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.documentTypeListItem('novedad').title('Novedades').icon(DocumentTextIcon),
      S.documentTypeListItem('sede').title('Sedes').icon(PinIcon),
      S.documentTypeListItem('cobertura').title('Coberturas médicas').icon(CreditCardIcon),
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
