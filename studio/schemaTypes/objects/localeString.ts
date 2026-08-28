import {defineField, defineType} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'fr', title: 'French', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'es', title: 'Spanish', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {
    select: {title: 'en'},
  },
})
