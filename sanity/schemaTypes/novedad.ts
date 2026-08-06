import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'novedad',
  title: 'Novedad',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(90).warning('Los títulos largos se cortan en las tarjetas.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Es la dirección de la novedad en el sitio. Generalo desde el título con el botón. Importante: una vez publicada, no lo cambies, porque los links que ya se compartieron dejan de funcionar.',
      type: 'slug',
      options: {source: 'titulo', maxLength: 80},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha de publicación',
      description: 'Define el orden en que aparecen las novedades, de más nueva a más vieja.',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      description: 'Se muestra como etiqueta en el carrusel de la página principal.',
      type: 'string',
      options: {
        list: [
          {title: 'Audiología', value: 'audiologia'},
          {title: 'Cardiología', value: 'cardiologia'},
          {title: 'Dermatología', value: 'dermatologia'},
          {title: 'Salud digital', value: 'digital'},
          {title: 'Institucional', value: 'general'},
          {title: 'Kinesiología', value: 'kinesiologia'},
          {title: 'Laboratorio', value: 'laboratorio'},
          {title: 'Nutrición', value: 'nutricion'},
          {title: 'Odontología', value: 'odontologia'},
          {title: 'Oftalmología', value: 'oftalmologia'},
          {title: 'Pediatría', value: 'pediatria'},
          {title: 'Prevención', value: 'prevencion'},
          {title: 'Salud mental', value: 'psicologia'},
          {title: 'Diagnóstico por imágenes', value: 'resonancia'},
          {title: 'Terapias', value: 'terapia'},
          {title: 'Vacunación', value: 'vacunacion'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      description:
        'Texto corto que se muestra en las tarjetas del listado y del home. Máximo 200 caracteres. Algunos resúmenes se generaron automáticamente al migrar el contenido y conviene revisarlos.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'portada',
      title: 'Imagen de portada',
      description:
        'Las imágenes actuales son provisorias, una por categoría. Podés reemplazarlas por una foto propia de cada novedad. Si la cambiás, actualizá también el texto alternativo.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          description: 'Describí la imagen para personas que usan lectores de pantalla.',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destacada',
      title: 'Destacar en el home',
      description: 'Las novedades destacadas aparecen en el carrusel de la página principal.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'cta',
      title: 'Botón de acción',
      description:
        'Opcional. Botón que aparece al pie de la novedad. Dejalo vacío si no hace falta.',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'label',
          title: 'Texto del botón',
          type: 'string',
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: 'href',
          title: 'Destino',
          description:
            'Puede ser una dirección completa (https://...) o una ruta interna del sitio que empiece con barra (por ejemplo /resonancia-magnetica).',
          type: 'string',
        }),
      ],
      validation: (Rule) =>
        Rule.custom((cta) => {
          if (!cta) return true
          const {label, href} = cta as {label?: string; href?: string}
          if (!label && !href) return true
          if (!label || !href) return 'Completá el texto y el destino, o dejá los dos vacíos.'
          if (!href.startsWith('/') && !href.startsWith('https://')) {
            return 'El destino tiene que empezar con / si es interno, o con https:// si es externo.'
          }
          return true
        }),
    }),
    defineField({
      name: 'appDownload',
      title: 'Mostrar botón de descarga de la app',
      description:
        'Agrega el botón "Descargar App DIM SALUD" al pie de la novedad.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'cuerpo',
      title: 'Contenido',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Párrafo', value: 'normal'},
            {title: 'Subtítulo', value: 'h2'},
            {title: 'Subtítulo menor', value: 'h3'},
          ],
          lists: [
            {title: 'Viñetas', value: 'bullet'},
            {title: 'Numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrita', value: 'strong'},
              {title: 'Cursiva', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.required().uri({scheme: ['https', 'mailto', 'tel']}),
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Más nuevas primero',
      name: 'fechaDesc',
      by: [{field: 'fecha', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'titulo', subtitle: 'fecha', media: 'portada'},
  },
})
