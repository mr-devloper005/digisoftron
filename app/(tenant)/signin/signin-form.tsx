'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/lib/stores/auth-store'

export function SignInForm({ redirect = '/dashboard' }: { redirect?: string }) {
  const router = useRouter()
  const { signIn, session } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (session) router.replace(redirect)
  }, [session, router, redirect])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = signIn({ email, password })
    if (!result.success) {
      setError(result.message)
      return
    }
    router.push(redirect)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
      <p className="mt-2 text-muted-foreground">Access your dashboard and saved activity.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6">
        <Input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">Sign In</Button>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </form>

      <p className="mt-5 text-sm text-muted-foreground">
        New here?{' '}
        <Link href="/get-started" className="font-medium text-primary underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}

