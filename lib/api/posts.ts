import type {
  Post,
  PostsResponse,
  FeaturedResponse,
  TrendingResponse,
  Listing,
  User,
  Article,
  Gallery,
  GalleryImage,
} from '@/types/post'
import { fetchSiteFeed } from '@/lib/site-connector/client'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type MasterPanelPost = {
  id: string
  externalPostId?: string | null
  title?: string | null
  slug?: string | null
  summary?: string | null
  content?: unknown
  media?: unknown
  tags?: string[]
  authorName?: string | null
  publishedAt?: string | null
}

const USE_REMOTE = process.env.NEXT_PUBLIC_USE_REMOTE_FEED !== 'false'
const CACHE_TTL_MS = 10_000

let remotePostsCache: { data: Post[]; fetchedAt: number } | null = null

const defaultAuthor: User = {
  id: 'remote-author',
  name: 'Site Curator',
  avatar: '/images/avatars/james.jpg',
  role: 'Curator',
}

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {}

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const normalizeSlug = (value: string): string => slugify(value || '')

const numberFromUnknown = (value: unknown, fallback: number): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const stringFromUnknown = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return fallback
}

const stringArrayFromUnknown = (value: unknown, fallback: string[] = []): string[] => {
  if (!Array.isArray(value)) return fallback
  return value.map((item) => String(item)).filter(Boolean)
}

const extractImages = (media: unknown): GalleryImage[] => {
  if (!Array.isArray(media)) return []

  return media
    .map((item, index) => {
      const row = asRecord(item)
      const type = String(row.type || '').toUpperCase()
      const url = stringFromUnknown(row.url)
      if (!url || !type.includes('IMAGE')) return null
      return {
        id: `img-${index + 1}`,
        url,
        alt: stringFromUnknown(row.alt, 'Gallery image'),
        width: numberFromUnknown(row.width, 1200),
        height: numberFromUnknown(row.height, 900),
      } as GalleryImage
    })
    .filter((v): v is GalleryImage => Boolean(v))
}

const extractLogo = (media: unknown, content: Record<string, unknown>): string | undefined => {
  const explicit =
    stringFromUnknown(content.logo) ||
    stringFromUnknown(content.logoUrl) ||
    stringFromUnknown(content.businessLogo) ||
    stringFromUnknown(content.brandLogo)

  if (explicit) return explicit

  if (!Array.isArray(media)) return undefined
  const logoRow = media.find((item) => String(asRecord(item).type || '').toUpperCase().includes('LOGO'))
  if (!logoRow) return undefined
  return stringFromUnknown(asRecord(logoRow).url) || undefined
}

const extractCoverImage = (media: unknown, content: Record<string, unknown>): string => {
  const images = extractImages(media)
  if (images.length > 0) return images[0].url

  const contentImage = stringFromUnknown(content.coverImage)
  if (contentImage) return contentImage

  return '/images/placeholder.jpg'
}

const inferPostType = (row: MasterPanelPost, content: Record<string, unknown>): Post['type'] => {
  const explicit = stringFromUnknown(content.postType || content.type || content.taskType || content.siteType)
    .toLowerCase()
    .trim()

  const tags = (row.tags || []).map((tag) => tag.toLowerCase())

  if (explicit.includes('gallery') || explicit.includes('image') || tags.includes('gallery')) return 'gallery'
  if (explicit.includes('listing') || explicit.includes('local_listing') || tags.includes('listing')) return 'listing'
  if (explicit.includes('article') || tags.includes('article') || tags.includes('blog')) return 'article'

  const mediaImages = extractImages(row.media)
  if (mediaImages.length > 2) return 'gallery'

  if ('price' in content || 'location' in content || tags.includes('workshop') || tags.includes('service')) {
    return 'listing'
  }

  return 'article'
}

const estimateReadTime = (text: string): number => {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 180))
}

const getCreatedAt = (row: MasterPanelPost): string =>
  stringFromUnknown(row.publishedAt, new Date().toISOString())

