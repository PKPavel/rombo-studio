import Link from 'next/link'

export const metadata = { title: 'Заявка отправлена | ROMBO', robots: { index: false } }

export default function ThankYou() {
  return (
    <main style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: 'clamp(40px,8vw,80px)',
      textAlign: 'center',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        border: '1.5px solid var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 32,
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 14l6 6L22 8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 20 }}>
        — Заявка получена
      </span>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 300, letterSpacing: '-.025em', color: 'var(--ink)', lineHeight: 1.1, marginBottom: 20 }}>
        Спасибо,<br/>мы свяжемся с вами
      </h1>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', opacity: .5, lineHeight: 1.7, maxWidth: 440, marginBottom: 48 }}>
        Обычно перезваниваем в течение часа в рабочее время.<br/>
        Пока можете посмотреть наши проекты.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/#archive" style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--on-dark)', background: 'var(--ink)', padding: '14px 28px', borderRadius: 2, textDecoration: 'none' }}>
          Смотреть проекты
        </Link>
        <Link href="/" style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink)', border: '1px solid rgba(26,22,20,.2)', padding: '14px 28px', borderRadius: 2, textDecoration: 'none' }}>
          На главную
        </Link>
      </div>
    </main>
  )
}
