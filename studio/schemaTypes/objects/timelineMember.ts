import {defineField, defineType} from 'sanity'

export const timelineMember = defineType({
  name: 'timelineMember',
  title: 'Timeline member',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'link', title: 'Link', type: 'url', validation: (r) => r.required()}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'link'},
  },
})
