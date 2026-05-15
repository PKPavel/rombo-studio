// app/projects/[slug]/page.tsx
import { client, urlFor } from '../../../sanity.client'
import { notFound } from 'next/navigation'
import ProjectPage from '../../../components/ProjectPage'

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id, num, title, "slug": slug.current,
    cat, area, city, year, description,
    "coverUrl": coverImage.asset->url,
    "imageUrls": images[].asset->url,
    palette,
    notes[] {
      text,
      "imageUrl": image.asset->url
    },
    pdfs[] {
      title,
      pages,
      tags,
      "url": file.asset->url,
      "size": file.asset->size
    }
  }
`

// Next.js 15+ — params это Promise
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params   // ← ключевой await

  let project: any = null
  try {
    project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })
  } catch (e) {
    console.error('Fetch error:', e)
  }

  if (!project) notFound()

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
    pages: p.pages || null,
    tags: p.tags || [],
    size: p.size || null,
    url: p.url || null,
  }))

  return (
    <ProjectPage project={{ ...project, coverUrl, imageUrls, notes, pdfs }} />
  )
}
