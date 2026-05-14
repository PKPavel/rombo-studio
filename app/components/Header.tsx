'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { label: '01 Главная', href: '#hero' },
    { label: '02 Проекты', href: '#archive' },
    { label: '03 Студия', href: '#founder' },
    { label: '04 Услуги', href: '#services' },
    { label: '05 Цены', href: '#pricing' },
    { label: '06 Контакты', href: '#contact' },
  ]

  return (
    <>
      <header
        id="header"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 'var(--header-h)',
          padding: '0 var(--pad)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.4s ease, color 0.4s ease, border-color 0.4s ease',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          color: scrolled ? 'var(--ink)' : 'var(--on-dark)',
          background: scrolled
            ? 'rgba(244, 237, 224, 0.94)'
            : 'linear-gradient(180deg, rgba(15,12,10,0.5) 0%, rgba(15,12,10,0) 100%)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="6" width="20" height="20" rx="2"
              stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="11" y="11" width="10" height="10" rx="1"
              fill="currentColor"/>
          </svg>
          <span style={{
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            ROMBO
          </span>
        </a>

        <nav style={{ display: 'flex', gap: 32 }} className="desktop-nav">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500,
                opacity: 0.8,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
            border: '1px solid currentColor',
            padding: '8px 20px',
            borderRadius: 2,
            opacity: 0.9,
            transition: 'opacity 0.2s',
          }}
        >
          Оставить заявку
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none' }}
          className="burger"
          aria-label="Меню"
        >
          <span style={{
            display: 'block', width: 24, height: 1.5,
            background: 'currentColor', marginBottom: 6,
            transition: 'transform 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }}/>
          <span style={{
            display: 'block', width: 24, height: 1.5,
            background: 'currentColor',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.3s',
          }}/>
          <span style={{
            display: 'block', width: 24, height: 1.5,
            background: 'currentColor', marginTop: 6,
            transition: 'transform 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }}/>
        </button>
      </header>

      {menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'var(--dark)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}>
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'var(--on-dark)',
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(32px, 8vw, 56px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
              }}
            >
              {item.label.split(' ').slice(1).join(' ')}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .burger { display: block !important; }
        }
      `}</style>
    </>
  )
}
