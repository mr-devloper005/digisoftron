'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Images } from 'lucide-react'
import { TypeBadge } from '@/components/ui/type-badge'
import { AnimatedCard } from '@/components/ui/animated-card'
import type { Gallery } from '@/types/post'
import { cn } from '@/lib/utils'

interface GalleryCardProps {
  gallery: Gallery
  className?: string
  priority?: boolean
  delay?: number
}

export function GalleryCard({ gallery, className, priority = false, delay = 0 }: GalleryCardProps) {
  return (
    <AnimatedCard delay={delay} className={className}>
      <Link href={`/posts/${gallery.slug}`} className="block">
        <article className="relative overflow-hidden rounded-xl">
          {/* Cover Image - Pinterest style with varying heights */}
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={gallery.coverImage}
              alt={gallery.title}
              width={400}
              height={500}
              priority={priority}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Badge */}
            <div className="absolute left-3 top-3">
              <TypeBadge type="gallery" />
            </div>s

            {/* Image count */}
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
              <Images className="h-3 w-3" />
              <span>{gallery.images.length}</span>
            </div>

            {/* Content - appears on hover */}
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="line-clamp-2 text-base font-semibold text-white">
                {gallery.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-white/80">
                {gallery.excerpt}
              </p>
            </div>
          </div>
        </article>
      </Link>
    </AnimatedCard>
  )
}
