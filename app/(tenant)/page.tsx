import { HeroSection } from '@/components/home/hero-section'
import { FeaturedCarousel } from '@/components/home/featured-carousel'
import { LatestListings } from '@/components/home/latest-listings'
import { TrendingMasonry } from '@/components/home/trending-masonry'
import { fetchFeaturedPosts, fetchLatestListings, fetchTrendingPosts } from '@/lib/api/posts'


export default async function HomePage() {
  const [featured, listings, trending] = await Promise.all([
    fetchFeaturedPosts(),
    fetchLatestListings(),
    fetchTrendingPosts(),
  ])

  return (
    <>
      <HeroSection />
      <FeaturedCarousel posts={featured.posts} />
      <LatestListings listings={listings} />
      <TrendingMasonry posts={trending.posts} />
    </>
  )
}
