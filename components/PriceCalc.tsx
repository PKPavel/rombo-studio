'use client'
import { useState } from 'react'

const TYPES = [
  { id: 'express', label: 'Экспресс-проект', rate: 1500, desc: 'Планировка + концепция' },
  { id: 'full',    label: 'Полный проект',   rate: 5000, desc: 'Чертежи + 3D + спецификации' },
  { id: 'turnkey', label: 'Под ключ',        rate: 7000, desc: 'Проект + авторский надзор' },
]

export default function PriceCalc() {
  const [area, setArea] = useState(60)
  const [type, setType] = useState('full')
  const selected = TYPES.find(t => t.id === type)!
  const price = area * selected.rate
  const fmt = (n: number) => n.toLocaleString('ru-RU')

  return (
    <section id="calc" className="calc-section reveal">
      <div className="container">
        <div className="calc-head">
          <span className="eyebrow">— Калькулятор</span>
          <h2 className="h-section">Рассчитайте стоимость</h2>
          <p className="calc-sub">Укажите площадь и тип услуги — получите примерную стоимость проекта.</p>
        </div>

        <div className="calc-widget">
          {/* Площадь */}
          <div className="calc-block">
            <div className="calc-label">
              Площадь объекта
              <span className="calc-val">{area} м²</span>
            </div>
            <input
              type="range" min={20} max={400} step={5} value={area}
              onChange={e => setArea(+e.target.value)}
              className="calc-slider"
              aria-label="Площадь"
            />
            <div className="calc-range-labels">
              <span>20 м²</span><span>400 м²</span>
            </div>
          </div>

          {/* Тип */}
          <div className="calc-block">
            <div className="calc-label">Тип услуги</div>
            <div className="calc-types">
              {TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`calc-type-btn${type === t.id ? ' active' : ''}`}
                >
                  <span className="calc-type-name">{t.label}</span>
                  <span className="calc-type-desc">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Результат */}
          <div className="calc-result">
            <div className="calc-result-label">Ориентировочная стоимость</div>
            <div className="calc-result-price">
              от {fmt(price)} <span>₽</span>
            </div>
            <p className="calc-result-note">
              {selected.rate.toLocaleString('ru-RU')} ₽/м² · {area} м² · {selected.label.toLowerCase()}
              <br/>Точная стоимость определяется после консультации.
            </p>
            <a href="/#contact" className="btn btn-primary calc-cta">
              Получить точный расчёт
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
