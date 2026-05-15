'use client'

// Process — переработан по пожеланию Александры:
// 2 главы, горизонтальная шкала, без меток времени и оплаты

const STAGES = [
  {
    eyebrow: '— Глава первая',
    title: 'Дизайн-проект',
    steps: [
      {
        icon: (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 52L52 12"/><path d="M12 52l8-2 24-24 2-8"/><path d="M14 50l-4-4"/><path d="M44 14h6v6"/>
          </svg>
        ),
        title: 'Знакомство',
        desc: 'Переписка, созвон или встреча в студии. Рассказываем как устроен процесс. Без обязательств.',
      },
      {
        icon: (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <rect x="16" y="10" width="32" height="44" rx="2"/><path d="M24 22h16M24 30h16M24 38h12"/>
          </svg>
        ),
        title: 'Договор',
        desc: 'Фиксируем объём работ, состав проекта, сроки и стоимость. Всё на бумаге.',
      },
      {
        icon: (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 22h28a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H22l-12 8V26a4 4 0 0 1 4-4z"/>
            <path d="M42 28h12a4 4 0 0 1 4 4v18l-8-6h-6a4 4 0 0 1-4-4"/>
          </svg>
        ),
        title: 'Брифинг',
        desc: 'Разбираем образ жизни, привычки, сценарии. Здесь рождается ДНК будущего интерьера.',
      },
      {
        icon: (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <rect x="10" y="10" width="44" height="44" rx="1"/><path d="M10 26h44M28 10v44"/>
          </svg>
        ),
        title: 'Концепция и 3D',
        desc: 'Обмеры, планировки, утверждение концепции и 3D первого помещения. Лицо проекта.',
      },
      {
        icon: (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 6L8 18v24l24 12 24-12V18z"/><path d="M32 30l24-12M32 30L8 18M32 30v24"/>
          </svg>
        ),
        title: 'Полный пакет 3D',
        desc: '3D всех помещений в согласованной концепции. Доводим до фотореалистичности.',
      },
      {
        icon: (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 12h48l-24 40z"/><path d="M8 12l10 16M56 12L46 28"/>
          </svg>
        ),
        title: 'Чертежи и подбор',
        desc: 'Подробные чертежи для строителей и файл подбора с артикулами поставщиков.',
      },
    ],
  },
  {
    eyebrow: '— Глава вторая',
    title: 'Реализация',
    steps: [
      {
        icon: (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 48h48"/><path d="M10 48a22 22 0 0 1 44 0"/><path d="M24 30V16a8 8 0 0 1 16 0v14"/>
          </svg>
        ),
        title: 'Авторский надзор',
        desc: 'Контроль, чтобы стройка не превратила проект в «как-то так». Отдельный договор.',
      },
      {
        icon: (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 28l20-16 20 16v22a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z"/><path d="M26 52V36h12v16"/>
          </svg>
        ),
        title: 'Выезды на объект',
        desc: '4 выезда в месяц, проверка качества, оперативные корректировки на месте.',
      },
      {
        icon: (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 14h32v36H16z"/><path d="M22 22h20M22 30h20M22 38h12"/>
            <circle cx="32" cy="4" r="2" fill="currentColor"/>
          </svg>
        ),
        title: 'Финальный акт',
        desc: 'Сдача объекта по чек-листу. Интерьер в точности соответствующий проекту.',
      },
    ],
  },
]

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="container">

        <div className="section-head reveal">
          <div className="section-head-left">
            <span className="eyebrow">— Этапы взаимодействия</span>
            <h2 className="h-section">Как мы работаем</h2>
          </div>
          <div className="section-head-right">
            Прозрачная и предсказуемая методика. Каждый этап имеет результат,
            который вы согласовываете до перехода к следующему.
          </div>
        </div>

        {STAGES.map((stage) => (
          <div key={stage.title} className="proc-stage reveal">
            <span className="proc-stage-eyebrow">{stage.eyebrow}</span>
            <h3 className="proc-stage-title">{stage.title}</h3>

            {/* Горизонтальная шкала с прокруткой */}
            <div className="proc-scroll-wrap">
              <div className="proc-timeline">
                {stage.steps.map((step, i) => (
                  <div key={i} className="proc-step">
                    <div className="proc-step-icon">{step.icon}</div>
                    <div className="proc-step-dot" />
                    <h4 className="proc-step-title">{step.title}</h4>
                    <p className="proc-step-desc">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
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
