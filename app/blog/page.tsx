import Link from 'next/link'
import { client } from '../../sanity.client'
import { CustomCursor } from '../../components/ScrollSpyCursor'
import Header from '../../components/Header'

export const revalidate = 60

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

export default async function BlogIndex() {
  const posts = await getPosts()
  const tags = ['Все', ...Array.from(new Set(posts.map(p => p.tag).filter(Boolean)))]

  return (
    <>
      <CustomCursor />
      <Header />
      <main style={{ background: 'var(--bg)', minHeight: '100svh', paddingTop: 'calc(76px + 48px)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 clamp(20px,4vw,60px)' }}>

          {/* Шапка */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 16 }}>
              — Журнал ROMBO
            </span>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 300, letterSpacing: '-.025em', color: 'var(--ink)', marginBottom: 20, lineHeight: 1.05 }}>
              Статьи и идеи
            </h1>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', opacity: .55, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Делимся опытом, разбираем тренды, рассказываем о наших проектах.
            </p>
          </div>

          {/* Теги */}
          {tags.length > 2 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
              {tags.map(tag => (
                <span key={tag} style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink)', opacity: .5, padding: '6px 16px', border: '1px solid rgba(26,22,20,.15)', borderRadius: 2 }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Сетка */}
          {posts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32, marginBottom: 96 }}>
              {posts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <article style={{ cursor: 'pointer' }}>
                    <div style={{ aspectRatio: '16/10', overflow: 'hidden', borderRadius: 2, background: '#E8E4DE', marginBottom: 20 }}>
                      {p.coverUrl
                        ? <img src={`${p.coverUrl}?w=700&auto=format`} alt={p.title} className="blog-index-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'rgba(26,22,20,.15)' }}>R</span>
                          </div>
                      }
                      {p.tag && (
                        <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(244,237,224,.92)', fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--ink)', padding: '4px 10px', borderRadius: 2 }}>
                          {p.tag}
                        </div>
                      )}
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink)', opacity: .4, letterSpacing: '.05em', marginBottom: 10 }}>
                      {fmt(p.publishedAt)}{p.readTime ? ` · ${p.readTime} мин` : ''}
                    </div>
                    <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px,2vw,26px)', fontWeight: 300, color: 'var(--ink)', letterSpacing: '-.02em', lineHeight: 1.2, marginBottom: 12 }}>
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', opacity: .55, lineHeight: 1.65 }}>
                        {p.excerpt}
                      </p>
                    )}
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', marginTop: 16 }}>
                      Читать →
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', opacity: .4, padding: '80px 0' }}>
              Статьи скоро появятся
            </p>
          )}
        </div>
      </main>
    </>
  )
}
