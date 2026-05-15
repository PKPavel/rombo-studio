// app/projects/[slug]/page.tsx
import { client, urlFor } from '../../../sanity.client'
import ProjectPage from '../../../components/ProjectPage'

const PROJECT_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id, num, title, "slug": slug.current,
    cat, area, city, year, description, featured,
    coverImage, images, palette,
    notes[] { text, image },
    pdfs[] { title, description, "url": file.asset->url }
  }
`

// Все slugs — для дебага
const ALL_SLUGS_QUERY = `*[_type == "project"]{ "slug": slug.current, title }`

export default async function Page({ params }: { params: { slug: string } }) {
  let project: any = null

  try {
    project = await client.fetch(PROJECT_QUERY, { slug: params.slug })
  } catch (e) {
    console.error('Fetch error:', e)
  }

  // Проект не найден — показываем список доступных
  if (!project) {
    let available: any[] = []
    try { available = await client.fetch(ALL_SLUGS_QUERY) } catch {}

    return (
      <div style={{ padding: '120px 60px', fontFamily: 'Inter Tight, sans-serif' }}>
        <h1>Проект не найден: <code>{params.slug}</code></h1>
        <p style={{ opacity: .6, marginTop: 16 }}>Доступные проекты в Sanity:</p>
        <ul style={{ marginTop: 12 }}>
          {available.map((p: any) => (
            <li key={p.slug} style={{ marginBottom: 8 }}>
              <a href={`/projects/${p.slug}`} style={{ color: '#C8593F' }}>
                /projects/{p.slug}
              </a>
              {' — '}{p.title}
            </li>
          ))}
          {available.length === 0 && <li>Нет опубликованных проектов</li>}
        </ul>
      </div>
    )
  }

  const coverUrl = project.coverImage
    ? urlFor(project.coverImage).width(1600).height(900).fit('crop').auto('format').url()
    : null

  const imageUrls: string[] = (project.images || []).map((img: any) =>
    urlFor(img).width(1200).height(900).fit('crop').auto('format').url()
  )

  const notes = (project.notes || []).map((n: any) => ({
    text: n.text || '',
    imageUrl: n.image ? urlFor(n.image).width(1200).auto('format').url() : null,
  }))

  const pdfs = (project.pdfs || []).map((p: any) => ({
    title: p.title || 'Документ',
    description: p.description || '',
    url: p.url || null,
  }))

  return (
    <ProjectPage project={{ ...project, coverUrl, imageUrls, notes, pdfs }} />
  )
}
