// sanity.client.ts — в корне проекта
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g0p8o4k2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ запрос — все проекты для архива
export const PROJECTS_QUERY = `
  *[_type == "project"] | order(num asc) {
    _id,
    num,
    title,
    "slug": slug.current,
    cat,
    area,
    city,
    year,
    featured,
    disabled,
    coverImage,
    description
  }
`
