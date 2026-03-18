'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ListingCard } from '@/components/cards/listing-card'
import { useLatestListings } from '@/lib/hooks/use-posts'
import { useTenant } from '@/lib/tenant/context'
import type { Listing } from '@/types/post'

interface LatestListingsProps {
  listings?: Listing[]
}

export function LatestListings({ listings: initialListings }: LatestListingsProps) {
  const { latestListings } = useTenant()
  const shouldUseHook = !initialListings
  const { data, isLoading } = useLatestListings({
    enabled: shouldUseHook,
    initialData: initialListings,
  })

  const listings = initialListings || data || []

  if (shouldUseHook && isLoading) {
    return <LatestListingsSkeleton />
  }

  if (!listings || listings.length === 0) return null

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {latestListings.title}
            </h2>
            <p className="mt-1 text-muted-foreground">
              {latestListings.subtitle}
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/listings" className="gap-2">
              {latestListings.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="relative -mx-4 sm:mx-0">
          <div className="flex gap-4 overflow-x-auto px-4 pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {listings.map((listing, index) => (
              <div key={listing.id} className="w-[280px] shrink-0 snap-start sm:w-auto">
                <ListingCard listing={listing} priority={index < 4} delay={index * 0.05} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/listings" className="gap-2">
              {latestListings.ctaMobileLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function LatestListingsSkeleton() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="mt-2 h-5 w-80" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <Skeleton className="aspect-[4/3]" />
              <div className="p-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
                <div className="mt-3 flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
