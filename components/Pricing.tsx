'use client'

import { useState } from 'react'

// ─── Тарифы ──────────────────────────────────────────────────────────────────

const TIERS = [
  {
    tag: '— Планировочное решение',
    name: 'Планировка',
    price: '750',
    unit: '₽ за м²',
    feats: [
      '3 варианта планировок на выбор',
      'Совместное обсуждение и корректировка',
      'Согласование финального варианта',
      'План монтажа стен и перегородок',
    ],
    btn: 'Заказать',
    primary: false,
  },
  {
    tag: '— Экспресс-проект',
    name: 'Экспресс',
    price: '1 500',
    unit: '₽ за м²',
    feats: [
      'Планировочное решение',
      'План монтажа и демонтажа',
      'План розеток и выключателей',
      'План освещения и сценарии',
      'Коллажи (2 шт) — стилистика, цвет, формы',
    ],
    btn: 'Заказать',
    primary: false,
  },
  {
    tag: '— Проект с коллажами (без 3D)',
    name: 'Базовый',
    price: '3 500',
    unit: '₽ за м²',
    feats: [
      'Планировочное решение',
      'Коллажи всех жилых помещений',
      'Полный комплект чертежей',
      'Подбор материалов (где что купить)',
    ],
    btn: 'Заказать',
    primary: false,
  },
  {
    tag: '— Усечённый проект с 3D',
    name: 'Расширенный',
    price: '4 000',
    unit: '₽ за м²',
    feats: [
      '3D ключевых помещений: кухня-гостиная, мастер-спальня, мастер-санузел',
      'Коллажи остальных помещений',
      'Полный комплект чертежей',
      'Подбор материалов (где что купить)',
    ],
    btn: 'Заказать',
    primary: true,
    popular: true,
  },
  {
    tag: '— Полный дизайн-проект с 3D',
    name: 'Полный',
    price: '5 000',
    unit: '₽ за м²',
    feats: [
      '3D-визуализация всех жилых помещений',
      'Полный комплект чертежей',
      'Файл подбора материалов',
      'Рекомендации поставщиков',
    ],
    btn: 'Заказать',
    primary: false,
  },
  {
    tag: '— Сопровождение',
    name: 'Авторский надзор',
    price: 'от 30 000',
    unit: '₽ в месяц',
    feats: [
      '4 выезда на объект ежемесячно',
      'Удалённые консультации',
      'Оперативные корректировки',
      'Контроль качества работ',
    ],
    btn: 'Подключить',
    primary: false,
  },
]

// ─── Форматы для калькулятора ─────────────────────────────────────────────────

const FORMATS = [
  { name: 'Планировка',  price: 750,  desc: '3 варианта + монтаж стен' },
  { name: 'Экспресс',    price: 1500, desc: 'Чертежи и 2 коллажа' },
  { name: 'Базовый',     price: 3500, desc: 'Коллажи + полный комплект чертежей' },
  { name: 'Расширенный', price: 4000, desc: '3D ключевых помещений', default: true },
  { name: 'Полный',      price: 5000, desc: '3D всех жилых помещений' },
]

function formatNum(n: number) {
  return n.toLocaleString('ru-RU')
}

// ─── Калькулятор ──────────────────────────────────────────────────────────────

