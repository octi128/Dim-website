import {defineType, defineField, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'configuracionSitio',
  title: 'Configuración del sitio',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'whatsappCentral',
      title: 'WhatsApp central',
      description:
        'Solo números, con código de país y el 9 de celular. Ejemplo: 5491166485555. No pongas espacios, guiones ni el signo +.',
      type: 'string',
      validation: (Rule) =>
        Rule.required().regex(/^549\d{10}$/, {
          name: 'formato internacional argentino (549 + 10 dígitos)',
        }),
    }),
    defineField({
      name: 'telefonoCentral',
      title: 'Teléfono central de turnos',
      description:
        'Solo números, con característica y sin el 0. Ejemplo: 1155548888',
      type: 'string',
      validation: (Rule) =>
        Rule.required().regex(/^\d{8,12}$/, {
          name: 'solo dígitos, entre 8 y 12',
        }),
    }),
    defineField({
      name: 'emailTurnos',
      title: 'Email de turnos',
      description: 'Casilla principal de contacto del sitio.',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'redes',
      title: 'Redes sociales',
      description: 'Perfiles institucionales de DIM.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'red',
          title: 'Red',
          type: 'object',
          fields: [
            defineField({
              name: 'plataforma',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'X', value: 'x'},
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL del perfil',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({scheme: ['https']}),
            }),
          ],
          preview: {
            select: {title: 'plataforma', subtitle: 'url'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Configuración del sitio'}
    },
  },
})
