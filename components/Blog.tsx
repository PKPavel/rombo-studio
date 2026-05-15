'use client'

const POSTS = [
  {
    slug: 'trends-2026',
    img: 'https://optim.tildacdn.com/tild3538-3739-4135-b962-666465363665/-/format/webp/FED_Gost_01.jpg',
    tag: 'Тренды',
    date: '15 апреля 2026',
    read: '8 мин',
    title: 'Тренды интерьеров 2026: тёплый минимализм и «тихая роскошь»',
  },
  {
    slug: 'pre-renovation-checklist',
    img: 'https://optim.tildacdn.com/tild3065-3031-4562-a665-363435613230/-/format/webp/Bor_Kitchen_01.jpg',
    tag: 'Гид',
    date: '02 апреля 2026',
    read: '14 мин',
    title: 'Чек-лист перед ремонтом: 30 вопросов, которые надо решить заранее',
  },
  {
    slug: 'lighting',
    img: 'https://optim.tildacdn.com/tild3366-3564-4638-a533-643237303237/-/format/webp/OH_gostin1.jpg',
    tag: 'Свет',
    date: '20 марта 2026',
    read: '7 мин',
    title: 'Сценарное освещение: 4 уровня света в каждой комнате',
  },
  {
    slug: 'cost-spb',
    img: 'https://optim.tildacdn.com/tild3262-6136-4764-b033-356138633864/-/format/webp/Pan_Gostin_02.jpg',
    tag: 'Бюджет',
    date: '05 марта 2026',
    read: '10 мин',
    title: 'Сколько стоит дизайн квартиры в Петербурге в 2026 году',
  },
  {
    slug: 'studio-36',
    img: 'https://optim.tildacdn.com/tild6665-3731-4365-a563-326163303434/-/format/webp/KIR_Gostin_2.jpg',
    tag: 'Кейс',
    date: '22 февраля 2026',
    read: '9 мин',
    title: 'Студия 36 м²: как уместить всё и не потерять воздух',
  },
  {
    slug: 'natural-materials',
    img: 'https://optim.tildacdn.com/tild3464-3530-4331-b561-666631623561/-/format/webp/kra_Gostin_07_2.jpg',
    tag: 'Материалы',
    date: '10 февраля 2026',
    read: '11 мин',
    title: 'Камень, дерево, латунь: как сочетать натуральные материалы',
  },
]

export default function Blog() {
  return (
    <section id="blog" className="blog">
      <div className="container">

        {/* ── Заголовок — по центру ── */}
        <div className="blog-header reveal">
          <span className="blog-eyebrow">— Журнал ROMBO</span>
          <h2 className="blog-h2">Статьи и идеи</h2>
          <p className="blog-lead">
            Делимся опытом, разбираем тренды, рассказываем о наших проектах.
            Полезные материалы для тех, кто планирует ремонт или просто любит интерьерный дизайн.
          </p>
        </div>

        <div className="blog-grid reveal">
          {POSTS.map(p => (
            <div key={p.slug} className="blog-tile blog-tile--soon">
              <div className="blog-tile-img">
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className="blog-tile-tag">{p.tag}</span>
              </div>
              <div className="blog-tile-meta">
                <span className="blog-tile-info">{p.date} · {p.read} чтения</span>
                <h3 className="blog-tile-title">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <p className="blog-soon-note">Статьи скоро будут доступны — следите за обновлениями</p>

      </div>
    </section>
  )
}
