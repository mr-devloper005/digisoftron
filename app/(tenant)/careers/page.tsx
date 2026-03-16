import Link from 'next/link'
import { careerOpenings } from '@/lib/mock/site-content'

export default function CareersPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Careers</h1>
        <p className="mt-3 text-muted-foreground">
          Join our team building trusted discovery experiences for creators and readers.
        </p>

        <div className="mt-8 space-y-4">
          {careerOpenings.map((opening) => (
            <article key={opening.title} className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-xl font-semibold">{opening.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {opening.location} | {opening.type}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{opening.summary}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Don&apos;t see your role? Reach us at{' '}
          <Link href="/contact?subject=Career%20application" className="underline">
            our contact page
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

