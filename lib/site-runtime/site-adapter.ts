import { getSiteConfig } from '@/lib/tenant/config'

const siteConfig = getSiteConfig()

export const siteRuntimeAdapter = {
  siteCode: process.env.NEXT_PUBLIC_SITE_CODE || siteConfig.siteCode,
  environment: process.env.NEXT_PUBLIC_SITE_RUNTIME_ENV || 'local',
  sdkVersion: process.env.NEXT_PUBLIC_SITE_RUNTIME_SDK_VERSION || 'site-runtime-v1',
  connectorVersion: '2026-03-connector-v1',
  supportedTasks: siteConfig.supportedTasks,
  capabilities: {
    bootstrap: true,
    feed: true,
    revalidate: true,
    search: true,
  },
}
