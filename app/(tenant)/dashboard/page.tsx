'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CalendarDays, CircleCheckBig, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/stores/auth-store'

interface ContactMessage {
  subject: string
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { session, signOut } = useAuthStore()
  const [messages, setMessages] = useState<ContactMessage[]>([])

  useEffect(() => {
    const raw = localStorage.getItem('discover-contact-messages')
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as ContactMessage[]
      if (Array.isArray(parsed)) setMessages(parsed)
    } catch {
      setMessages([])
    }
  }, [])

  useEffect(() => {
    if (!session) router.replace('/signin?redirect=/dashboard')
  }, [session, router])

  const joinDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  const latestMessage = messages[0]

  if (!session) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-muted-foreground">Redirecting to sign in...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
      <section className="rounded-2xl border border-border bg-gradient-to-r from-card to-muted/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Member dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {session.name}</h1>
            <p className="mt-2 text-muted-foreground">{session.email}</p>
            <p className="mt-1 text-sm text-muted-foreground">Active since {joinDate}</p>
          </div>
          <Button onClick={() => { signOut(); router.push('/') }}>
            Sign Out
          </Button>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Messages sent</p>
          <p className="mt-2 text-3xl font-bold">{messages.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Via contact support form</p>
        </article>
        <article className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Account status</p>
          <p className="mt-2 inline-flex items-center gap-2 text-lg font-semibold">
            <CircleCheckBig className="h-5 w-5 text-green-600" />
            Active
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Ready for listings and support</p>
        </article>
        <article className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Security</p>
          <p className="mt-2 inline-flex items-center gap-2 text-lg font-semibold">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            Session valid
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Signed in on this device</p>
        </article>
        <article className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Today</p>
          <p className="mt-2 inline-flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Keep your profile up to date</p>
        </article>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/listings" className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
              <p className="font-medium">Browse listings</p>
              <p className="mt-1 text-sm text-muted-foreground">Explore services and experiences near you.</p>
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
            <Link href="/articles" className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
              <p className="font-medium">Read latest articles</p>
              <p className="mt-1 text-sm text-muted-foreground">See curated stories from the community.</p>
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
            <Link href="/galleries" className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
              <p className="font-medium">View galleries</p>
              <p className="mt-1 text-sm text-muted-foreground">Discover visual collections and creators.</p>
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Browse
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
            <Link href="/contact" className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
              <p className="font-medium">Contact support</p>
              <p className="mt-1 text-sm text-muted-foreground">Get help with account, content, or booking issues.</p>
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Ask for help
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
          </div>
        </article>

        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
            <Mail className="h-5 w-5 text-primary" />
            Recent support
          </h2>
          {latestMessage ? (
            <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm font-medium">{latestMessage.subject}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Sent {new Date(latestMessage.createdAt).toLocaleString('en-US')}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No support messages yet. Reach out any time from the contact page.
            </p>
          )}
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link href="/contact">Open Contact Center</Link>
          </Button>
        </article>
      </section>
    </div>
  )
}

