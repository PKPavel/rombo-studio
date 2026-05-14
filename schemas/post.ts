import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Статья блога',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
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
      name: 'publishedAt',
      title: 'Дата публикации',
      type: 'datetime',
    }),
    defineField({
      name: 'coverImage',
      title: 'Обложка',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Краткое описание',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Текст статьи',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'author',
      title: 'Автор',
      type: 'string',
      initialValue: 'Александра Серова',
    }),
  ],
})