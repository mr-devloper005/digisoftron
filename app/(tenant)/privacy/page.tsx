import { legalMeta } from '@/lib/mock/site-content'

export default function PrivacyPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {legalMeta.privacyUpdatedOn}</p>
        <div className="mt-8 space-y-4 text-sm text-muted-foreground">
          <p>We collect account details, profile information, and usage events to operate the platform.</p>
          <p>Personal data is used for authentication, security checks, support requests, and product improvement.</p>
          <p>We do not sell personal data. Trusted vendors process limited data under contractual safeguards.</p>
          <p>You can request account deletion or data export through the contact page.</p>
        </div>
      </div>
    </div>
  )
}

