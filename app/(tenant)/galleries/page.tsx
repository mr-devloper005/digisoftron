import { fetchPostsByType } from '@/lib/api/posts'
import GalleriesClient from './galleries-client'
import type { Gallery } from '@/types/post'


export default async function GalleriesPage() {
  const posts = await fetchPostsByType('gallery')

  return <GalleriesClient galleries={posts as Gallery[]} />
}
