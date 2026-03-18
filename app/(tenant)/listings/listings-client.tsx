'use client'

import { ListingCard } from '@/components/cards/listing-card'
import { useTenant } from '@/lib/tenant/context'
import type { Listing } from '@/types/post'

export default function ListingsClient({ listings }: { listings: Listing[] }) {
  const { listings: listingsConfig } = useTenant()
  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {listingsConfig.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {listingsConfig.subtitle}
          </p>
        </div>

        {listings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing, index) => (
              <ListingCard key={listing.id} listing={listing} delay={index * 0.03} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">{listingsConfig.emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
