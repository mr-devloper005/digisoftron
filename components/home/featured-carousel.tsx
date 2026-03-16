'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TypeBadge } from '@/components/ui/type-badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useFeaturedPosts } from '@/lib/hooks/use-posts'
import type { Post } from '@/types/post'
import { cn } from '@/lib/utils'

interface FeaturedCarouselProps {
  posts?: Post[]
}

export function FeaturedCarousel({ posts: initialPosts }: FeaturedCarouselProps) {
  const shouldUseHook = !initialPosts
  const { data, isLoading } = useFeaturedPosts({
    enabled: shouldUseHook,
    initialData: initialPosts ? { posts: initialPosts } : undefined,
  })
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const posts = useMemo(() => initialPosts || data?.posts || [], [initialPosts, data])

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  if (shouldUseHook && isLoading) {
    return <FeaturedCarouselSkeleton />
  }

  if (posts.length === 0) return null

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured listings
            </h2>
            <p className="mt-1 text-muted-foreground">
              Priority placements and standout business profiles.
            </p>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {posts.map((post, index) => (
              <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                <Link href={`/posts/${post.slug}`} className="block">
                  <motion.article
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative aspect-[16/10] overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      priority={index < 2}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <TypeBadge type={post.type} className="mb-3 w-fit" />

                      <h3 className="line-clamp-2 text-xl font-semibold text-white sm:text-2xl">
                        {post.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm text-white/80">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <Avatar className="h-8 w-8 border-2 border-white/20">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium text-white">{post.author.name}</p>
                          <p className="text-white/60">{post.author.role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 hidden lg:flex" />
          <CarouselNext className="right-4 hidden lg:flex" />
        </Carousel>

        <div className="mt-6 flex justify-center gap-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                current === index ? 'w-8 bg-foreground' : 'w-2 bg-foreground/20 hover:bg-foreground/40'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCarouselSkeleton() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="mt-2 h-5 w-72" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[0, 1].map((i) => (
            <Skeleton key={i} className="aspect-[16/10] w-full shrink-0 rounded-2xl md:w-1/2" />
          ))}
        </div>
      </div>
    </section>
  )
}
