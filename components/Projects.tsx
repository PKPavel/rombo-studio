'use client'

import { useRef, useEffect } from 'react'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef   = useRef(0)
  const pausedRef = useRef(false)
  const rafRef   = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track || projects.length === 0) return

    // Ждём полной отрисовки, затем замеряем
    const id = requestAnimationFrame(() => {
      const setWidth = track.scrollWidth / 2
      if (setWidth === 0) return

      function tick() {
        if (!pausedRef.current) {
          posRef.current += 0.45
          if (posRef.current >= setWidth) posRef.current = 0
          if (track) track.style.transform = `translateX(-${posRef.current}px)`
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    })

    return () => { cancelAnimationFrame(id); cancelAnimationFrame(rafRef.current) }
  }, [projects.length])

  if (projects.length === 0) return null

  // 2 копии для бесшовного цикла
  const slides = [...projects, ...projects]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="proj-head reveal">
          <span className="eyebrow">— Избранные работы</span>
          <h2 className="proj-h2">Наши проекты</h2>
          <p className="proj-sub">
            От лаконичных квартир до загородных резиденций.<br/>
            Наведите на проект — нажмите, чтобы перейти.
          </p>
        </div>
      </div>

      <div
        className="proj-carousel"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <div ref={trackRef} className="pc-track-flow">
          {slides.map((p, i) => (
            <Link
              key={`${p.slug}-${i}`}
              href={`/projects/${p.slug}`}
              className="pc-slide"
            >
              <div className="pc-slide-img">
                {p.coverUrl
                  ? <img src={`${p.coverUrl}?w=500&auto=format&q=80&q=80`} alt={p.title} loading="lazy" />
                  : <div className="pc-slide-empty">R</div>
                }
                <span className="pc-slide-num">{String(p.num || '').padStart(2, '0')}</span>
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

      <div className="container" style={{ textAlign: 'center', marginTop: 48 }}>
        <a href="/#archive" className="btn btn-ghost reveal">Смотреть все проекты</a>
      </div>
    </section>
  )
}
