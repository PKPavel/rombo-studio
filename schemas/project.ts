// schemas/project.ts
// Расширенная схема — добавлены поля cat и character для фильтрации в архиве

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
      title: 'URL (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'num',
      title: 'Номер в архиве (01, 02 …)',
      type: 'string',
    }),
    // ── Категория для фильтра ───────────────────────────────
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
    // ── Характер для фильтра ────────────────────────────────
    defineField({
      name: 'character',
      title: 'Характер (стиль)',
      description: 'Можно выбрать несколько',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Современная классика', value: 'modern-classic' },
          { title: 'Минимализм', value: 'minimalism' },
          { title: 'Эклектика', value: 'eclectic' },
          { title: 'Природный', value: 'natural' },
          { title: 'Лофт', value: 'loft' },
        ],
      },
    }),
    // ── Основные параметры ──────────────────────────────────
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
    // ── Медиа ───────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Обложка',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Галерея',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    // ── Тексты ──────────────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featured',
      title: 'Показывать в карусели',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'disabled',
      title: 'Фото ещё не загружены (показывать заглушку)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'city',
      media: 'coverImage',
    },
  },
})
