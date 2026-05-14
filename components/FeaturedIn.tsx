'use client'

const PUBLICATIONS = [
  { name: 'AD', em: 'Russia' },
  { name: 'ELLE', em: 'Decoration' },
  { name: 'Interior', em: '+Design' },
  { name: 'Salon', em: '' },
  { name: 'My', em: 'Decor' },
  { name: 'House', em: '&Home' },
]

export default function FeaturedIn() {
  // Дублируем для бесконечной прокрутки
  const items = [...PUBLICATIONS, ...PUBLICATIONS]

  return (
    <section className="featured reveal">
      <div className="container">
        <div className="featured-row">
          <span className="featured-label">— Публикации</span>
          <div className="featured-marquee">
            <div className="featured-track">
              {items.map((p, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '36px' }}>
                  <span className="featured-name">
                    {p.name}{p.em && <em>{p.em}</em>}
                  </span>
                  <span className="featured-sep">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
