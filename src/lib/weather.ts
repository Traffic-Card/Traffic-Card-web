const WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

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

  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric&lang=ko`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`)
  const json = await res.json()
  const data: WeatherInfo = {
    temp:        Math.round(json.main.temp),
    tempMin:     Math.round(json.main.temp_min),
    tempMax:     Math.round(json.main.temp_max),
    description: json.weather[0].description,
    iconCode:    json.weather[0].icon,
  }
  cache.set(key, { data, expiresAt: Date.now() + TTL_MS })
  return data
}

export function weatherIconUrl(iconCode: string, size: '1x' | '2x' = '2x'): string {
  if (size === '1x') return `https://openweathermap.org/img/wn/${iconCode}.png`
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
