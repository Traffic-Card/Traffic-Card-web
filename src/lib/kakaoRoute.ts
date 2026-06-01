import { getAccessToken } from './api'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? ''

export type RoutePriority = 'RECOMMEND' | 'TIME' | 'DISTANCE'

export type RouteResult = {
  distance: number   // 미터
  duration: number   // 초
  taxiFare: number   // 원
  tollFare: number   // 원
  path: Array<{ latitude: number; longitude: number }>
}

export async function fetchRoute(
  origin: { latitude: number; longitude: number; name?: string },
  dest:   { latitude: number; longitude: number; name?: string },
  priority: RoutePriority = 'RECOMMEND',
): Promise<RouteResult> {
  const token = getAccessToken()
  const params = new URLSearchParams({
    originLat: String(origin.latitude),
    originLon: String(origin.longitude),
    destLat:   String(dest.latitude),
    destLon:   String(dest.longitude),
    priority,
  })

  const res = await fetch(`${BASE_URL}/api/v1/route?${params}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error(`Route API 오류: HTTP ${res.status}`)

  return res.json()
}

/** 초 → "N시간 M분" 문자열 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h === 0) return `${m}분`
  return `${h}시간 ${m > 0 ? `${m}분` : ''}`
}

/** 미터 → "N.Nkm" 또는 "Nm" 문자열 */
export function formatDistance(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)}km`
  return `${meters}m`
}
