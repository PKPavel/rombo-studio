// Archive.tsx — ISR: данные обновляются каждые 60 сек без пересборки
import { client, urlFor, PROJECTS_QUERY } from '../sanity.client'
import ArchiveClient from './ArchiveClient'

export const revalidate = 60

export type SanityProject = {
  _id: string
  num: string
  title: string
  slug: string
  cat: 'Квартира' | 'Загородный дом' | 'Коммерческий'
  area?: number
  city?: string
  year?: number
  featured?: boolean
  disabled?: boolean
  coverImage?: any
  description?: string
}

export default async function Archive() {
  let projects: SanityProject[] = []

  try {
    projects = await client.fetch(PROJECTS_QUERY)
  } catch (e) {
    console.error('Sanity fetch error:', e)
  }

  const projectsWithImages = projects.map(p => ({
    ...p,
    coverUrl: p.coverImage
      ? urlFor(p.coverImage).width(800).height(600).fit('crop').auto('format').url()
      : null,
  }))

  return <ArchiveClient projects={projectsWithImages} />
}
