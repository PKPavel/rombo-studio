'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = 'all' | 'Квартира' | 'Загородный дом' | 'Коммерческий'

interface Project {
  num: string
  slug: string
  title: string
  info: string
  cat: Category
  character: string        // space-separated list, e.g. 'eclectic modern-classic'
  image?: string           // Sanity image URL — undefined = placeholder
  disabled?: boolean       // true = фото ещё не загружены
}

// ─── Static project data (will be replaced by Sanity query later) ────────────

const PROJECTS: Project[] = [
  {
    num: '01',
    slug: 'chernaya-rechka',
    title: 'ЖК «Чёрная речка», 40 м²',
    info: 'Квартира · Санкт-Петербург · 40 м²',
    cat: 'Квартира',
    character: 'eclectic',
  },
  {
    num: '02',
    slug: 'botanika-spb',
    title: 'ЖК «Ботаника», 57 м²',
    info: 'Квартира · Санкт-Петербург · 57 м² · 2021',
    cat: 'Квартира',
    character: 'modern-classic natural',
  },
  {
    num: '03',
    slug: 'omega-house',
    title: 'ЖК «Омега Хаус» на Карповке',
    info: 'Квартира · Санкт-Петербург',
    cat: 'Квартира',
    character: 'modern-classic natural',
  },
  {
    num: '04',
    slug: 'fresh',
    title: 'ЖК «Фреш», 59 м²',
    info: 'Квартира · Москва · 59 м²',
    cat: 'Квартира',
    character: 'minimalism',
  },
  {
    num: '05',
    slug: 'kashirskoe',
    title: 'Квартира на Каширском шоссе',
    info: 'Квартира · Москва',
    cat: 'Квартира',
    character: 'modern-classic',
  },
  {
    num: '06',
    slug: 'oktyabrskaya',
    title: 'Квартира на Октябрьской набережной, 77 м²',
    info: 'Квартира · Санкт-Петербург · 77 м²',
    cat: 'Квартира',
    character: 'minimalism',
    disabled: true,
  },
  {
    num: '07',
    slug: 'borisovo',
    title: 'Дом в Нурмиярви, д. Борисово, 180 м²',
    info: 'Загородный дом · Ленинградская область · 180 м²',
    cat: 'Загородный дом',
    character: 'modern-classic natural',
  },
  {
    num: '08',
    slug: 'yusupovo',
    title: 'Дом в Юсупово Village',
    info: 'Загородный дом · Москва',
    cat: 'Загородный дом',
    character: 'natural modern-classic',
  },
  {
    num: '09',
    slug: 'roschino',
    title: 'Дом в Рощино',
    info: 'Загородный дом · Ленинградская область',
    cat: 'Загородный дом',
    character: 'natural',
    disabled: true,
  },
  {
    num: '10',
    slug: 'spbgmtu',
    title: 'Санкт-Петербургский государственный морской технический университет (Корабелка)',
    info: 'Коммерческий · Санкт-Петербург',
    cat: 'Коммерческий',
    character: 'loft',
  },
]

const CAT_LABELS: { value: Category; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'Квартира', label: 'Квартира' },
  { value: 'Загородный дом', label: 'Загородный дом' },
  { value: 'Коммерческий', label: 'Коммерческий' },
]


// ─── Placeholder tile svg (no photo yet) ─────────────────────────────────────

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

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  project: Project
  onClose: () => void
}

function ProjectModal({ project, onClose }: ModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="pm-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="pm-panel" onClick={e => e.stopPropagation()}>
        <button className="pm-close" onClick={onClose} aria-label="Закрыть">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Gallery area */}
        <div className="pm-gallery">
          {project.image
            ? <img src={project.image} alt={project.title} />
            : <PlaceholderImg />
          }
        </div>

        {/* Info */}
        <div className="pm-body">
          <p className="pm-eyebrow">{project.info}</p>
          <h2 className="pm-title">{project.title}</h2>
          <p className="pm-desc">
            Описание проекта появится после загрузки материалов в Sanity Studio.
            Пока здесь будет краткое резюме концепции, список решённых задач и
            ключевые решения дизайнера.
          </p>
          <a href="#contact" className="btn btn-ghost pm-link" onClick={onClose}>
            Обсудить проект
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Archive() {
  const [cat, setCat] = useState<Category>('all')
  const [modal, setModal] = useState<Project | null>(null)

  const filtered = PROJECTS.filter(p => {
    const catOk = cat === 'all' || p.cat === cat
    return catOk
  })

  const isEmpty = filtered.length === 0

  const reset = useCallback(() => {
    setCat('all')
  }, [])

  const openModal = (p: Project) => {
    if (!p.disabled) setModal(p)
  }

  return (
    <>
      <section id="archive" className="archive section-pad">
        <div className="container">

          {/* Section header */}
          <div className="arch-header reveal">
            <span className="eyebrow">03 — Все проекты</span>
            <h2 className="h-section">Архив работ</h2>
          </div>

          {/* Filters */}
          <div className="arch-filters-wrap reveal">
            {/* Type filter */}
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

          {/* Empty state */}
          {isEmpty && (
            <p className="archive-empty">
              В выбранной комбинации пока нет проектов.{' '}
              <button type="button" onClick={reset} className="arch-reset">
                Сбросить фильтры
              </button>
            </p>
          )}

          {/* Grid */}
          {!isEmpty && (
            <div className="archive-grid reveal">
              {filtered.map(p => (
                <button
                  key={p.slug}
                  className={`arch-tile${p.disabled ? ' arch-tile--disabled' : ''}`}
                  onClick={() => openModal(p)}
                  aria-label={p.title}
                  style={p.disabled ? { opacity: 0.72 } : undefined}
                >
                  <div className="arch-tile-img">
                    {p.image
                      ? <img src={p.image} alt={p.title} loading="lazy" />
                      : <PlaceholderImg />
                    }
                  </div>
                  <div className="arch-tile-meta">
                    <span className="arch-tile-num">{p.num}</span>
                    <h3 className="arch-tile-title">{p.title}</h3>
                    <span className="arch-tile-info">{p.info}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Modal */}
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </>
  )
}
