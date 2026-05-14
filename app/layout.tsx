import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ROMBO — дизайн интерьеров',
  description: 'Студия авторского дизайна интерьеров в Санкт-Петербурге',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}