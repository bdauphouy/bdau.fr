import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      options: {source: 'title.en'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Current', value: 'current'},
          {title: 'Archive', value: 'archive'},
        ],
        layout: 'radio',
      },
      initialValue: 'current',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers are shown first',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{type: 'badge'}],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'link'}],
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'category', slug: 'id.current'},
    prepare: ({title, subtitle, slug}) => ({title, subtitle: `${subtitle} · ${slug}`}),
  },
})
