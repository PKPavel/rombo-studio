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
  const [fading, setFading] = useState(false)
  const paused = useRef(false)
  const total = projects.length

  const go = useCallback((dir: number) => {
    if (fading || total === 0) return
    setFading(true)
    setTimeout(() => {
      setCurrent(c => (c + dir + total) % total)
      setFading(false)
    }, 220)
  }, [total, fading])

  useEffect(() => {
    if (total === 0) return
    const id = setInterval(() => {
      if (!paused.current) go(1)
    }, 3800)
    return () => clearInterval(id)
  }, [go, total])

  if (total === 0) return null

  const visible = [0, 1, 2].map(i => projects[(current + i) % total])

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
            Листайте карусель или нажмите на проект, чтобы узнать подробнее.
          </div>
        </div>
      </div>

      <div
        className="proj-carousel reveal"
        onMouseEnter={() => { paused.current = true }}
        onMouseLeave={() => { paused.current = false }}
      >
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

        <div className={`pc-track${fading ? ' pc-track--fading' : ''}`}>
          {visible.map((p, i) => (
            <Link key={`${p.slug}-${current}-${i}`} href={`/projects/${p.slug}`} className="pc-slide">
              <div className="pc-slide-img">
                {p.coverUrl
                  ? <img src={`${p.coverUrl}?w=900&auto=format`} alt={p.title} loading="lazy" />
                  : <div style={{ width: '100%', height: '100%', background: '#2a1f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'var(--serif)', fontSize: 48, color: 'rgba(244,237,224,.15)' }}>R</span>
                    </div>
                }
                <span className="pc-slide-num">{String(p.num || i + 1).padStart(2, '0')}</span>
              </div>
              <div className="pc-slide-meta">
                <div className="pc-slide-cat">{[p.cat, p.year].filter(Boolean).join(' · ')}</div>
                <h3 className="pc-slide-title">{p.title}</h3>
                <div className="pc-slide-info">{[p.city, p.area ? `${p.area} м²` : null].filter(Boolean).join(' · ')}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pc-controls">
          <div className="pc-progress">
            <div className="pc-progress-bar" style={{ width: `${((current + 1) / total) * 100}%` }} />
          </div>
          <div className="pc-counter">
            <strong>{String(current + 1).padStart(2, '0')}</strong>
            {' / '}
            <span>{String(total).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', marginTop: '64px' }}>
        <a href="/#archive" className="btn btn-ghost reveal">Все проекты</a>
      </div>
    </section>
  )
}
