export const siteRuntimeAdapter = {
  siteCode: process.env.NEXT_PUBLIC_SITE_CODE || 'listing_next_main',
  environment: process.env.NEXT_PUBLIC_SITE_RUNTIME_ENV || 'local',
  sdkVersion: process.env.NEXT_PUBLIC_SITE_RUNTIME_SDK_VERSION || 'site-runtime-v1',
  connectorVersion: '2026-03-connector-v1',
  supportedTasks: ['listing'],
  capabilities: {
    bootstrap: true,
    feed: true,
    revalidate: true,
    search: true,
  },
}
