'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TypeBadge } from '@/components/ui/type-badge'
import { AnimatedCard } from '@/components/ui/animated-card'
import type { Article } from '@/types/post'
import { cn } from '@/lib/utils'

interface ArticleCardProps {
  article: Article
  className?: string
  priority?: boolean
  delay?: number
}

export function ArticleCard({ article, className, priority = false, delay = 0 }: ArticleCardProps) {
  return (
    <AnimatedCard delay={delay} className={className}>
      <Link href={`/posts/${article.slug}`} className="block">
        <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
          {/* Cover Image */}
          <div className="relative overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute left-3 top-3">
              <TypeBadge type="article" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-card-foreground transition-colors group-hover:text-foreground">
              {article.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={article.author.avatar} alt={article.author.name} />
                  <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-card-foreground">
                  {article.author.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </AnimatedCard>
  )
}
