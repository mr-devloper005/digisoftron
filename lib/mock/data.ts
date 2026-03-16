import type { Post, Article, Gallery, Listing, User } from '@/types/post'

const users: User[] = [
  { id: '1', name: 'Sarah Chen', avatar: '/images/avatars/sarah.jpg', role: 'Editor' },
  { id: '2', name: 'Marcus Johnson', avatar: '/images/avatars/marcus.jpg', role: 'Photographer' },
  { id: '3', name: 'Elena Rodriguez', avatar: '/images/avatars/elena.jpg', role: 'Writer' },
  { id: '4', name: 'James Park', avatar: '/images/avatars/james.jpg', role: 'Curator' },
  { id: '5', name: 'Aisha Patel', avatar: '/images/avatars/aisha.jpg', role: 'Designer' },
]

const articles: Article[] = [
  {
    id: 'a1',
    type: 'article',
    title: 'The Future of Remote Work: Building Culture Across Time Zones',
    slug: 'future-of-remote-work',
    excerpt: 'How leading companies are reimagining workplace culture in a distributed world, from async communication to virtual team bonding.',
    coverImage: '/images/articles/remote-work.jpg',
    author: users[0],
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    featured: true,
    tags: ['Business', 'Remote Work', 'Culture'],
    readTime: 8,
    content: `The landscape of work has fundamentally shifted. What began as an emergency response to global circumstances has evolved into a deliberate choice by millions of workers and thousands of companies worldwide.

## The New Normal

Remote work isn't just about working from home—it's about reimagining how teams collaborate, communicate, and create together across distances and time zones.

### Key Strategies for Success

1. **Asynchronous Communication**: Embracing async-first communication reduces meeting fatigue and allows for deeper focus work.

2. **Documentation Culture**: When you can't tap a colleague on the shoulder, comprehensive documentation becomes invaluable.

3. **Virtual Team Building**: From online game nights to virtual coffee chats, companies are finding creative ways to maintain culture.

## The Technology Stack

Modern remote teams rely on a carefully curated set of tools:
- Slack or Discord for real-time chat
- Notion or Confluence for documentation
- Figma for collaborative design
- GitHub for code collaboration

## Looking Ahead

The future of work is hybrid, flexible, and human-centered. Companies that embrace this shift will attract the best talent regardless of geography.`,
  },
  {
    id: 'a2',
    type: 'article',
    title: 'Sustainable Architecture: Designing for a Greener Tomorrow',
    slug: 'sustainable-architecture',
    excerpt: 'Exploring how architects are incorporating eco-friendly materials and energy-efficient designs to combat climate change.',
    coverImage: '/images/articles/sustainable-architecture.jpg',
    author: users[2],
    createdAt: '2024-03-14T14:30:00Z',
    updatedAt: '2024-03-14T14:30:00Z',
    featured: true,
    tags: ['Architecture', 'Sustainability', 'Design'],
    readTime: 12,
    content: `Architecture has always shaped how we live, but today's architects are taking on an even greater challenge: designing buildings that help heal our planet.

## The Green Building Revolution

From living walls to solar facades, sustainable architecture is no longer a niche—it's becoming the standard.

### Materials Matter

- **Cross-Laminated Timber (CLT)**: A sustainable alternative to concrete and steel
- **Recycled Materials**: From ocean plastics to reclaimed wood
- **Bio-based Insulation**: Made from hemp, mushrooms, or recycled textiles

## Net-Zero and Beyond

The most ambitious projects aren't just reducing their footprint—they're becoming carbon positive, generating more clean energy than they consume.`,
  },
  {
    id: 'a3',
    type: 'article',
    title: 'The Art of Mindful Productivity',
    slug: 'mindful-productivity',
    excerpt: 'Why slowing down might be the key to getting more done. A deep dive into mindfulness techniques for busy professionals.',
    coverImage: '/images/articles/mindful-productivity.jpg',
    author: users[0],
    createdAt: '2024-03-13T09:00:00Z',
    updatedAt: '2024-03-13T09:00:00Z',
    featured: false,
    tags: ['Productivity', 'Mindfulness', 'Wellness'],
    readTime: 6,
    content: `In a world obsessed with hustle culture and productivity hacks, there's a counterintuitive truth: sometimes, slowing down is the fastest way forward.`,
  },
  {
    id: 'a4',
    type: 'article',
    title: 'Culinary Journeys: Street Food Around the World',
    slug: 'street-food-world',
    excerpt: 'From Bangkok night markets to Mexican taquerias, discover the most authentic street food experiences across continents.',
    coverImage: '/images/articles/street-food.jpg',
    author: users[2],
    createdAt: '2024-03-12T16:00:00Z',
    updatedAt: '2024-03-12T16:00:00Z',
    featured: false,
    tags: ['Food', 'Travel', 'Culture'],
    readTime: 10,
    content: `The best food in the world isn't always found in Michelin-starred restaurants. Sometimes it's served from a cart, a stall, or a hole-in-the-wall that only locals know about.`,
  },
  {
    id: 'a5',
    type: 'article',
    title: 'The Renaissance of Vinyl: Why Records Are Back',
    slug: 'vinyl-renaissance',
    excerpt: 'In an age of streaming, vinyl sales are soaring. We explore the audiophile resurgence and the culture behind the comeback.',
    coverImage: '/images/articles/vinyl-records.jpg',
    author: users[3],
    createdAt: '2024-03-11T11:00:00Z',
    updatedAt: '2024-03-11T11:00:00Z',
    featured: false,
    tags: ['Music', 'Culture', 'Technology'],
    readTime: 7,
    content: `There's something magical about dropping the needle on a record. In an age of algorithmic playlists and infinite streaming, vinyl offers something streaming never can: intention.`,
  },
]

