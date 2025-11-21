import { wpHealthCheck, getWpApiBase } from '@/lib/wp'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const health = await wpHealthCheck()
    const status = health.ok ? 200 : 503
    return Response.json(
      {
        ok: health.ok,
        target: health.target,
        latencyMs: health.latencyMs,
        sample: health.sample,
      },
      { status }
    )
  } catch (error) {
    return Response.json(
      {
        ok: false,
        target: getWpApiBase(),
        error: error.message,
      },
      { status: 500 }
    )
  }
}
