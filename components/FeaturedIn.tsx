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
  return (
    <section className="featured">
      <div className="featured-track" aria-hidden="true">
        {[...STATS, ...STATS].map((s, i) => (
          <div key={i} className="featured-stat">
            <span className="featured-stat-num">{s.num}</span>
            <span className="featured-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
