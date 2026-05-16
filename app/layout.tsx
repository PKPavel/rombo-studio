import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rombo.pro'),
  title: {
    default: 'ROMBO — студия дизайна интерьеров в Санкт-Петербурге',
    template: '%s | ROMBO',
  },
  description: 'Авторский дизайн интерьеров под ключ — от концепции и 3D до авторского надзора. Квартиры, загородные дома, коммерческие объекты. Санкт-Петербург.',
  keywords: ['дизайн интерьера', 'дизайн квартиры', 'интерьер Санкт-Петербург', 'дизайн-проект', 'студия дизайна', 'ROMBO'],
  authors: [{ name: 'ROMBO Interior Design Studio' }],
  creator: 'ROMBO',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://rombo.pro',
    siteName: 'ROMBO',
    title: 'ROMBO — студия дизайна интерьеров в Санкт-Петербурге',
    description: 'Авторский дизайн интерьеров под ключ — от концепции и 3D до авторского надзора.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ROMBO — дизайн интерьеров' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROMBO — студия дизайна интерьеров',
    description: 'Авторский дизайн интерьеров под ключ в Санкт-Петербурге.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://rombo.pro' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'InteriorDesigner',
            name: 'ROMBO',
            description: 'Студия авторского дизайна интерьеров в Санкт-Петербурге',
            url: 'https://rombo.pro',
            telephone: '+79045581631',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Инструментальная ул., д. 8',
              addressLocality: 'Санкт-Петербург',
              addressCountry: 'RU',
            },
            priceRange: '₽₽₽',
            openingHours: 'Mo-Fr 10:00-19:00',
            sameAs: ['https://www.behance.net/rombo_studio'],
          })}}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
