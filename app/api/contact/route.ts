import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, phone, email, type, message } = await req.json()

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: 'Заполните имя и телефон' }, { status: 400 })
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram env vars missing')
    return NextResponse.json({ error: 'Server config error' }, { status: 500 })
  }

  const text = [
    '🏠 <b>Новая заявка с сайта ROMBO</b>',
    '',
    `👤 <b>Имя:</b> ${name}`,
    `📞 <b>Телефон:</b> <a href="tel:${phone}">${phone}</a>`,
    email ? `📧 <b>Почта:</b> ${email}` : null,
    `🏗 <b>Тип проекта:</b> ${type || 'Не указан'}`,
    message ? `\n💬 <b>О задаче:</b>\n${message}` : null,
  ].filter(Boolean).join('\n')

  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    console.error('Telegram error:', err)
    return NextResponse.json({ error: 'Telegram send failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
