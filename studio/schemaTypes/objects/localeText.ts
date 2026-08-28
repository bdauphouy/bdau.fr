import {defineField, defineType} from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'fr',
      title: 'French',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'es',
      title: 'Spanish',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {title: 'en'},
  },
})
