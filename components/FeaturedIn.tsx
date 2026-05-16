'use client'
import { useEffect, useRef } from 'react'

const STATS = [
  { num: '70+',  label: 'реализованных проектов' },
  { num: '10',   label: 'лет на рынке — с 2016 года' },
  { num: '40+',  label: 'городов России и СНГ' },
  { num: '100%', label: 'проектов сданы в срок' },
  { num: '4.9',  label: 'средняя оценка клиентов' },
  { num: '15+',  label: 'специалистов в команде' },
  { num: '500+', label: 'довольных клиентов' },
  { num: '360°', label: 'дизайн под ключ' },
]

export default function FeaturedIn() {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // Ширина одного набора (половина трека, т.к. 2 копии)
    const setWidth = track.scrollWidth / 2
    const speed = 0.5 // px per frame

    function animate() {
      if (!pausedRef.current) {
        posRef.current += speed
        if (posRef.current >= setWidth) posRef.current = 0
        if (track) track.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section
      className="featured"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div ref={trackRef} className="featured-track">
        {[...STATS, ...STATS].map((s, i) => (
          <div key={i} className="featured-stat">
            <span className="featured-stat-num">{s.num}</span>
            <span className="featured-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
