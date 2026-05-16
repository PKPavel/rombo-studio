'use client'

const STATS = [
  { num: '70+',  label: 'реализованных проектов' },
  { num: '8',    label: 'лет на рынке' },
  { num: '40+',  label: 'городов присутствия' },
  { num: '100%', label: 'сданных в срок проектов' },
  { num: '4.9',  label: 'средняя оценка клиентов' },
  { num: '15+',  label: 'дизайнеров в команде' },
]

export default function FeaturedIn() {
  const items = [...STATS, ...STATS]
  return (
    <section className="featured reveal">
      <div className="featured-track-wrap">
        <div className="featured-track">
          {items.map((s, i) => (
            <div key={i} className="featured-stat">
              <span className="featured-stat-num">{s.num}</span>
              <span className="featured-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
