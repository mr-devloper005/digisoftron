'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Building2, MapPin, ShieldCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTenant } from '@/lib/tenant/context'

const iconMap = {
  building: Building2,
  map: MapPin,
  shield: ShieldCheck,
}

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { hero } = useTenant()

  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery])

  useEffect(() => {
    if (trimmedQuery.length < 2) return

    const currentQuery = (searchParams.get('q') || '').trim()
    if (pathname === '/search' && currentQuery === trimmedQuery) return

    const timeout = window.setTimeout(() => {
      router.replace(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [pathname, searchParams, trimmedQuery, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[--gradient-from] to-[--gradient-to]">
      <Image
        src="/images/hero/ai-hero.svg"
        alt="Digisoftron.com listing network background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/70" />

      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4" />
            {hero.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-white/72 sm:text-xl"
          >
            {hero.description}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSearch}
            className="mx-auto mt-10 max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <Input
                type="search"
                placeholder={hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 w-full rounded-full border-0 bg-white pl-12 pr-14 text-base text-foreground shadow-lg placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white/50"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Search listings</span>
              </Button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-sm text-white/50">Popular:</span>
            {hero.popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
                className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                {term}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {hero.highlights.map((highlight) => {
              const Icon = iconMap[highlight.icon]
              return (
                <div key={highlight.title} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <Icon className="h-4 w-4" />
                    {highlight.title}
                  </div>
                  <p className="mt-2 text-sm text-white/70">{highlight.description}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C240 10 480 0 720 0C960 0 1200 10 1440 30V60H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
