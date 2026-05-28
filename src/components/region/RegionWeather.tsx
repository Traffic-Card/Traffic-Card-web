import { useEffect, useState } from 'react'
import { fetchWeather, weatherIconUrl, type WeatherInfo } from '../../lib/weather'
import styles from './RegionWeather.module.css'

type Props = {
  latitude: number
  longitude: number
}

export default function RegionWeather({ latitude, longitude }: Props) {
  const [weather, setWeather] = useState<WeatherInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetchWeather(latitude, longitude)
      .then(setWeather)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [latitude, longitude])

  if (loading) return <div className={styles.placeholder}>날씨 정보 로딩 중...</div>
  if (error || !weather) return <div className={styles.placeholder}>날씨 정보를 불러오지 못했습니다.</div>

  return (
    <div className={styles.weather}>
      <img
        className={styles.icon}
        src={weatherIconUrl(weather.iconCode, '2x')}
        alt={weather.description}
      />
      <div className={styles.main}>
        <span className={styles.temp}>{weather.temp}°<small>C</small></span>
        <span className={styles.desc}>{weather.description}</span>
      </div>
      <div className={styles.range}>
        <span className={styles.min}>↓ {weather.tempMin}°</span>
        <span className={styles.max}>↑ {weather.tempMax}°</span>
      </div>
    </div>
  )
}
