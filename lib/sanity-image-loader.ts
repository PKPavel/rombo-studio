// Custom next/image loader для Sanity CDN.
// Возвращает прямой URL cdn.sanity.io с параметрами w/q/auto=format,
// чтобы responsive srcSet шёл напрямую с CDN, минуя /_next/image.

export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  // src приходит как полный URL (cdn.sanity.io/...). Убираем существующие
  // параметры, чтобы не было дублей w=/q=.
  const [base] = src.split('?')
  const params = new URLSearchParams()
  params.set('w', String(width))
  params.set('q', String(quality ?? 75))
  params.set('auto', 'format')
  return `${base}?${params.toString()}`
}
