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

    // Перегенерируем главную (архив) и все страницы проектов
    revalidatePath('/', 'page')
    revalidatePath('/projects/[slug]', 'page')

    console.log(`Revalidated for doc type: ${docType}`)

    return NextResponse.json({
      revalidated: true,
      type: docType,
      timestamp: new Date().toISOString(),
    })
  } catch (e) {
    return NextResponse.json({ message: 'Error revalidating', error: String(e) }, { status: 500 })
  }
}
