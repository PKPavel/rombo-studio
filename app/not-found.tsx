import Link from 'next/link'
import { CustomCursor } from './components/ScrollSpyCursor'

export default function NotFound() {
  return (
    <>
      <CustomCursor />
      <main style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: 'clamp(40px, 8vw, 80px)',
      textAlign: 'center',
    }}>
      <span style={{
        fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.25em',
        textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24, display: 'block',
      }}>
        — 404
      </span>
      <h1 style={{
        fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 8vw, 96px)',
        fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--ink)',
        lineHeight: 1.05, marginBottom: 24,
      }}>
        Страница<br />не найдена
      </h1>
      <p style={{
        fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 2vw, 18px)',
        color: 'var(--ink)', opacity: 0.55, lineHeight: 1.7,
        maxWidth: 480, marginBottom: 48,
      }}>
        Возможно, страница была перемещена или удалена. Загляните в наши проекты — там точно есть что-то интересное.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          fontFamily: 'var(--sans)', fontSize: 13, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none',
          border: '1px solid rgba(26,22,20,0.25)', padding: '14px 28px',
          borderRadius: 2, transition: 'border-color .2s',
        }}>
          На главную
        </Link>
        <Link href="/#archive" style={{
          fontFamily: 'var(--sans)', fontSize: 13, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--on-dark)', textDecoration: 'none',
          background: 'var(--ink)', padding: '14px 28px',
          borderRadius: 2,
        }}>
          Смотреть проекты
        </Link>
      </div>
    </main>
    </>
  )
}
