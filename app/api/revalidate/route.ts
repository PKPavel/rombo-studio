// app/api/revalidate/route.ts
// Sanity вызывает этот endpoint при публикации → Vercel перегенерирует страницы

import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const docType = body?._type
    const slug: string | undefined = body?.slug?.current ?? body?.slug

    const revalidated: string[] = []
    const touch = (path: string, type: 'page' | 'layout' = 'page') => {
      revalidatePath(path, type)
      revalidated.push(path)
    }

    // Главную обновляем всегда (на ней витрина проектов)
    touch('/')

    if (docType === 'post') {
      touch('/blog')
      touch('/blog/[slug]', 'page')
      if (slug) touch(`/blog/${slug}`)
    } else if (docType === 'project') {
      touch('/projects')
      touch('/projects/[slug]', 'page')
      if (slug) touch(`/projects/${slug}`)
    }
    // Прочие типы документов не имеют публичных страниц — ограничиваемся главной

    console.log(`Revalidated for doc type: ${docType}`, revalidated)

    return NextResponse.json({
      revalidated: true,
      type: docType,
      paths: revalidated,
      timestamp: new Date().toISOString(),
    })
  } catch (e) {
    return NextResponse.json({ message: 'Error revalidating', error: String(e) }, { status: 500 })
  }
}
