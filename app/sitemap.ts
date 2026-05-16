import { client } from '../sanity.client'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([
    client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "project" && !disabled] { "slug": slug.current, _updatedAt }`
    ).catch(() => []),
    client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "post"] { "slug": slug.current, _updatedAt }`
    ).catch(() => []),
  ])

  const projectUrls = projects.map(p => ({
    url: `https://rombo.pro/projects/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const postUrls = posts.map(p => ({
    url: `https://rombo.pro/blog/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    { url: 'https://rombo.pro', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://rombo.pro/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://rombo.pro/projects', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...projectUrls,
    ...postUrls,
  ]
}
