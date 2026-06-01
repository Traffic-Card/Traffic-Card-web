const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? ''

export type WeatherInfo = {
  temp: number
  tempMin: number
  tempMax: number
  description: string
  iconCode: string
}

/* ── 메모리 캐시 (TTL: 5분) ── */
const TTL_MS = 5 * 60 * 1000

type CacheEntry = { data: WeatherInfo; expiresAt: number }
const cache = new Map<string, CacheEntry>()

export async function fetchWeather(lat: number, lon: number): Promise<WeatherInfo> {
  const key = `${lat.toFixed(4)},${lon.toFixed(4)}`
  const hit = cache.get(key)
  if (hit && Date.now() < hit.expiresAt) return hit.data

  const res = await fetch(`${BASE_URL}/api/v1/weather?lat=${lat}&lon=${lon}`)
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`)

  const data: WeatherInfo = await res.json()
  cache.set(key, { data, expiresAt: Date.now() + TTL_MS })
  return data
}

export function weatherIconUrl(iconCode: string, size: '1x' | '2x' = '2x'): string {
  if (size === '1x') return `https://openweathermap.org/img/wn/${iconCode}.png`
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
