import { client } from '../../../sanity.client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title, publishedAt, excerpt, author,
  "tag": coalesce(tag, "Статья"),
  readTime,
  "coverUrl": coverImage.asset->url,
  body
}`

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: any = await client.fetch(POST_QUERY, { slug }).catch(() => null)
  if (!p) return { title: 'Статья не найдена' }
  return {
    title: p.title,
    description: p.excerpt || p.title,
    openGraph: {
      title: p.title,
      description: p.excerpt || '',
      images: p.coverUrl ? [{ url: `${p.coverUrl}?w=1200&auto=format` }] : [],
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post: any = await client.fetch(POST_QUERY, { slug }).catch(() => null)
  if (!post) notFound()

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      {/* Шапка */}
      <div style={{ background: 'var(--bg)', padding: 'calc(76px + 48px) clamp(20px,4vw,60px) 0', maxWidth: 'var(--max)', margin: '0 auto' }}>
        <Link href="/#blog" style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink)', opacity: .4, textDecoration: 'none', display: 'inline-block', marginBottom: 32 }}>
          ← Журнал
        </Link>
        {post.tag && (
          <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
            {post.tag}
          </div>
        )}
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,5vw,64px)', fontWeight: 300, letterSpacing: '-.025em', color: 'var(--ink)', lineHeight: 1.1, marginBottom: 24, maxWidth: 800 }}>
          {post.title}
        </h1>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', opacity: .45, letterSpacing: '.05em', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {date && <span>{date}</span>}
          {post.readTime && <span>· {post.readTime} мин чтения</span>}
          {post.author && <span>· {post.author}</span>}
        </div>
      </div>

      {/* Обложка */}
      {post.coverUrl && (
        <div style={{ maxWidth: 'var(--max)', margin: '40px auto 0', padding: '0 clamp(20px,4vw,60px)' }}>
          <img src={`${post.coverUrl}?w=1400&auto=format`} alt={post.title}
            style={{ width: '100%', maxHeight: 560, objectFit: 'cover', borderRadius: 2, display: 'block' }} />
        </div>
      )}

      {/* Тело статьи */}
      <article style={{
        maxWidth: 720, margin: '56px auto 120px',
        padding: '0 clamp(20px,4vw,60px)',
        fontFamily: 'var(--sans)', fontSize: 'clamp(16px,1.8vw,18px)',
        lineHeight: 1.8, color: 'var(--ink)',
      }}>
        {post.excerpt && (
          <p style={{ fontSize: 'clamp(17px,2vw,20px)', lineHeight: 1.7, opacity: .7, marginBottom: 40, fontStyle: 'italic' }}>
            {post.excerpt}
          </p>
        )}
        {/* Portable text рендеринг будет добавлен при подключении @portabletext/react */}
        {!post.body && (
          <p style={{ opacity: .5 }}>Полный текст статьи скоро появится.</p>
        )}
      </article>

      <div style={{ borderTop: '1px solid rgba(26,22,20,.08)', maxWidth: 'var(--max)', margin: '0 auto', padding: '40px clamp(20px,4vw,60px)' }}>
        <Link href="/#blog" style={{ fontFamily: 'var(--sans)', fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', opacity: .5 }}>
          ← Все статьи
        </Link>
      </div>
    </main>
  )
}
