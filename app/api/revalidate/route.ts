import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const DEFAULT_PATHS = [
  '/',
  '/posts',
  '/featured',
  '/trending',
  '/listings',
  '/articles',
  '/galleries',
]

const getSecret = () => process.env.REVALIDATE_SECRET || ''

const collectPaths = (slug: string | null, extraPaths: unknown): string[] => {
  const paths = new Set<string>(DEFAULT_PATHS)

  if (slug) {
    paths.add(`/posts/${slug}`)
  }

  if (Array.isArray(extraPaths)) {
    for (const value of extraPaths) {
      if (typeof value === 'string' && value.trim()) {
        const normalized = value.startsWith('/') ? value : `/${value}`
        paths.add(normalized)
      }
    }
  }

  return Array.from(paths)
}

export async function POST(request: Request) {
  const secret = getSecret()
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'REVALIDATE_SECRET not configured.' }, { status: 500 })
  }

  const provided = request.headers.get('x-revalidate-secret')
  const url = new URL(request.url)
  const querySecret = url.searchParams.get('secret')
  const token = provided || querySecret

  if (!token || token !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }

  let payload: { slug?: string; paths?: string[] } = {}
  try {
    payload = (await request.json()) as { slug?: string; paths?: string[] }
  } catch {
    payload = {}
  }

  const slug = typeof payload.slug === 'string' ? payload.slug : url.searchParams.get('slug')
  const paths = collectPaths(slug, payload.paths)

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ ok: true, revalidated: paths })
}
