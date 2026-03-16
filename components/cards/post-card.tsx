'use client'

import type { Post } from '@/types/post'
import { ArticleCard } from './article-card'
import { GalleryCard } from './gallery-card'
import { ListingCard } from './listing-card'

interface PostCardProps {
  post: Post
  className?: string
  priority?: boolean
  delay?: number
}

export function PostCard({ post, className, priority = false, delay = 0 }: PostCardProps) {
  switch (post.type) {
    case 'article':
      return <ArticleCard article={post} className={className} priority={priority} delay={delay} />
    case 'gallery':
      return <GalleryCard gallery={post} className={className} priority={priority} delay={delay} />
    case 'listing':
      return <ListingCard listing={post} className={className} priority={priority} delay={delay} />
    default:
      return null
  }
}
