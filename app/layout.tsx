import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { QueryProvider } from '@/lib/providers/query-provider'
import { TenantProvider } from '@/lib/tenant/context'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Discover - Stories, Galleries & Experiences',
    template: '%s | Discover',
  },
  description: 'Discover curated articles, stunning photo galleries, and unique experiences worth sharing.',
  keywords: ['articles', 'galleries', 'listings', 'experiences', 'curated content'],
  authors: [{ name: 'Discover Team' }],
  openGraph: {
    title: 'Discover - Stories, Galleries & Experiences',
    description: 'Discover curated articles, stunning photo galleries, and unique experiences worth sharing.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Suspense fallback={null}>
          <QueryProvider>
            <TenantProvider>
              {children}
            </TenantProvider>
          </QueryProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
