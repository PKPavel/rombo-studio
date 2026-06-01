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

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [role="button"], input, select, textarea')) {
        el.classList.add('hover')
      } else {
        el.classList.remove('hover')
      }
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      el.remove()
    }
  }, [])

  return null
}

// ─── Scroll-spy ───────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',     num: '01', label: 'Главная' },
  { id: 'projects', num: '02', label: 'Проекты' },
  { id: 'archive',  num: '03', label: 'Архив' },
  { id: 'founder',  num: '04', label: 'Студия' },
  { id: 'services', num: '05', label: 'Услуги' },
  { id: 'process',  num: '06', label: 'Этапы' },
  { id: 'pricing',  num: '07', label: 'Цены' },
  { id: 'blog',     num: '08', label: 'Журнал' },
  { id: 'faq',      num: '09', label: 'FAQ' },
  { id: 'contact',  num: '10', label: 'Контакты' },
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
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Мобильная полоска снизу */}
      <div className={`float-bar${show ? ' show' : ''}`}>
        <a href="tel:+79045581631" className="fb-call">Позвонить</a>
        <a href="https://t.me/+79045581631" target="_blank" rel="noopener">Telegram</a>
      </div>

      {/* Floating Telegram FAB — десктоп и планшет */}
      <a
        href="https://t.me/+79045581631"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в Telegram"
        className={`tg-fab${show ? ' tg-fab--show' : ''}`}
      >
        <span className="tg-fab-pulse" />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#29B6F6"/>
          <path d="M17.64 7.22l-2.02 9.53c-.15.67-.54.83-1.08.52l-3-2.21-1.44 1.39c-.16.16-.3.29-.61.29l.22-3.07 5.59-5.05c.24-.22-.05-.33-.38-.12L7.2 13.37l-2.97-.93c-.64-.2-.66-.64.14-.95l11.6-4.47c.54-.19 1.01.13.87.94-.01.01-.01.01 0 0\.z" fill="white"/>
        </svg>
        <span className="tg-fab-label">Написать</span>
      </a>
    </>
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
