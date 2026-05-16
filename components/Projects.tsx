'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

const PROJECTS = [
  {
    slug: 'omega-house',
    img: 'https://optim.tildacdn.com/tild3366-3564-4638-a533-643237303237/-/format/webp/OH_gostin1.jpg',
    num: '01',
    cat: 'Квартира · 2023',
    title: 'ЖК «Омега Хаус» на Карповке',
    info: 'Санкт-Петербург · 182 м²',
  },
  {
    slug: 'borisovo',
    img: 'https://optim.tildacdn.com/tild3065-3031-4562-a665-363435613230/-/format/webp/Bor_Kitchen_01.jpg',
    num: '02',
    cat: 'Загородный дом · 2023',
    title: 'Дом в Нурмиярви, д. Борисово',
    info: 'Ленинградская область · 220 м²',
  },
  {
    slug: 'yusupovo',
    img: 'https://optim.tildacdn.com/tild3036-3534-4461-b466-336539343333/-/format/webp/UV_1.jpg',
    num: '03',
    cat: 'Загородный дом · 2022',
    title: 'Дом в Юсупово Village',
    info: 'Москва · 250 м²',
  },
  {
    slug: 'fresh',
    img: 'https://optim.tildacdn.com/tild3732-3131-4831-b139-333839663562/-/format/webp/Fresh_01.jpg',
    num: '04',
    cat: 'Квартира · 2022',
    title: 'ЖК «Фреш», 59 м²',
    info: 'Москва · 59 м²',
  },
  {
    slug: 'kashirskoe',
    img: 'https://optim.tildacdn.com/tild3931-3238-4364-b438-373938636137/-/format/webp/KASH_01.jpg',
    num: '05',
    cat: 'Квартира · 2021',
    title: 'Квартира на Каширском шоссе',
    info: 'Москва',
  },
  {
    slug: 'spbgmtu',
    img: 'https://optim.tildacdn.com/tild6537-6435-4431-a231-383037303538/-/format/webp/Korab_08.jpg',
    num: '06',
    cat: 'Коммерческий · 2021',
    title: 'СПбГМТУ (Корабелка)',
    info: 'Санкт-Петербург',
  },
]

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const total = PROJECTS.length
  const paused = useRef(false)

  const go = useCallback((dir: number) => {
    setCurrent(c => (c + dir + total) % total)
  }, [total])

  // Автопрокрутка каждые 3.5 секунды
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) go(1)
    }, 3500)
    return () => clearInterval(id)
  }, [go])

  // Показываем 3 слайда за раз, начиная с current
  const visible = [0, 1, 2].map(i => PROJECTS[(current + i) % total])

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-left">
            <span className="eyebrow">— Избранные работы</span>
            <h2 className="h-section">Наши проекты</h2>
          </div>
          <div className="section-head-right">
            От лаконичных квартир до загородных резиденций и коммерческих пространств.
            Листайте карусель или нажмите на проект, чтобы перейти в архив.
          </div>
        </div>
      </div>

      {/* Карусель — полная ширина */}
      <div className="proj-carousel reveal" onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
        <button className="pc-arrow pc-arrow-prev" onClick={() => go(-1)} aria-label="Назад">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18L9 12L15 6"/>
          </svg>
        </button>
        <button className="pc-arrow pc-arrow-next" onClick={() => go(1)} aria-label="Вперёд">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18L15 12L9 6"/>
          </svg>
        </button>

        <div className="pc-track" ref={trackRef}>
          {visible.map((p, i) => (
            <a key={`${p.slug}-${i}`} href="#archive" className="pc-slide">
              <div className="pc-slide-img">
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className="pc-slide-num">{p.num}</span>
              </div>
              <div className="pc-slide-meta">
                <div className="pc-slide-cat">{p.cat}</div>
                <h3 className="pc-slide-title">{p.title}</h3>
                <div className="pc-slide-info">{p.info}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="pc-controls">
          <div className="pc-progress">
            <div
              className="pc-progress-bar"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
          <div className="pc-counter">
            <strong>{String(current + 1).padStart(2, '0')}</strong>
            {' / '}
            <span>{String(total).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', marginTop: '64px' }}>
        <a href="#archive" className="btn btn-ghost reveal">Все проекты</a>
      </div>
    </section>
  )
}
