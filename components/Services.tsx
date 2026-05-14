'use client'

const SERVICES = [
  {
    num: '— 01',
    name: 'Архитектурное планирование',
    desc: 'Грамотные планировочные решения. Несколько вариантов на выбор, проработка нюансов, согласование финального решения.',
  },
  {
    num: '— 02',
    name: '3D-визуализация',
    desc: 'Фотореалистичные рендеры всех помещений. Увидеть будущий интерьер до начала работ, утвердить материалы, мебель, свет.',
  },
  {
    num: '— 03',
    name: 'Рабочие чертежи',
    desc: 'Полный комплект документации для строителей: монтаж стен, электрика, сантехника, потолки, развёртки, узлы. Без неточностей и догадок на объекте.',
  },
  {
    num: '— 04',
    name: 'Комплектация проекта',
    desc: 'Файл подбора материалов и предметов интерьера, рекомендации проверенных поставщиков. Возьмём поиск, заказ и контроль на себя.',
  },
  {
    num: '— 05',
    name: 'Авторское сопровождение',
    desc: 'Контроль соответствия строительных работ проектной документации. Регулярные выезды на объект, удалённые консультации, оперативные корректировки.',
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">

        <div className="section-head reveal">
          <div className="section-head-left">
            <span className="eyebrow">— Услуги студии</span>
            <h2 className="h-section">Полный цикл</h2>
          </div>
          <div className="section-head-right">
            От первой консультации до новоселья. Архитектурное планирование,
            3D-визуализация, рабочие чертежи, комплектация проекта, авторское
            сопровождение — всё в одном договоре с прозрачным бюджетом.
          </div>
        </div>

        <div className="services-list reveal">
          {SERVICES.map((s) => (
            <a key={s.num} href="#contact" className="service-row">
              <span className="service-num">{s.num}</span>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <span className="service-arrow">→</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
