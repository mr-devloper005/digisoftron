import { pressUpdates } from '@/lib/mock/site-content'

function formatDate(input: string) {
  return new Date(input).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function PressPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Press</h1>
        <p className="mt-3 text-muted-foreground">Latest company announcements and milestones.</p>

        <div className="mt-8 space-y-4">
          {pressUpdates.map((item) => (
            <article key={item.title} className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{formatDate(item.date)} | {item.source}</p>
              <h2 className="mt-1 text-xl font-semibold">{item.title}</h2>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

