import { legalMeta } from '@/lib/mock/site-content'

export default function TermsPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {legalMeta.termsUpdatedOn}</p>
        <div className="mt-8 space-y-4 text-sm text-muted-foreground">
          <p>By using Discover, you agree to provide accurate information and follow all applicable laws.</p>
          <p>Users are responsible for content they publish, including listing details, media, and pricing claims.</p>
          <p>We may remove content that violates policy, infringes rights, or creates safety risks.</p>
          <p>Paid experiences and booking terms are governed by the listing details shown at checkout.</p>
        </div>
      </div>
    </div>
  )
}

