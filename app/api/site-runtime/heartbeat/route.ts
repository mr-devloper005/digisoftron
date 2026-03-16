import { NextResponse } from 'next/server'
import { siteRuntimeAdapter } from '@/lib/site-runtime/site-adapter'

const BACKEND_URL = process.env.NEXT_PUBLIC_MASTER_PANEL_URL
const RUNTIME_KEY = process.env.MASTER_PANEL_RUNTIME_KEY || process.env.NEXT_PUBLIC_SITE_RUNTIME_KEY

export async function POST(request: Request) {
  if (!BACKEND_URL || !RUNTIME_KEY) {
    return NextResponse.json(
      { ok: false, error: 'Runtime heartbeat is not configured.' },
      { status: 500 }
    )
  }

  const startedAt = Date.now()
  const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>

  const response = await fetch(`${BACKEND_URL.replace(/\/$/, '')}/api/v1/runtime/heartbeat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': RUNTIME_KEY,
    },
    body: JSON.stringify({
      siteCode: siteRuntimeAdapter.siteCode,
      environment: siteRuntimeAdapter.environment,
      sdkVersion: siteRuntimeAdapter.sdkVersion,
      connectorVersion: siteRuntimeAdapter.connectorVersion,
      supportedTasks: siteRuntimeAdapter.supportedTasks,
      capabilities: siteRuntimeAdapter.capabilities,
      ...payload,
      responseTimeMs:
        typeof payload.responseTimeMs === 'number'
          ? payload.responseTimeMs
          : Date.now() - startedAt,
    }),
  })

  const json = (await response.json().catch(() => ({}))) as Record<string, unknown>

  return NextResponse.json(json, { status: response.status })
}
