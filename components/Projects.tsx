'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

// Базовая скорость в пикселях на кадр (~60fps). Множитель меняет её на лету.
const BASE_SPEED = 0.6
const SPEED_OPTIONS = [1, 2, 3] as const
// Порог в пикселях, за которым считаем, что пользователь тянет, а не кликает
const DRAG_THRESHOLD = 5

export default function Projects({ projects }: { projects: SanityProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef   = useRef(0)
  const pausedRef = useRef(false)
  const rafRef   = useRef(0)
  // Множитель скорости в ref — анимационный цикл читает мгновенно, без перезапуска эффекта
  const speedRef = useRef(1)
  const [speed, setSpeed] = useState(1)
  // Состояние перетаскивания (mouse/touch). Всё в ref'ах, чтобы не пересоздавать обработчики.
  const setWidthRef = useRef(0)
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
  const dragStartPosRef = useRef(0)
  // null — направление ещё не определено; horizontal — захватили; vertical — отдали странице
  const dragAxisRef = useRef<null | 'horizontal' | 'vertical'>(null)
  const dragMovedRef = useRef(false)
  // Подавление клика после drag — иначе тянем мышью и случайно открываем проект
  const suppressClickRef = useRef(false)
  // Состояние ховера — чтобы после drag сохранить паузу, если мышь всё ещё над лентой
  const hoverRef = useRef(false)

  useEffect(() => { speedRef.current = speed }, [speed])

  useEffect(() => {
    const track = trackRef.current
    if (!track || projects.length === 0) return

    // Ждём полной отрисовки, затем замеряем
    const id = requestAnimationFrame(() => {
      const setWidth = track.scrollWidth / 2
      if (setWidth === 0) return
      setWidthRef.current = setWidth

      function tick() {
        if (!pausedRef.current) {
          posRef.current += BASE_SPEED * speedRef.current
          if (posRef.current >= setWidth) posRef.current -= setWidth
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

  // ── Перетаскивание (мышь + сенсор) ──────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // На каждый pointerdown — обнуляем состояние, направление определим в первом move
    dragAxisRef.current = null
    dragMovedRef.current = false
    dragStartXRef.current = e.clientX
    dragStartYRef.current = e.clientY
    dragStartPosRef.current = posRef.current
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const axis = dragAxisRef.current
    if (axis === 'vertical') return  // отдали странице, ничего не делаем

    const dx = dragStartXRef.current - e.clientX
    const dy = e.clientY - dragStartYRef.current
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)

    // Направление ещё не определено
    if (axis === null) {
      if (absX < DRAG_THRESHOLD && absY < DRAG_THRESHOLD) return
      if (absY > absX) {
        // Вертикальный жест — отдаём странице, дальше не реагируем
        dragAxisRef.current = 'vertical'
        return
      }
      // Горизонтальный жест — захватываем pointer, начинаем drag
      dragAxisRef.current = 'horizontal'
      pausedRef.current = true
      try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* ignore */ }
    }

    // axis === 'horizontal'
    const track = trackRef.current
    const setWidth = setWidthRef.current
    if (!track || setWidth === 0) return

    if (absX > DRAG_THRESHOLD) dragMovedRef.current = true

    // Кольцевой модуль: pos всегда в [0, setWidth)
    let next = (dragStartPosRef.current + dx) % setWidth
    if (next < 0) next += setWidth
    posRef.current = next
    track.style.transform = `translateX(-${next}px)`
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragAxisRef.current === 'horizontal') {
      // Резюмим авто-скролл только если мышь не над лентой (ховер удержит паузу)
      pausedRef.current = hoverRef.current
      if (dragMovedRef.current) suppressClickRef.current = true
      try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* ignore */ }
    }
    dragAxisRef.current = null
  }

  // Гасит клик по ссылке проекта, если только что был drag — на capture,
  // чтобы Link не успел навигировать
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClickRef.current = false
    }
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="proj-head reveal">
          <span className="eyebrow">— Избранные работы</span>
          <h2 className="proj-h2">Наши проекты</h2>
          <p className="proj-sub">
            От лаконичных квартир до загородных резиденций.<br/>
            Листайте свайпом или мышью, наведите — для паузы.
          </p>
        </div>

        {/* Переключатель скорости — над каруселью, ближе к фото */}
        <div className="proj-speed proj-speed--top" role="group" aria-label="Скорость прокрутки">
          <span className="proj-speed-label">Скорость</span>
          {SPEED_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              className={`proj-speed-btn${speed === opt ? ' active' : ''}`}
              onClick={() => setSpeed(opt)}
              aria-pressed={speed === opt}
              aria-label={`${opt}×`}
            >
              {opt}×
            </button>
          ))}
        </div>
      </div>

      <div
        className="proj-carousel"
        onMouseEnter={() => { hoverRef.current = true; if (dragAxisRef.current !== 'horizontal') pausedRef.current = true }}
        onMouseLeave={() => { hoverRef.current = false; if (dragAxisRef.current !== 'horizontal') pausedRef.current = false }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div ref={trackRef} className="pc-track-flow">
          {slides.map((p, i) => (
            <Link
              key={`${p.slug}-${i}`}
              href={`/projects/${p.slug}`}
              className="pc-slide"
              draggable={false}
            >
              <div className="pc-slide-img">
                {p.coverUrl
                  ? <Image
                      src={p.coverUrl}
                      alt={p.title}
                      fill
                      sizes="(max-width: 600px) 80vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      draggable={false}
                    />
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

      <div className="container" style={{ textAlign: 'center', marginTop: 32 }}>
        <a href="/#archive" className="btn btn-ghost reveal">Смотреть все проекты</a>
      </div>
    </section>
  )
}
