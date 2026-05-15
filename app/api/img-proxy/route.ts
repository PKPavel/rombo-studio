// app/api/img-proxy/route.ts
// Прокси для изображений Sanity — обходит CORS при canvas.getImageData в ColorThief

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse('Missing url', { status: 400 })

  // Разрешаем только Sanity CDN
  if (!url.startsWith('https://cdn.sanity.io/')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  try {
    const sanityUrl = new URL(url)
    sanityUrl.searchParams.set('w', '400')
    sanityUrl.searchParams.set('auto', 'format')

    const res = await fetch(sanityUrl.toString(), { next: { revalidate: 86400 } })
    if (!res.ok) return new NextResponse('Fetch failed', { status: 502 })

    const blob = await res.blob()
    const contentType = res.headers.get('content-type') || 'image/jpeg'

    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return new NextResponse('Error', { status: 500 })
  }
}
