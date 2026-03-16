import { fetchTrendingPosts } from '@/lib/api/posts'
import TrendingClient from './trending-client'


export default async function TrendingPage() {
  const { posts } = await fetchTrendingPosts()

  return <TrendingClient posts={posts} />
}
