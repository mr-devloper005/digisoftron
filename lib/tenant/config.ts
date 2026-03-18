export interface TenantConfig {
  id: string
  name: string
  tagline: string
  domain: string
  logo: string
  siteCode: string
  supportedTasks: string[]
  primaryColor: string
  accentColor: string
  gradientFrom: string
  gradientTo: string
  brand: {
    name: string
    tagline: string
    logoLetter: string
    description: string
    footerDescription: string
    copyrightText: string
  }
  navLinks: Array<{ href: string; label: string }>
  auth: {
    signInLabel: string
    signInHref: string
    getStartedLabel: string
    getStartedHref: string
    dashboardLabel: string
    signOutLabel: string
  }
  hero: {
    badge: string
    title: string
    description: string
    searchPlaceholder: string
    popularSearches: string[]
    highlights: Array<{
      title: string
      description: string
      icon: 'building' | 'map' | 'shield'
    }>
  }
  latestListings: {
    title: string
    subtitle: string
    ctaLabel: string
    ctaMobileLabel: string
  }
  listings: {
    title: string
    subtitle: string
    emptyMessage: string
  }
  search: {
    heading: string
    placeholder: string
    helperText: string
    emptyTitle: string
    emptyDescription: string
    noResultsTitle: string
  }
  footer: {
    exploreLinks: Array<{ href: string; label: string }>
    companyLinks: Array<{ href: string; label: string }>
    supportLinks: Array<{ href: string; label: string }>
  }
  metadata: {
    title: string
    titleTemplate: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
    authors: string[]
  }
  socialLinks: {
    twitter?: string
    instagram?: string
    linkedin?: string
    facebook?: string
  }
}

