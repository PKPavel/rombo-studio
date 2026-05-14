'use client'

import { useEffect, useState, useRef } from 'react'

// ─── Кастомный курсор ─────────────────────────────────────────────────────────
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }

    const addHover = () => el.classList.add('hover')
    const removeHover = () => el.classList.remove('hover')

    document.addEventListener('mousemove', move)

    // Hover на интерактивных элементах
    const targets = document.querySelectorAll('a, button, [role="button"]')
    targets.forEach(t => {
      t.addEventListener('mouseenter', addHover)
      t.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      targets.forEach(t => {
        t.removeEventListener('mouseenter', addHover)
        t.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return <div ref={ref} className="cursor" aria-hidden="true" />
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

export function ScrollSpy() {
  const [active, setActive] = useState('hero')
  const [onLight, setOnLight] = useState(false)

  useEffect(() => {
    const darkSections = new Set(['hero', 'services', 'contact'])

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActive(id)
            setOnLight(!darkSections.has(id))
          }
        })
      },
      { threshold: 0.4 }
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
