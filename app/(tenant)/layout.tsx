import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SiteRuntimeBeacon } from '@/components/runtime/site-runtime-beacon'

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteRuntimeBeacon />
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className="flex-1">
        {children}
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
