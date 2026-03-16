import Link from 'next/link'
import { helpFaq } from '@/lib/mock/site-content'

export default function HelpPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Help Center</h1>
        <p className="mt-3 text-muted-foreground">Frequently asked questions and account support.</p>

        <div className="mt-8 space-y-4">
          {helpFaq.map((item) => (
            <article key={item.question} className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-semibold">{item.question}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Still need help? <Link href="/contact?subject=Support%20request" className="underline">Contact support</Link>.
        </p>
      </div>
    </div>
  )
}

