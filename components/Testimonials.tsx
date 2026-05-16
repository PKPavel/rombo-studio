'use client'

// Отзывы будут добавлены после получения реальных от клиентов
// Загружайте через rombo.pro/studio → Отзывы (когда Александра пришлёт скрины из мессенджеров)

export default function Testimonials() {
  return (
    <section className="test-band">
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="eyebrow test-eyebrow">— Отзывы клиентов</span>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 300, color: 'var(--ink)', letterSpacing: '-.02em', lineHeight: 1.3, maxWidth: 680, margin: '24px auto 0', opacity: .6, fontStyle: 'italic' }}>
          «Каждый интерьер — это история конкретного человека. Мы рады, когда клиенты возвращаются с новыми проектами.»
        </p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--ink)', opacity: .35, marginTop: 24 }}>
          Александра Серова, руководитель студии
        </p>
      </div>
    </section>
  )
}
