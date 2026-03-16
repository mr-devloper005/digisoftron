import { fetchPostsByType } from '@/lib/api/posts'
import ListingsClient from './listings-client'
import type { Listing } from '@/types/post'


export default async function ListingsPage() {
  const posts = await fetchPostsByType('listing')

  return <ListingsClient listings={posts as Listing[]} />
}
