'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

interface SanityProject {
  slug: string
  num: string
  title: string
  cat: string
  area: number | null
  city: string
  year: number | null
  coverUrl: string | null
}

export default function Projects({ projects }: { projects: SanityProject[] }) {
  const [current, setCurrent] = useState(0)
  const [sliding, setSliding] = useState(false)
  const paused = useRef(false)
  const total = projects.length

  const go = useCallback((dir: number) => {
    if (sliding || total === 0) return
    setSliding(true)
    setCurrent(c => (c + dir + total) % total)
    setTimeout(() => setSliding(false), 600)
  }, [total, sliding])

  useEffect(() => {
    if (total === 0) return
    const id = setInterval(() => {
      if (!paused.current) go(1)
    }, 4000)
    return () => clearInterval(id)
  }, [go, total])

  if (total === 0) return null

  // Показываем 3 слайда: prev, current, next и ещё 2
  const slides = [-1, 0, 1, 2, 3].map(offset => projects[(current + offset + total) % total])

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="proj-head reveal">
          <span className="eyebrow">— Избранные работы</span>
          <h2 className="h-section">Наши проекты</h2>
        </div>
      </div>

      <div
        className="proj-carousel reveal"
        onMouseEnter={() => { paused.current = true }}
        onMouseLeave={() => { paused.current = false }}
      >
        {/* Слайдер */}
        <div className="pc-slider-wrap">
          <div className={`pc-slider-track${sliding ? ' sliding' : ''}`}>
            {slides.map((p, i) => (
              <Link
                key={`${p.slug}-${current}-${i}`}
                href={`/projects/${p.slug}`}
                className="pc-slide"
              >
                <div className="pc-slide-img">
                  {p.coverUrl
                    ? <img src={`${p.coverUrl}?w=900&auto=format`} alt={p.title} loading="lazy" />
                    : <div className="pc-slide-empty">R</div>
                  }
                  <span className="pc-slide-num">{String(p.num || '01').padStart(2, '0')}</span>
                </div>
                <div className="pc-slide-meta">
                  <div className="pc-slide-cat">{[p.cat, p.year].filter(Boolean).join(' · ')}</div>
                  <h3 className="pc-slide-title">{p.title}</h3>
                  <div className="pc-slide-info">{[p.city, p.area ? `${p.area} м²` : null].filter(Boolean).join(' · ')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Стрелки */}
        <button className="pc-arrow pc-arrow-prev" onClick={() => go(-1)} aria-label="Назад">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18L9 12L15 6"/>
          </svg>
        </button>
        <button className="pc-arrow pc-arrow-next" onClick={() => go(1)} aria-label="Вперёд">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18L15 12L9 6"/>
          </svg>
        </button>

        {/* Прогресс */}
        <div className="pc-controls">
          <div className="pc-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`pc-dot${i === current ? ' active' : ''}`}
                onClick={() => { if (!sliding) { setSliding(true); setCurrent(i); setTimeout(() => setSliding(false), 600) } }}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
          <div className="pc-counter">
            <strong>{String(current + 1).padStart(2, '0')}</strong>
            {' / '}
            <span>{String(total).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', marginTop: 56 }}>
        <a href="/#archive" className="btn btn-ghost reveal">Все проекты</a>
      </div>
    </section>
  )
}
