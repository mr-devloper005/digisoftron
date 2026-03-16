import { fetchFeaturedPosts } from '@/lib/api/posts'
import FeaturedClient from './featured-client'


export default async function FeaturedPage() {
  const { posts } = await fetchFeaturedPosts()

  return <FeaturedClient posts={posts} />
}
