'use client'

import Image from 'next/image'

// QR-коды генерируются через qr.io API (внешний сервис) — отдаём как есть, без next/image оптимизации
function QRCode({ url, size = 120 }: { url: string; size?: number }) {
  const encoded = encodeURIComponent(url)
  return (
    <Image
      src={`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=8&color=1A1614&bgcolor=F4EDE0`}
      alt={url}
      width={size}
      height={size}
      unoptimized
      loading="lazy"
    />
  )
}

export default function Founder() {
  return (
    <section id="founder" className="founder">
      <div className="container">
        <div className="founder-grid reveal">

          {/* ── Левая колонка ── */}
          <div className="founder-left">
            <div className="founder-photo">
              <Image
                src="/images/alexandra.png"
                alt="Александра Серова — руководитель студии ROMBO"
                className="founder-photo-img"
                fill
                sizes="(max-width: 700px) 60vw, 320px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div className="founder-name-block">
              <h3 className="founder-name">Александра Серова</h3>
              <p className="founder-role">
                Дизайнер интерьеров и&nbsp;руководитель студии дизайна «ROMBO»
              </p>
            </div>

            {/* QR-коды как в v22 */}
            <div className="founder-qr">
              <div className="qr-block">
                <a href="https://www.behance.net/serovadesign" target="_blank" rel="noopener" className="qr-link">
                  <div className="qr-code">
                    <QRCode url="https://www.behance.net/serovadesign" size={100} />
                  </div>
                  <span className="qr-label">Behance</span>
                </a>
              </div>
              <div className="qr-block">
                <a href="https://www.instagram.com/serova_design" target="_blank" rel="noopener" className="qr-link">
                  <div className="qr-code">
                    <QRCode url="https://www.instagram.com/serova_design" size={100} />
                  </div>
                  <span className="qr-label">Instagram</span>
                </a>
              </div>
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
