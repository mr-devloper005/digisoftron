'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { PostCard } from '@/components/cards/post-card'
import { useSearch } from '@/lib/hooks/use-posts'

function SearchResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const trimmedQuery = useMemo(() => query.trim(), [query])

  useEffect(() => {
    const currentQuery = (searchParams.get('q') || '').trim()
    if (currentQuery === trimmedQuery) return

    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (trimmedQuery) {
        params.set('q', trimmedQuery)
      } else {
        params.delete('q')
      }
      const qs = params.toString()
      router.replace(qs ? `/search?${qs}` : '/search')
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [trimmedQuery, router, searchParams])

  const { data: posts, isLoading } = useSearch(trimmedQuery)

  return (
    <>
      <div className="mb-8 max-w-2xl">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search listings, agencies, services, products..."
            className="h-12 pl-12"
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Results update instantly after you type two or more characters.
        </p>
      </div>

      {!trimmedQuery ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchIcon className="h-12 w-12 text-muted-foreground/50" />
          <h2 className="mt-4 text-xl font-semibold">Search listings</h2>
          <p className="mt-2 text-muted-foreground">
            Search digisoftron.com for services, agencies, products, and local businesses.
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
          ))}
        </div>
      ) : !posts || posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchIcon className="h-12 w-12 text-muted-foreground/50" />
          <h2 className="mt-4 text-xl font-semibold">No results found</h2>
          <p className="mt-2 text-muted-foreground">
            No listings match your search for &quot;{trimmedQuery}&quot;.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-muted-foreground">
            Found {posts.length} result{posts.length !== 1 ? 's' : ''} for &quot;{trimmedQuery}&quot;
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} delay={index * 0.03} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Search listings
        </h1>

        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
              ))}
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}
