// app/projects/[slug]/page.tsx
import { client } from '../../../sanity.client'
import { notFound } from 'next/navigation'
import ProjectPage from '../../../components/ProjectPage'

export const revalidate = 60 // ISR — обновление каждые 60 сек

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: any = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      title, city, area, year, description,
      "coverUrl": coverImage.asset->url
    }`,
    { slug }
  ).catch(() => null)

  if (!p) return { title: 'Проект не найден' }

  const title = `${p.title}${p.city ? ' · ' + p.city : ''}${p.area ? ' · ' + p.area + ' м²' : ''}`
  const description = p.description || `Дизайн-проект ${p.title}. Студия ROMBO, Санкт-Петербург.`
  const images = p.coverUrl ? [{ url: p.coverUrl + '?w=1200&auto=format', width: 1200, height: 630 }] : []

  return {
    title,
    description,
    openGraph: { title, description, images, type: 'article' },
    twitter: { card: 'summary_large_image', title, description, images: images.map(i => i.url) },
    alternates: { canonical: `https://rombo.pro/projects/${slug}` },
  }
}

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id, num, title, "slug": slug.current,
    cat, area, city, year, description,
    "coverUrl": coverImage.asset->url,
    "imageUrls": images[].asset->url,
    palette,
    // Собираем палитру с обложки + первых фото галереи для разнообразия цветов
    "autoPalette": [
      coverImage.asset->metadata.palette.dominant.background,
      coverImage.asset->metadata.palette.vibrant.background,
      images[0].asset->metadata.palette.dominant.background,
      images[0].asset->metadata.palette.vibrant.background,
      images[1].asset->metadata.palette.dominant.background,
      images[2].asset->metadata.palette.vibrant.background,
    ],
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

// Авто-подсчёт страниц PDF: читаем первый мегабайт, ищем /Count N
async function extractPdfPages(url: string): Promise<number | null> {
  try {
    // Пробуем Range-запрос (экономит трафик)
    const res = await fetch(url, {
      headers: { Range: 'bytes=0-1048575' }, // первый МБ
    })
    const buffer = await res.arrayBuffer()
    const text = Buffer.from(buffer).toString('latin1')

    // /Count N — суммарное количество страниц в Pages-дереве PDF
    const matches = [...text.matchAll(/\/Count\s+(\d+)/g)]
    if (!matches.length) return null

    const counts = matches.map(m => parseInt(m[1]))
    return Math.max(...counts)
  } catch {
    return null
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let project: any = null
  try {
    project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })
  } catch (e) {
    console.error('Fetch error:', e)
  }

  if (!project) notFound()

  // GROQ уже вернул готовые URL — project.coverImage/images нет в проекции
  const coverUrl: string | null = project.coverUrl || null
  const imageUrls: string[] = project.imageUrls || []

  // Палитра: 1) ручная из Studio 2) авто из Sanity (обложка + галерея) 3) ColorThief
  const sanityAutoPalette: string[] = [...new Set(
    (project.autoPalette || []).filter(Boolean) as string[]
  )].slice(0, 6)
  const palette: string[] | undefined =
    (project.palette?.length > 0) ? project.palette :
    (sanityAutoPalette.length > 0) ? sanityAutoPalette :
    undefined

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notes = (project.notes || []).map((n: any) => ({
    text: n.text || '',
    imageUrl: n.imageUrl || null,
  }))

  // Для каждого PDF: берём pages из Sanity, иначе — авто-извлекаем из файла
  const pdfs = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (project.pdfs || []).map(async (p: any) => {
      const url = p.url || null
      const pagesFromSanity: number | null = p.pages || null
      const pagesAuto = (!pagesFromSanity && url) ? await extractPdfPages(url) : null

      return {
        title: p.title || 'Документ',
        pages: pagesFromSanity ?? pagesAuto,
        tags: p.tags || [],
        size: p.size || null,
        url,
      }
    })
  )

  return (
    <ProjectPage project={{ ...project, coverUrl, imageUrls, notes, pdfs, palette }} />
  )
}