const galleries: Gallery[] = [
  {
    id: 'g1',
    type: 'gallery',
    title: 'Urban Geometry: Lines of the Modern City',
    slug: 'urban-geometry',
    excerpt: 'A photographic exploration of architectural patterns and geometric forms found in contemporary urban landscapes.',
    coverImage: '/images/galleries/urban-geometry.jpg',
    author: users[1],
    createdAt: '2024-03-15T08:00:00Z',
    updatedAt: '2024-03-15T08:00:00Z',
    featured: true,
    tags: ['Photography', 'Architecture', 'Urban'],
    images: [
      { id: 'img1', url: '/images/galleries/urban-geometry.jpg', alt: 'Modern building facade', width: 1200, height: 1600 },
      { id: 'img2', url: '/images/galleries/urban-geometry-2.jpg', alt: 'Glass skyscraper', width: 1200, height: 800 },
      { id: 'img3', url: '/images/galleries/urban-geometry-3.jpg', alt: 'City skyline', width: 1200, height: 900 },
    ],
  },
  {
    id: 'g2',
    type: 'gallery',
    title: 'Northern Lights: Aurora Borealis Collection',
    slug: 'northern-lights',
    excerpt: 'Stunning captures of the aurora borealis across Scandinavian skies, showcasing nature\'s most spectacular light show.',
    coverImage: '/images/galleries/northern-lights.jpg',
    author: users[1],
    createdAt: '2024-03-14T20:00:00Z',
    updatedAt: '2024-03-14T20:00:00Z',
    featured: true,
    tags: ['Nature', 'Photography', 'Travel'],
    images: [
      { id: 'img4', url: '/images/galleries/northern-lights.jpg', alt: 'Green aurora', width: 1200, height: 1800 },
      { id: 'img5', url: '/images/galleries/northern-lights-2.jpg', alt: 'Purple aurora', width: 1200, height: 800 },
    ],
  },
  {
    id: 'g3',
    type: 'gallery',
    title: 'Minimalist Interiors: Less Is More',
    slug: 'minimalist-interiors',
    excerpt: 'Clean lines, neutral palettes, and purposeful spaces. A collection celebrating the beauty of minimalist design.',
    coverImage: '/images/galleries/minimalist-interior.jpg',
    author: users[4],
    createdAt: '2024-03-13T15:00:00Z',
    updatedAt: '2024-03-13T15:00:00Z',
    featured: false,
    tags: ['Interior', 'Design', 'Minimalism'],
    images: [
      { id: 'img6', url: '/images/galleries/minimalist-interior.jpg', alt: 'Minimal living room', width: 1200, height: 900 },
    ],
  },
  {
    id: 'g4',
    type: 'gallery',
    title: 'Coffee Culture: Beans to Baristas',
    slug: 'coffee-culture',
    excerpt: 'From farm to cup, a visual journey through the world of specialty coffee and the artisans who craft it.',
    coverImage: '/images/galleries/coffee-culture.jpg',
    author: users[1],
    createdAt: '2024-03-12T12:00:00Z',
    updatedAt: '2024-03-12T12:00:00Z',
    featured: false,
    tags: ['Food', 'Culture', 'Photography'],
    images: [
      { id: 'img7', url: '/images/galleries/coffee-culture.jpg', alt: 'Latte art', width: 1200, height: 1200 },
    ],
  },
  {
    id: 'g5',
    type: 'gallery',
    title: 'Desert Dreams: Sahara at Sunset',
    slug: 'desert-dreams',
    excerpt: 'Golden dunes stretching to infinity, captured during the magical golden hour in the Moroccan Sahara.',
    coverImage: '/images/galleries/desert-sunset.jpg',
    author: users[1],
    createdAt: '2024-03-11T18:00:00Z',
    updatedAt: '2024-03-11T18:00:00Z',
    featured: false,
    tags: ['Nature', 'Travel', 'Photography'],
    images: [
      { id: 'img8', url: '/images/galleries/desert-sunset.jpg', alt: 'Sahara dunes', width: 1200, height: 1650 },
    ],
  },
]

