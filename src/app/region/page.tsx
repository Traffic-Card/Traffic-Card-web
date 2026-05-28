import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../context/AppStateContext'
import AppHeader from '../../components/common/AppHeader'
import RegionSlider from '../../components/region/RegionSlider'
import type { FavoriteRegionResponse } from '../../types/api'
import { getRegions } from '../../lib/api'
import { ROUTES } from '../../constants/routes'
import styles from './region.module.css'

export default function RegionPage() {
  const { isLoggedIn } = useAppState()
  const navigate = useNavigate()
  const [regions, setRegions] = useState<FavoriteRegionResponse[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN)
      return
    }
    getRegions()
      .then(data => {
        setRegions(data)
        setIndex(0)
      })
      .catch(() => setError('관심 지역을 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  return (
    <div className={styles.page}>
      <AppHeader activeTab="region" />

      <div className={styles.contentArea}>
        <div className={styles.contentInner}>

          {loading && <p className={styles.statusMsg}>불러오는 중...</p>}
          {error && <p className={styles.errorMsg}>{error}</p>}
          {!loading && !error && regions.length === 0 && (
            <p className={styles.statusMsg}>등록된 관심 지역이 없습니다.</p>
          )}
          {!loading && regions.length > 0 && (
            <div className={styles.sliderArea}>
              <RegionSlider
                regions={regions}
                index={index}
                onPrev={() => setIndex(i => Math.max(0, i - 1))}
                onNext={() => setIndex(i => Math.min(regions.length - 1, i + 1))}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
