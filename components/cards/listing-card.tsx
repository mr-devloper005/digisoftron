'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { TypeBadge } from '@/components/ui/type-badge'
import { AnimatedCard } from '@/components/ui/animated-card'
import type { Listing } from '@/types/post'
import { cn } from '@/lib/utils'

interface ListingCardProps {
  listing: Listing
  className?: string
  priority?: boolean
  delay?: number
}

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price)
}

export function ListingCard({ listing, className, priority = false, delay = 0 }: ListingCardProps) {
  return (
    <AnimatedCard delay={delay} className={className}>
      <Link href={`/posts/${listing.slug}`} className="block">
        <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={listing.coverImage}
              alt={listing.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
            <div className="absolute left-3 top-3">
              <TypeBadge type="listing" label={listing.category || 'Listing'} />
            </div>
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-background/95 px-2.5 py-1 text-sm font-semibold text-foreground backdrop-blur-sm hover:bg-background">
                {formatPrice(listing.price, listing.currency)}
              </Badge>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start gap-3">
              {listing.logo ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
                  <Image src={listing.logo} alt={`${listing.title} logo`} fill className="object-cover" sizes="48px" />
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 text-base font-semibold text-card-foreground transition-colors group-hover:text-foreground">
                  {listing.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {listing.description || listing.excerpt}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span className="line-clamp-1">{listing.location}</span>
              </div>
              {listing.rating ? (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-card-foreground">{listing.rating}</span>
                  <span className="text-muted-foreground">({listing.reviewCount})</span>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {listing.highlights.slice(0, 3).map((highlight) => (
                <Badge key={highlight} variant="secondary" className="text-xs font-normal">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </AnimatedCard>
  )
}
