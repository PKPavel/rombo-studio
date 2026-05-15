'use client'

import { useRef, useState, useEffect } from 'react'

const STAGES = [
  {
    eyebrow: '— Глава первая',
    title: 'Дизайн-проект',
    steps: [
      {
        icon: <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 52L52 12"/><path d="M12 52l8-2 24-24 2-8"/><path d="M14 50l-4-4"/></svg>,
        title: 'Знакомство',
        desc: 'Переписка, созвон или встреча в студии. Рассказываем как устроен процесс. Без обязательств.',
      },
      {
        icon: <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="10" width="32" height="44" rx="2"/><path d="M24 22h16M24 30h16M24 38h12"/></svg>,
        title: 'Договор',
        desc: 'Фиксируем объём работ, состав проекта, сроки и стоимость. Всё на бумаге.',
      },
      {
        icon: <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10 22h28a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H22l-12 8V26a4 4 0 0 1 4-4z"/></svg>,
        title: 'Брифинг',
        desc: 'Разбираем образ жизни, привычки, сценарии. Здесь рождается ДНК будущего интерьера.',
      },
      {
        icon: <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="10" y="10" width="44" height="44" rx="1"/><path d="M10 26h44M28 10v44"/></svg>,
        title: 'Концепция и 3D',
        desc: 'Обмеры, планировки, утверждение концепции и 3D первого помещения. Лицо проекта.',
      },
      {
        icon: <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M32 6L8 18v24l24 12 24-12V18z"/><path d="M32 30l24-12M32 30L8 18M32 30v24"/></svg>,
        title: 'Полный пакет 3D',
        desc: '3D всех помещений в согласованной концепции. Доводим до фотореалистичности.',
      },
      {
        icon: <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h48l-24 40z"/><path d="M8 12l10 16M56 12L46 28"/></svg>,
        title: 'Чертежи и подбор',
        desc: 'Полный комплект рабочей документации и файл подбора материалов с артикулами.',
      },
    ],
  },
  {
    eyebrow: '— Глава вторая',
    title: 'Реализация',
    steps: [
      {
        icon: <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 48h48"/><path d="M10 48a22 22 0 0 1 44 0"/><path d="M24 30V16a8 8 0 0 1 16 0v14"/></svg>,
        title: 'Авторский надзор',
        desc: 'Контроль, чтобы стройка не превратила проект в «как-то так». Отдельный договор.',
      },
      {
        icon: <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 28l20-16 20 16v22a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z"/><path d="M26 52V36h12v16"/></svg>,
        title: 'Выезды на объект',
        desc: '4 выезда в месяц, проверка качества, оперативные корректировки на месте.',
      },
      {
        icon: <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16 14h32v36H16z"/><path d="M22 22h20M22 30h20M22 38h12"/><path d="M26 8l6 6 6-6" strokeWidth="1.2"/></svg>,
        title: 'Финальный акт',
        desc: 'Сдача объекта по чек-листу. Интерьер в точности соответствующий проекту.',
      },
    ],
  },
]

function StageTimeline({ steps }: { steps: typeof STAGES[0]['steps'] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const checkScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => { el.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll) }
  }, [])

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <div className="proc-wrap">
      {/* Стрелки */}
      <button
        className={`proc-arrow proc-arrow-l${canLeft ? ' visible' : ''}`}
        onClick={() => scroll(-1)} aria-label="Назад"
      >‹</button>
      <button
        className={`proc-arrow proc-arrow-r${canRight ? ' visible' : ''}`}
        onClick={() => scroll(1)} aria-label="Вперёд"
      >›</button>

      {/* Gradient fades */}
      {canLeft && <div className="proc-fade proc-fade-l" />}
      {canRight && <div className="proc-fade proc-fade-r" />}

      {/* Прокручиваемая дорожка */}
      <div className="proc-track" ref={trackRef}>
        {steps.map((step, i) => (
          <div key={i} className="proc-step" style={{ '--i': i } as React.CSSProperties}>
            <div className="proc-step-icon">{step.icon}</div>
            <div className="proc-step-connector">
              <div className="proc-step-line" />
              <div className="proc-step-dot" />
              <div className="proc-step-line" />
            </div>
            <h4 className="proc-step-title">{step.title}</h4>
            <p className="proc-step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="container">

        {/* ── Заголовок секции — центр ── */}
        <div className="proc-header reveal">
          <span className="proc-eyebrow">— Этапы взаимодействия</span>
          <h2 className="proc-h2">Как мы работаем</h2>
          <p className="proc-lead">
            Прозрачная и предсказуемая методика. Каждый этап имеет результат,
            который вы согласовываете до перехода к следующему.
          </p>
        </div>

        {/* ── Главы ── */}
        {STAGES.map((stage, si) => (
          <div key={si} className="proc-stage reveal">
            <span className="proc-stage-eyebrow">{stage.eyebrow}</span>
            <h3 className="proc-stage-title">{stage.title}</h3>
            <StageTimeline steps={stage.steps} />
          </div>
        ))}

        <p className="proc-note reveal">
          Каждый этап закрывается актом выполненных работ. До перехода к следующему
          всё согласовывается с вами — без неожиданностей и скрытых правок.
        </p>

      </div>
    </section>
  )
}
