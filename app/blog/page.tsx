import Link from 'next/link'
import { client } from '../../sanity.client'
import { CustomCursor } from '../../components/ScrollSpyCursor'
import Header from '../../components/Header'

export const dynamic = 'force-dynamic'

interface Post {
  slug: string; title: string; publishedAt: string | null
  excerpt: string | null; tag: string | null
  coverUrl: string | null; readTime: number | null
}

async function getPosts(): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current, title, publishedAt, excerpt,
      "tag": coalesce(tag, "Статья"),
      "coverUrl": coverImage.asset->url, readTime
    }
  `).catch(() => [])
}

function fmt(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const metadata = {
  title: 'Журнал ROMBO — дизайн интерьеров, тренды, советы',
  description: 'Полезные статьи о дизайне интерьеров, ремонте и трендах от студии ROMBO.',
  alternates: { canonical: 'https://rombo.pro/blog' },
}

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag: activeTag } = await searchParams
  const allPosts = await getPosts()
  const tags = ['Все', ...Array.from(new Set(allPosts.map(p => p.tag).filter(Boolean) as string[]))]
  const posts = activeTag && activeTag !== 'Все'
    ? allPosts.filter(p => p.tag === activeTag)
    : allPosts

  return (
    <>
      <CustomCursor />
      <Header />
      <main style={{ background: 'var(--bg)', minHeight: '100svh', paddingTop: 'calc(76px + 48px)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 clamp(20px,4vw,60px)' }}>

          {/* Шапка */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 16 }}>— Журнал ROMBO</span>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 300, letterSpacing: '-.025em', color: 'var(--ink)', marginBottom: 20, lineHeight: 1.05 }}>Статьи и идеи</h1>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', opacity: .5, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Делимся опытом, разбираем тренды, рассказываем о наших проектах.</p>
          </div>

          {/* Теги — кликабельные фильтры */}
          {tags.length > 2 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}>
              {tags.map(tag => {
                const isActive = (tag === 'Все' && !activeTag) || tag === activeTag
                return (
                  <Link
                    key={tag}
                    href={tag === 'Все' ? '/blog' : `/blog?tag=${encodeURIComponent(tag)}`}
                    style={{
                      fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.08em',
                      textTransform: 'uppercase', textDecoration: 'none',
                      padding: '7px 18px', borderRadius: 100,
                      border: `1px solid ${isActive ? 'var(--ink)' : 'rgba(26,22,20,.18)'}`,
                      background: isActive ? 'var(--ink)' : 'transparent',
                      color: isActive ? 'var(--on-dark)' : 'var(--ink)',
                      opacity: isActive ? 1 : 0.6,
                      transition: 'all .2s',
                    }}
                  >
                    {tag}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Счётчик */}
          {activeTag && activeTag !== 'Все' && (
            <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', opacity: .4, textAlign: 'center', marginBottom: 32, letterSpacing: '.04em' }}>
              {posts.length} {posts.length === 1 ? 'статья' : posts.length < 5 ? 'статьи' : 'статей'} по теме «{activeTag}»
            </p>
          )}

          {/* Сетка */}
          {posts.length > 0 ? (
            <div className="blog-index-grid" style={{ marginBottom: 96 }}>
              {posts.map((p, i) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-index-card">
                  <div className="blog-index-img-wrap">
                    {p.coverUrl
                      ? <img src={`${p.coverUrl}?w=500&auto=format&q=80&q=80`} alt={p.title} className="blog-index-img" />
                      : <div className="blog-index-img-empty">R</div>
                    }
                    {p.tag && <span className="blog-index-tag">{p.tag}</span>}
                    {i === 0 && !activeTag && <span className="blog-index-new">Новое</span>}
                  </div>
                  <div className="blog-index-info">
                    <div className="blog-index-meta">
                      {fmt(p.publishedAt)}{p.readTime ? ` · ${p.readTime} мин` : ''}
                    </div>
                    <h2 className="blog-index-title">{p.title}</h2>
                    {p.excerpt && <p className="blog-index-excerpt">{p.excerpt}</p>}
                    <span className="blog-index-read">Читать →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', opacity: .4, padding: '80px 0' }}>
              Статей по этой теме пока нет
            </p>
          )}
        </div>
      </main>
    </>
  )
}