export const tenants: Record<string, TenantConfig> = {
  default: {
    id: 'default',
    name: 'digisoftron.com',
    tagline: 'Listing marketplace',
    domain: 'digisoftron.com',
    logo: '/logo.svg',
    siteCode: process.env.NEXT_PUBLIC_SITE_CODE || 'digisoftron',
    supportedTasks: ['listing'],
    primaryColor: '#0a0a0a',
    accentColor: '#3b82f6',
    gradientFrom: '#0a0a0a',
    gradientTo: '#1e293b',
    brand: {
      name: 'digisoftron.com',
      tagline: 'Listing marketplace',
      logoLetter: 'D',
      description: 'Verified listings for agencies, products, consultants, and local service businesses.',
      footerDescription:
        'digisoftron.com helps visitors discover verified listings for agencies, products, consultants, and local service businesses.',
      copyrightText: '© 2026 digisoftron.com. All rights reserved.',
    },
    navLinks: [
      { href: '/', label: 'Home' },
      { href: '/listings', label: 'Listings' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    auth: {
      signInLabel: 'Sign In',
      signInHref: '/signin',
      getStartedLabel: 'Get Started',
      getStartedHref: '/get-started',
      dashboardLabel: 'Dashboard',
      signOutLabel: 'Sign Out',
    },
    hero: {
      badge: 'Verified listings on digisoftron.com',
      title: 'Find trusted digital services, local businesses, and growth-ready listings',
      description:
        'digisoftron.com is a listing-first marketplace. Browse agencies, consultants, products, and service providers with live search and direct detail pages.',
      searchPlaceholder: 'Search listings, services, agencies, tools...',
      popularSearches: ['SEO agency', 'Web development', 'Digital marketing', 'Local listing', 'SaaS tools'],
      highlights: [
        {
          title: 'Service Providers',
          description: 'Agencies, consultants, developers, and niche operators.',
          icon: 'building',
        },
        {
          title: 'Local + Global',
          description: 'Structured listings with location, pricing, ratings, and highlights.',
          icon: 'map',
        },
        {
          title: 'Live Search',
          description: 'Instant search routes visitors to relevant results as they type.',
          icon: 'shield',
        },
      ],
    },
    latestListings: {
      title: 'New on digisoftron.com',
      subtitle: 'Fresh listings for agencies, local services, and business offers.',
      ctaLabel: 'View all',
      ctaMobileLabel: 'View all listings',
    },
    listings: {
      title: 'digisoftron.com listings',
      subtitle: 'Browse verified agencies, products, consultants, and business services.',
      emptyMessage: 'No listings found',
    },
    search: {
      heading: 'Search listings',
      placeholder: 'Search listings, agencies, services, products...',
      helperText: 'Results update instantly after you type two or more characters.',
      emptyTitle: 'Search listings',
      emptyDescription: 'Search digisoftron.com for services, agencies, products, and local businesses.',
      noResultsTitle: 'No results found',
    },
    footer: {
      exploreLinks: [
        { href: '/listings', label: 'Listings' },
        { href: '/trending', label: 'Trending' },
        { href: '/featured', label: 'Featured' },
      ],
      companyLinks: [
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
        { href: '/careers', label: 'Careers' },
        { href: '/press', label: 'Press' },
        { href: '/blog', label: 'Blog' },
      ],
      supportLinks: [
        { href: '/help', label: 'Help Center' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/cookies', label: 'Cookie Policy' },
        { href: '/accessibility', label: 'Accessibility' },
      ],
    },
    metadata: {
      title: 'digisoftron.com - Listing Marketplace',
      titleTemplate: '%s | digisoftron.com',
      description: 'Discover verified listings for agencies, products, consultants, and local service businesses.',
      keywords: ['listings', 'agencies', 'local services', 'consultants', 'marketplace'],
      ogTitle: 'digisoftron.com - Listing Marketplace',
      ogDescription: 'Discover verified listings for agencies, products, consultants, and local service businesses.',
      authors: ['digisoftron.com'],
    },
    socialLinks: {
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
    },
  },
  premium: {
    id: 'premium',
    name: 'Curate',
    tagline: 'Premium content for discerning audiences',
    domain: 'premium.localhost:3000',
    logo: '/logo-premium.svg',
    siteCode: process.env.NEXT_PUBLIC_SITE_CODE || 'curate',
    supportedTasks: ['listing'],
    primaryColor: '#1a1a2e',
    accentColor: '#e94560',
    gradientFrom: '#1a1a2e',
    gradientTo: '#16213e',
    brand: {
      name: 'Curate',
      tagline: 'Premium content for discerning audiences',
      logoLetter: 'C',
      description: 'Premium content for discerning audiences.',
      footerDescription: 'Curate highlights premium content for discerning audiences.',
      copyrightText: '© 2026 Curate. All rights reserved.',
    },
    navLinks: [
      { href: '/', label: 'Home' },
      { href: '/listings', label: 'Listings' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    auth: {
      signInLabel: 'Sign In',
      signInHref: '/signin',
      getStartedLabel: 'Get Started',
      getStartedHref: '/get-started',
      dashboardLabel: 'Dashboard',
      signOutLabel: 'Sign Out',
    },
    hero: {
      badge: 'Premium listings on Curate',
      title: 'Discover premium content and curated experiences',
      description: 'Curate brings high-end listings, products, and experiences into one premium marketplace.',
      searchPlaceholder: 'Search premium listings...',
      popularSearches: ['Luxury stays', 'Private chefs', 'Exclusive events'],
      highlights: [
        { title: 'Premium Providers', description: 'Handpicked premium service providers.', icon: 'building' },
        { title: 'Global Reach', description: 'Curated listings across top markets.', icon: 'map' },
        { title: 'Verified', description: 'Trusted and verified content for premium audiences.', icon: 'shield' },
      ],
    },
    latestListings: {
      title: 'New on Curate',
      subtitle: 'Fresh premium listings added weekly.',
      ctaLabel: 'View all',
      ctaMobileLabel: 'View all listings',
    },
    listings: {
      title: 'Curate listings',
      subtitle: 'Browse premium agencies, products, and experiences.',
      emptyMessage: 'No listings found',
    },
    search: {
      heading: 'Search listings',
      placeholder: 'Search listings...',
      helperText: 'Results update instantly after you type two or more characters.',
      emptyTitle: 'Search listings',
      emptyDescription: 'Search Curate for premium services, agencies, and experiences.',
      noResultsTitle: 'No results found',
    },
    footer: {
      exploreLinks: [
        { href: '/listings', label: 'Listings' },
        { href: '/trending', label: 'Trending' },
        { href: '/featured', label: 'Featured' },
      ],
      companyLinks: [
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
      ],
      supportLinks: [
        { href: '/help', label: 'Help Center' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/privacy', label: 'Privacy Policy' },
      ],
    },
    metadata: {
      title: 'Curate - Premium Listings',
      titleTemplate: '%s | Curate',
      description: 'Premium content for discerning audiences.',
      keywords: ['premium listings', 'experiences', 'curated content'],
      ogTitle: 'Curate - Premium Listings',
      ogDescription: 'Premium content for discerning audiences.',
      authors: ['Curate Team'],
    },
    socialLinks: {
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
    },
  },
}

export function getTenantConfig(tenantId: string = 'default'): TenantConfig {
  return tenants[tenantId] || tenants.default
}

export function getCurrentTenant(): TenantConfig {
  // In a real app, this would detect from subdomain/header
  return tenants.default
}

export function getSiteConfig(): TenantConfig {
  return getCurrentTenant()
}
