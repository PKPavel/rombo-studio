'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import sanityImageLoader from '../lib/sanity-image-loader'
import type { SanityProject } from './Archive'

type ProjectWithImage = SanityProject & { coverUrl: string | null }
type Category = 'all' | 'Квартира' | 'Загородный дом' | 'Коммерческий'

const CAT_LABELS: { value: Category; label: string }[] = [
  { value: 'all',           label: 'Все' },
  { value: 'Квартира',      label: 'Квартира' },
  { value: 'Загородный дом', label: 'Загородный дом' },
  { value: 'Коммерческий',  label: 'Коммерческий' },
]

function PlaceholderImg() {
  return (
    <div className="arch-placeholder">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect x="1" y="1" width="42" height="42" rx="4" stroke="#B0AAA3" strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M10 34l9-12 7 8 4-5 8 9H10z" fill="#C8BDB4" opacity=".6"/>
        <circle cx="30" cy="15" r="4" fill="#C8BDB4" opacity=".6"/>
      </svg>
    </div>
  )
}

export default function ArchiveClient({ projects }: { projects: ProjectWithImage[] }) {
  const [cat, setCat] = useState<Category>('all')

  const filtered = projects.filter(p => cat === 'all' || p.cat === cat)

  return (
    <section id="archive" className="archive section-pad">
      <div className="container">

        <div className="arch-header reveal">
          <span className="eyebrow">03 — Все проекты</span>
          <h2 className="h-section">Архив работ</h2>
        </div>

        {/* Фильтры */}
        <div className="arch-filters-wrap reveal">
          <div className="arch-filters" role="group" aria-label="Тип объекта">
            <span className="arch-filter-label">Тип</span>
            {CAT_LABELS.map(({ value, label }) => (
              <button
                key={value}
                className={`arch-filter${cat === value ? ' active' : ''}`}
                onClick={() => setCat(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Нет проектов */}
        {filtered.length === 0 && projects.length > 0 && (
          <p className="archive-empty">
            Проектов этого типа пока нет.{' '}
            <button type="button" onClick={() => setCat('all')} className="arch-reset">Сбросить</button>
          </p>
        )}

        {projects.length === 0 && (
          <p className="archive-empty">
            Добавьте проекты в{' '}
            <a href="/studio" style={{ color: 'var(--accent)' }}>Sanity Studio</a>.
          </p>
        )}

        {/* Сетка — тайлы ведут на страницу проекта */}
        {filtered.length > 0 && (
          <div className="archive-grid reveal">
            {filtered.map(p => (
              p.disabled
                ? (
                  // Заглушка — проект без фото, некликабельный
                  <div key={p._id} className="arch-tile arch-tile--disabled" style={{ opacity: 0.65 }}>
                    <div className="arch-tile-img"><PlaceholderImg /></div>
                    <div className="arch-tile-meta">
                      <span className="arch-tile-num">{p.num || '—'}</span>
                      <h3 className="arch-tile-title">{p.title}</h3>
                      <span className="arch-tile-info">
                        {[p.cat, p.city, p.area ? `${p.area} м²` : null].filter(Boolean).join(' · ')}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Активный проект — ссылка на страницу
                  <Link key={p._id} href={`/projects/${p.slug}`} className="arch-tile">
                    <div className="arch-tile-img">
                      {p.coverUrl
                        ? <Image
                            loader={sanityImageLoader}
                            src={p.coverUrl}
                            alt={p.title}
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                          />
                        : <PlaceholderImg />
                      }
                    </div>
                    <div className="arch-tile-meta">
                      <span className="arch-tile-num">{p.num || '—'}</span>
                      <h3 className="arch-tile-title">{p.title}</h3>
                      <span className="arch-tile-info">
                        {[p.cat, p.city, p.area ? `${p.area} м²` : null].filter(Boolean).join(' · ')}
                      </span>
                    </div>
                  </Link>
                )
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
