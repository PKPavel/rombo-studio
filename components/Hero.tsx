'use client'

import { useEffect, useRef, useState } from 'react'

const slides = [
  {
    id: 1,
    title: 'Создаём дома,\nв которые\nхочется\nвозвращаться',
    sub: 'Дизайн-студия ROMBO · Санкт-Петербург',
    bg: '#2a1f1a',
  },
  {
    id: 2,
    title: 'Каждый проект —\nэто история\nконкретного\nчеловека',
    sub: 'Интерьеры с характером · с 2018 года',
    bg: '#1a2228',
  },
  {
    id: 3,
    title: 'От концепции\nдо авторского\nнадзора\nпод ключ',
    sub: '70+ реализованных проектов',
    bg: '#1e1f18',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (idx: number) => {
    if (animating || idx === current) return
    setPrev(current)
    setAnimating(true)
    setCurrent(idx)
    setTimeout(() => {
      setPrev(null)
      setAnimating(false)
    }, 800)
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % slides.length)
    }, 4000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, animating])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: 600,
        overflow: 'hidden',
        background: 'var(--dark)',
      }}
    >
      {slides.map((slide, idx) => {
        const isActive = idx === current
        const isPrev = idx === prev
        return (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              background: slide.bg,
              opacity: isActive ? 1 : isPrev ? 0 : 0,
              transition: 'opacity 0.8s ease',
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'var(--pad)',
              paddingBottom: 'clamp(48px, 8vw, 100px)',
            }}
          >
            <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'var(--bronze-light)',
                fontWeight: 500,
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
                  color: 'var(--on-dark)',
                  whiteSpace: 'pre-line',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                }}
              >
                {slide.title}
              </h1>
            </div>
          </div>
        )
      })}

      {/* Пагинация */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(24px, 4vw, 48px)',
        right: 'var(--pad)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Слайд ${idx + 1}`}
            style={{
              width: idx === current ? 32 : 6,
              height: 1.5,
              background: idx === current ? 'var(--on-dark)' : 'rgba(244,237,224,0.4)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.4s ease, background 0.4s ease',
              borderRadius: 1,
            }}
          />
        ))}
        <span style={{
          fontFamily: 'var(--sans)',
          fontSize: 11,
          color: 'var(--on-dark-mute)',
          letterSpacing: '0.1em',
          marginLeft: 8,
        }}>
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Скролл-хинт */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(24px, 4vw, 48px)',
        left: 'var(--pad)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        color: 'var(--on-dark-mute)',
      }}>
        <div style={{
          width: 1,
          height: 48,
          background: 'var(--on-dark-mute)',
          animation: 'scrollHint 2s ease-in-out infinite',
        }}/>
        <span style={{
          fontFamily: 'var(--sans)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}>
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes scrollHint {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(0.6); }
        }
      `}</style>
    </section>
  )
}
