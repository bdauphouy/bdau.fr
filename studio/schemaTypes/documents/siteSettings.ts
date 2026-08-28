import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'isAvailable',
      title: 'Available for work',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'email', title: 'Email', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'metaName',
      title: 'Meta: name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'metaTwitter',
      title: 'Meta: Twitter handle',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'themeColor',
      title: 'Meta: theme color',
      type: 'string',
      description: 'Hex color, e.g. #04041e',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
