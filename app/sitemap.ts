import { client } from '../sanity.client'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch<{ slug: string; _updatedAt: string }[]>(
    `*[_type == "project" && !disabled] { "slug": slug.current, _updatedAt }`
  ).catch(() => [])

  const projectUrls = projects.map(p => ({
    url: `https://rombo.pro/projects/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://rombo.pro', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://rombo.pro/projects', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...projectUrls,
  ]
}
