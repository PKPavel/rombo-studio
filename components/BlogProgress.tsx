'use client'
import { useEffect, useState } from 'react'

export function BlogProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setPct(total > 0 ? Math.min(100, (scrollTop / total) * 100) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 200,
        height: 3, width: `${pct}%`,
        background: 'var(--accent)',
        transition: 'width .1s linear',
        pointerEvents: 'none',
      }}
    />
  )
}
