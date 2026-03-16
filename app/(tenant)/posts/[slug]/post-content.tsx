'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Globe,
  MapPin,
  Images,
  Phone,
  Star,
  X,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { TypeBadge } from '@/components/ui/type-badge'
import { ListingCard } from '@/components/cards/listing-card'
import type { Article, Gallery, Listing, Post } from '@/types/post'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price)
}

function ListingDetail({ listing, similarPosts }: { listing: Listing; similarPosts: Listing[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const gallery = useMemo(() => listing.galleryImages?.length ? listing.galleryImages : [{ id: 'cover', url: listing.coverImage, alt: listing.title, width: 1200, height: 900 }], [listing])
  const activeImage = gallery[selectedImage] || gallery[0]
  const sideImages = gallery.slice(1)
  const sidePageSize = 3
  const [sidePage, setSidePage] = useState(0)
  const sidePageCount = Math.max(Math.ceil(sideImages.length / sidePageSize), 1)
  const visibleSideImages = sideImages.slice(sidePage * sidePageSize, sidePage * sidePageSize + sidePageSize)

  return (
    <div className="pb-16">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-4 -ml-3">
            <Link href="/listings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to listings
            </Link>
          </Button>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <div>
              <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="relative min-h-[380px] overflow-hidden rounded-[28px] bg-muted sm:min-h-[460px]">
                  <Image
                    src={activeImage.url}
                    alt={activeImage.alt || listing.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <TypeBadge type="listing" label={listing.category || 'Listing'} className="bg-white text-slate-950 hover:bg-white" />
                      {listing.rating ? (
                        <div className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{listing.rating}</span>
                          <span className="text-white/80">({listing.reviewCount} reviews)</span>
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-4 flex items-start gap-4">
                      {listing.logo ? (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/30 bg-white shadow-lg">
                          <Image src={listing.logo} alt={`${listing.title} logo`} fill className="object-cover" sizes="64px" />
                        </div>
                      ) : null}
                      <div>
                        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{listing.title}</h1>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/90">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(listing.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-[380px] flex-col gap-3 sm:min-h-[460px]">
                  {visibleSideImages.map((image) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImage(gallery.findIndex((entry) => entry.id === image.id))}
                      className="relative min-h-0 flex-1 overflow-hidden rounded-[22px] bg-muted text-left"
                    >
                      <Image src={image.url} alt={image.alt || listing.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 22vw" />
                      <div className="absolute inset-0 bg-black/20 transition hover:bg-black/5" />
                    </button>
                  ))}

                  {sideImages.length > sidePageSize ? (
                    <div className="mt-1 flex items-center justify-between rounded-2xl border border-border bg-card px-3 py-2">
                      <p className="text-xs text-muted-foreground">
                        {sidePage + 1} / {sidePageCount}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full px-3"
                          onClick={() => setSidePage((page) => Math.max(page - 1, 0))}
                          disabled={sidePage === 0}
                        >
                          Prev
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full px-3"
                          onClick={() => setSidePage((page) => Math.min(page + 1, sidePageCount - 1))}
                          disabled={sidePage >= sidePageCount - 1}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {gallery.length > 1 ? (
                <div className="mt-4 rounded-[24px] border border-border bg-card p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Photo gallery</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{gallery.length} photos</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setIsGalleryOpen(true)}
                      >
                        <Images className="mr-2 h-4 w-4" />
                        View all photos
                      </Button>
                    </div>
                  </div>
                  <Carousel opts={{ align: 'start', loop: gallery.length > 3, slidesToScroll: 3 }}>
                    <CarouselContent>
                      {gallery.map((image, index) => (
                        <CarouselItem key={image.id} className="basis-[85%] sm:basis-[48%] lg:basis-1/3">
                          <button
                            type="button"
                            onClick={() => setSelectedImage(index)}
                            className={`relative block aspect-[4/3] overflow-hidden rounded-2xl border ${selectedImage === index ? 'border-foreground' : 'border-transparent'}`}
                          >
                            <Image src={image.url} alt={image.alt || listing.title} fill className="object-cover" sizes="(max-width: 1024px) 40vw, 20vw" />
                          </button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-3 top-1/2 border-white/60 bg-white/90 text-slate-950" />
                    <CarouselNext className="right-3 top-1/2 border-white/60 bg-white/90 text-slate-950" />
                  </Carousel>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Scroll through the gallery. Three thumbnails are shown at a time.
                  </p>
                </div>
              ) : null}
            </div>

            <aside className="space-y-4">
              <div className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
                <p className="text-sm font-medium text-muted-foreground">Starting price</p>
                <p className="mt-2 text-4xl font-bold text-foreground">{formatPrice(listing.price, listing.currency)}</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{listing.description || listing.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {listing.highlights.slice(0, 6).map((highlight) => (
                    <Badge key={highlight} variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                      {highlight}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 grid gap-3">
                  {listing.website ? (
                    <a href={listing.website} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-sm font-medium hover:bg-muted/50">
                      <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> Visit website</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                  {listing.phone ? (
                    <div className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-medium">
                      <Phone className="h-4 w-4" />
                      <span>{listing.phone}</span>
                    </div>
                  ) : null}
                  {listing.address ? (
                    <div className="flex items-start gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-medium">
                      <MapPin className="mt-0.5 h-4 w-4" />
                      <span>{listing.address}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold">About this business</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {listing.description || listing.excerpt}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            <section className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Highlighted content</p>
                  <h2 className="mt-1 text-2xl font-bold">{listing.title}</h2>
                </div>
                <TypeBadge type="listing" label={listing.category || 'Listing'} className="rounded-full" />
              </div>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                {listing.description || listing.excerpt}
              </p>
            </section>

            {similarPosts.length > 0 ? (
              <section>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Similar in {listing.category || 'this category'}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Related listings from the same niche.</p>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                  {similarPosts.map((item, index) => (
                    <ListingCard key={item.id} listing={item} delay={index * 0.04} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <div className="space-y-6">
            <section className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Quick details</h2>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-4">
                  <span>Category</span>
                  <span className="font-medium text-foreground">{listing.category || 'Listing'}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Location</span>
                  <span className="font-medium text-foreground">{listing.location}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Price</span>
                  <span className="font-medium text-foreground">{formatPrice(listing.price, listing.currency)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Reviews</span>
                  <span className="font-medium text-foreground">{listing.reviewCount || 0}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {isGalleryOpen ? (
        <div className="fixed inset-0 z-[70] bg-black/85 p-4 backdrop-blur-sm">
          <div className="mx-auto flex h-full max-w-7xl flex-col">
            <div className="mb-4 flex items-center justify-between text-white">
              <div>
                <h2 className="text-2xl font-semibold">{listing.title} photos</h2>
                <p className="text-sm text-white/70">{gallery.length} images available</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-full"
                onClick={() => setIsGalleryOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close gallery</span>
              </Button>
            </div>

            <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="relative min-h-[320px] overflow-hidden rounded-[24px] bg-black">
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt || listing.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>

              <div className="min-h-0 overflow-y-auto rounded-[24px] border border-white/10 bg-white/5 p-3">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {gallery.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`relative block aspect-[4/3] overflow-hidden rounded-2xl border ${
                        selectedImage === index ? 'border-white' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || listing.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function PostContent({ post, similarPosts = [] }: { post: Post | null; similarPosts?: Listing[] }) {
  if (!post) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-2 text-muted-foreground">The post you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link href="/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to posts
          </Link>
        </Button>
      </div>
    )
  }

  if (post.type === 'listing') {
    return <ListingDetail listing={post as Listing} similarPosts={similarPosts} />
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-3">
        <Link href="/posts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to posts
        </Link>
      </Button>
      <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">Published {formatDate(post.createdAt)}</p>
      <p className="mt-8 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
      {post.type === 'article' ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <p className="whitespace-pre-line leading-8 text-foreground">{(post as Article).content}</p>
        </div>
      ) : null}
      {post.type === 'gallery' ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {(post as Gallery).images.map((image) => (
            <div key={image.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}
