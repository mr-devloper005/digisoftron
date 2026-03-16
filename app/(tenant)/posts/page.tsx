import { fetchPosts } from '@/lib/api/posts'
import PostsClient from './posts-client'


export default async function PostsPage() {
  const { posts } = await fetchPosts(1, 20)

  return <PostsClient posts={posts} />
}