const getListingCategory = (row: MasterPanelPost, content: Record<string, unknown>): string => {
  const explicit =
    stringFromUnknown(content.category) ||
    stringFromUnknown(content.listingCategory) ||
    stringFromUnknown(content.businessCategory) ||
    stringFromUnknown(content.primaryCategory)

  if (explicit) return explicit

  const tags = (row.tags || []).filter((tag) => !['listing', 'featured', 'trending'].includes(tag.toLowerCase()))
  if (tags.length > 0) return tags[0]

  return 'Listing'
}

const getListingDescription = (content: Record<string, unknown>, fallback: string): string =>
  stringFromUnknown(
    content.body || content.description || content.text || content.content || content.overview || content.about,
    fallback,
  )

const getBasePostFields = (row: MasterPanelPost, content: Record<string, unknown>, index: number) => {
  const title = stringFromUnknown(row.title, `Remote Post ${index + 1}`)
  const createdAt = getCreatedAt(row)
  const authorName = stringFromUnknown(row.authorName, defaultAuthor.name)

  const author: User = {
    id: `remote-author-${authorName.toLowerCase().replace(/\s+/g, '-')}`,
    name: authorName,
    avatar: '/images/avatars/james.jpg',
    role: stringFromUnknown(content.authorRole, 'Contributor'),
  }

  const tags = row.tags && row.tags.length ? row.tags : stringArrayFromUnknown(content.tags, ['General'])

  return {
    id: stringFromUnknown(row.externalPostId || row.id, `remote-${index + 1}`),
    title,
    slug: stringFromUnknown(row.slug, slugify(title)),
    excerpt: stringFromUnknown(row.summary, stringFromUnknown(content.excerpt, 'Fresh update from master feed.')),
    coverImage: extractCoverImage(row.media, content),
    author,
    createdAt,
    updatedAt: createdAt,
    featured: Boolean(content.featured ?? true),
    tags,
  }
}

const mapMasterPost = (row: MasterPanelPost, index: number): Post => {
  const content = asRecord(row.content)
  const type = inferPostType(row, content)
  const base = getBasePostFields(row, content, index)

  if (type === 'gallery') {
    const images = extractImages(row.media)
    const gallery: Gallery = {
      ...base,
      type: 'gallery',
      images:
        images.length > 0
          ? images
          : [{ id: 'img-fallback', url: base.coverImage, alt: base.title, width: 1200, height: 900 }],
    }
    return gallery
  }

  if (type === 'listing') {
    const galleryImages = extractImages(row.media)
    const listing: Listing = {
      ...base,
      type: 'listing',
      price: numberFromUnknown(content.price, 99),
      currency: stringFromUnknown(content.currency, 'USD'),
      location: stringFromUnknown(content.location, 'Online'),
      highlights: stringArrayFromUnknown(content.highlights, ['Verified listing', 'Instant details', 'Trusted source']),
      rating: numberFromUnknown(content.rating, 4.8),
      reviewCount: numberFromUnknown(content.reviewCount, 100),
      category: getListingCategory(row, content),
      logo: extractLogo(row.media, content),
      description: getListingDescription(content, base.excerpt),
      galleryImages: galleryImages.length > 0 ? galleryImages : [{ id: 'img-cover', url: base.coverImage, alt: base.title, width: 1200, height: 900 }],
      website: stringFromUnknown(content.website || content.url),
      phone: stringFromUnknown(content.phone),
      address: stringFromUnknown(content.address),
    }
    return listing
  }

  const body = stringFromUnknown(content.body || content.text || content.description, base.excerpt)
  const article: Article = {
    ...base,
    type: 'article',
    readTime: numberFromUnknown(content.readTime, estimateReadTime(body)),
    content: body,
  }
  return article
}

const sortByLatest = <T extends { createdAt: string }>(rows: T[]): T[] =>
  [...rows].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

