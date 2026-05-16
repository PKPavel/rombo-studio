import { ImageResponse } from 'next/og'
import { client } from '../../../sanity.client'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: any = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      title, city, area, year,
      "coverUrl": coverImage.asset->url
    }`,
    { slug }
  ).catch(() => null)

  const title = p?.title ?? 'Проект'
  const meta = [p?.city, p?.area ? `${p.area} м²` : null, p?.year].filter(Boolean).join(' · ')
  const coverUrl = p?.coverUrl ? `${p.coverUrl}?w=1200&h=630&fit=crop&auto=format` : null

  return new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630,
        display: 'flex',
        background: '#1A1614',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Фото обложки проекта */}
        {coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            alt=""
          />
        )}

        {/* Градиент поверх фото */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(20,12,10,0.88) 0%, rgba(20,12,10,0.3) 60%, rgba(20,12,10,0.2) 100%)',
          display: 'flex',
        }} />

        {/* Контент */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 72px',
        }}>
          {/* Лого вверху */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="#C8593F" strokeWidth="1.5"/>
            </svg>
            <span style={{
              fontFamily: 'serif', fontSize: 15, letterSpacing: '0.28em',
              color: 'rgba(244,237,224,0.85)', textTransform: 'uppercase',
            }}>
              ROMBO
            </span>
          </div>

          {/* Название проекта внизу */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {meta && (
              <div style={{
                fontFamily: 'sans-serif', fontSize: 13, letterSpacing: '0.18em',
                color: '#C8593F', textTransform: 'uppercase',
              }}>
                {meta}
              </div>
            )}
            <div style={{
              fontFamily: 'serif', fontSize: 72, fontWeight: 300,
              color: '#F4EDE0', lineHeight: 0.95, letterSpacing: '-0.02em',
              maxWidth: 900,
            }}>
              {title}
            </div>
            <div style={{
              fontFamily: 'sans-serif', fontSize: 13, letterSpacing: '0.1em',
              color: 'rgba(244,237,224,0.4)', textTransform: 'uppercase',
              marginTop: 8,
            }}>
              rombo.pro
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
