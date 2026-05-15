'use client'

export function Marquee() {
  const text = 'Авторские интерьеры под ключ · с 2016 года · Санкт-Петербург · Авторский дизайн · '
  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>{text}{text}</span>
      </div>
    </div>
  )
}

const STATS = [
  { num: '8',   suffix: '+',  label: 'Лет студии' },
  { num: '70',  suffix: '+',  label: 'Завершённых проектов' },
  { num: '12',  suffix: 'K',  label: 'м² спроектировано' },
  { num: '4.9', suffix: '/5', label: 'Рейтинг клиентов' },
]

export function Stats() {
  return (
    <section className="stats-band">
      <div className="container">
        <div className="stats-band-grid">
          {STATS.map(s => (
            <div key={s.label} className="stat-cell">
              <div className="stat-num">{s.num}<em>{s.suffix}</em></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
