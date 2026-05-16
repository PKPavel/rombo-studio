'use client'
import { useEffect, useState } from 'react'

export function ScrollTopButton() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 800)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  if (!show) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Наверх"
      style={{
        position: 'fixed', bottom: 100, right: 28, zIndex: 94,
        width: 44, height: 44, borderRadius: '50%',
        background: 'var(--bg)', border: '1px solid rgba(26,22,20,.2)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,.1)',
        transition: 'all .2s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--ink)'; (e.currentTarget as HTMLElement).style.color = 'var(--on-dark)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--ink)' }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  )
}
