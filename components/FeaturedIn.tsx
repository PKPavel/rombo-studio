'use client'

const STATS = [
  { num: '70+',  label: 'реализованных проектов' },
  { num: '10',   label: 'лет на рынке — с 2016 года' },
  { num: '40+',  label: 'городов России и СНГ' },
  { num: '100%', label: 'проектов сданы в срок' },
  { num: '4.9',  label: 'средняя оценка клиентов' },
  { num: '15+',  label: 'специалистов в команде' },
  { num: '500+', label: 'довольных клиентов' },
  { num: '360°', label: 'дизайн под ключ' },
]

export default function FeaturedIn() {
  // 2 копии для бесшовного скролла: анимация translateX(-50%) = ровно 1 набор
  const items = [...STATS, ...STATS]

  return (
    <section className="featured reveal">
      <div className="featured-track">
        {items.map((s, i) => (
          <div key={i} className="featured-stat">
            <span className="featured-stat-num">{s.num}</span>
            <span className="featured-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
