'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import sanityImageLoader from '../lib/sanity-image-loader'

interface HeroSlide {
  id: number
  title: string
  sub: string
  coverUrl: string | null
}

const DEFAULT_SLIDES: HeroSlide[] = [
  { id: 1, title: 'Создаём дома,\nв которые\nхочется\nвозвращаться', sub: 'Дизайн-студия ROMBO · Санкт-Петербург', coverUrl: null },
  { id: 2, title: 'Каждый проект —\nэто история\nконкретного\nчеловека', sub: 'Интерьеры с характером · с 2016 года', coverUrl: null },
  { id: 3, title: 'От концепции\nдо авторского\nнадзора\nпод ключ', sub: '70+ реализованных проектов', coverUrl: null },
]

export default function Hero({ projects }: { projects?: { coverUrl: string | null; title: string; city?: string }[] }) {
  const slides: HeroSlide[] = (projects && projects.length > 0)
    ? projects.slice(0, 3).map((p, i) => ({
        id: i + 1,
        title: DEFAULT_SLIDES[i]?.title ?? DEFAULT_SLIDES[0].title,
        // Подпись связана с показанным проектом, а не хардкод
        sub: [p.title, p.city].filter(Boolean).join(' · ')
             || DEFAULT_SLIDES[i]?.sub
             || DEFAULT_SLIDES[0].sub,
        coverUrl: p.coverUrl,
      }))
    : DEFAULT_SLIDES

  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (idx: number) => {
    if (animating || idx === current) return
    setPrev(current)
    setAnimating(true)
    setCurrent(idx)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 800)
  }

  useEffect(() => {
    // Уважаем системную настройку «уменьшить движение» — не крутим автокарусель
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    // Пауза при наведении/фокусе, чтобы не уводить контент из-под пользователя
    if (paused) return
    timerRef.current = setTimeout(() => goTo((current + 1) % slides.length), 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, animating, paused])

  return (
    <section
      id="hero"
      style={{ position: 'relative', height: '100svh', minHeight: 600, overflow: 'hidden', background: 'var(--dark)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {slides.map((slide, idx) => {
        const isActive = idx === current
        const isPrev = idx === prev
        return (
          <div
            key={slide.id}
            style={{
              position: 'absolute', inset: 0,
              opacity: isActive ? 1 : isPrev ? 0 : 0,
              transition: 'opacity 0.8s ease',
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'var(--pad)', paddingTop: 'clamp(80px, 12vw, 140px)',
            }}
          >
            {/* Фото проекта как фон */}
            {slide.coverUrl && (
              <Image
                loader={sanityImageLoader}
                src={slide.coverUrl}
                alt=""
                fill
                priority={idx === 0}
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            )}
            {/* Градиент поверх фото */}
            <div style={{
              position: 'absolute', inset: 0,
              background: slide.coverUrl
                ? 'radial-gradient(ellipse 80% 70% at 50% 55%, rgba(10,8,6,0.72) 0%, rgba(10,8,6,0.35) 55%, rgba(10,8,6,0.15) 100%)'
                : 'linear-gradient(135deg, #2a1f1a 0%, #1a1410 100%)',
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 'clamp(640px, 75vw, 1100px)', margin: '0 auto', width: '100%', textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.4em',
                textTransform: 'uppercase', color: 'rgba(244,237,224,0.55)', fontWeight: 400,
                textShadow: '0 1px 8px rgba(0,0,0,0.8)',
                marginBottom: 32,
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
              }}>
                {slide.sub}
              </p>
              <h1
                className="h-hero"
                style={{
                  color: 'var(--on-dark)', whiteSpace: 'pre-line',
                  textShadow: '0 2px 24px rgba(0,0,0,0.5), 0 1px 6px rgba(0,0,0,0.4)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                }}
              >
                {slide.title}
              </h1>
              <div style={{ marginTop: 48, display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
                <a href="/#contact" className="btn" style={{
                  borderColor: 'rgba(244,237,224,0.4)', color: 'var(--on-dark)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s, border-color .2s, background .2s',
                }}>
                  Обсудить проект
                </a>
                <a href="/#archive" style={{
                  fontFamily: 'var(--sans)', fontSize: 13, color: 'rgba(244,237,224,0.6)',
                  letterSpacing: '0.08em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                }}>
                  Смотреть проекты →
                </a>
              </div>
            </div>
          </div>
        )
      })}

      {/* Пагинация */}
      <div style={{ position: 'absolute', bottom: 'clamp(24px, 4vw, 48px)', right: 'var(--pad)', zIndex: 10, display: 'flex', gap: 8 }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Слайд ${idx + 1}`}
            style={{
              width: idx === current ? 28 : 8, height: 8, borderRadius: 4,
              background: idx === current ? 'var(--on-dark)' : 'rgba(244,237,224,0.35)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>


    </section>
  )
}
