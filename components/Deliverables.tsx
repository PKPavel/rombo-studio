'use client'

// Deliverables — светлая версия со стопкой чертежей как в v22

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
                <span>ЖК «Ботаника», 56&nbsp;м² <span className="deliv-btn-meta">· 33 листа</span></span>
              </a>
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
              Пример рабочей документации из одного из реализованных проектов.{' '}
              <a href="#archive">ЖК «Чёрная&nbsp;речка»</a>.
              У&nbsp;каждого проекта — свой альбом такого&nbsp;же объёма.
            </p>
          </div>

          {/* Правая — стопка чертежей */}
          <div className="deliverables-visual" aria-hidden="true">
            <div className="doc-preview p1">
              <svg viewBox="0 0 400 560" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="560" fill="#fff"/>
                <rect x="20" y="20" width="360" height="520" stroke="#E0D8CC" strokeWidth="1"/>
                <text x="200" y="60" textAnchor="middle" fontFamily="Inter Tight" fontSize="14" fill="#8B7355">Дизайн-студия Александры Серовой</text>
                <text x="200" y="90" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fill="#666">тел. +7 904 558 16 31</text>
                <line x1="20" y1="110" x2="380" y2="110" stroke="#E0D8CC"/>
                <text x="200" y="145" textAnchor="middle" fontFamily="Inter Tight" fontSize="16" fontWeight="600" fill="#333">Дизайн-проект двухкомнатной квартиры</text>
                <text x="200" y="170" textAnchor="middle" fontFamily="Inter Tight" fontSize="14" fill="#666">ЖК "Чёрная речка"</text>
                <rect x="40" y="200" width="320" height="300" fill="#F5F0E8" stroke="#CCC" strokeWidth="0.5"/>
                {/* Floor plan lines */}
                <rect x="60" y="220" width="280" height="260" fill="none" stroke="#555" strokeWidth="1.5"/>
                <line x1="60" y1="340" x2="180" y2="340" stroke="#555" strokeWidth="1.5"/>
                <line x1="180" y1="220" x2="180" y2="480" stroke="#555" strokeWidth="1.5"/>
                <line x1="180" y1="380" x2="340" y2="380" stroke="#555" strokeWidth="1.5"/>
                <rect x="85" y="250" width="70" height="60" fill="#E8DDD0" stroke="#888" strokeWidth="0.5"/>
                <rect x="200" y="235" width="110" height="80" fill="#E8DDD0" stroke="#888" strokeWidth="0.5"/>
                <line x1="60" y1="460" x2="100" y2="460" stroke="#555" strokeWidth="2"/>
                <line x1="60" y1="460" x2="60" y2="480" stroke="#555" strokeWidth="1"/>
                <line x1="100" y1="460" x2="100" y2="480" stroke="#555" strokeWidth="1"/>
              </svg>
            </div>
            <div className="doc-preview p2">
              <svg viewBox="0 0 400 560" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="560" fill="#fff"/>
                <rect x="20" y="20" width="360" height="520" stroke="#E0D8CC" strokeWidth="1"/>
                <text x="200" y="60" textAnchor="middle" fontFamily="Inter Tight" fontSize="13" fill="#8B7355">Схема электрики и освещения</text>
                <rect x="40" y="80" width="320" height="420" fill="#F8F4EE" stroke="#CCC" strokeWidth="0.5"/>
                <circle cx="120" cy="160" r="8" stroke="#C8593F" strokeWidth="1.5" fill="none"/>
                <circle cx="200" cy="140" r="8" stroke="#C8593F" strokeWidth="1.5" fill="none"/>
                <circle cx="280" cy="160" r="8" stroke="#C8593F" strokeWidth="1.5" fill="none"/>
                <circle cx="150" cy="280" r="5" fill="#C8593F"/>
                <circle cx="250" cy="280" r="5" fill="#C8593F"/>
                <line x1="120" y1="160" x2="200" y2="140" stroke="#AAA" strokeWidth="0.8" strokeDasharray="4 2"/>
                <line x1="200" y1="140" x2="280" y2="160" stroke="#AAA" strokeWidth="0.8" strokeDasharray="4 2"/>
              </svg>
            </div>
            <div className="doc-preview p3">
              <svg viewBox="0 0 400 560" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="560" fill="#fff"/>
                <rect x="20" y="20" width="360" height="520" stroke="#E0D8CC" strokeWidth="1"/>
                <text x="200" y="60" textAnchor="middle" fontFamily="Inter Tight" fontSize="13" fill="#8B7355">Развёртки стен · Гостиная</text>
                <rect x="40" y="90" width="320" height="380" fill="#F8F4EE" stroke="#CCC" strokeWidth="0.5"/>
                <rect x="60" y="110" width="280" height="200" fill="none" stroke="#555" strokeWidth="1"/>
                <rect x="140" y="110" width="80" height="200" fill="#EDE8E0" stroke="#888" strokeWidth="0.5"/>
                <line x1="60" y1="170" x2="340" y2="170" stroke="#AAA" strokeWidth="0.5" strokeDasharray="4 2"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
