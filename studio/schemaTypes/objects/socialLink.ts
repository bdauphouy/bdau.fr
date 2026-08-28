import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'url', title: 'URL', type: 'url', validation: (r) => r.required()}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'url'},
  },
})
