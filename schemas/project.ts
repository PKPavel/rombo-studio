import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Проект',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-адрес',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Площадь, м²',
      type: 'number',
    }),
    defineField({
      name: 'city',
      title: 'Город',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Год',
      type: 'number',
    }),
    defineField({
      name: 'coverImage',
      title: 'Обложка',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Фотографии',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'style',
      title: 'Стиль',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Показывать в карусели',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Год, новые сначала',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
})