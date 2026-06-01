import Link from 'next/link'
import Image from 'next/image'
import { client } from '../sanity.client'
import sanityImageLoader from '../lib/sanity-image-loader'

export const revalidate = 60

interface Post {
  slug: string
  title: string
  publishedAt: string | null
  excerpt: string | null
  tag: string | null
  coverUrl: string | null
  readTime: number | null
}

async function getPosts(): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) [0...6] {
      "slug": slug.current,
      title,
      publishedAt,
      excerpt,
      "tag": coalesce(tag, "Статья"),
      "coverUrl": coverImage.asset->url,
      readTime
    }
  `).catch(() => [])
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function Blog() {
  const posts = await getPosts()
  const hasPosts = posts.length > 0

  return (
    <section id="blog" className="blog">
      <div className="container">
        <div className="blog-header reveal">
          <span className="blog-eyebrow">— Журнал ROMBO</span>
          <h2 className="blog-h2">Статьи и идеи</h2>
          <p className="blog-lead">
            Делимся опытом, разбираем тренды, рассказываем о наших проектах.
            Полезные материалы для тех, кто планирует ремонт или просто любит интерьерный дизайн.
          </p>
        </div>

        {hasPosts ? (
          <div className="blog-grid reveal">
            {posts.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-tile">
                <div className="blog-tile-img">
                  {p.coverUrl
                    ? <Image
                        loader={sanityImageLoader}
                        src={p.coverUrl}
                        alt={p.title}
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    : <div style={{ background: '#E8E4DE', width: '100%', height: '100%' }} />
                  }
                  {p.tag && <span className="blog-tile-tag">{p.tag}</span>}
                </div>
                <div className="blog-tile-meta">
                  <span className="blog-tile-info">
                    {formatDate(p.publishedAt)}{p.readTime ? ` · ${p.readTime} мин чтения` : ''}
                  </span>
                  <h3 className="blog-tile-title">{p.title}</h3>
                  {p.excerpt && <p className="blog-tile-excerpt">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="blog-empty reveal">
            <p>Первые статьи появятся совсем скоро — следите за обновлениями.</p>
          </div>
        )}
      </div>
    </section>
  )
}
