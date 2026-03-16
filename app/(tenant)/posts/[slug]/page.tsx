import { fetchAllPosts, fetchPost, fetchSimilarListings } from '@/lib/api/posts'
import { PostContent } from './post-content'
import type { Listing } from '@/types/post'

export async function generateStaticParams() {
  const posts = await fetchAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

type PostPageParams = { slug: string }

export default async function PostPage({
  params,
}: {
  params: PostPageParams | Promise<PostPageParams>
}) {
  const resolvedParams = await Promise.resolve(params)
  const post = await fetchPost(resolvedParams.slug)
  const similarPosts = post && post.type === 'listing' ? await fetchSimilarListings(post as Listing, 4) : []

  return <PostContent post={post} similarPosts={similarPosts} />
}
