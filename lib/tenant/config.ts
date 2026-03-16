export interface TenantConfig {
  id: string
  name: string
  tagline: string
  domain: string
  logo: string
  primaryColor: string
  accentColor: string
  gradientFrom: string
  gradientTo: string
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
    name: 'Discover',
    tagline: 'Stories, galleries, and experiences worth sharing',
    domain: 'localhost:3000',
    logo: '/logo.svg',
    primaryColor: '#0a0a0a',
    accentColor: '#3b82f6',
    gradientFrom: '#0a0a0a',
    gradientTo: '#1e293b',
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
    primaryColor: '#1a1a2e',
    accentColor: '#e94560',
    gradientFrom: '#1a1a2e',
    gradientTo: '#16213e',
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
