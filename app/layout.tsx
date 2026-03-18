import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { QueryProvider } from '@/lib/providers/query-provider'
import { TenantProvider } from '@/lib/tenant/context'
import { getSiteConfig } from '@/lib/tenant/config'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

const siteConfig = getSiteConfig()

export const metadata: Metadata = {
  title: {
    default: siteConfig.metadata.title,
    template: siteConfig.metadata.titleTemplate,
  },
  description: siteConfig.metadata.description,
  keywords: siteConfig.metadata.keywords,
  authors: siteConfig.metadata.authors.map((name) => ({ name })),
  openGraph: {
    title: siteConfig.metadata.ogTitle,
    description: siteConfig.metadata.ogDescription,
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
