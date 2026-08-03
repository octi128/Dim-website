import {defineType, defineField} from 'sanity'
import {CreditCardIcon} from '@sanity/icons'

export default defineType({
  name: 'cobertura',
  title: 'Cobertura médica',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      description:
        'Nombre del prestador tal como se muestra en el listado. Ejemplo: Swiss Medical',
      type: 'string',
      validation: (Rule) => Rule.required().max(70),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          {title: 'Prepaga', value: 'Prepaga'},
          {title: 'Obra Social', value: 'Obra Social'},
          {title: 'Hospital', value: 'Hospital'},
          {title: 'Mutual', value: 'Mutual'},
          {title: 'ART', value: 'ART'},
          {title: 'Programa', value: 'Programa'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vigencia',
      title: 'Vigencia de la orden médica',
      description: 'Días que vale la orden médica para esta cobertura.',
      type: 'number',
      options: {
        list: [
          {title: '30 días', value: 30},
          {title: '60 días', value: 60},
          {title: '90 días', value: 90},
        ],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.required().custom((valor) =>
          [30, 60, 90].includes(Number(valor))
            ? true
            : 'La vigencia tiene que ser 30, 60 o 90 días.',
        ),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description:
        'Opcional. Si no cargás logo, se muestra el nombre en texto. Preferentemente PNG o SVG con fondo transparente.',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          description: 'Ejemplo: Logo de Swiss Medical',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'destacada',
      title: 'Destacar en el home',
      description:
        'Las coberturas destacadas aparecen en el carrusel de la página principal.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Alfabético',
      name: 'nombreAsc',
      by: [{field: 'nombre', direction: 'asc'}],
    },
    {
      title: 'Por tipo',
      name: 'tipoAsc',
      by: [
        {field: 'tipo', direction: 'asc'},
        {field: 'nombre', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'nombre', subtitle: 'tipo', media: 'logo'},
  },
})
