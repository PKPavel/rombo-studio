'use client'

// ─── Founder — секция «О нас» ─────────────────────────────────────────────────
// Фото Александры: добавить в public/images/alexandra.jpg
// Когда появится — раскомментировать <img> и убрать <FounderPlaceholder />

function FounderPlaceholder() {
  return (
    <div className="founder-photo-placeholder">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="24" r="14" stroke="#B0AAA3" strokeWidth="1.5" />
        <path d="M8 60c0-13.255 10.745-24 24-24s24 10.745 24 24"
          stroke="#B0AAA3" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export default function Founder() {
  return (
    <section id="founder" className="founder">
      <div className="container">
        <div className="founder-grid reveal">

          {/* ── Левая колонка — фото + контакты ── */}
          <div className="founder-left">
            <div className="founder-photo">
              {/* Когда появится фото Александры: */}
              {/* <img src="/images/alexandra.jpg" alt="Александра Серова" /> */}
              <FounderPlaceholder />
            </div>

            <div className="founder-name-block">
              <h3 className="founder-name">Александра Серова</h3>
              <p className="founder-role">
                Дизайнер интерьеров и&nbsp;руководитель студии дизайна «ROMBO»
              </p>
            </div>

            {/* QR-коды соцсетей */}
            <div className="founder-qr">
              <div className="qr-block">
                <a
                  href="https://www.behance.net/serovadesign"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-social-link"
                  aria-label="Behance"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                  </svg>
                  <span>Behance</span>
                </a>
              </div>
              <div className="qr-block">
                <a
                  href="https://www.instagram.com/serova_design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-social-link"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span>Instagram</span>
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

          {/* ── Правая колонка — текст ── */}
          <div className="founder-right">
            <span className="eyebrow">— О&nbsp;нас</span>

            <p className="founder-lead">
              <strong>ROMBO</strong> объединяет опытных специалистов,
              чтобы создавать уникальные и&nbsp;тщательно продуманные интерьеры.
            </p>

            <p className="founder-text">
              <strong>
                Мы предлагаем полный спектр услуг по&nbsp;созданию
                и&nbsp;реализации дизайн-проектов
              </strong>{' '}
              для частных и&nbsp;коммерческих пространств:
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
              работы&nbsp;— от&nbsp;первого знакомства до&nbsp;реализации
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
