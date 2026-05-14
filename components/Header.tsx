'use client'

import { useState, useEffect } from 'react'

// Полный SVG логотип ROMBO из оригинала
function RomboLogo() {
  return (
    <svg
      className="logo-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="90 418 883 244"
      fill="currentColor"
      role="img"
      aria-label="ROMBO"
    >
      <g>
        <g>
          <path d="M466.81,528.75h-20.58c-3.27,0-5.93,2.65-5.93,5.93v22.54h-19.54v-94.26c0-1.89,1.53-3.42,3.42-3.42h46.81c20.93,0,38.24,13.82,38.24,34.61,0,13.67-8.93,25.12-21.07,30.84l24.56,32.23h-24.28l-21.63-28.47Zm4.19-51.21h-24.77c-3.27,0-5.93,2.65-5.93,5.93v27h30.7c10.75,0,18.7-7.12,18.7-16.33s-7.81-16.61-18.7-16.61Z"/>
          <path d="M658.17,557.22h-19.54v-94.26c0-1.89,1.53-3.42,3.42-3.42h21.42l26.07,61.48c2.04,4.82,8.88,4.82,10.92,0l25.95-61.47h24.84v97.68h-19.54v-33.85c0-6.44-8.83-8.26-11.37-2.34l-15.56,36.19h-19.68l-15.55-36.35c-2.54-5.93-11.38-4.12-11.38,2.33v34.01Z"/>
          <path d="M769.25,462.96c0-1.89,1.53-3.42,3.42-3.42h45.98c20.23,0,33.91,10.05,33.91,25.54,0,9.63-6,17.58-15.21,22.05,12.14,4.05,19.68,12.14,19.68,22.89,0,16.33-16.33,27.21-38.38,27.21h-49.4v-94.26Zm49.4,13.32h-23.93c-3.27,0-5.93,2.65-5.93,5.93v17.51h29.86c8.23,0,15.21-4.88,15.21-11.58,0-7.12-6.42-11.86-15.21-11.86Zm0,39.63h-23.93c-3.27,0-5.93,2.65-5.93,5.93v18.49h29.86c11.3,0,18.7-4.6,18.7-12.14,0-7.95-6.98-12.28-18.7-12.28Z"/>
          <path d="M622.48,490.25c-3.83-13.7-14.37-24.53-27.89-28.98-41.51-13.64-76.52,10.83-76.52,47.25,0,29.03,23.03,50.79,53.59,50.79,36.41,0,61.93-29.32,50.82-69.07Zm-50.85,50.09c-19.22,0-33.69-13.69-33.69-31.94,0-22.9,22.02-38.28,48.11-29.71,8.5,2.79,15.13,9.6,17.53,18.22,6.98,24.99-9.06,43.43-31.96,43.43Z"/>
          <path d="M970.09,490.18c-3.83-13.7-14.37-24.53-27.89-28.98-41.51-13.64-76.52,10.83-76.52,47.25,0,29.03,23.03,50.79,53.59,50.79,36.41,0,61.93-29.32,50.82-69.07Zm-50.85,50.09c-19.22,0-33.69-13.69-33.69-31.94,0-22.9,22.02-38.28,48.11-29.71,8.5,2.79,15.13,9.6,17.53,18.22,6.98,24.99-9.06,43.43-31.96,43.43Z"/>
        </g>
      </g>
      <g>
        <path d="M323.81,568.88l-116.78,93.23-116.81-93.23h72.32c3.29,0,6.48,1.12,9.05,3.17l35.44,28.28,39.38-31.44,38.7-30.9,38.7,30.9Z"/>
        <path d="M323.81,507.09l-38.7,30.88-38.68-30.88-30.36-24.24c-5.29-4.23-12.81-4.23-18.1,0l-30.36,24.24-38.7,30.88-38.7,30.9v-54.8c0-4.41,2.01-8.58,5.45-11.33l102.3-81.67c5.29-4.23,12.8-4.22,18.1,0l107.73,86.03Z"/>
      </g>
    </svg>
  )
}

const NAV_ITEMS = [
  { label: '01 Главная',  href: '#hero' },
  { label: '02 Проекты', href: '#archive' },
  { label: '03 Студия',  href: '#founder' },
  { label: '04 Услуги',  href: '#services' },
  { label: '05 Цены',    href: '#pricing' },
  { label: '06 Контакты', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Закрывать меню при клике на ссылку
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="logo" aria-label="ROMBO — на главную">
          <RomboLogo />
        </a>

        <nav className="nav">
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <a href="#contact" className="header-cta">Оставить заявку</a>

        <button
          className={`burger${menuOpen ? ' open' : ''}`}
          aria-label="Меню"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Мобильное меню */}
      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
        ))}
        <a href="#contact" className="mobile-nav-cta" onClick={closeMenu}>
          Оставить заявку
        </a>
      </nav>
    </>
  )
}
