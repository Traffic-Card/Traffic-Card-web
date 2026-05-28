import { useEffect, useRef, useState } from 'react'
import { loadKakaoMaps } from '../../lib/kakaoMaps'
import { fetchWeather, weatherIconUrl, type WeatherInfo } from '../../lib/weather'
import { KOREA_LOCATIONS, type KoreaLocation } from '../../constants/koreaLocations'
import styles from './KoreaWeatherSection.module.css'

const MAP_ID = 'korea-weather-map'

type CityWeather = {
  city: KoreaLocation
  weather: WeatherInfo | null
}

/* 지도 위에 올라가는 오버레이 HTML (Kakao Maps에 직접 삽입) */
function overlayHTML(name: string, w: WeatherInfo): string {
  return `
    <div style="
      background:rgba(48,47,47,0.90);
      color:#fff;
      padding:5px 8px 4px;
      border-radius:8px;
      font-size:11px;
      font-family:-apple-system,sans-serif;
      display:flex;
      align-items:center;
      gap:3px;
      border:1px solid rgba(52,158,235,0.55);
      white-space:nowrap;
      pointer-events:none;
    ">
      <img src="https://openweathermap.org/img/wn/${w.iconCode}.png"
           width="22" height="22" style="margin:-3px -2px">
      <span style="font-weight:700">${name}</span>
      <span style="color:#349eeb;font-weight:700;margin-left:2px">${w.temp}°</span>
    </div>`
}

export default function KoreaWeatherSection() {
  const mapRef      = useRef<any>(null)
  const overlaysRef = useRef<any[]>([])
  const [mapReady, setMapReady]     = useState(false)
  const [cities,   setCities]       = useState<CityWeather[]>([])
  const [weatherLoading, setWeatherLoading] = useState(true)

  /* ── 지도 초기화 ── */
  useEffect(() => {
    let destroyed = false
    loadKakaoMaps().then(() => {
      if (destroyed) return
      const container = document.getElementById(MAP_ID)
      if (!container) return
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(36.3, 128.6),
        level: 13,
      })
      map.setDraggable(false)
      map.setZoomable(false)
      mapRef.current = map
      setMapReady(true)
    })
    return () => { destroyed = true; mapRef.current = null }
  }, [])

  /* ── 10개 도시 날씨 일괄 조회 ── */
  useEffect(() => {
    Promise.allSettled(
      KOREA_LOCATIONS.map(city => fetchWeather(city.lat, city.lon))
    ).then(results => {
      setCities(KOREA_LOCATIONS.map((city, i) => ({
        city,
        weather: results[i].status === 'fulfilled'
          ? (results[i] as PromiseFulfilledResult<WeatherInfo>).value
          : null,
      })))
      setWeatherLoading(false)
    })
  }, [])

  /* ── 오버레이 추가 (지도 + 날씨 모두 준비된 후) ── */
  useEffect(() => {
    if (!mapReady || cities.length === 0 || !mapRef.current) return

    /* 이전 오버레이 제거 */
    overlaysRef.current.forEach(o => o.setMap(null))
    overlaysRef.current = []

    cities.forEach(({ city, weather }) => {
      if (!weather) return
      const overlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(city.lat, city.lon),
        content: overlayHTML(city.name, weather),
        yAnchor: 1.05,
      })
      overlay.setMap(mapRef.current)
      overlaysRef.current.push(overlay)
    })

    return () => {
      overlaysRef.current.forEach(o => o.setMap(null))
      overlaysRef.current = []
    }
  }, [mapReady, cities])

  /* 티커용 완성된 데이터만 추출 */
  const tickerItems = cities.filter(c => c.weather !== null)

  return (
    <div className={styles.section}>
      {/* 카카오 지도 */}
      <div className={styles.mapWrapper}>
        <div id={MAP_ID} className={styles.map} />
      </div>

      {/* 뉴스 ticker */}
      <div className={styles.tickerBar}>
        {weatherLoading ? (
          <span className={styles.tickerLoading}>날씨 정보 로딩 중...</span>
        ) : (
          <div className={styles.tickerTrack}>
            {/* 무한 루프를 위해 2벌 복제 */}
            {[...tickerItems, ...tickerItems].map(({ city, weather }, i) => (
              <div className={styles.tickerItem} key={`${city.id}-${i}`}>
                <img
                  className={styles.tickerIcon}
                  src={weatherIconUrl(weather!.iconCode, '1x')}
                  alt={weather!.description}
                />
                <span className={styles.tickerCity}>{city.name}</span>
                <span className={styles.tickerTemp}>{weather!.temp}°</span>
                <span className={styles.tickerRange}>
                  <span className={styles.rangeMin}>↓{weather!.tempMin}°</span>
                  <span className={styles.rangeMax}>↑{weather!.tempMax}°</span>
                </span>
                <span className={styles.tickerDesc}>{weather!.description}</span>
                <span className={styles.tickerDivider}>│</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
