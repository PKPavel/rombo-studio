'use client'

import { useState, useCallback } from 'react'
import type { SanityProject } from './Archive'

type ProjectWithImage = SanityProject & { coverUrl: string | null }

type Category = 'all' | 'Квартира' | 'Загородный дом' | 'Коммерческий'

const CAT_LABELS: { value: Category; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'Квартира', label: 'Квартира' },
  { value: 'Загородный дом', label: 'Загородный дом' },
  { value: 'Коммерческий', label: 'Коммерческий' },
]

// ── Заглушка ──────────────────────────────────────────────────────────────────
function PlaceholderImg() {
  return (
    <div className="arch-placeholder">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="42" height="42" rx="4" stroke="#B0AAA3" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M10 34l9-12 7 8 4-5 8 9H10z" fill="#C8BDB4" opacity=".6" />
        <circle cx="30" cy="15" r="4" fill="#C8BDB4" opacity=".6" />
      </svg>
    </div>
  )
}

// ── Модальное окно ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: ProjectWithImage; onClose: () => void }) {
  return (
    <div className="pm-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pm-panel" onClick={e => e.stopPropagation()}>
        <button className="pm-close" onClick={onClose} aria-label="Закрыть">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="pm-gallery">
          {project.coverUrl
            ? <img src={project.coverUrl} alt={project.title} />
            : <PlaceholderImg />
          }
        </div>

        <div className="pm-body">
          <p className="pm-eyebrow">
            {[project.cat, project.city, project.area ? `${project.area} м²` : null, project.year]
              .filter(Boolean).join(' · ')}
          </p>
          <h2 className="pm-title">{project.title}</h2>
          {project.description
            ? <p className="pm-desc">{project.description}</p>
            : <p className="pm-desc" style={{ opacity: .45, fontStyle: 'italic' }}>
                Описание появится после добавления в Sanity Studio.
              </p>
          }
          <a href="#contact" className="btn btn-ghost pm-link" onClick={onClose}>
            Обсудить проект
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Главный компонент ─────────────────────────────────────────────────────────
export default function ArchiveClient({ projects }: { projects: ProjectWithImage[] }) {
  const [cat, setCat] = useState<Category>('all')
  const [modal, setModal] = useState<ProjectWithImage | null>(null)

  const filtered = projects.filter(p =>
    cat === 'all' || p.cat === cat
  )

  const reset = useCallback(() => setCat('all'), [])

  // Если Sanity пуст — показываем статичную заглушку
  const isEmpty = filtered.length === 0 && projects.length === 0

  return (
    <>
      <section id="archive" className="archive section-pad">
        <div className="container">

          <div className="arch-header reveal">
            <span className="eyebrow">03 — Все проекты</span>
            <h2 className="h-section">Архив работ</h2>
          </div>

          {/* Фильтры — только по типу */}
          <div className="arch-filters-wrap reveal">
            <div className="arch-filters" role="group" aria-label="Тип объекта">
              <span className="arch-filter-label">Тип</span>
              {CAT_LABELS.map(({ value, label }) => (
                <button
                  key={value}
                  className={`arch-filter${cat === value ? ' active' : ''}`}
                  onClick={() => setCat(value)}
                  aria-pressed={cat === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Пусто */}
          {filtered.length === 0 && projects.length > 0 && (
            <p className="archive-empty">
              Проектов этого типа пока нет.{' '}
              <button type="button" onClick={reset} className="arch-reset">Сбросить</button>
            </p>
          )}

          {/* Нет данных в Sanity */}
          {isEmpty && (
            <p className="archive-empty">
              Добавьте проекты в{' '}
              <a href="/studio" style={{ color: 'var(--accent)' }}>Sanity Studio</a>.
            </p>
          )}

          {/* Сетка */}
          {filtered.length > 0 && (
            <div className="archive-grid reveal">
              {filtered.map(p => (
                <button
                  key={p._id}
                  className={`arch-tile${p.disabled ? ' arch-tile--disabled' : ''}`}
                  onClick={() => !p.disabled && setModal(p)}
                  aria-label={p.title}
                  style={p.disabled ? { opacity: 0.65 } : undefined}
                >
                  <div className="arch-tile-img">
                    {p.coverUrl
                      ? <img src={p.coverUrl} alt={p.title} loading="lazy" />
                      : <PlaceholderImg />
                    }
                  </div>
                  <div className="arch-tile-meta">
                    <span className="arch-tile-num">{p.num || '—'}</span>
                    <h3 className="arch-tile-title">{p.title}</h3>
                    <span className="arch-tile-info">
                      {[p.cat, p.city, p.area ? `${p.area} м²` : null]
                        .filter(Boolean).join(' · ')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </>
  )
}
