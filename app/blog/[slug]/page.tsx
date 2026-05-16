import { client } from '../../../sanity.client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title, publishedAt, excerpt, author, tag, readTime,
  "coverUrl": coverImage.asset->url,
  body
}`

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p: any = await client.fetch(POST_QUERY, { slug }).catch(() => null)
  if (!p) return { title: 'Статья не найдена' }
  return {
    title: `${p.title} | ROMBO`,
    description: p.excerpt || p.title,
    openGraph: {
      title: p.title, description: p.excerpt || '',
      images: p.coverUrl ? [{ url: `${p.coverUrl}?w=1200&auto=format` }] : [],
    },
  }
}

// Рендер Sanity Portable Text без внешних библиотек
function renderBody(body: any[]): React.ReactNode {
  if (!body || !Array.isArray(body)) return null
  return body.map((block, i) => {
    if (block._type !== 'block') return null
    const text = block.children?.map((c: any) => c.text || '').join('') || ''
    const key = block._key || i
    switch (block.style) {
      case 'h2': return <h2 key={key} style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 300, letterSpacing: '-.02em', color: 'var(--ink)', margin: '48px 0 20px', lineHeight: 1.2 }}>{text}</h2>
      case 'h3': return <h3 key={key} style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 300, color: 'var(--ink)', margin: '36px 0 16px', lineHeight: 1.3 }}>{text}</h3>
      case 'blockquote': return <blockquote key={key} style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 24, margin: '32px 0', fontStyle: 'italic', color: 'var(--ink)', opacity: 0.75, fontSize: '1.05em' }}>{text}</blockquote>
      default: return text ? <p key={key} style={{ marginBottom: '1.5em', lineHeight: 1.85, color: 'var(--ink)', opacity: 0.8 }}>{text}</p> : null
    }
  })
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post: any = await client.fetch(POST_QUERY, { slug }).catch(() => null)
  if (!post) notFound()

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--bg)', paddingTop: 'calc(76px + 56px)', paddingBottom: 40 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 clamp(20px,4vw,40px)' }}>
          <Link href="/#blog" style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink)', opacity: .4, textDecoration: 'none', display: 'inline-block', marginBottom: 28 }}>
            ← Журнал
          </Link>
          {post.tag && (
            <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>
              — {post.tag}
            </div>
          )}
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px,5vw,56px)', fontWeight: 300, letterSpacing: '-.025em', color: 'var(--ink)', lineHeight: 1.1, marginBottom: 28 }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', opacity: .4, letterSpacing: '.04em' }}>
            {date && <span>{date}</span>}
            {post.readTime && <span>· {post.readTime} мин чтения</span>}
            {post.author && <span>· {post.author}</span>}
          </div>
        </div>
      </div>

      {/* Обложка */}
      {post.coverUrl && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,4vw,60px) 56px' }}>
          <img src={`${post.coverUrl}?w=1400&auto=format`} alt={post.title}
            style={{ width: '100%', maxHeight: 520, objectFit: 'cover', display: 'block', borderRadius: 2 }} />
        </div>
      )}

      {/* Тело статьи */}
      <article style={{ maxWidth: 740, margin: '0 auto 100px', padding: '0 clamp(20px,4vw,40px)', fontFamily: 'var(--sans)', fontSize: 'clamp(16px,1.8vw,18px)' }}>
        {post.excerpt && (
          <p style={{ fontSize: 'clamp(17px,2.2vw,21px)', lineHeight: 1.7, opacity: .65, marginBottom: 48, fontStyle: 'italic', borderBottom: '1px solid rgba(26,22,20,.08)', paddingBottom: 40 }}>
            {post.excerpt}
          </p>
        )}
        {renderBody(post.body)}
      </article>

      {/* CTA */}
      <div style={{ background: 'var(--ink)', padding: 'clamp(48px,8vh,80px) clamp(20px,4vw,60px)', textAlign: 'center', marginBottom: 0 }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>— Готовы к проекту?</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 300, color: 'var(--on-dark)', marginBottom: 24, letterSpacing: '-.02em' }}>Обсудим ваш интерьер</h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--on-dark)', opacity: .55, marginBottom: 36, lineHeight: 1.7 }}>Бесплатная консультация с руководителем студии. Перезвоним в течение часа.</p>
          <Link href="/#contact" style={{ fontFamily: 'var(--sans)', fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--bg)', padding: '16px 36px', borderRadius: 2, textDecoration: 'none', display: 'inline-block' }}>
            Оставить заявку
          </Link>
        </div>
      </div>

      <div style={{ background: 'var(--bg)', padding: '32px clamp(20px,4vw,60px)' }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <Link href="/#blog" style={{ fontFamily: 'var(--sans)', fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', opacity: .4 }}>
            ← Все статьи
          </Link>
        </div>
      </div>
    </>
  )
}
