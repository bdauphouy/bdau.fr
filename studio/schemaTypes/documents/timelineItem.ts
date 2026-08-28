import {defineField, defineType} from 'sanity'

export const timelineItem = defineType({
  name: 'timelineItem',
  title: 'Timeline item',
  type: 'document',
  fields: [
    defineField({name: 'date', title: 'Date', type: 'date', validation: (r) => r.required()}),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'text', title: 'Text', type: 'localeText'}),
    defineField({name: 'link', title: 'Link', type: 'url'}),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{type: 'timelineMember'}],
    }),
  ],
  orderings: [
    {
      title: 'Date',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'date'},
  },
})
