// app/projects/[slug]/page.tsx
import { client } from '../../../sanity.client'
import { notFound } from 'next/navigation'
import ProjectPage from '../../../components/ProjectPage'

export const revalidate = 60 // ISR — обновление каждые 60 сек

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

// Авто-подсчёт страниц PDF без внешних библиотек:
// читаем первые 200 КБ файла и ищем /Count N — это поле Pages-словаря в PDF
async function extractPdfPages(url: string): Promise<number | null> {
  try {
    const res = await fetch(url, {
      headers: { Range: 'bytes=0-204799' }, // первые 200 КБ
    })
    const buffer = await res.arrayBuffer()
    const text = Buffer.from(buffer).toString('latin1')

    // /Count <число> — количество страниц в дереве страниц PDF
    const matches = [...text.matchAll(/\/Count\s+(\d+)/g)]
    if (!matches.length) return null

    // Берём максимальное значение — это корневой Pages-объект
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
    <ProjectPage project={{ ...project, coverUrl, imageUrls, notes, pdfs }} />
  )
}
