export type PostType = 'article' | 'gallery' | 'listing'

export interface User {
  id: string
  name: string
  avatar: string
  role?: string
}

export interface GalleryImage {
  id: string
  url: string
  alt: string
  width: number
  height: number
}

export interface BasePost {
  id: string
  type: PostType
  title: string
  slug: string
  excerpt: string
  coverImage: string
  author: User
  createdAt: string
  updatedAt: string
  featured: boolean
  tags: string[]
}

export interface Article extends BasePost {
  type: 'article'
  readTime: number
  content: string
}

export interface Gallery extends BasePost {
  type: 'gallery'
  images: GalleryImage[]
}

export interface Listing extends BasePost {
  type: 'listing'
  price: number
  currency: string
  location: string
  highlights: string[]
  rating?: number
  reviewCount?: number
  category?: string
  logo?: string
  description?: string
  galleryImages: GalleryImage[]
  website?: string
  phone?: string
  address?: string
}

export type Post = Article | Gallery | Listing

export interface PostsResponse {
  posts: Post[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface FeaturedResponse {
  posts: Post[]
}

export interface TrendingResponse {
  posts: Post[]
}
