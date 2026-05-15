'use client'

import { useEffect, useState } from 'react'

// ─── Кастомный курсор ─────────────────────────────────────────────────────────
export function CustomCursor() {
  useEffect(() => {
    const el = document.createElement('div')
    el.className = 'cursor'
    document.body.appendChild(el)

    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }

    const addHover = () => el.classList.add('hover')
    const removeHover = () => el.classList.remove('hover')

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', (e) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [role="button"], input, select, textarea')) {
        addHover()
      } else {
        removeHover()
      }
    })

    return () => {
      document.removeEventListener('mousemove', move)
      el.remove()
    }
  }, [])

  return null
}

// ─── Scroll-spy ───────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',     num: '01', label: 'Главная' },
  { id: 'projects', num: '02', label: 'Проекты' },
  { id: 'founder',  num: '03', label: 'Студия' },
  { id: 'services', num: '04', label: 'Услуги' },
  { id: 'pricing',  num: '05', label: 'Цены' },
  { id: 'contact',  num: '06', label: 'Контакты' },
]

const DARK_SECTIONS = new Set(['hero', 'services', 'contact'])

export function ScrollSpy() {
  const [active, setActive] = useState('hero')
  const [onLight, setOnLight] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActive(id)
            setOnLight(!DARK_SECTIONS.has(id))
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`scrollspy${onLight ? ' on-light' : ''}`}
      aria-label="Навигация по странице"
    >
      {SECTIONS.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`ss-dot${active === s.id ? ' active' : ''}`}
        >
          <span className="ss-dot-num">{s.num}</span>
          <span className="ss-dot-line" />
          <span className="ss-dot-label">{s.label}</span>
        </a>
      ))}
    </nav>
  )
}

// ─── Floating bar (мобильный) ─────────────────────────────────────────────────
export function FloatingBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`float-bar${show ? ' show' : ''}`}>
      <a href="tel:+79045581631" className="fb-call">Позвонить</a>
      <a href="https://t.me/+79045581631" target="_blank" rel="noopener">Telegram</a>
    </div>
  )
}

// ── Reveal-анимации при скролле ───────────────────────────────────────────
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    const observe = () =>
      document.querySelectorAll('.reveal:not(.in-view)').forEach(el => observer.observe(el))

    observe()
    // Повторно наблюдаем при динамической загрузке
    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { observer.disconnect(); mo.disconnect() }
  }, [])
  return null
}
