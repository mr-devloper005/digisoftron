export type RuntimeHeartbeatPayload = {
  status?: 'ONLINE' | 'DEGRADED' | 'OFFLINE'
  responseTimeMs?: number
  lastError?: string
}

export type SiteRuntimeClientOptions = {
  endpoint: string
  buildPayload: () => Record<string, unknown>
  intervalMs?: number
}

export function createSiteRuntimeClient(options: SiteRuntimeClientOptions) {
  const intervalMs = options.intervalMs ?? 60_000
  let timer: ReturnType<typeof setInterval> | null = null

  const send = async (payload: RuntimeHeartbeatPayload = {}) => {
    await fetch(options.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...options.buildPayload(),
        ...payload,
      }),
      keepalive: true,
    })
  }

  return {
    start() {
      void send()
      timer = setInterval(() => {
        void send()
      }, intervalMs)
    },
    stop() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    },
    send,
  }
}
