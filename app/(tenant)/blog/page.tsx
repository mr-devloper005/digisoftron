import Link from 'next/link'
import { blogPosts } from '@/lib/mock/site-content'

function formatDate(input: string) {
  return new Date(input).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-3 text-muted-foreground">Product, quality, and creator growth insights.</p>

        <div className="mt-8 space-y-4">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
              <h2 className="mt-1 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <Link href={`/contact?subject=${encodeURIComponent(`Blog request: ${post.title}`)}`} className="mt-3 inline-block text-sm underline">
                Request full story
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

