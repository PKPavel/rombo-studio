'use client'

// Deliverables — светлая версия с реальными чертежами ЖК «Чёрная речка»

const PDF_ICON = (
  <svg viewBox="0 0 22 28" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M3 1h11l6 6v20H3V1z"/>
    <path d="M14 1v6h6"/>
    <text x="11" y="19" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="5" fontWeight="700" fill="currentColor" stroke="none">PDF</text>
  </svg>
)

export default function Deliverables() {
  return (
    <section id="deliverables" className="deliverables">
      <div className="container">
        <div className="deliverables-grid reveal">

          {/* Левая — текст + кнопки */}
          <div className="deliverables-text">
            <span className="eyebrow">— Что вы получаете на руки</span>
            <h2 className="deliverables-title">
              Папка, по&nbsp;которой<br />можно строить
            </h2>
            <p className="deliverables-lead">
              Не&nbsp;только красивые рендеры. На&nbsp;выходе вы получаете полный
              альбом рабочей документации — со&nbsp;всеми планами, размерами,
              развёртками и&nbsp;спецификациями. Прораб открывает альбом, читает
              чертёж, делает — без догадок и&nbsp;переспросов.
            </p>

            <ul className="deliverables-list">
              <li>Обмерный план с&nbsp;уточнёнными размерами</li>
              <li>Планы демонтажа и&nbsp;возводимых стен</li>
              <li>Расстановка мебели и&nbsp;сантехники</li>
              <li>Раскладка пола и&nbsp;тёплые контуры</li>
              <li>План потолка с&nbsp;уровнями и&nbsp;нишами</li>
              <li>Схема освещения с&nbsp;привязками</li>
              <li>Розетки и&nbsp;выключатели по&nbsp;точкам</li>
              <li>Спецификации материалов и&nbsp;дверей</li>
            </ul>

            <div className="deliverables-actions">
              <a href="#contact" className="deliv-btn">
                <span className="deliv-btn-icon">{PDF_ICON}</span>
                <span>Скачать альбом&nbsp;чертежей <span className="deliv-btn-meta">· 15 листов, 2,1&nbsp;МБ</span></span>
              </a>
              <a href="#contact" className="deliv-btn">
                <span className="deliv-btn-icon">{PDF_ICON}</span>
                <span>Скачать планировку <span className="deliv-btn-meta">· 1 лист, 260&nbsp;КБ</span></span>
              </a>
            </div>

            <p className="deliverables-hint">
              Пример рабочей документации из проекта{' '}
              <a href="#archive">ЖК «Чёрная&nbsp;речка»</a>,
              40&nbsp;м² · 15 листов. У&nbsp;каждого проекта — свой альбом такого&nbsp;же объёма.
            </p>
          </div>

          {/* Правая — реальные чертежи в стопке */}
          <div className="deliverables-visual" aria-hidden="true">
            <div className="doc-preview p1">
              <img
                src="/images/docs/doc-title.jpg"
                alt="Титульный лист — ЖК Чёрная речка"
                loading="lazy"
              />
            </div>
            <div className="doc-preview p2">
              <img
                src="/images/docs/doc-floor.jpg"
                alt="План напольных покрытий"
                loading="lazy"
              />
            </div>
            <div className="doc-preview p3">
              <img
                src="/images/docs/doc-walls.jpg"
                alt="План возводимых стен"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