const ensureUniqueSlugs = (rows: Post[]): Post[] => {
  const slugCounts = new Map<string, number>()

  return sortByLatest(rows).map((row) => {
    const baseSlug = normalizeSlug(row.slug || row.title) || row.id
    const seenCount = slugCounts.get(baseSlug) || 0
    slugCounts.set(baseSlug, seenCount + 1)

    if (seenCount === 0) {
      return {
        ...row,
        slug: baseSlug,
      }
    }

    const suffix = normalizeSlug(row.id).slice(-8) || `${seenCount + 1}`
    return {
      ...row,
      slug: `${baseSlug}-${suffix}`,
    }
  })
}

async function fetchRemotePosts(forceRefresh = false): Promise<Post[] | null> {
  if (!USE_REMOTE) return null

  const now = Date.now()
  if (!forceRefresh && remotePostsCache && now - remotePostsCache.fetchedAt < CACHE_TTL_MS) {
    return remotePostsCache.data
  }

  try {
    const feed = await fetchSiteFeed<MasterPanelPost>()
    const remotePosts = ensureUniqueSlugs((feed?.posts || []).map(mapMasterPost))

    remotePostsCache = { data: sortByLatest(remotePosts), fetchedAt: now }
    return remotePostsCache.data
  } catch (error) {
    console.warn('Remote feed unavailable.', error)
    return null
  }
}

async function getUnifiedPosts(forceRefresh = false): Promise<Post[]> {
  const remotePosts = await fetchRemotePosts(forceRefresh)
  if (!remotePosts || remotePosts.length === 0) return []
  return sortByLatest(remotePosts)
}

export async function fetchAllPosts(): Promise<Post[]> {
  return getUnifiedPosts()
}

export async function fetchPosts(page = 1, pageSize = 10): Promise<PostsResponse> {
  await delay(120)

  const source = await getUnifiedPosts()
  const start = (page - 1) * pageSize
  const posts = source.slice(start, start + pageSize)

  return {
    posts,
    total: source.length,
    page,
    pageSize,
    hasMore: start + pageSize < source.length,
  }
}

export async function fetchFeaturedPosts(): Promise<FeaturedResponse> {
  await delay(100)
  const source = await getUnifiedPosts()
  return { posts: source.filter((post) => post.featured).slice(0, 12) }
}

export async function fetchTrendingPosts(): Promise<TrendingResponse> {
  await delay(120)
  const source = await getUnifiedPosts()
  return { posts: [...source].slice(0, 12) }
}

export async function fetchLatestListings(): Promise<Listing[]> {
  await delay(100)
  const source = await getUnifiedPosts()
  const listings = source.filter((post): post is Listing => post.type === 'listing')
  return listings.slice(0, 6)
}

export async function fetchPost(slug: string): Promise<Post | null> {
  await delay(100)

  const target = normalizeSlug(slug)

  const source = await getUnifiedPosts()
  const match = source.find((post) => normalizeSlug(post.slug) === target)
  if (match) return match

  const refreshed = await getUnifiedPosts(true)
  const refreshedMatch = refreshed.find((post) => normalizeSlug(post.slug) === target)
  if (refreshedMatch) return refreshedMatch

  return null
}

export async function fetchPostsByType(type: Post['type']): Promise<Post[]> {
  await delay(120)
  const source = await getUnifiedPosts()
  return source.filter((post) => post.type === type)
}

export async function fetchSimilarListings(post: Listing, limit = 4): Promise<Listing[]> {
  const source = await getUnifiedPosts()
  return source
    .filter((entry): entry is Listing => entry.type === 'listing')
    .filter((entry) => entry.id !== post.id)
    .filter((entry) => {
      const sameCategory = (entry.category || '').toLowerCase() === (post.category || '').toLowerCase()
      const sharedTag = entry.tags.some((tag) => post.tags.map((item) => item.toLowerCase()).includes(tag.toLowerCase()))
      return sameCategory || sharedTag
    })
    .slice(0, limit)
}

export async function fetchSearchResults(query: string): Promise<Post[]> {
  await delay(120)
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase()
  const source = await getUnifiedPosts()

  const matched = source.filter((post) =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
    post.author.name.toLowerCase().includes(lowerQuery) ||
    ('category' in post && String(post.category || '').toLowerCase().includes(lowerQuery))
  )

  if (matched.length > 0) {
    return matched
  }

  return []
}
