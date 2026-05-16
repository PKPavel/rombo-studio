'use client'

import { useState, useRef } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const form = formRef.current!
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value.trim(),
      phone:   (form.elements.namedItem('phone')   as HTMLInputElement).value.trim(),
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value.trim(),
      type:    (form.elements.namedItem('type')    as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    }
    if (!data.name) { setError('Введите ваше имя'); return }
    if (!data.phone || data.phone.length < 10) { setError('Введите корректный номер телефона'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSent(true)
      } else {
        const json = await res.json().catch(() => ({}))
        setError(json.error || 'Ошибка отправки. Попробуйте позже.')
      }
    } catch {
      setError('Нет соединения. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section id="contact" className="contact">
        <div className="container">

          {/* Заголовок — центрированный как в v22 */}
          <div className="contact-head reveal">
            <span className="eyebrow">— Свяжитесь со студией</span>
            <h2 className="h-section">Расскажите<br />о вашем проекте</h2>
            <p className="contact-sub">
              Сделайте первый шаг к пространству своей мечты — запишитесь на
              бесплатную консультацию с руководителем студии. Перезвоним в течение часа.
            </p>
          </div>

          <div className="contact-grid">

            {/* Контактная информация */}
            <div className="reveal">
              <div className="contact-info">
                <div className="contact-info-item">
                  <span className="contact-info-label">Адрес</span>
                  <span className="contact-info-val">
                    Санкт-Петербург
                    <small>Инструментальная улица, дом 8</small>
                  </span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Телефон</span>
                  <span className="contact-info-val">
                    <a href="tel:+79045581631">+7 904 558 16 31</a>
                  </span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Почта</span>
                  <span className="contact-info-val">
                    <a href="mailto:info@rombostudio.ru">info@rombostudio.ru</a>
                  </span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Часы работы</span>
                  <span className="contact-info-val">
                    Пн—Пт · 10:00—20:00
                    <small>Сб—Вс: по записи</small>
                  </span>
                </div>
              </div>
              <div className="contact-socials">
                <a href="https://www.behance.net/serovadesign" target="_blank" rel="noopener">Behance</a>
                <a href="https://www.instagram.com/serova_design" target="_blank" rel="noopener">Instagram</a>
                <a href="https://t.me/+79045581631" target="_blank" rel="noopener">Telegram</a>
              </div>
            </div>

            {/* Форма */}
            {sent ? (
              <div className="contact-success reveal">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="19" stroke="var(--accent)" strokeWidth="1.5"/>
                  <path d="M12 20l6 6 10-12" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>Заявка отправлена</h3>
                <p>Свяжемся в течение одного рабочего дня.</p>
              </div>
            ) : (
              <form className="form reveal delay-1" onSubmit={handleSubmit} ref={formRef}>
                <h3>Оставить заявку</h3>
                <div className="form-row">
                  <label>Имя</label>
                  <input type="text" name="name" required placeholder="Как к вам обращаться" />
                </div>
                <div className="form-row">
                  <label>Телефон</label>
                  <input type="tel" name="phone" required placeholder="+7" />
                </div>
                <div className="form-row">
                  <label>Почта <span>— по желанию</span></label>
                  <input type="email" name="email" placeholder="вы@пример.рф" />
                </div>
                <div className="form-row">
                  <label>Тип проекта</label>
                  <select name="type">
                    <option>Квартира</option>
                    <option>Загородный дом</option>
                    <option>Коммерческое помещение</option>
                    <option>Авторский надзор</option>
                    <option>Не уверен(-а)</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Кратко о задаче</label>
                  <textarea name="message" placeholder="Площадь, сроки, пожелания..." rows={4} />
                </div>
                {error && (
                  <p style={{ color: 'var(--accent)', fontSize: 13, marginBottom: 8 }}>{error}</p>
                )}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Отправка...' : 'Отправить'}
                </button>
                <p className="form-policy">
                  Нажимая «Отправить», вы соглашаетесь с политикой обработки персональных данных.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer — 4 колонки как в v22 */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="logo logo-footer" aria-label="ROMBO">
                <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="90 418 883 244" fill="currentColor">
                  <g><g>
                    <path d="M466.81,528.75h-20.58c-3.27,0-5.93,2.65-5.93,5.93v22.54h-19.54v-94.26c0-1.89,1.53-3.42,3.42-3.42h46.81c20.93,0,38.24,13.82,38.24,34.61,0,13.67-8.93,25.12-21.07,30.84l24.56,32.23h-24.28l-21.63-28.47Zm4.19-51.21h-24.77c-3.27,0-5.93,2.65-5.93,5.93v27h30.7c10.75,0,18.7-7.12,18.7-16.33s-7.81-16.61-18.7-16.61Z"/>
                    <path d="M658.17,557.22h-19.54v-94.26c0-1.89,1.53-3.42,3.42-3.42h21.42l26.07,61.48c2.04,4.82,8.88,4.82,10.92,0l25.95-61.47h24.84v97.68h-19.54v-33.85c0-6.44-8.83-8.26-11.37-2.34l-15.56,36.19h-19.68l-15.55-36.35c-2.54-5.93-11.38-4.12-11.38,2.33v34.01Z"/>
                    <path d="M769.25,462.96c0-1.89,1.53-3.42,3.42-3.42h45.98c20.23,0,33.91,10.05,33.91,25.54,0,9.63-6,17.58-15.21,22.05,12.14,4.05,19.68,12.14,19.68,22.89,0,16.33-16.33,27.21-38.38,27.21h-49.4v-94.26Zm49.4,13.32h-23.93c-3.27,0-5.93,2.65-5.93,5.93v17.51h29.86c8.23,0,15.21-4.88,15.21-11.58,0-7.12-6.42-11.86-15.21-11.86Zm0,39.63h-23.93c-3.27,0-5.93,2.65-5.93,5.93v18.49h29.86c11.3,0,18.7-4.6,18.7-12.14,0-7.95-6.98-12.28-18.7-12.28Z"/>
                    <path d="M622.48,490.25c-3.83-13.7-14.37-24.53-27.89-28.98-41.51-13.64-76.52,10.83-76.52,47.25,0,29.03,23.03,50.79,53.59,50.79,36.41,0,61.93-29.32,50.82-69.07Zm-50.85,50.09c-19.22,0-33.69-13.69-33.69-31.94,0-22.9,22.02-38.28,48.11-29.71,8.5,2.79,15.13,9.6,17.53,18.22,6.98,24.99-9.06,43.43-31.96,43.43Z"/>
                    <path d="M970.09,490.18c-3.83-13.7-14.37-24.53-27.89-28.98-41.51-13.64-76.52,10.83-76.52,47.25,0,29.03,23.03,50.79,53.59,50.79,36.41,0,61.93-29.32,50.82-69.07Zm-50.85,50.09c-19.22,0-33.69-13.69-33.69-31.94,0-22.9,22.02-38.28,48.11-29.71,8.5,2.79,15.13,9.6,17.53,18.22,6.98,24.99-9.06,43.43-31.96,43.43Z"/>
                  </g></g>
                  <g>
                    <path d="M323.81,568.88l-116.78,93.23-116.81-93.23h72.32c3.29,0,6.48,1.12,9.05,3.17l35.44,28.28,39.38-31.44,38.7-30.9,38.7,30.9Z"/>
                    <path d="M323.81,507.09l-38.7,30.88-38.68-30.88-30.36-24.24c-5.29-4.23-12.81-4.23-18.1,0l-30.36,24.24-38.7,30.88-38.7,30.9v-54.8c0-4.41,2.01-8.58,5.45-11.33l102.3-81.67c5.29-4.23,12.8-4.22,18.1,0l107.73,86.03Z"/>
                  </g>
                </svg>
              </a>
              <p>Студия интерьерного дизайна в Санкт-Петербурге. Авторские проекты под ключ для жилых и коммерческих пространств с 2018 года.</p>
            </div>

            <div className="footer-col">
              <h4>Студия</h4>
              <ul>
                <li><a href="#founder">О студии</a></li>
                <li><a href="#projects">Проекты</a></li>
                <li><a href="#archive">Архив работ</a></li>
                <li><a href="#blog">Журнал</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Услуги</h4>
              <ul>
                <li><a href="#services">Дизайн-проект</a></li>
                <li><a href="#services">3D-визуализация</a></li>
                <li><a href="#services">Рабочие чертежи</a></li>
                <li><a href="#services">Комплектация</a></li>
                <li><a href="#services">Авторский надзор</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Контакты</h4>
              <ul>
                <li><a href="tel:+79045581631">+7 904 558 16 31</a></li>
                <li><a href="mailto:info@rombostudio.ru">info@rombostudio.ru</a></li>
                <li><a href="https://t.me/+79045581631">Telegram</a></li>
                <li>СПб, Инструментальная, 8</li>
              </ul>
            </div>
          </div>

          <div className="footer-bot">
            <span>© ROMBO, 2018—2026 · Все права защищены</span>
            <span>Студия авторского дизайна интерьеров</span>
          </div>
        </div>
      </footer>

      {/* Floating bar — мобильная плашка */}
      <div className="float-bar">
        <a href="tel:+79045581631" className="fb-call">Позвонить</a>
        <a href="https://t.me/+79045581631" target="_blank" rel="noopener">Telegram</a>
      </div>
    </>
  )
}