function Calculator() {
  const [area, setArea] = useState(95)
  const [formatPrice, setFormatPrice] = useState(4000)
  const [formatName, setFormatName] = useState('Расширенный')
  const [supervision, setSupervision] = useState(false)

  const base = area * formatPrice
  const supervisionCost = supervision ? 30000 * 4 : 0
  const total = base + supervisionCost

  return (
    <div className="calc reveal" id="calc">
      <div className="calc-head">
        <span className="eyebrow">— Калькулятор стоимости</span>
        <h3 className="calc-title">Прикиньте бюджет за 30 секунд</h3>
        <p className="calc-sub">
          Выберите площадь объекта и формат сотрудничества. Точную стоимость
          с учётом ваших задач рассчитаем после знакомства.
        </p>
      </div>

      <div className="calc-body">
        <div className="calc-controls">

          {/* Площадь */}
          <div className="calc-row">
            <label className="calc-label">Площадь объекта</label>
            <div className="calc-area-display">
              <span className="calc-area-num">{area}</span>
              <span className="calc-area-unit">&nbsp;м²</span>
            </div>
            <input
              type="range" min={40} max={500} step={5} value={area}
              className="calc-slider"
              onChange={e => setArea(Number(e.target.value))}
            />
            <div className="calc-area-marks">
              <span>40</span><span>150</span><span>300</span><span>500 м²</span>
            </div>
          </div>

          {/* Формат */}
          <div className="calc-row">
            <span className="calc-label">Формат проекта</span>
            <div className="calc-formats">
              {FORMATS.map(f => (
                <label key={f.price} className="calc-format">
                  <input
                    type="radio" name="calcFormat"
                    defaultChecked={!!f.default}
                    onChange={() => { setFormatPrice(f.price); setFormatName(f.name) }}
                  />
                  <div className="calc-format-card">
                    <div className="calc-format-name">{f.name}</div>
                    <div className="calc-format-price">
                      {formatNum(f.price)} ₽<small>/м²</small>
                    </div>
                    <div className="calc-format-desc">{f.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Надзор */}
          <div className="calc-row calc-row-extra">
            <label className="calc-checkbox">
              <input
                type="checkbox"
                checked={supervision}
                onChange={e => setSupervision(e.target.checked)}
              />
              <span className="calc-checkmark" />
              <span className="calc-checkbox-text">
                <strong>Авторский надзор</strong>
                <small>от 30 000 ₽/мес — добавит к ориентиру стоимость 4 месяцев</small>
              </span>
            </label>
          </div>
        </div>

        {/* Результат */}
        <div className="calc-result">
          <div className="calc-result-label">Ориентировочная стоимость</div>
          <div className="calc-result-num">
            {formatNum(total)}<span className="calc-result-unit"> ₽</span>
          </div>
          <div className="calc-result-detail">
            {formatName} · {area} м² × {formatNum(formatPrice)} ₽
            {supervision ? ` + надзор ${formatNum(supervisionCost)} ₽` : ''}
          </div>
          <div className="calc-result-hint">
            Для объектов <strong>от 150 м²</strong> и загородных
            домов — индивидуальные условия и скидки.
          </div>
          <a href="#contact" className="btn btn-primary calc-cta">
            Запросить расчёт
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Главный компонент ────────────────────────────────────────────────────────

export default function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="container">

        <div className="pricing-header reveal">
          <span className="pricing-eyebrow">— Стоимость услуг</span>
          <h2 className="pricing-h2">Прозрачные цены</h2>
          <p className="pricing-lead">
            Пять форматов проектирования + авторский надзор — от планировочного
            решения до полного цикла с 3D-визуализациями. Для объектов более
            150 м² и загородных домов — индивидуальные условия со скидкой.
          </p>
        </div>

        {/* Тарифные карточки */}
        <div className="pricing-grid reveal">
          {TIERS.map((t) => (
            <div key={t.name} className={`tier${t.popular ? ' is-popular' : ''}`}>
              {t.popular && <span className="tier-badge">Популярно</span>}
              <span className="tier-tag">{t.tag}</span>
              <h3 className="tier-name">{t.name}</h3>
              <div className="tier-price">
                <div className="tier-price-num"><em>{t.price}</em></div>
                <div className="tier-price-unit">{t.unit}</div>
              </div>
              <ul className="tier-feats">
                {t.feats.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href="#contact" className={`btn ${t.primary ? 'btn-primary' : 'btn-ghost'}`}>
                {t.btn}
              </a>
            </div>
          ))}
        </div>

        {/* Калькулятор */}
        <Calculator />

        {/* Спецпредложение */}
        <div className="special-offer reveal">
          <div className="special-offer-content">
            <span className="eyebrow">— Специальные предложения</span>
            <h3 className="special-offer-title">
              Индивидуальные условия<br />для крупных объектов
            </h3>
            <p className="special-offer-text">
              Для недвижимости <strong>площадью более 150 м²</strong>, для загородных
              домов предусмотрены <strong>особые ценовые условия и скидки</strong>,
              которые обсуждаются индивидуально.
            </p>
            <a href="#contact" className="btn btn-primary">Обсудить условия</a>
          </div>
          <div className="special-offer-vis">
            <div className="special-offer-stat">
              <div className="special-offer-num">150<em>+</em></div>
              <div className="special-offer-label">м² — порог индивидуального просчёта</div>
            </div>
            <div className="special-offer-stat">
              <div className="special-offer-num"><em>—%</em></div>
              <div className="special-offer-label">персональная скидка от площади и сложности</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
