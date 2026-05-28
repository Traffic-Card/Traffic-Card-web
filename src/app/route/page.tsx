import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../../components/common/AppHeader'
import { useAppState } from '../../context/AppStateContext'
import { getRegions } from '../../lib/api'
import { loadKakaoMaps } from '../../lib/kakaoMaps'
import {
  fetchRoute,
  formatDistance,
  formatDuration,
  type RoutePriority,
  type RouteResult,
} from '../../lib/kakaoRoute'
import type { FavoriteRegionResponse } from '../../types/api'
import { ROUTES } from '../../constants/routes'
import styles from './route.module.css'

const MAP_ID = 'route-kakao-map'

const PRIORITY_OPTIONS: { value: RoutePriority; label: string }[] = [
  { value: 'RECOMMEND', label: '추천' },
  { value: 'TIME',      label: '최단시간' },
  { value: 'DISTANCE',  label: '최단거리' },
]

export default function RoutePage() {
  const { isLoggedIn } = useAppState()
  const navigate = useNavigate()

  /* ── 지역 목록 ── */
  const [regions,        setRegions]        = useState<FavoriteRegionResponse[]>([])
  const [regionsLoading, setRegionsLoading] = useState(true)

  /* ── 선택 상태 ── */
  const [originId, setOriginId] = useState<number | ''>('')
  const [destId,   setDestId]   = useState<number | ''>('')
  const [priority, setPriority] = useState<RoutePriority>('RECOMMEND')

  /* ── 경로 결과 ── */
  const [result,    setResult]    = useState<RouteResult | null>(null)
  const [searching, setSearching] = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  /* ── 지도 ── */
  const mapRef      = useRef<any>(null)
  const polylineRef = useRef<any>(null)
  const markersRef  = useRef<any[]>([])
  const [mapReady,  setMapReady]  = useState(false)

  /* 지역 목록 조회 */
  useEffect(() => {
    if (!isLoggedIn) return
    getRegions()
      .then(setRegions)
      .catch(() => setRegions([]))
      .finally(() => setRegionsLoading(false))
  }, [isLoggedIn])

  /* 카카오 지도 초기화 */
  useEffect(() => {
    let destroyed = false
    loadKakaoMaps().then(() => {
      if (destroyed) return
      const container = document.getElementById(MAP_ID)
      if (!container) return
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(36.5, 127.9),
        level: 13,
      })
      mapRef.current = map
      setMapReady(true)
    })
    return () => {
      destroyed = true
      mapRef.current = null
    }
  }, [])

  /* 경로 찾기 */
  async function handleSearch() {
    if (originId === '' || destId === '') return
    const origin = regions.find(r => r.id === originId)
    const dest   = regions.find(r => r.id === destId)
    if (!origin || !dest) return

    setSearching(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetchRoute(
        { lat: origin.latitude,  lon: origin.longitude,  name: origin.alias },
        { lat: dest.latitude,    lon: dest.longitude,    name: dest.alias },
        priority,
      )
      setResult(res)
    } catch (e: any) {
      setError(e.message ?? '경로를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setSearching(false)
    }
  }

  /* 지도에 경로 그리기 */
  useEffect(() => {
    if (!mapReady || !result || !mapRef.current) return
    const map = mapRef.current

    /* 이전 폴리라인·마커 제거 */
    polylineRef.current?.setMap(null)
    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []

    if (result.path.length === 0) return

    const kakao = window.kakao

    /* 폴리라인 */
    const linePath = result.path.map(
      p => new kakao.maps.LatLng(p.latitude, p.longitude),
    )
    const polyline = new kakao.maps.Polyline({
      path:          linePath,
      strokeWeight:  5,
      strokeColor:   '#349eeb',
      strokeOpacity: 0.9,
      strokeStyle:   'solid',
    })
    polyline.setMap(map)
    polylineRef.current = polyline

    /* 출발지 · 도착지 마커 */
    const origin = regions.find(r => r.id === originId)
    const dest   = regions.find(r => r.id === destId)

    const markerData = [
      { pos: result.path[0],                     label: origin?.alias ?? '출발', color: '#349eeb' },
      { pos: result.path[result.path.length - 1], label: dest?.alias  ?? '도착', color: '#ef4444' },
    ]

    markerData.forEach(({ pos, label, color }) => {
      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(pos.lat, pos.lon),
        content: `
          <div style="
            background:${color};
            color:#fff;
            padding:5px 10px 4px;
            border-radius:8px;
            font-size:12px;
            font-family:-apple-system,sans-serif;
            font-weight:700;
            white-space:nowrap;
            box-shadow:0 2px 8px rgba(0,0,0,0.25);
          ">${label}</div>`,
        yAnchor: 1.4,
      })
      overlay.setMap(map)
      markersRef.current.push(overlay)
    })

    /* 경로 전체가 보이도록 지도 범위 조정 */
    const bounds = new kakao.maps.LatLngBounds()
    linePath.forEach(p => bounds.extend(p))
    map.setBounds(bounds, 60, 60, 60, 60)
  }, [mapReady, result])

  /* 비로그인 */
  if (!isLoggedIn) {
    return (
      <div className={styles.page}>
        <AppHeader activeTab="route" />
        <main className={styles.contentArea}>
          <div className={styles.contentInner}>
            <div className={styles.loginPrompt}>
              <span className={styles.loginPromptIcon}>🗺️</span>
              <span className={styles.loginPromptText}>로그인 후 길찾기를 이용할 수 있습니다.</span>
              <button
                className={styles.loginPromptBtn}
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                로그인
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const canSearch =
    originId !== '' && destId !== '' && originId !== destId && !searching

  return (
    <div className={styles.page}>
      <AppHeader activeTab="route" />

      <main className={styles.contentArea}>
        <div className={styles.contentInner}>

          {/* ── 컨트롤 패널 ── */}
          <div className={styles.controls}>
            {/* 출발지 */}
            <div className={styles.selectGroup}>
              <span className={styles.selectLabel}>출발지</span>
              <select
                className={styles.select}
                value={originId}
                onChange={e => setOriginId(e.target.value === '' ? '' : Number(e.target.value))}
                disabled={regionsLoading}
              >
                <option value="">지역 선택</option>
                {regions.map(r => (
                  <option key={r.id} value={r.id} disabled={r.id === destId}>
                    {r.alias} — {r.address}
                  </option>
                ))}
              </select>
            </div>

            <span className={styles.arrowDivider}>→</span>

            {/* 도착지 */}
            <div className={styles.selectGroup}>
              <span className={styles.selectLabel}>도착지</span>
              <select
                className={styles.select}
                value={destId}
                onChange={e => setDestId(e.target.value === '' ? '' : Number(e.target.value))}
                disabled={regionsLoading}
              >
                <option value="">지역 선택</option>
                {regions.map(r => (
                  <option key={r.id} value={r.id} disabled={r.id === originId}>
                    {r.alias} — {r.address}
                  </option>
                ))}
              </select>
            </div>

            {/* 경로 옵션 */}
            <div className={styles.optionGroup}>
              <span className={styles.selectLabel}>경로 옵션</span>
              <div className={styles.priorityRow}>
                {PRIORITY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`${styles.priorityBtn} ${priority === opt.value ? styles.priorityBtnActive : ''}`}
                    onClick={() => setPriority(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 검색 버튼 */}
            <button
              className={styles.searchBtn}
              onClick={handleSearch}
              disabled={!canSearch}
            >
              {searching ? '검색 중…' : '경로 찾기'}
            </button>
          </div>

          {/* ── 에러 ── */}
          {error && <div className={styles.errorMsg}>⚠️ {error}</div>}

          {/* ── 지도 + 결과 ── */}
          <div className={styles.resultArea}>
            <div className={styles.mapWrapper}>
              <div id={MAP_ID} className={styles.map} />

              {/* 지도 위 안내 오버레이 */}
              {!result && !searching && (
                <div className={styles.mapOverlay}>
                  <span className={styles.mapOverlayIcon}>🧭</span>
                  <span className={styles.mapOverlayText}>
                    {regionsLoading
                      ? '지역 정보를 불러오는 중…'
                      : regions.length < 2
                        ? 'My Region에서 지역을 2개 이상 추가해 주세요.'
                        : '출발지와 도착지를 선택하고 경로를 검색하세요.'}
                  </span>
                </div>
              )}

              {searching && (
                <div className={styles.mapOverlay}>
                  <div className={styles.spinner} />
                  <span className={styles.mapOverlayText}>경로를 불러오는 중…</span>
                </div>
              )}
            </div>

            {/* 요약 바 */}
            {result && (
              <div className={styles.summaryBar}>
                <div className={styles.summaryItem}>
                  <span className={`${styles.summaryValue} ${styles.summaryValueBlue}`}>
                    {formatDuration(result.duration)}
                  </span>
                  <span className={styles.summaryKey}>소요 시간</span>
                </div>
                <div className={styles.summaryDivider} />
                <div className={styles.summaryItem}>
                  <span className={styles.summaryValue}>
                    {formatDistance(result.distance)}
                  </span>
                  <span className={styles.summaryKey}>거리</span>
                </div>
                {result.taxiFare > 0 && (
                  <>
                    <div className={styles.summaryDivider} />
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryValue}>
                        {result.taxiFare.toLocaleString()}원
                      </span>
                      <span className={styles.summaryKey}>택시 요금</span>
                    </div>
                  </>
                )}
                {result.tollFare > 0 && (
                  <>
                    <div className={styles.summaryDivider} />
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryValue}>
                        {result.tollFare.toLocaleString()}원
                      </span>
                      <span className={styles.summaryKey}>통행료</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
