'use client'

// ─── Team — секция «Наша команда» ────────────────────────────────────────────
// Фото: добавить в public/images/team/
// Формат: квадратное ч/б, имя файла = slug (lyubov.jpg, svetlana.jpg и т.д.)
// Когда появится фото — добавить поле photo: '/images/team/имя.jpg'

interface TeamMember {
  name: string
  role: string
  photo?: string   // путь к фото, напр. '/images/team/lyubov.jpg'
  soon?: boolean   // заглушка «Скоро»
}

const TEAM: TeamMember[] = [
  { name: 'Александра', role: 'Руководитель студии, дизайнер' },
  { name: 'Любовь',     role: 'Дизайнер интерьеров' },
  { name: 'Светлана',   role: 'Дизайнер интерьеров' },
  { name: 'Анастасия',  role: 'Дизайнер интерьеров' },
  { name: 'Алина',      role: 'Дизайнер интерьеров' },
  { name: 'Анастасия',  role: '3D-визуализатор' },
  { name: 'Василий',    role: '3D-визуализатор' },
  { soon: true, name: 'Скоро', role: 'Специалист' },
  { soon: true, name: 'Скоро', role: 'Специалист' },
]

function PersonPlaceholder() {
  return (
    <div className="team-photo-placeholder">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="18" r="10" stroke="#B0AAA3" strokeWidth="1.5" />
        <path d="M6 44c0-9.941 8.059-18 18-18s18 8.059 18 18"
          stroke="#B0AAA3" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export default function Team() {
  return (
    <section id="team" className="team">
      <div className="container">

        {/* Header */}
        <div className="team-header reveal">
          <span className="eyebrow">— Наша команда</span>
          <h2 className="h-section">Девять рук и&nbsp;глаз</h2>
          <p className="team-subtitle">
            Команда, которая ведёт ваш проект на&nbsp;всех этапах: от&nbsp;планировки
            до&nbsp;последней детали комплектации.
          </p>
        </div>

        {/* Grid */}
        <div className="team-grid reveal">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className={`team-card${member.soon ? ' team-card--soon' : ''}`}
            >
              <div className="team-photo">
                {member.photo
                  ? <img src={member.photo} alt={member.name} loading="lazy" />
                  : <PersonPlaceholder />
                }
              </div>
              <h4>{member.name}</h4>
              <span className="team-role">{member.role}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