const listings: Listing[] = [
  {
    id: 'l1',
    type: 'listing',
    title: 'Artisan Coffee Workshop Experience',
    slug: 'artisan-coffee-workshop',
    excerpt: 'Learn the art of pour-over, latte art, and bean selection from master baristas in this hands-on workshop.',
    coverImage: '/images/listings/coffee-workshop.jpg',
    author: users[3],
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
    featured: true,
    tags: ['Workshop', 'Coffee', 'Experience'],
    price: 89,
    currency: 'USD',
    location: 'Brooklyn, NY',
    highlights: ['3-hour session', 'All materials included', 'Take home beans', 'Certificate'],
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: 'l2',
    type: 'listing',
    title: 'Luxury Mountain Retreat Suite',
    slug: 'luxury-mountain-retreat',
    excerpt: 'Escape to tranquility in our premium mountain suite with panoramic views, spa access, and gourmet dining.',
    coverImage: '/images/listings/mountain-retreat.jpg',
    author: users[3],
    createdAt: '2024-03-14T11:00:00Z',
    updatedAt: '2024-03-14T11:00:00Z',
    featured: true,
    tags: ['Travel', 'Luxury', 'Accommodation'],
    price: 450,
    currency: 'USD',
    location: 'Aspen, CO',
    highlights: ['Mountain view', 'Spa included', 'Breakfast daily', 'Ski-in/Ski-out'],
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: 'l3',
    type: 'listing',
    title: 'Professional Photography Masterclass',
    slug: 'photography-masterclass',
    excerpt: 'Take your photography to the next level with this comprehensive masterclass covering composition, lighting, and post-processing.',
    coverImage: '/images/listings/photography-masterclass.jpg',
    author: users[1],
    createdAt: '2024-03-13T13:00:00Z',
    updatedAt: '2024-03-13T13:00:00Z',
    featured: false,
    tags: ['Course', 'Photography', 'Education'],
    price: 299,
    currency: 'USD',
    location: 'Online',
    highlights: ['20+ hours content', 'Lifetime access', '1-on-1 feedback', 'Community access'],
    rating: 4.7,
    reviewCount: 342,
  },
  {
    id: 'l4',
    type: 'listing',
    title: 'Private Yacht Day Charter',
    slug: 'yacht-day-charter',
    excerpt: 'Experience the Mediterranean in style aboard our 60ft luxury yacht with captain, chef, and crew included.',
    coverImage: '/images/listings/yacht-charter.jpg',
    author: users[3],
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2024-03-12T10:00:00Z',
    featured: false,
    tags: ['Luxury', 'Experience', 'Travel'],
    price: 2500,
    currency: 'USD',
    location: 'Monaco',
    highlights: ['Full day charter', 'Gourmet lunch', 'Water sports', 'Up to 8 guests'],
    rating: 5.0,
    reviewCount: 28,
  },
  {
    id: 'l5',
    type: 'listing',
    title: 'Farm-to-Table Cooking Class',
    slug: 'farm-to-table-cooking',
    excerpt: 'Visit a local organic farm, harvest fresh ingredients, and learn to prepare seasonal dishes with a professional chef.',
    coverImage: '/images/listings/farm-cooking.jpg',
    author: users[2],
    createdAt: '2024-03-11T14:00:00Z',
    updatedAt: '2024-03-11T14:00:00Z',
    featured: false,
    tags: ['Food', 'Experience', 'Workshop'],
    price: 145,
    currency: 'USD',
    location: 'Napa Valley, CA',
    highlights: ['Farm tour', '4-course meal', 'Wine pairing', 'Recipe booklet'],
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: 'l6',
    type: 'listing',
    title: 'Vintage Watch Appraisal Service',
    slug: 'vintage-watch-appraisal',
    excerpt: 'Expert authentication and valuation of vintage timepieces by certified horologists with over 30 years experience.',
    coverImage: '/images/listings/vintage-watch.jpg',
    author: users[4],
    createdAt: '2024-03-10T16:00:00Z',
    updatedAt: '2024-03-10T16:00:00Z',
    featured: false,
    tags: ['Service', 'Luxury', 'Watches'],
    price: 75,
    currency: 'USD',
    location: 'New York, NY',
    highlights: ['Certificate included', 'Same-day service', 'Insurance documentation', 'Expert consultation'],
    rating: 4.6,
    reviewCount: 67,
  },
]

export const mockPosts: Post[] = [...articles, ...galleries, ...listings]

export const featuredPosts: Post[] = mockPosts.filter(post => post.featured)

export const trendingPosts: Post[] = [...mockPosts].sort(() => Math.random() - 0.5).slice(0, 12)

export const latestListings: Listing[] = listings.slice(0, 6)

export function getPostBySlug(slug: string): Post | undefined {
  return mockPosts.find(post => post.slug === slug)
}

export function getPostsByType(type: Post['type']): Post[] {
  return mockPosts.filter(post => post.type === type)
}

export function searchPosts(query: string): Post[] {
  const lowerQuery = query.toLowerCase()
  return mockPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
