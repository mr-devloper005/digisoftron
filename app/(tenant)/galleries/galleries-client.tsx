'use client'

import { GalleryCard } from '@/components/cards/gallery-card'
import type { Gallery } from '@/types/post'

export default function GalleriesClient({ galleries }: { galleries: Gallery[] }) {
  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Galleries
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Stunning visual collections from photographers and artists
          </p>
        </div>

        {galleries.length > 0 ? (
          <div className="columns-2 gap-4 lg:columns-3 xl:columns-4">
            {galleries.map((gallery, index) => (
              <div key={gallery.id} className="mb-4 break-inside-avoid">
                <GalleryCard
                  gallery={gallery}
                  delay={index * 0.03}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">No galleries found</p>
          </div>
        )}
      </div>
    </div>
  )
}
