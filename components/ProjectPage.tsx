'use client'

import { useState } from 'react'

interface ProjectData {
  num?: string
  title: string
  slug: string
  cat?: string
  area?: number
  city?: string
  year?: number
  description?: string
  coverUrl: string | null
  imageUrls: string[]
  palette?: string[]
  notes?: { text: string; imageUrl: string | null }[]
  pdfs?: { title: string; description: string; url: string | null }[]
}

// ── Lightbox ───────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }: {
  images: string[]
  index: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(index)

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Закрыть">×</button>
      <button
        className="lightbox-prev"
        onClick={e => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length) }}
        aria-label="Предыдущее"
      >←</button>

      <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
        <img src={images[current]} alt="" className="lightbox-img" />
      </div>

      <button
        className="lightbox-next"
        onClick={e => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length) }}
        aria-label="Следующее"
      >→</button>

      <div className="lightbox-counter">{current + 1} / {images.length}</div>
    </div>
  )
}

// ── PDF-иконка ────────────────────────────────────────────────────────────
function PdfIcon() {
  return (
    <svg className="pm-docs-icon" viewBox="0 0 40 48" fill="none">
      <path d="M6 2h20l12 12v32a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="var(--accent)" strokeWidth="1.5"/>
      <path d="M26 2v12h12" stroke="var(--accent)" strokeWidth="1.5"/>
      <text x="20" y="34" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fontWeight="700" fill="var(--accent)">PDF</text>
    </svg>
  )
}

// ── Главный компонент ─────────────────────────────────────────────────────
export default function ProjectPage({ project }: { project: ProjectData }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  // Вставляем заметки между фотографиями
  const allImages = project.imageUrls || []
  const notes = project.notes || []

  // Чередуем: каждые ~3 фото — заметка
  const galleryItems: Array<{ type: 'image'; url: string; idx: number } | { type: 'note'; text: string; imageUrl: string | null }> = []
  let noteIdx = 0
  allImages.forEach((url, i) => {
    galleryItems.push({ type: 'image', url, idx: i })
    if ((i + 1) % 3 === 0 && noteIdx < notes.length) {
      galleryItems.push({ type: 'note', ...notes[noteIdx] })
      noteIdx++
    }
  })

  return (
    <>
      {/* Шапка */}
      <header className="proj-page-header">
        <a href="/#archive" className="proj-page-back">← Все проекты</a>
        <div className="proj-page-eyebrow">{project.cat}</div>
        <h1 className="proj-page-title">{project.title}</h1>
        <div className="proj-page-meta">
          {[project.city, project.area ? `${project.area} м²` : null, project.year]
            .filter(Boolean).join(' · ')}
        </div>
      </header>

      {/* Hero фото */}
      {project.coverUrl && (
        <div className="proj-page-hero">
          <img src={project.coverUrl} alt={project.title} />
        </div>
      )}

      {/* Описание */}
      {project.description && (
        <section className="proj-page-section">
          <div className="proj-page-container">
            <p className="proj-page-desc">{project.description}</p>
          </div>
        </section>
      )}

      {/* Цветовая палитра */}
      {project.palette && project.palette.length > 0 && (
        <section className="proj-page-section proj-palette-section">
          <div className="proj-page-container">
            <span className="proj-palette-eyebrow">— Цветовая палитра проекта</span>
            <h2 className="proj-palette-title">Тона и материалы</h2>
            <div className="proj-palette-bar">
              {project.palette.map((color, i) => (
                <div
                  key={i}
                  className="proj-palette-swatch"
                  style={{ background: color }}
                  title={color}
                  onClick={() => navigator.clipboard?.writeText(color)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Галерея с заметками */}
      {allImages.length > 0 && (
        <section className="proj-page-section">
          <div className="proj-page-container">
            <span className="proj-gallery-eyebrow">— Галерея интерьеров</span>
          </div>
          <div className="proj-gallery-grid">
            {galleryItems.map((item, i) => {
              if (item.type === 'image') {
                return (
                  <div key={i} className="proj-gallery-item" onClick={() => setLightboxIdx(item.idx)}>
                    <img src={item.url} alt="" loading="lazy" />
                    <div className="proj-gallery-zoom">↗</div>
                  </div>
                )
              }
              return (
                <div key={i} className="proj-gallery-note">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt="" loading="lazy"
                      onClick={() => setLightboxIdx(allImages.indexOf(item.imageUrl!))}
                    />
                  )}
                  <blockquote className="proj-note-text">
                    <span className="proj-note-icon">✎</span>
                    {item.text}
                    <cite>— Александра Серова</cite>
                  </blockquote>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* PDF-документы */}
      {project.pdfs && project.pdfs.length > 0 && (
        <section className="proj-page-section proj-docs-section">
          <div className="proj-page-container">
            <span className="proj-docs-eyebrow">— Пример проектной документации</span>
            <h2 className="proj-docs-title">Что получает заказчик</h2>
            <p className="proj-docs-intro">
              После согласования концепции мы передаём полный альбом рабочей
              документации: поэтажные планы, развёртки, спецификации материалов
              и оборудования, схемы освещения и розеток — всё, что нужно прорабу
              для точной реализации. Ниже — пример из этого проекта.
            </p>
            <div className="proj-docs-grid">
              {project.pdfs.map((pdf, i) => (
                <a
                  key={i}
                  href={pdf.url || '#contact'}
                  download={!!pdf.url}
                  className="proj-doc-card"
                >
                  <PdfIcon />
                  <div className="proj-doc-info">
                    <div className="proj-doc-title">{pdf.title}</div>
                    {pdf.description && (
                      <div className="proj-doc-meta">{pdf.description}</div>
                    )}
                  </div>
                  <svg className="proj-doc-arrow" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3v10M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="proj-page-cta">
        <div className="proj-page-container">
          <h2>Хотите такой же проект?</h2>
          <p>Расскажите о вашей задаче — перезвоним в течение часа.</p>
          <a href="/#contact" className="btn btn-primary">Обсудить →</a>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={allImages}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  )
}
