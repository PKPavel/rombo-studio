import { client } from '../../../sanity.client'
import { CustomCursor } from '../../../components/ScrollSpyCursor'
import { BlogProgress } from '../../../components/BlogProgress'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title, publishedAt, excerpt, author, tag, readTime,
  "coverUrl": coverImage.asset->url,
  body
}`

const RELATED_QUERY = `*[_type == "post" && slug.current != $slug && tag == $tag] | order(publishedAt desc) [0...3] {
  "slug": slug.current, title, "tag": coalesce(tag,"Статья"),
  "coverUrl": coverImage.asset->url, readTime, excerpt
}`

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: any = await client.fetch(POST_QUERY, { slug }).catch(() => null)
  if (!p) return { title: 'Статья не найдена' }
  return {
    title: `${p.title} | ROMBO`,
    description: p.excerpt || p.title,
    alternates: { canonical: `https://rombo.pro/blog/${slug}` },
    openGraph: {
      title: p.title, description: p.excerpt || '',
      type: 'article',
      images: p.coverUrl ? [{ url: `${p.coverUrl}?w=1200&auto=format` }] : [],
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBody(body: any[]): React.ReactNode {
  if (!body || !Array.isArray(body)) return null
  let h2count = 0
  return body.map((block, i) => {
    if (block._type !== 'block') return null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = block.children?.map((c: any) => c.text || '').join('') || ''
    const key = block._key || i
    if (!text.trim()) return null

    switch (block.style) {
      case 'h2': {
        h2count++
        const label = `— ${String(h2count).padStart(2, '0')}`
        return (
          <h2 key={key} className="blog-post-h2" data-num={label}>{text}</h2>
        )
      }
      case 'h3': return (
        <h3 key={key} className="blog-post-h3">{text}</h3>
      )
      case 'blockquote': return (
        <blockquote key={key} className="blog-post-blockquote">{text}</blockquote>
      )
      default: {
        // Нумерованные списки: "1. текст" → красивый элемент списка
        const listMatch = text.match(/^(\d+)\.\s+(.+)/)
        if (listMatch) {
          return (
            <div key={key} className="blog-post-list-item">
              <span className="blog-post-list-num">{listMatch[1]}</span>
              <span className="blog-post-list-text">{listMatch[2]}</span>
            </div>
          )
        }
        // Маркированные: "- текст" или "• текст"
        const bulletMatch = text.match(/^[-•]\s+(.+)/)
        if (bulletMatch) {
          return (
            <div key={key} className="blog-post-bullet">
              <span className="blog-post-bullet-dot">◆</span>
              <span>{bulletMatch[1]}</span>
            </div>
          )
        }
        return <p key={key} className="blog-post-p">{text}</p>
      }
    }
  })
}

function fmt(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post: any = await client.fetch(POST_QUERY, { slug }).catch(() => null)
  if (!post) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const related: any[] = post.tag
    ? await client.fetch(RELATED_QUERY, { slug, tag: post.tag }).catch(() => [])
    : []

  return (
    <>
      <CustomCursor />
      <BlogProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt || post.title,
          author: { '@type': 'Person', name: post.author || 'Александра Серова' },
          publisher: { '@type': 'Organization', name: 'ROMBO', url: 'https://rombo.pro' },
          datePublished: post.publishedAt,
          image: post.coverUrl ? `${post.coverUrl}?w=1200&auto=format` : null,
          url: `https://rombo.pro/blog/${slug}`,
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://rombo.pro' },
              { '@type': 'ListItem', position: 2, name: 'Журнал', item: 'https://rombo.pro/blog' },
              { '@type': 'ListItem', position: 3, name: post.title },
            ]
          }
        })}}
      />
      {/* HERO — полноэкранная обложка с заголовком поверх */}
      <header className="blog-hero">
        {post.coverUrl && (
          <div className="blog-hero-img">
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div className={`blog-hero-overlay${!post.coverUrl ? ' blog-hero-overlay--no-img' : ''}`} />
        <div className="blog-hero-content">
          <Link href="/blog" className="blog-back">
            ← Журнал
          </Link>
          {post.tag && <span className="blog-tag">{post.tag}</span>}
          <h1 className="blog-hero-title">{post.title}</h1>
          <div className="blog-hero-meta">
            {fmt(post.publishedAt) && <span>{fmt(post.publishedAt)}</span>}
            {post.readTime && <><span className="blog-meta-dot">·</span><span>{post.readTime} мин чтения</span></>}
            {post.author && <><span className="blog-meta-dot">·</span><span>{post.author}</span></>}
          </div>
        </div>
      </header>

      {/* ТЕЛО СТАТЬИ */}
      <main className="blog-main">
        <article className="blog-article">

          {/* Лид — выделенное введение */}
          {post.excerpt && (
            <p className="blog-lead">{post.excerpt}</p>
          )}

          {/* Разделитель */}
          <div className="blog-divider">
            <span /><span className="blog-divider-diamond">◆</span><span />
          </div>

          {/* Тело */}
          <div className="blog-body">
            {renderBody(post.body)}
          </div>

          {/* Автор */}
          <div className="blog-author">
            <div className="blog-author-avatar">
              {(post.author || 'А').charAt(0)}
            </div>
            <div>
              <div className="blog-author-name">{post.author || 'Александра Серова'}</div>
              <div className="blog-author-role">Руководитель студии ROMBO</div>
            </div>
          </div>
        </article>

        {/* ПОХОЖИЕ СТАТЬИ */}
        {related.length > 0 && (
          <section className="blog-related">
            <div className="blog-related-head">
              <span className="blog-related-eyebrow">— По теме</span>
              <h2 className="blog-related-title">Читайте также</h2>
            </div>
            <div className="blog-related-grid">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="blog-related-card">
                  <div className="blog-related-img">
                    {r.coverUrl
                      ? <Image
                          src={r.coverUrl}
                          alt={r.title}
                          fill
                          sizes="(max-width: 700px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      : <div className="blog-related-img-empty">R</div>
                    }
                    <span className="blog-related-tag">{r.tag}</span>
                  </div>
                  <div className="blog-related-info">
                    <h3 className="blog-related-name">{r.title}</h3>
                    {r.readTime && <span className="blog-related-time">{r.readTime} мин</span>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="blog-cta">
          <span className="blog-cta-eyebrow">— Готовы к проекту?</span>
          <h2 className="blog-cta-title">Обсудим ваш интерьер</h2>
          <p className="blog-cta-sub">Бесплатная консультация с руководителем студии.<br />Перезвоним в течение часа.</p>
          <Link href="/#contact" className="blog-cta-btn">Оставить заявку</Link>
        </div>
      </main>
    </>
  )
}
