# ROMBO — сайт студии дизайна интерьеров

Лендинг и блог студии авторского дизайна интерьеров ROMBO (Санкт-Петербург).
Next.js 16 (App Router) + Sanity CMS, заявки уходят в Telegram.

## Стек

- **Next.js 16** (App Router, ISR `revalidate = 3600`)
- **React 19**
- **Sanity** — CMS для проектов и статей блога (студия на `/studio`)
- **Tailwind CSS 4**

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения

```
NEXT_PUBLIC_SANITY_PROJECT_ID   # id проекта Sanity
NEXT_PUBLIC_SANITY_DATASET      # обычно production
NEXT_PUBLIC_SANITY_API_VERSION  # напр. 2024-01-01
SANITY_REVALIDATE_SECRET        # секрет для вебхука /api/revalidate
TELEGRAM_BOT_TOKEN              # токен бота для отправки заявок
TELEGRAM_CHAT_ID               # id чата, куда падают заявки
```

## Структура

- `app/` — страницы, API-роуты (`contact`, `revalidate`, `img-proxy`), Sanity Studio
- `components/` — секции лендинга и интерактивные клиентские компоненты
- `schemas/` — схемы документов Sanity (`project`, `post`)
- `sanity.client.ts` — клиент и GROQ-запросы

## Скрипты

- `npm run dev` — дев-сервер
- `npm run build` — продакшн-сборка
- `npm run start` — запуск собранного приложения
- `npm run lint` — ESLint
