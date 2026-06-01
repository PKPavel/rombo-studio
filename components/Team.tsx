'use client'

import Image from 'next/image'

// ─── Team — секция «Наша команда» ────────────────────────────────────────────
// Фото: добавить в public/images/team/
// Формат: квадратное ч/б, имя файла = slug (lyubov.jpg, svetlana.jpg и т.д.)
// Когда появится фото — добавить поле photo: '/images/team/имя.jpg'

interface TeamMember {
  name: string
  role: string
  photo?: string
  pos?: string    // object-position CSS
  soon?: boolean   // заглушка «Скоро»
}

const TEAM: TeamMember[] = [
  { name: 'Александра', role: 'Руководитель студии, дизайнер',  photo: '/images/alexandra.png',        pos: 'center 15%' },
  { name: 'Любовь',     role: 'Дизайнер интерьеров',            photo: '/images/team/lyubov.png',      pos: 'center 10%' },
  { name: 'Светлана',   role: 'Дизайнер интерьеров',            photo: '/images/team/svetlana.png',    pos: 'center 15%' },
  { name: 'Анастасия',  role: 'Дизайнер интерьеров',            photo: '/images/team/anastasia1.png',  pos: 'center 10%' },
  { name: 'Алина',      role: 'Дизайнер интерьеров',            photo: '/images/team/alina.png',       pos: 'center 20%' },
  { name: 'Анастасия',  role: '3D-визуализатор',                photo: '/images/team/anastasia2.png',  pos: 'center 15%' },
  { name: 'Василий',    role: '3D-визуализатор',                photo: '/images/team/vasiliy.png',     pos: 'center 20%' },
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
          <h2 className="h-section">Люди, которые делают проект</h2>
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
                  ? <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 220px"
                      style={{ objectFit: 'cover', objectPosition: member.pos || 'center top' }}
                    />
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
