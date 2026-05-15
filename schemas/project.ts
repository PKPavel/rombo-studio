// schemas/project.ts — полная схема с палитрой, заметками, PDF
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Проект',
  type: 'document',
  fields: [
    defineField({ name: 'num', title: 'Номер (01, 02…)', type: 'string' }),
    defineField({
      name: 'title', title: 'Название', type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug', title: 'URL (slug)', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cat', title: 'Тип объекта', type: 'string',
      options: {
        list: [
          { title: 'Квартира', value: 'Квартира' },
          { title: 'Загородный дом', value: 'Загородный дом' },
          { title: 'Коммерческий', value: 'Коммерческий' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'area', title: 'Площадь, м²', type: 'number' }),
    defineField({ name: 'city', title: 'Город', type: 'string' }),
    defineField({ name: 'year', title: 'Год', type: 'number' }),
    defineField({ name: 'description', title: 'Описание проекта', type: 'text', rows: 4 }),
    defineField({
      name: 'coverImage', title: 'Обложка (главное фото)',
      type: 'image', options: { hotspot: true },
      description: 'Горизонтальное, минимум 1200×800px',
    }),
    defineField({
      name: 'images', title: 'Галерея интерьеров',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Все фотографии проекта',
    }),

    // ── Цветовая палитра ──────────────────────────────────
    defineField({
      name: 'palette',
      title: 'Цветовая палитра (HEX)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Введите HEX-цвета проекта, например: #F4EDE0',
    }),

    // ── Заметки Александры ────────────────────────────────
    defineField({
      name: 'notes',
      title: 'Заметки Александры',
      type: 'array',
      description: 'Привязанные к фото комментарии дизайнера',
      of: [{
        type: 'object',
        fields: [
          { name: 'text', title: 'Текст заметки', type: 'text', rows: 3 },
          { name: 'image', title: 'К какому фото привязана', type: 'image', options: { hotspot: true } },
        ],
        preview: {
          select: { title: 'text', media: 'image' },
        },
      }],
    }),

    // ── PDF-файлы ─────────────────────────────────────────
    defineField({
      name: 'pdfs',
      title: 'PDF-документы для скачивания',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Название файла',
            type: 'string',
            description: 'Например: Альбом рабочих чертежей',
          },
          {
            name: 'pages',
            title: 'Количество листов',
            type: 'number',
            description: 'Смотрите в свойствах PDF-файла',
          },
          {
            name: 'tags',
            title: 'Содержимое (теги)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Выберите что входит в документ',
            options: {
              list: [
                { title: 'Обмеры', value: 'обмеры' },
                { title: 'Демонтаж', value: 'демонтаж' },
                { title: 'Монтаж', value: 'монтаж' },
                { title: 'Мебель', value: 'мебель' },
                { title: 'Сантехника', value: 'сантехника' },
                { title: 'Электрика', value: 'электрика' },
                { title: 'Освещение', value: 'освещение' },
                { title: 'Полы', value: 'полы' },
                { title: 'Потолок', value: 'потолок' },
                { title: 'Отделка', value: 'отделка' },
                { title: 'Итоговая планировка', value: 'итоговая планировка' },
                { title: 'Планировка', value: 'планировка' },
              ],
            },
          },
          {
            name: 'file',
            title: 'PDF-файл',
            type: 'file',
            options: { accept: '.pdf' },
          },
          {
            // Устаревшее поле — оставлено для совместимости со старыми документами
            name: 'description',
            title: 'Описание (устарело)',
            type: 'string',
            hidden: true,
          },
        ],
        preview: {
          select: { title: 'title', pages: 'pages' },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prepare({ title, pages }: any) {
            return {
              title: title || 'Без названия',
              subtitle: pages ? `${pages} листов` : 'листы не указаны',
            }
          },
        },
      }],
    }),

    defineField({
      name: 'featured', title: 'Показывать в карусели', type: 'boolean', initialValue: false,
    }),
    defineField({
      name: 'disabled', title: 'Заглушка (фото не загружены)', type: 'boolean', initialValue: false,
    }),
  ],
  orderings: [
    { title: 'По номеру', name: 'numAsc', by: [{ field: 'num', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'city', media: 'coverImage' },
  },
})
