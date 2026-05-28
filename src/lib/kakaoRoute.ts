/**
 * Kakao Directions REST API wrapper
 *
 * 필요 환경 변수:
 *   VITE_KAKAO_REST_API_KEY=<카카오 디벨로퍼스 REST API 키>
 *
 * ※ JS 앱 키(VITE_KAKAO_MAP_API_KEY)와 별개입니다.
 *   카카오 디벨로퍼스 → 앱 → 앱 키 → REST API 키 를 복사해서 .env.local에 추가하세요.
 */

const REST_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string

if (!REST_KEY) {
  console.warn(
    '[kakaoRoute] VITE_KAKAO_REST_API_KEY가 없습니다. ' +
    '.env.local에 추가하고 dev 서버를 재시작하세요.',
  )
}

export type RoutePriority = 'RECOMMEND' | 'TIME' | 'DISTANCE'

export type RouteResult = {
  distance: number   // 미터
  duration: number   // 초
  taxiFare: number   // 원
  tollFare: number   // 원
  path: Array<{ latitude: number; longitude: number }>
}

export async function fetchRoute(
  origin: { lat: number; lon: number; name?: string },
  dest:   { lat: number; lon: number; name?: string },
  priority: RoutePriority = 'RECOMMEND',
): Promise<RouteResult> {
  const url = new URL('https://apis-navi.kakaomobility.com/v1/directions')
  url.searchParams.set('origin',      `${origin.lon},${origin.lat}`)
  url.searchParams.set('destination', `${dest.lon},${dest.lat}`)
  url.searchParams.set('priority',    priority)
  url.searchParams.set('car_type',    '1')

  const res = await fetch(url.toString(), {
    headers: { Authorization: `KakaoAK ${REST_KEY}` },
  })

  if (!res.ok) {
    throw new Error(`Kakao Directions API 오류: HTTP ${res.status}`)
  }

  const json = await res.json()
  const route = json.routes?.[0]

  if (!route || route.result_code !== 0) {
    throw new Error(route?.result_msg ?? '경로를 찾을 수 없습니다.')
  }

  const summary = route.summary
  const path: Array<{ latitude: number; longitude: number }> = []

  for (const section of route.sections ?? []) {
    for (const road of section.roads ?? []) {
      const vx: number[] = road.vertexes ?? []
      for (let i = 0; i < vx.length - 1; i += 2) {
        path.push({ longitude: vx[i], latitude: vx[i + 1] })
      }
    }
  }

  return {
    distance: summary.distance  ?? 0,
    duration: summary.duration  ?? 0,
    taxiFare: summary.fare?.taxi ?? 0,
    tollFare: summary.fare?.toll ?? 0,
    path,
  }
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
