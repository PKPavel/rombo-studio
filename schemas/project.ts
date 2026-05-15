// schemas/project.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Проект',
  type: 'document',
  fields: [
    defineField({
      name: 'num',
      title: 'Номер в архиве (01, 02…)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cat',
      title: 'Тип объекта',
      type: 'string',
      options: {
        list: [
          { title: 'Квартира', value: 'Квартира' },
          { title: 'Загородный дом', value: 'Загородный дом' },
          { title: 'Коммерческий', value: 'Коммерческий' },
        ],
        layout: 'radio',
      },
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
      title: 'Год реализации',
      type: 'number',
    }),
    defineField({
      name: 'coverImage',
      title: 'Обложка (главное фото)',
      type: 'image',
      options: { hotspot: true },
      description: 'Горизонтальное, минимум 1200×800px',
    }),
    defineField({
      name: 'images',
      title: 'Галерея проекта',
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
      name: 'featured',
      title: 'Показывать в карусели на главной',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'disabled',
      title: 'Заглушка (фото ещё не загружены)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'По номеру', name: 'numAsc', by: [{ field: 'num', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'city', media: 'coverImage' },
  },
})
