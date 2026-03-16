import { legalMeta } from '@/lib/mock/site-content'

export default function CookiesPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Cookie Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {legalMeta.cookiesUpdatedOn}</p>
        <div className="mt-8 space-y-4 text-sm text-muted-foreground">
          <p>Essential cookies keep login sessions active and protect account security.</p>
          <p>Analytics cookies help us understand usage patterns and improve search and feed quality.</p>
          <p>Preference cookies remember settings such as display choices and language preferences.</p>
          <p>You can control cookies in your browser settings at any time.</p>
        </div>
      </div>
    </div>
  )
}

