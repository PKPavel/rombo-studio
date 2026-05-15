// app/projects/[slug]/page.tsx
import { client, urlFor } from '../../../sanity.client'
import { notFound } from 'next/navigation'
import ProjectPage from '../../../components/ProjectPage'

const PROJECT_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id, num, title, "slug": slug.current,
    cat, area, city, year, description,
    coverImage, images, palette, notes, pdfs, featured
  }
`

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await client.fetch(PROJECT_QUERY, { slug: params.slug })
  if (!project) notFound()

  const coverUrl = project.coverImage
    ? urlFor(project.coverImage).width(1600).height(900).fit('crop').auto('format').url()
    : null

  const imageUrls = (project.images || []).map((img: any) =>
    urlFor(img).width(1200).height(900).fit('crop').auto('format').url()
  )

  const notes = (project.notes || []).map((n: any) => ({
    text: n.text,
    imageUrl: n.image ? urlFor(n.image).width(1200).auto('format').url() : null,
  }))

  const pdfs = (project.pdfs || []).map((p: any) => ({
    title: p.title,
    description: p.description,
    url: p.file?.asset?.url || null,
  }))

  return (
    <ProjectPage
      project={{ ...project, coverUrl, imageUrls, notes, pdfs }}
    />
  )
}
