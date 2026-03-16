'use client'

import { useMemo, useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/cards/post-card'
import type { Post, PostType } from '@/types/post'
import { cn } from '@/lib/utils'

const filters: { value: PostType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'article', label: 'Articles' },
  { value: 'gallery', label: 'Galleries' },
  { value: 'listing', label: 'Listings' },
]

export default function PostsClient({ posts }: { posts: Post[] }) {
  const [activeFilter, setActiveFilter] = useState<PostType | 'all'>('all')

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      activeFilter === 'all' || post.type === activeFilter
    )
  }, [posts, activeFilter])

  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            All Posts
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Browse our collection of articles, galleries, and listings
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                activeFilter === filter.value && 'pointer-events-none'
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">No posts found</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                delay={index * 0.03}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
