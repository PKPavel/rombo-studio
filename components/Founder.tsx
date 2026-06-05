import Image from 'next/image'
import { client } from '../sanity.client'

// Берём руководителя из «Команды» — первая запись по полю order
// (чтобы фото в Founder и в Team было гарантированно одно и то же).
const FOUNDER_QUERY = `*[_type == "teamMember" && !disabled] | order(order asc) [0] {
  name,
  "photo": photo.asset->url,
  "hotspot": photo.hotspot
}`

export default async function Founder() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cmsFounder: any = await client.fetch(FOUNDER_QUERY).catch(() => null)
  const photoUrl: string = cmsFounder?.photo || '/images/alexandra.png'
  const hotspot = cmsFounder?.hotspot
  const objectPosition = hotspot
    ? `${(hotspot.x * 100).toFixed(1)}% ${(hotspot.y * 100).toFixed(1)}%`
    : 'center 30%'

  return (
    <section id="founder" className="founder">
      <div className="container">
        <div className="founder-grid reveal">

          {/* ── Левая колонка ── */}
          <div className="founder-left">
            <div className="founder-photo">
              <Image
                src={photoUrl}
                alt="Александра Серова — руководитель студии ROMBO"
                className="founder-photo-img"
                fill
                sizes="(max-width: 700px) 80vw, (max-width: 1100px) 40vw, 460px"
                style={{ objectFit: 'cover', objectPosition }}
              />
            </div>

            <div className="founder-name-block">
              <h3 className="founder-name">Александра Серова</h3>
              <p className="founder-role">
                Дизайнер интерьеров и&nbsp;руководитель студии дизайна «ROMBO»
              </p>
            </div>

            <ul className="founder-contacts">
              <li>
                <span className="founder-contact-ico">✆</span>
                <a href="tel:+79045581631">+7 (904) 558-16-31</a>
              </li>
              <li>
                <span className="founder-contact-ico">✉</span>
                <a href="mailto:info@rombostudio.ru">info@rombostudio.ru</a>
              </li>
              <li>
                <span className="founder-contact-ico">◎</span>
                Санкт-Петербург, Инструментальная ул., д. 8
              </li>
            </ul>
          </div>

          {/* ── Правая колонка ── */}
          <div className="founder-right">
            <span className="eyebrow">— О&nbsp;нас</span>

            <p className="founder-lead">
              <strong>ROMBO</strong>{' '}объединяет опытных специалистов,
              чтобы создавать уникальные и&nbsp;тщательно продуманные интерьеры.
            </p>

            <p className="founder-text">
              <strong>Мы предлагаем полный спектр услуг по&nbsp;созданию
              и&nbsp;реализации дизайн-проектов</strong> для частных
              и&nbsp;коммерческих пространств:
            </p>

            <ul className="founder-list">
              <li>Архитектурное планирование</li>
              <li>3D-визуализация</li>
              <li>Разработка рабочих чертежей</li>
              <li>Комплектация проекта</li>
              <li>Авторское сопровождение</li>
            </ul>

            <p className="founder-text">
              Стремимся подчеркнуть индивидуальность наших клиентов
              и&nbsp;создать <strong>пространство дома</strong>, которое станет
              основой для их&nbsp;комфортной и&nbsp;счастливой жизни.
            </p>

            <p className="founder-text">
              <strong>Уделяем особое внимание качеству сервиса</strong>,
              обеспечивая комфорт и&nbsp;прозрачность на&nbsp;всех этапах
              работы — от&nbsp;первого знакомства до&nbsp;реализации
              последней детали вашего проекта.
            </p>

            <p className="founder-quote">
              Мы&nbsp;подходим к&nbsp;каждому проекту с&nbsp;душой, вниманием
              и&nbsp;стремлением достичь <em>лучшего результата.</em>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
