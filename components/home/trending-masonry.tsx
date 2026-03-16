'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PostCard } from '@/components/cards/post-card'
import { useTrendingPosts } from '@/lib/hooks/use-posts'
import type { Post } from '@/types/post'

interface TrendingMasonryProps {
  posts?: Post[]
}

export function TrendingMasonry({ posts: initialPosts }: TrendingMasonryProps) {
  const shouldUseHook = !initialPosts
  const { data, isLoading } = useTrendingPosts({
    enabled: shouldUseHook,
    initialData: initialPosts ? { posts: initialPosts } : undefined,
  })

  const posts = initialPosts || data?.posts || []

  if (shouldUseHook && isLoading) {
    return <TrendingMasonrySkeleton />
  }

  if (posts.length === 0) return null

  return (
    <section className="bg-muted/30 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Recently active listings
            </h2>
            <p className="mt-1 text-muted-foreground">
              The latest business pages and offers getting attention.
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/trending" className="gap-2">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {posts.map((post, index) => (
            <div key={post.id} className="mb-4 break-inside-avoid">
              <PostCard post={post} priority={index < 4} delay={index * 0.03} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/trending" className="gap-2">
              Explore more listings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function TrendingMasonrySkeleton() {
  return (
    <section className="bg-muted/30 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="mt-2 h-5 w-72" />
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {[200, 300, 250, 280, 220, 260, 240, 270].map((height, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <Skeleton className="rounded-xl" style={{ height: `${height}px` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
