'use client'

import { PostCard } from '@/components/cards/post-card'
import type { Post } from '@/types/post'

export default function FeaturedClient({ posts }: { posts: Post[] }) {
  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured</h1>
        <p className="mt-2 text-muted-foreground">Editor-picked stories and listings.</p>

        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">No featured posts yet</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} delay={index * 0.04} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
