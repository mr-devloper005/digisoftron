import { getSiteConfig } from '@/lib/tenant/config'

export default function AccessibilityPage() {
  const { brand } = getSiteConfig()
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Accessibility</h1>
        <p className="mt-3 text-muted-foreground">
          We are committed to making {brand.name} usable for everyone.
        </p>
        <div className="mt-8 space-y-4 text-sm text-muted-foreground">
          <p>Core navigation supports keyboard use, visible focus states, and semantic landmarks.</p>
          <p>Images include descriptive alt text, and critical actions are reachable on desktop and mobile.</p>
          <p>We continuously test for color contrast, readability, and assistive technology compatibility.</p>
          <p>If you encounter accessibility barriers, contact us through the support page for immediate help.</p>
        </div>
      </div>
    </div>
  )
}
