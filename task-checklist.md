# ROMBO — чек-лист задач по сайту

**Стек:** Next.js 16.2.6 + Sanity CMS + Vercel
**Последнее обновление:** 16 мая 2026

---

## ⚡ КАК ВОЗОБНОВИТЬ В НОВОМ ЧАТЕ

Прикрепи этот чек-лист и скажи:
«Продолжаем работу над сайтом ROMBO на Next.js + Sanity. Вот чек-лист, продолжаем.»

---

## 🏗️ СТЕК И ИНФРАСТРУКТУРА

- **Фреймворк:** Next.js 16.2.6 (App Router, TypeScript, Tailwind)
- **CMS:** Sanity (Project ID: g0p8o4k2, dataset: production)
- **Хостинг:** Vercel (автодеплой из GitHub при каждом push)
- **Репозиторий:** https://github.com/PKPavel/rombo-studio
- **Продакшн:** https://rombo.pro
- **Sanity Studio:** https://rombo.pro/studio
- **GitHub токен:** есть (Claude пушит напрямую)

---

## ✅ СДЕЛАНО

- [x] Vercel + домен rombo.pro (переехали с Netlify — исчерпал кредиты)
- [x] Sanity Studio на /studio, схема проекта с полями palette/notes/pdfs/pages/tags
- [x] Все секции главной страницы (Header → Contact + Footer)
- [x] Страницы проектов /projects/[slug] — работают, фото грузятся
- [x] Кастомный курсор — работает на всех страницах включая /projects/
- [x] Scroll-spy (6 точек), reveal-анимации, floating bar (мобильный)
- [x] SVG логотип из брендовых файлов (с currentColor)
- [x] Process — 2 главы, горизонтальный скролл со стрелками над треком
- [x] Deliverables — светлый фон, реальные чертежи ЖК Чёрная речка
- [x] Archive → Sanity CMS, ISR 60с, тайлы ведут на /projects/[slug]
- [x] Founder — QR-коды Behance + Instagram
- [x] ProjectPage — галерея + лайтбокс + палитра (Sanity metadata) + PDF
- [x] Фавикон создан: icon.svg (ромб на тёмном фоне #1A1614)
- [x] Проекты в Sanity: ЖК Черная речка + ЖК Ботаника (опубликованы)
- [x] PDF-карточки: авто-страницы из файла + авто-размер из Sanity + теги из Studio
- [x] Ссылки в шапке исправлены (/#section — работают с любой страницы)
- [x] Webhook Sanity → Vercel (автодеплой при публикации)
- [x] Цветовая палитра — авто из Sanity metadata (обложка + галерея)
- [x] Карточка «Популярно» в ценах — полная рамка (inset box-shadow)
- [x] Заголовки секций по центру (Process, Blog, Pricing, Docs)
- [x] ISR revalidate=60 на страницах проектов, useCdn:false

---

## 🎯 СЛЕДУЮЩИЕ ЗАДАЧИ (приоритет)

1. **DNS / CDN** — перенести домен с Nethouse на reg.ru → подключить Cloudflare
   - Nethouse блокирует смену NS-серверов (ns1-3.registrant.ru захардкожены)
   - Нужно: Nethouse → запросить EPP-код → перенести на reg.ru → сменить NS на Cloudflare
   - Cloudflare NS выданы: `elma.ns.cloudflare.com` + `porter.ns.cloudflare.com`
   - После: российские пользователи бьют в московский PoP Cloudflare → сайт быстрее без VPN
2. **Мобильная адаптация** — полный аудит всех секций на телефоне
3. **SEO** — обновить app/layout.tsx: og:title, og:description, og:image
4. **Blog → Sanity** — подключить статьи к CMS (сейчас статичные данные)
5. **Форма заявки** — подключить к реальному бэкенду (email или telegram-бот)
6. **Страница 404** — красивая заглушка вместо дефолтной Next.js

---

## ⏳ ЖДЁТ МАТЕРИАЛОВ ОТ АЛЕКСАНДРЫ

- [ ] Фото всех проектов → загружать через rombo.pro/studio
- [ ] Фото команды (Анастасия и другие)
- [ ] Реальные отзывы клиентов (скрины из мессенджеров)
- [ ] Заметки Александры к проектам («эту лампу искала три месяца»)
- [ ] PDF-чертежи для остальных проектов
- [ ] Новый email студии (сейчас a@serovadesign.ru)

---

## 📁 КЛЮЧЕВЫЕ ФАЙЛЫ

```
app/
  page.tsx                    — главная, импортирует все компоненты
  globals.css                 — все стили
  layout.tsx                  — метатеги, favicon
  projects/layout.tsx         — Header + CustomCursor для страниц проектов
  projects/[slug]/page.tsx    — страница проекта (revalidate=60, авто-PDF-парсинг)
  api/revalidate/route.ts     — вебхук Sanity → Vercel
  api/img-proxy/route.ts      — прокси Sanity-изображений для ColorThief

components/
  Header.tsx          — SVG лого, nav с /#ссылками, работает с любой страницы
  ScrollSpyCursor.tsx — CustomCursor + ScrollSpy + FloatingBar + RevealObserver
  Archive.tsx         — server, Sanity fetch, revalidate: 60
  ArchiveClient.tsx   — client, фильтры по типу, Link → /projects/[slug]
  ProjectPage.tsx     — client, палитра из Sanity, лайтбокс, PDF карточки
  Process.tsx         — 2 главы, стрелки над треком, Реализация центрирована
  Pricing.tsx         — 4 тарифа, карточка «Популярно» с inset box-shadow
  Blog.tsx            — статичные данные (заглушка, ждёт подключения к Sanity)
  Contact.tsx         — форма + Footer 4кол + FloatingBar

schemas/project.ts    — поля: num, title, slug, cat, area, city, year,
                        coverImage, images[], palette[], notes[],
                        pdfs[]{title, pages, tags, file, description(hidden)}
                        featured, disabled
sanity.config.ts      — basePath: '/studio', name: 'default'
sanity.client.ts      — createClient, urlFor, useCdn: false, PROJECTS_QUERY
```

---

## 🔧 ТЕХНИЧЕСКИЕ ЗАМЕТКИ

### CSS-переменные
--bg: #F4EDE0 · --ink: #1A1614 · --accent: #C8593F · --bronze: #8B6F47
--serif: Fraunces · --sans: Inter Tight

### Деплой
git add . && git commit -m "описание" && git push
(Claude пушит напрямую через GitHub токен)

### Env Vercel
NEXT_PUBLIC_SANITY_PROJECT_ID = g0p8o4k2
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
SANITY_REVALIDATE_SECRET = rombo2024

### Добавить проект в Sanity
rombo.pro/studio → Проект → New → заполнить поля → загрузить фото → Publish
После Publish вебхук автоматически обновляет сайт.

### PDF метаданные в Studio
- Количество листов: ввести число вручную (или авто-извлечётся из файла)
- Теги: выбрать чекбоксы (обмеры, демонтаж, мебель, сантехника, электрика...)
- Размер файла: подтягивается автоматически из Sanity (asset->size)

### Палитра проекта
1. Ручная: HEX-цвета в поле «Цветовая палитра» в Studio
2. Авто: Sanity metadata.palette из обложки + первых 3 фото галереи
3. Крайний случай: ColorThief через img-proxy

---

*Обновлён 16 мая 2026. Все баги исправлены, сайт работает.*
