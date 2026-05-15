'use client'

import { useState, useEffect, useRef } from 'react'

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
  palette?: string[]        // если заданы вручную в Sanity — используем их
  notes?: { text: string; imageUrl: string | null }[]
  pdfs?: { title: string; description: string; url: string | null }[]
}

// ── Автоматическая палитра из фото ───────────────────────────────────────
function AutoPalette({ imageUrl }: { imageUrl: string }) {
  const [colors, setColors] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imageUrl) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    // Добавляем параметр для обхода кеша CORS
    img.src = imageUrl + (imageUrl.includes('?') ? '&' : '?') + 'auto=format'

    img.onload = async () => {
      try {
        // Динамический импорт ColorThief
        const ColorThief = (await import('colorthief')).default
        const ct = new ColorThief()
        const palette = ct.getPalette(img, 6)
        const hexColors = palette.map(([r, g, b]: number[]) =>
          '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
        )
        setColors(hexColors)
      } catch (e) {
        console.error('ColorThief error:', e)
        // Fallback — нейтральные тона
        setColors(['#F4EDE0', '#D9D0C1', '#A89880', '#7A6A58', '#3A3028', '#C8593F'])
      }
    }

    img.onerror = () => {
      setColors(['#F4EDE0', '#D9D0C1', '#A89880', '#7A6A58', '#3A3028', '#C8593F'])
    }
  }, [imageUrl])

  const copyColor = (hex: string) => {
    navigator.clipboard?.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  if (colors.length === 0) return (
    <div className="proj-palette-bar proj-palette-loading">
      <div className="proj-palette-skeleton" />
    </div>
  )

  return (
    <>
      <div className="proj-palette-bar">
        {colors.map((color, i) => (
          <div
            key={i}
            className="proj-palette-swatch"
            style={{ background: color }}
            onClick={() => copyColor(color)}
            title={`${color} — нажмите чтобы скопировать`}
          >
            {copied === color && (
              <span className="proj-palette-copied">Скопировано</span>
            )}
          </div>
        ))}
      </div>
      <p className="proj-palette-hint">Кликните по цвету — HEX скопируется</p>
    </>
  )
}

// ── Lightbox ─────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }: {
  images: string[]
  index: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(index)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>×</button>
      <button className="lightbox-prev" onClick={e => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length) }}>←</button>
      <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
        <img src={images[current]} alt="" className="lightbox-img" />
      </div>
      <button className="lightbox-next" onClick={e => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length) }}>→</button>
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

  const allImages = project.imageUrls || []
  const notes = project.notes || []

  // Чередуем фото и заметки: каждые 3 фото — 1 заметка
  const galleryItems: Array<
    { type: 'image'; url: string; idx: number } |
    { type: 'note'; text: string; imageUrl: string | null }
  > = []

  let noteIdx = 0
  allImages.forEach((url, i) => {
    galleryItems.push({ type: 'image', url, idx: i })
    if ((i + 1) % 3 === 0 && noteIdx < notes.length) {
      galleryItems.push({ type: 'note', ...notes[noteIdx] })
      noteIdx++
    }
  })
  // Оставшиеся заметки добавляем в конец
  while (noteIdx < notes.length) {
    galleryItems.push({ type: 'note', ...notes[noteIdx] })
    noteIdx++
  }

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

      {/* Hero */}
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

      {/* Цветовая палитра — авто из обложки или ручная из Sanity */}
      {project.coverUrl && (
        <section className="proj-page-section proj-palette-section">
          <div className="proj-page-container">
            <span className="proj-palette-eyebrow">— Цветовая палитра проекта</span>
            <h2 className="proj-palette-title">Тона и материалы</h2>

            {project.palette && project.palette.length > 0 ? (
              // Ручная палитра из Sanity
              <>
                <div className="proj-palette-bar">
                  {project.palette.map((color, i) => (
                    <div
                      key={i}
                      className="proj-palette-swatch"
                      style={{ background: color }}
                      onClick={() => navigator.clipboard?.writeText(color)}
                      title={color}
                    />
                  ))}
                </div>
                <p className="proj-palette-hint">Кликните по цвету — HEX скопируется</p>
              </>
            ) : (
              // Авто-генерация из обложки
              <AutoPalette imageUrl={project.coverUrl} />
            )}
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
                    <img
                      src={item.imageUrl} alt="" loading="lazy"
                      onClick={() => {
                        const idx = allImages.indexOf(item.imageUrl!)
                        if (idx >= 0) setLightboxIdx(idx)
                      }}
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

      {/* PDF */}
      {project.pdfs && project.pdfs.length > 0 && (
        <section className="proj-page-section proj-docs-section">
          <div className="proj-page-container">
            <span className="proj-docs-eyebrow">— Пример проектной документации</span>
            <h2 className="proj-docs-title">Что получает заказчик</h2>
            <p className="proj-docs-intro">
              После согласования концепции мы передаём полный альбом рабочей документации:
              поэтажные планы, развёртки, спецификации материалов и оборудования, схемы
              освещения и розеток — всё, что нужно прорабу для точной реализации.
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
                    {pdf.description && <div className="proj-doc-meta">{pdf.description}</div>}
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
        <Lightbox images={allImages} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  )
}
