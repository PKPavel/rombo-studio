import type { Metadata } from 'next'
import Script from 'next/script'
import { jsonLd } from '../lib/json-ld'
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

  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROMBO — студия дизайна интерьеров',
    description: 'Авторский дизайн интерьеров под ключ в Санкт-Петербурге.',

  },
  alternates: { canonical: 'https://rombo.pro' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd({
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
            openingHours: 'Mo-Fr 10:00-20:00',
            sameAs: [
              'https://www.instagram.com/rombo_interior.design.studio',
            ],
          })}}
        />
      </head>
      <body>
        {children}
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
          ym(109246149,'init',{
            webvisor:true,
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true
          });
        `}</Script>
        <noscript>
          <div><img src="https://mc.yandex.ru/watch/109246149" style={{position:'absolute',left:'-9999px'}} alt="" /></div>
        </noscript>
      </body>
    </html>
  )
}
