'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/stores/ui-store'
import { useAuthStore } from '@/lib/stores/auth-store'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/listings', label: 'Listings' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { isMobileNavOpen, setMobileNavOpen, searchQuery, setSearchQuery } = useUIStore()
  const { session, signOut } = useAuthStore()

  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery])

  useEffect(() => {
    if (!isSearchExpanded || trimmedQuery.length < 2) return

    const url = new URL(window.location.href)
    const currentQuery = (url.searchParams.get('q') || '').trim()
    if (url.pathname === '/search' && currentQuery === trimmedQuery) return

    const timeout = window.setTimeout(() => {
      router.replace(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [isSearchExpanded, trimmedQuery, router])

  useEffect(() => {
    if (pathname !== '/search' && trimmedQuery.length === 0) {
      setIsSearchExpanded(false)
    }
  }, [pathname, trimmedQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trimmedQuery) return
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    setMobileNavOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
            <span className="text-sm font-bold text-background">D</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="hidden sm:inline">digisoftron.com</span>
            <span className="hidden text-xs font-normal text-muted-foreground sm:inline">Listing marketplace</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className={cn('relative flex items-center transition-all duration-300', isSearchExpanded ? 'w-72' : 'w-10')}>
            {isSearchExpanded ? (
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search listings instantly..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-full pl-9 pr-8"
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery) setIsSearchExpanded(false)
                  }}
                />
                <button type="submit" className="sr-only">Search</button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setIsSearchExpanded(false)
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchExpanded(true)} className="h-9 w-9">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
          {session ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/get-started">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {isMobileNavOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search listings instantly..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9"
              />
              <button type="submit" className="sr-only">Search</button>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                onClick={() => setMobileNavOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex gap-2 pt-4">
              {session ? (
                <>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/dashboard" onClick={() => setMobileNavOpen(false)}>Dashboard</Link>
                  </Button>
                  <Button className="flex-1" onClick={signOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/signin" onClick={() => setMobileNavOpen(false)}>Sign In</Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/get-started" onClick={() => setMobileNavOpen(false)}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
