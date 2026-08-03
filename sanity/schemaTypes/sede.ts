import {defineType, defineField, defineArrayMember} from 'sanity'
import {PinIcon} from '@sanity/icons'

export default defineType({
  name: 'sede',
  title: 'Sede',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      description: 'Como se muestra en el sitio. Ejemplo: DIM Sede Central',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'zona',
      title: 'Zona',
      description: 'Se usa para el filtro del listado de centros.',
      type: 'string',
      options: {
        list: [
          {title: 'Ramos Mejía', value: 'Ramos Mejía'},
          {title: 'Morón', value: 'Morón'},
          {title: 'Buenos Aires', value: 'Buenos Aires'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      description: 'Calle, número y localidad. Ejemplo: Belgrano 136, Ramos Mejía',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mapsUrl',
      title: 'Link de Google Maps',
      description: 'Pegá el link que da el botón Compartir de Google Maps.',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'horarios',
      title: 'Horarios',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'semana',
          title: 'Lunes a viernes',
          description: 'Ejemplo: 7:00 – 20:00. También podés escribir "Abierto 24 horas".',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'sabado',
          title: 'Sábados',
          description: 'Ejemplo: 7:00 – 13:00',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'domingo',
          title: 'Domingos y feriados',
          description: 'Opcional. Dejalo vacío si la sede no abre domingos: la fila no se muestra.',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servicios',
      title: 'Servicios',
      description: 'Elegí los servicios que se prestan en esta sede.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Alta complejidad', value: 'Alta complejidad'},
          {title: 'Cardiología', value: 'Cardiología'},
          {title: 'Clínica', value: 'Clínica'},
          {title: 'Consultas', value: 'Consultas'},
          {title: 'Densitometría', value: 'Densitometría'},
          {title: 'Dermatología', value: 'Dermatología'},
          {title: 'Ecocardiografía', value: 'Ecocardiografía'},
          {title: 'Estética médica', value: 'Estética médica'},
          {title: 'Ginecología', value: 'Ginecología'},
          {title: 'Guardia 24hs', value: 'Guardia 24hs'},
          {title: 'Holter', value: 'Holter'},
          {title: 'Imágenes', value: 'Imágenes'},
          {title: 'Kinesiología', value: 'Kinesiología'},
          {title: 'Laboratorio', value: 'Laboratorio'},
          {title: 'Mamografía', value: 'Mamografía'},
          {title: 'Medicina nuclear', value: 'Medicina nuclear'},
          {title: 'Odontología', value: 'Odontología'},
          {title: 'Ortopedia', value: 'Ortopedia'},
          {title: 'PET-CT', value: 'PET-CT'},
          {title: 'Radiología dental', value: 'Radiología dental'},
          {title: 'Rehabilitación', value: 'Rehabilitación'},
          {title: 'Traumatología', value: 'Traumatología'},
        ],
      },
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
    defineField({
      name: 'imagen',
      title: 'Foto de la fachada',
      description: 'Opcional. Si no cargás foto ni video, se muestra un fondo con el logo.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          description: 'Describí la imagen para lectores de pantalla.',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video de YouTube',
      description:
        'Opcional. Todavía no se muestra en el sitio: el listado de centros usa la foto. Podés dejarlo cargado para cuando se implemente.',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({scheme: ['https']}).custom((url) => {
          if (!url) return true
          const u = String(url)
          if (!u.includes('youtube.com') && !u.includes('youtu.be')) {
            return 'Tiene que ser un link de YouTube.'
          }
          return true
        }),
    }),
    defineField({
      name: 'destacada',
      title: 'Destacar en el home',
      description: 'Las sedes destacadas aparecen en la página principal.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'orden',
      title: 'Orden en el listado',
      description: 'Número más bajo aparece primero. Ejemplo: 1, 2, 3.',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Orden del listado',
      name: 'ordenAsc',
      by: [{field: 'orden', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'nombre', subtitle: 'direccion', media: 'imagen'},
  },
})
