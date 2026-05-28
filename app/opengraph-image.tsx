import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ROMBO — студия дизайна интерьеров в Санкт-Петербурге'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          background: '#1A1614',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Фоновая текстура — тонкая сетка */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(200,89,63,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139,111,71,0.1) 0%, transparent 50%)',
          display: 'flex',
        }} />

        {/* Декоративная линия справа */}
        <div style={{
          position: 'absolute', right: 80, top: 72, bottom: 72,
          width: 1, background: 'rgba(244,237,224,0.12)',
          display: 'flex',
        }} />

        {/* Логотип + название */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'auto' }}>
          {/* Ромб */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="#C8593F" strokeWidth="1.5"/>
            <polygon points="18,8 28,18 18,28 8,18" fill="none" stroke="#C8593F" strokeWidth="0.8" opacity="0.5"/>
          </svg>
          <span style={{
            fontFamily: 'serif',
            fontSize: 18,
            letterSpacing: '0.28em',
            color: '#F4EDE0',
            textTransform: 'uppercase',
            opacity: 0.9,
          }}>
            ROMBO
          </span>
          <div style={{ width: 1, height: 20, background: 'rgba(244,237,224,0.2)', marginLeft: 8 }} />
          <span style={{
            fontFamily: 'sans-serif',
            fontSize: 12,
            letterSpacing: '0.15em',
            color: 'rgba(244,237,224,0.45)',
            textTransform: 'uppercase',
          }}>
            Interior Design Studio
          </span>
        </div>

        {/* Главный заголовок */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 32 }}>
          <div style={{
            fontFamily: 'serif',
            fontSize: 84,
            fontWeight: 300,
            color: '#F4EDE0',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
          }}>
            Дизайн
          </div>
          <div style={{
            fontFamily: 'serif',
            fontSize: 84,
            fontWeight: 300,
            color: '#F4EDE0',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
          }}>
            интерьеров
            <span style={{ color: '#C8593F', fontSize: 84 }}>.</span>
          </div>
        </div>

        {/* Нижняя строка */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 48,
          borderTop: '1px solid rgba(244,237,224,0.1)',
          paddingTop: 28,
        }}>
          <div style={{ display: 'flex', gap: 40 }}>
            {['70+ проектов', 'с 2016 года', 'Санкт-Петербург'].map((item) => (
              <div key={item} style={{
                fontFamily: 'sans-serif',
                fontSize: 13,
                letterSpacing: '0.1em',
                color: 'rgba(244,237,224,0.45)',
                textTransform: 'uppercase',
                display: 'flex',
              }}>
                {item}
              </div>
            ))}
          </div>
          <div style={{
            fontFamily: 'sans-serif',
            fontSize: 14,
            color: 'rgba(244,237,224,0.35)',
            letterSpacing: '0.05em',
          }}>
            rombo.pro
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
