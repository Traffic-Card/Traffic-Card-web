import { useEffect, useRef, useState } from 'react'
import styles from './TrafficMap.module.css'
import { loadKakaoMaps } from '../../lib/kakaoMaps'

type Props = {
  latitude: number
  longitude: number
  zoom?: number
  draggable?: boolean
}

export default function TrafficMap({ latitude, longitude, zoom = 6, draggable = false }: Props) {
  const mapRef = useRef<any>(null)
  const mapId = useRef(`traffic-map-${Math.random().toString(36).slice(2)}`).current
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let destroyed = false

    async function init() {
      try {
        await loadKakaoMaps()
        if (destroyed) return

        const container = document.getElementById(mapId)
        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: zoom,
        })
        map.setDraggable(draggable)
        map.setZoomable(false)
        mapRef.current = map

        map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC)

        window.kakao.maps.event.addListener(map, 'tilesloaded', () => {
          if (destroyed) return
          setLoading(false)
        })
      } catch (caughtError) {
        console.error('[TrafficMap]', caughtError)
        if (!destroyed) {
          setLoading(false)
          setError(true)
        }
      }
    }

    void init()

    return () => {
      destroyed = true
      mapRef.current = null
    }
  }, [latitude, longitude, zoom, draggable, mapId])

  return (
    <div className={styles.wrapper}>
      <div id={mapId} className={styles.map} />
      {!draggable && <div className={styles.blocker} />}
      {loading && <div className={styles.overlay}>교통 정보 로딩 중...</div>}
      {error && <div className={styles.overlay}>교통 정보를 불러오지 못했습니다.</div>}
      {!loading && !error && (
        <div className={styles.legend}>
          <span style={{ color: '#22c55e' }}>원활</span>
          <span style={{ color: '#f59e0b' }}>서행</span>
          <span style={{ color: '#ef4444' }}>정체</span>
        </div>
      )}
    </div>
  )
}
