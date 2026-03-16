import type { SiteBootstrap, SiteFeed } from './types'

const API_BASE = process.env.NEXT_PUBLIC_MASTER_PANEL_URL
const SITE_CODE = process.env.NEXT_PUBLIC_SITE_CODE
const FEED_REVALIDATE_SECONDS = (() => {
  const parsed = Number(process.env.NEXT_PUBLIC_FEED_REVALIDATE_SECONDS ?? 300)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 300
})()

const getPublicUrl = (path: string) => {
  if (!API_BASE || !SITE_CODE) return null
  return `${API_BASE.replace(/\/$/, '')}/api/v1/public/${SITE_CODE}${path}`
}

async function fetchPublicJson<T>(path: string): Promise<T | null> {
  const target = getPublicUrl(path)
  if (!target) return null

  const response = await fetch(target, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: FEED_REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    throw new Error(`Public connector request failed with status ${response.status}`)
  }

  const json = (await response.json()) as { success: boolean; data?: T }
  return json.data || null
}

export async function fetchSiteBootstrap(): Promise<SiteBootstrap | null> {
  return fetchPublicJson<SiteBootstrap>('/bootstrap')
}

export async function fetchSiteFeed<TPost>(): Promise<SiteFeed<TPost> | null> {
  return fetchPublicJson<SiteFeed<TPost>>('/feed?limit=200')
}
