import { fetchPostsByType } from '@/lib/api/posts'
import ArticlesClient from './articles-client'
import type { Article } from '@/types/post'


export default async function ArticlesPage() {
  const posts = await fetchPostsByType('article')

  return <ArticlesClient articles={posts as Article[]} />
}
