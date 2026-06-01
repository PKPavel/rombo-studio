'use client'

const SERVICES = [
  {
    num: '— 01',
    name: 'Архитектурное планирование',
    desc: 'Несколько вариантов компоновки на выбор. Находим планировку, где квадратные метры работают на ваши сценарии, а не наоборот.',
  },
  {
    num: '— 02',
    name: '3D-визуализация',
    desc: 'Будущий интерьер ещё до первого гвоздя. Утверждаем материалы, свет и мебель на рендерах — там, где исправить бесплатно.',
  },
  {
    num: '— 03',
    name: 'Рабочие чертежи',
    desc: 'Альбом для строителей без двусмысленностей. Прораб открывает чертёж и делает — без звонков «а тут как?» в час ночи.',
  },
  {
    num: '— 04',
    name: 'Комплектация проекта',
    desc: 'Берём поиск, заказ и контроль поставок на себя. Только проверенные поставщики, без посредников и неожиданных задержек.',
  },
  {
    num: '— 05',
    name: 'Авторское сопровождение',
    desc: 'Регулярные выезды и удалённые консультации между ними. Каждое решение проекта доходит до стройки в утверждённом виде.',
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
            Пять видов работ под одним договором. Без посредников, без
            перекладывания ответственности на «смежников», с прозрачной
            стоимостью на старте.
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
