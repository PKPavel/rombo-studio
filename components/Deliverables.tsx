'use client'

const DOC_TYPES = [
  {
    name: 'Обмерный план',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="26" height="26" rx="1"/><path d="M3 11h26M11 11v18M8 7h.1M12 7h.1M16 7h.1"/></svg>,
  },
  {
    name: 'Демонтаж и монтаж стен',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 28V8l14-4 10 3v21"/><path d="M14 28V14H4M14 14l4-2M22 28V12"/><path d="M8 18h4M8 22h4M18 18h6M18 22h6"/></svg>,
  },
  {
    name: 'Расстановка мебели',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 28h24V8H4v20z"/><rect x="8" y="14" width="7" height="10" rx="0.5"/><rect x="18" y="14" width="6" height="5" rx="0.5"/><path d="M4 8V6a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v2"/></svg>,
  },
  {
    name: 'Сантехника',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="16" cy="12" r="5"/><path d="M16 17v11M11 22h10M8 8c0-4.4 3.6-7 8-7s8 2.6 8 7"/><path d="M4 24h24v4H4v-4z"/></svg>,
  },
  {
    name: 'Тёплые полы',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 28h24V8H4v20z"/><path d="M8 20c2-3 4-3 6 0s4 3 6 0 4-3 6 0" strokeDasharray="2 2"/><path d="M8 24h16"/><circle cx="28" cy="6" r="2" fill="currentColor" stroke="none"/></svg>,
  },
  {
    name: 'Потолок с нишами',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 28h24V4H4v24z"/><path d="M4 10h24M10 10v18"/><path d="M16 4v6M22 4v6"/><circle cx="7" cy="7" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    name: 'Схема освещения',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="16" cy="13" r="5"/><path d="M16 4V2M16 24v-6M26 13h2M4 13H6M23 6l-1.5 1.5M10.5 18.5 9 20M23 20l-1.5-1.5M10.5 7.5 9 6"/></svg>,
  },
  {
    name: 'Розетки и выключатели',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="5" y="8" width="22" height="16" rx="2"/><path d="M10 16h3M10 20h3M19 14v8M24 14v8"/><circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none"/></svg>,
  },
]

export default function Deliverables() {
  return (
    <section className="deliverables reveal">
      <div className="container">
        <div className="deliverables-grid">

          {/* Левая колонка — текст */}
          <div className="deliverables-text">
            <span className="eyebrow">— Что вы получаете на руки</span>
            <h2 className="deliverables-title">
              Папка, по&nbsp;которой<br />можно строить
            </h2>
            <p className="deliverables-lead">
              Не только красивые рендеры. На выходе вы получаете полный
              альбом рабочей документации — со всеми планами, размерами,
              развёртками и спецификациями. Прораб открывает альбом, читает
              чертёж, делает — без догадок и переспросов.
            </p>

            <ul className="deliverables-list">
              <li>Обмерный план с уточнёнными размерами</li>
              <li>Расстановка мебели и сантехники</li>
              <li>План потолка с уровнями и нишами</li>
              <li>Розетки и выключатели по точкам</li>
              <li>Планы демонтажа и возводимых стен</li>
              <li>Раскладка пола и тёплые контуры</li>
              <li>Схема освещения с привязками</li>
              <li>Спецификации материалов и дверей</li>
            </ul>

            <a href="#contact" className="btn btn-ghost" style={{ marginTop: '32px' }}>
              Запросить пример альбома
            </a>
          </div>

          {/* Правая колонка — типы документов */}
          <div className="docs-types-grid">
            {DOC_TYPES.map(d => (
              <div key={d.name} className="docs-type-card">
                <div className="docs-type-icon">{d.icon}</div>
                <span className="docs-type-name">{d.name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
