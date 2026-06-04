import Image from 'next/image'
import { client } from '../sanity.client'

// ─── Team — секция «Наша команда» ────────────────────────────────────────────
// Источник данных — Sanity (документы «Команда»). Пока команда не заведена в
// Studio, секция показывает запасной (захардкоженный) состав ниже.

interface TeamMember {
  name: string
  role: string
  photo?: string  // URL (Sanity CDN) или путь к локальному файлу
  pos?: string    // object-position CSS
}

// Запасной состав — используется, если в Sanity ещё нет участников
const FALLBACK_TEAM: TeamMember[] = [
  { name: 'Александра', role: 'Руководитель студии, дизайнер',  photo: '/images/alexandra.png',        pos: 'center 15%' },
  { name: 'Любовь',     role: 'Дизайнер интерьеров',            photo: '/images/team/lyubov.png',      pos: 'center 10%' },
  { name: 'Светлана',   role: 'Дизайнер интерьеров',            photo: '/images/team/svetlana.png',    pos: 'center 15%' },
  { name: 'Анастасия',  role: 'Дизайнер интерьеров',            photo: '/images/team/anastasia1.png',  pos: 'center 10%' },
  { name: 'Алина',      role: 'Дизайнер интерьеров',            photo: '/images/team/alina.png',       pos: 'center 20%' },
  { name: 'Анастасия',  role: '3D-визуализатор',                photo: '/images/team/anastasia2.png',  pos: 'center 15%' },
  { name: 'Василий',    role: '3D-визуализатор',                photo: '/images/team/vasiliy.png',     pos: 'center 20%' },
]

const TEAM_QUERY = `*[_type == "teamMember" && !disabled] | order(order asc) {
  name, role, objectPosition,
  "photo": photo.asset->url
}`

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

export default async function Team() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fromCms: any[] = await client.fetch(TEAM_QUERY).catch(() => [])
  const team: TeamMember[] = fromCms.length > 0
    ? fromCms.map(m => ({ name: m.name, role: m.role, photo: m.photo || undefined, pos: m.objectPosition || undefined }))
    : FALLBACK_TEAM

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
          {team.map((member, i) => (
            <div key={i} className="team-card">
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
