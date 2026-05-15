'use client'

import { useState, useEffect } from 'react'

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
  pdfs?: {
    title: string
    pages?: number
    tags?: string[]
    size?: number   // байты из asset->size
    url: string | null
  }[]
}

// ── Хелперы для метаданных PDF ────────────────────────────────────────────

function pluralSheets(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 19) return `${n} листов`
  if (mod10 === 1) return `${n} лист`
  if (mod10 >= 2 && mod10 <= 4) return `${n} листа`
  return `${n} листов`
}

function formatSize(bytes: number): string {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} МБ`
}

function buildPdfMeta(pdf: { pages?: number; tags?: string[]; size?: number }): string {
  const parts: string[] = []
  if (pdf.pages) parts.push(pluralSheets(pdf.pages))
  if (pdf.tags && pdf.tags.length > 0) parts.push(pdf.tags.join(', '))
  parts.push('PDF')
  if (pdf.size) parts.push(formatSize(pdf.size))
  return parts.join(' · ')
}

// ── Авто-палитра через ColorThief ─────────────────────────────────────────
function AutoPalette({ imageUrl }: { imageUrl: string }) {
  const [colors, setColors] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (!imageUrl) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageUrl

    img.onload = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod = await import('colorthief') as any
        const CT = mod.default ?? mod
        const ct = new CT()
        const palette: [number, number, number][] = ct.getPalette(img, 6)
        setColors(palette.map(([r, g, b]) =>
          '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
        ))
      } catch {
        setColors(['#F4EDE0', '#D9D0C1', '#A89880', '#7A6A58', '#3A3028', '#C8593F'])
      }
    }
    img.onerror = () => {
      setColors(['#F4EDE0', '#D9D0C1', '#A89880', '#7A6A58', '#3A3028', '#C8593F'])
    }
  }, [imageUrl])

  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  if (!colors.length) return (
    <div className="proj-palette-bar proj-palette-loading">
      <div className="proj-palette-skeleton" />
    </div>
  )

  return (
    <>
      <div className="proj-palette-bar">
        {colors.map((c, i) => (
          <div key={i} className="proj-palette-swatch" style={{ background: c }}
            onClick={() => copy(c)} title={`${c} — нажмите чтобы скопировать`}>
            {copied === c && <span className="proj-palette-copied">Скопировано</span>}
          </div>
        ))}
      </div>
      <p className="proj-palette-hint">Кликните по цвету — HEX скопируется</p>
    </>
  )
}

// ── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [cur, setCur] = useState(index)
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCur(i => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setCur(i => (i + 1) % images.length)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [images.length, onClose])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>×</button>
      <button className="lightbox-prev" onClick={e => { e.stopPropagation(); setCur(i => (i - 1 + images.length) % images.length) }}>←</button>
      <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
        <img src={images[cur]} alt="" className="lightbox-img" />
      </div>
      <button className="lightbox-next" onClick={e => { e.stopPropagation(); setCur(i => (i + 1) % images.length) }}>→</button>
      <div className="lightbox-counter">{cur + 1} / {images.length}</div>
    </div>
  )
}

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
  const items: Array<{ type: 'image'; url: string; idx: number } | { type: 'note'; text: string; imageUrl: string | null }> = []
  let ni = 0
  allImages.forEach((url, i) => {
    items.push({ type: 'image', url, idx: i })
    if ((i + 1) % 3 === 0 && ni < notes.length) { items.push({ type: 'note', ...notes[ni] }); ni++ }
  })
  while (ni < notes.length) { items.push({ type: 'note', ...notes[ni] }); ni++ }

  return (
    <>
      <header className="proj-page-header">
        <a href="/#archive" className="proj-page-back">← Все проекты</a>
        <div className="proj-page-eyebrow">{project.cat}</div>
        <h1 className="proj-page-title">{project.title}</h1>
        <div className="proj-page-meta">
          {[project.city, project.area ? `${project.area} м²` : null, project.year].filter(Boolean).join(' · ')}
        </div>
      </header>

      {project.coverUrl && (
        <div className="proj-page-hero">
          <img src={project.coverUrl} alt={project.title} />
        </div>
      )}

      {project.description && (
        <section className="proj-page-section">
          <div className="proj-page-container">
            <p className="proj-page-desc">{project.description}</p>
          </div>
        </section>
      )}

      {project.coverUrl && (
        <section className="proj-page-section proj-palette-section">
          <div className="proj-page-container">
            <span className="proj-palette-eyebrow">— Цветовая палитра проекта</span>
            <h2 className="proj-palette-title">Тона и материалы</h2>
            {project.palette && project.palette.length > 0 ? (
              <>
                <div className="proj-palette-bar">
                  {project.palette.map((c, i) => (
                    <div key={i} className="proj-palette-swatch" style={{ background: c }}
                      onClick={() => navigator.clipboard?.writeText(c)} title={c} />
                  ))}
                </div>
                <p className="proj-palette-hint">Кликните по цвету — HEX скопируется</p>
              </>
            ) : (
              <AutoPalette imageUrl={project.coverUrl} />
            )}
          </div>
        </section>
      )}

      {allImages.length > 0 && (
        <section className="proj-page-section">
          <div className="proj-page-container">
            <span className="proj-gallery-eyebrow">— Галерея интерьеров</span>
          </div>
          <div className="proj-gallery-grid">
            {items.map((item, i) => item.type === 'image' ? (
              <div key={i} className="proj-gallery-item" onClick={() => setLightboxIdx(item.idx)}>
                <img src={item.url} alt="" loading="lazy" />
                <div className="proj-gallery-zoom">↗</div>
              </div>
            ) : (
              <div key={i} className="proj-gallery-note">
                {item.imageUrl && <img src={item.imageUrl} alt="" loading="lazy" />}
                <blockquote className="proj-note-text">
                  <span className="proj-note-icon">✎</span>
                  {item.text}
                  <cite>— Александра Серова</cite>
                </blockquote>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.pdfs && project.pdfs.length > 0 && (
        <section className="proj-page-section proj-docs-section">
          <div className="proj-page-container">

            {/* ── Шапка секции — по центру ── */}
            <div className="proj-docs-header">
              <span className="proj-docs-eyebrow">— Пример проектной документации</span>
              <h2 className="proj-docs-title">Что получает заказчик</h2>
              <p className="proj-docs-intro">
                После согласования концепции мы передаём полный альбом рабочей документации:
                поэтажные планы, развёртки, спецификации материалов и оборудования, схемы
                освещения и розеток — всё, что нужно прорабу для точной реализации. Ниже —
                пример из этого проекта.
              </p>
            </div>

            {/* ── PDF-карточки ── */}
            <div className="proj-docs-grid">
              {project.pdfs.map((pdf, i) => {
                const meta = buildPdfMeta(pdf)
                return (
                  <a key={i} href={pdf.url || '#contact'} download={!!pdf.url} className="proj-doc-card">
                    <PdfIcon />
                    <div className="proj-doc-info">
                      <div className="proj-doc-title">{pdf.title}</div>
                      {meta && <div className="proj-doc-meta">{meta}</div>}
                    </div>
                    <svg className="proj-doc-arrow" viewBox="0 0 20 20" fill="none">
                      <path d="M10 3v10M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </a>
                )
              })}
            </div>

          </div>
        </section>
      )}

      <section className="proj-page-cta">
        <div className="proj-page-container">
          <h2>Хотите такой же проект?</h2>
          <p>Расскажите о вашей задаче — перезвоним в течение часа.</p>
          <a href="/#contact" className="btn btn-primary">Обсудить →</a>
        </div>
      </section>

      {lightboxIdx !== null && (
        <Lightbox images={allImages} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  )
}
