import {defineField, defineType} from 'sanity'

export const badge = defineType({
  name: 'badge',
  title: 'Badge',
  type: 'object',
  fields: [
    defineField({name: 'handle', title: 'Handle', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'handle'},
  },
})
