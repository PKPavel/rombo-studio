'use client'

import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', comment: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault()
    // TODO: подключить реальную отправку (Formspree / email)
    setSent(true)
  }

  return (
    <section id="contact" className="contact">
      <div className="container">

        <div className="section-head reveal">
          <div className="section-head-left">
            <span className="eyebrow">— Начать проект</span>
            <h2 className="h-section">Оставить заявку</h2>
          </div>
          <div className="section-head-right">
            Расскажите о своём проекте — мы свяжемся в течение одного рабочего дня,
            ответим на вопросы и договоримся о встрече или звонке.
          </div>
        </div>

        <div className="contact-grid reveal">

          {/* Форма */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-success">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="19" stroke="var(--accent)" strokeWidth="1.5"/>
                  <path d="M12 20l6 6 10-12" stroke="var(--accent)" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>Заявка отправлена</h3>
                <p>Свяжемся с вами в течение рабочего дня.</p>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-field">
                  <label className="form-label">Имя</label>
                  <input
                    className="form-input" type="text" name="name"
                    placeholder="Александр" value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Телефон</label>
                  <input
                    className="form-input" type="tel" name="phone"
                    placeholder="+7 (___) ___-__-__" value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Расскажите о проекте</label>
                  <textarea
                    className="form-input form-textarea" name="comment"
                    placeholder="Квартира 80 м², хочу современную классику..."
                    value={form.comment} onChange={handleChange}
                    rows={4}
                  />
                </div>
                <button className="btn btn-primary contact-submit" onClick={handleSubmit}>
                  Отправить заявку
                </button>
                <p className="form-note">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </div>
            )}
          </div>

          {/* Контактная информация */}
          <div className="contact-info">
            <div className="contact-info-block">
              <span className="contact-info-label">Телефон</span>
              <a href="tel:+79045581631" className="contact-info-value">
                +7 (904) 558-16-31
              </a>
            </div>
            <div className="contact-info-block">
              <span className="contact-info-label">Email</span>
              <a href="mailto:info@rombostudio.ru" className="contact-info-value">
                info@rombostudio.ru
              </a>
            </div>
            <div className="contact-info-block">
              <span className="contact-info-label">Адрес</span>
              <span className="contact-info-value">
                Санкт-Петербург<br />
                Инструментальная ул., д. 8
              </span>
            </div>
            <div className="contact-info-block">
              <span className="contact-info-label">Время работы</span>
              <span className="contact-info-value">
                Пн–Пт, 10:00–19:00
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-logo">ROMBO</span>
              <p className="footer-tagline">Студия авторского дизайна интерьеров · с 2018 года</p>
            </div>
            <nav className="footer-nav">
              <a href="#archive">Проекты</a>
              <a href="#founder">Студия</a>
              <a href="#services">Услуги</a>
              <a href="#pricing">Цены</a>
              <a href="#contact">Контакты</a>
            </nav>
            <p className="footer-copy">© 2025 ROMBO. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </section>
  )
}
