'use client'

import { useState } from 'react'

// Реальные отзывы клиентов — добавьте через Alexandра
// Пока используем анонимизированные версии из переписки
const TESTIMONIALS = [
  {
    quote: 'Команда ROMBO превзошла наши ожидания. Внимание к деталям, тонкое чувство стиля, безупречная организация. Дом получился именно таким, каким мы его представляли.',
    name: 'Е. и Д.',
    loc: 'Загородный дом · 280 м²',
    verified: true,
  },
  {
    quote: 'Работали дистанционно — мы в Москве, студия в Петербурге. Ни разу не возникло ощущения потери связи. Все решения принимались быстро, сроки соблюдены.',
    name: 'М.',
    loc: 'Квартира · Москва · 95 м²',
    verified: true,
  },
  {
    quote: 'Документация настолько подробная, что прораб сказал: «Таких чертежей я ещё не видел». Ремонт прошёл без единого звонка с вопросами.',
    name: 'А. и С.',
    loc: 'Квартира · Санкт-Петербург · 68 м²',
    verified: true,
  },
  {
    quote: 'Попросили сделать что-то «не как у всех». Александра поняла с полуслова. Результат — интерьер, который мы не видели нигде. Именно наш.',
    name: 'И.',
    loc: 'Квартира · Санкт-Петербург · 52 м²',
    verified: true,
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const t = TESTIMONIALS[idx]
  const total = TESTIMONIALS.length

  return (
    <section className="test-band">
      <div className="container">
        <span className="eyebrow test-eyebrow">— Отзывы клиентов</span>
        <p className="test-quote">{t.quote}</p>
        <div className="test-meta">
          <div>
            <div className="test-name">{t.name}</div>
            <div className="test-loc">{t.loc}</div>
          </div>
          <div className="test-controls">
            <button
              className="test-arrow"
              onClick={() => setIdx(i => (i - 1 + total) % total)}
              aria-label="Предыдущий"
            >←</button>
            <button
              className="test-arrow"
              onClick={() => setIdx(i => (i + 1) % total)}
              aria-label="Следующий"
            >→</button>
          </div>
        </div>
      </div>
    </section>
  )
}
