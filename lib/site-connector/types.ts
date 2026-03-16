export type SiteTask = 'listing' | 'article' | 'image' | 'profile' | 'classified' | 'social'

export interface SiteBlueprint {
  connectorVersion: string
  supportedTasks: SiteTask[]
  endpoints: {
    bootstrap: string
    feed: string
  }
  frontend: {
    baseUrl: string | null
    siteType: string
    taskViews: Partial<Record<SiteTask, string>>
    metrics: string[]
  }
}

export interface SiteBootstrap {
  site: {
    id: string
    code: string
    name: string
    category: string
    framework: string
    theme?: string | null
    config?: Record<string, unknown> | null
    updatedAt?: string
  }
  blueprint: SiteBlueprint
}

export interface SiteFeed<TPost> extends SiteBootstrap {
  posts: TPost[]
}
