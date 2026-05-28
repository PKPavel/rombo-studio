import { NextRequest, NextResponse } from 'next/server'

// Экранируем спецсимволы HTML, т.к. сообщение в Telegram уходит с parse_mode: 'HTML'
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Простой in-memory rate-limit: не более 5 заявок с одного IP в минуту
const hits = new Map<string, number[]>()
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60_000
  const recent = (hits.get(ip) ?? []).filter(t => now - t < windowMs)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 })
  }

  // Honeypot: реальные пользователи не заполняют скрытое поле company
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Слишком много заявок. Попробуйте позже.' }, { status: 429 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const type = typeof body.type === 'string' ? body.type.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || !phone) {
    return NextResponse.json({ error: 'Заполните имя и телефон' }, { status: 400 })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Некорректный email' }, { status: 400 })
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
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `📞 <b>Телефон:</b> <a href="tel:${encodeURIComponent(phone)}">${escapeHtml(phone)}</a>`,
    email ? `📧 <b>Почта:</b> ${escapeHtml(email)}` : null,
    `🏗 <b>Тип проекта:</b> ${escapeHtml(type) || 'Не указан'}`,
    message ? `\n💬 <b>О задаче:</b>\n${escapeHtml(message)}` : null,
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
