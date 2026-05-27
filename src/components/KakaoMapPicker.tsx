import { useEffect, useRef, useState } from 'react'
import Button from './common/Button'
import styles from './KakaoMapPicker.module.css'
import { loadKakaoMaps } from '../lib/kakaoMaps'

export type PickedLocation = {
  address: string
  regionName: string
  latitude: number
  longitude: number
}

type Props = {
  onSelect: (location: PickedLocation) => void
  onClose: () => void
}

const MAP_ID = 'kakao-map-picker-map'
const DEFAULT_CENTER = { lat: 37.3826, lng: 126.6569 } // 인천 송도

function reverseGeocode(
  lat: number,
  lng: number,
): Promise<{ address: string; regionName: string }> {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder()
    geocoder.coord2Address(lng, lat, (result: any[], status: string) => {
      if (status !== window.kakao.maps.services.Status.OK || result.length === 0) {
        reject(new Error('주소를 찾을 수 없습니다.'))
        return
      }
      const { road_address, address } = result[0]
      const addressName = road_address ? road_address.address_name : address.address_name
      resolve({
        address: addressName,
        regionName: [address.region_1depth_name, address.region_2depth_name]
          .filter(Boolean)
          .join(' '),
      })
    })
  })
}

export default function KakaoMapPicker({ onSelect, onClose }: Props) {
  const mapInstance = useRef<any>(null)
  const [picked, setPicked] = useState<PickedLocation | null>(null)
  const [geocoding, setGeocoding] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function updateFromCenter(lat: number, lng: number) {
    setGeocoding(true)
    try {
      const { address, regionName } = await reverseGeocode(lat, lng)
      setPicked({ address, regionName, latitude: lat, longitude: lng })
    } catch {
      setError('주소를 가져오지 못했습니다.')
    } finally {
      setGeocoding(false)
    }
  }

  useEffect(() => {
    let destroyed = false

    loadKakaoMaps()
      .then(async () => {
        if (destroyed) return
        setLoading(false)
        const container = document.getElementById(MAP_ID)
        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
          level: 3,
        })
        mapInstance.current = map

        window.kakao.maps.event.addListener(map, 'dragend', () => {
          if (destroyed) return
          const center = map.getCenter()
          updateFromCenter(center.getLat(), center.getLng())
        })

        await updateFromCenter(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng)
      })
      .catch((err: unknown) => {
        console.error('[KakaoMapPicker]', err)
        setError('지도를 불러오지 못했습니다.')
        setLoading(false)
      })

    return () => {
      destroyed = true
      mapInstance.current = null
    }
  }, [])

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.mapWrapper}>
          <div id={MAP_ID} className={styles.mapCanvas} />
          <div className={styles.centerPin}>
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="#e53e3e"/>
              <circle cx="14" cy="14" r="5" fill="white"/>
            </svg>
          </div>
          {loading && <p className={styles.msg}>지도 로딩 중...</p>}
          {error && <p className={styles.msg}>{error}</p>}
        </div>

        <div className={styles.footer}>
          <span className={styles.address}>
            {geocoding
              ? '주소 검색 중...'
              : (picked ? picked.address : '지도를 드래그해 위치를 선택하세요')}
          </span>
          <div className={styles.actions}>
            <Button onClick={onClose}>취소</Button>
            <Button
              variant="solid"
              disabled={!picked || geocoding}
              onClick={() => picked && onSelect(picked)}
            >
              선택
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
