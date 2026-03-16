'use client'

import { useEffect } from 'react'
import { createSiteRuntimeClient } from '@/lib/site-runtime/runtime-sdk'
import { siteRuntimeAdapter } from '@/lib/site-runtime/site-adapter'

export function SiteRuntimeBeacon() {
  useEffect(() => {
    const runtimeClient = createSiteRuntimeClient({
      endpoint: '/api/site-runtime/heartbeat',
      intervalMs: 60_000,
      buildPayload: () => ({
        siteCode: siteRuntimeAdapter.siteCode,
        environment: siteRuntimeAdapter.environment,
        sdkVersion: siteRuntimeAdapter.sdkVersion,
        connectorVersion: siteRuntimeAdapter.connectorVersion,
        supportedTasks: siteRuntimeAdapter.supportedTasks,
        capabilities: siteRuntimeAdapter.capabilities,
        frontendUrl: window.location.origin,
        status: 'ONLINE',
      }),
    })

    runtimeClient.start()
    return () => {
      runtimeClient.stop()
    }
  }, [])

  return null
}
