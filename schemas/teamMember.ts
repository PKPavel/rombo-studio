// schemas/teamMember.ts — участник команды студии
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Команда',
  type: 'document',
  fields: [
    defineField({
      name: 'name', title: 'Имя', type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role', title: 'Должность', type: 'string',
      description: 'Например: Дизайнер интерьеров',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo', title: 'Фото', type: 'image',
      options: { hotspot: true },
      description: 'Портрет, желательно квадратный или вертикальный, минимум 600×600px',
    }),
    defineField({
      name: 'objectPosition', title: 'Кадрирование фото', type: 'string',
      description: 'Куда сместить фокус в круге, напр. "center 15%" или "center top". По умолчанию — center top.',
    }),
    defineField({
      name: 'order', title: 'Порядок', type: 'number',
      description: 'Чем меньше число — тем выше в списке. Руководитель — 1.',
      initialValue: 100,
    }),
    defineField({
      name: 'disabled', title: 'Скрыть с сайта', type: 'boolean', initialValue: false,
    }),
  ],
  orderings: [
    { title: 'По порядку', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
