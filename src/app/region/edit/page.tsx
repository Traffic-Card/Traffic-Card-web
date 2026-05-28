import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../../context/AppStateContext'
import AppHeader from '../../../components/common/AppHeader'
import RegionEditRow from '../../../components/region/RegionEditRow'
import KakaoMapPicker, { type PickedLocation } from '../../../components/map/KakaoMapPicker'
import type { FavoriteRegionRequest } from '../../../types/api'
import { getRegions, putRegions } from '../../../lib/api'
import { ROUTES } from '../../../constants/routes'
import styles from './edit.module.css'

export default function RegionEditPage() {
  const { isLoggedIn } = useAppState()
  const navigate = useNavigate()
  const [regions, setRegions] = useState<FavoriteRegionRequest[]>([])
  const [pickerIndex, setPickerIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn) { navigate(ROUTES.LOGIN); return }
    getRegions()
      .then(data => setRegions(data.map(r => ({ ...r }))))
      .catch(() => setError('관심 지역을 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  function handleChange(index: number, updated: FavoriteRegionRequest) {
    setRegions(prev => prev.map((r, i) => (i === index ? updated : r)))
  }

  function handleDelete(index: number) {
    setRegions(prev => prev.filter((_, i) => i !== index))
  }

  function handleAdd() {
    setRegions(prev => [
      ...prev,
      { alias: '', address: '', regionName: '', latitude: 0, longitude: 0 },
    ])
  }

  function handlePickerSelect(loc: PickedLocation) {
    if (pickerIndex === null) return
    setRegions(prev => prev.map((r, i) =>
      i === pickerIndex
        ? { ...r, address: loc.address, regionName: loc.regionName, latitude: loc.latitude, longitude: loc.longitude }
        : r
    ))
    setPickerIndex(null)
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      await putRegions(regions)
      navigate(ROUTES.REGION)
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <AppHeader activeTab="region" />

      <div className={styles.contentArea}>
        <div className={styles.contentInner}>
          <span className={styles.sectionLabel}>관심지역 편집</span>

          {loading && <p className={styles.statusMsg}>불러오는 중...</p>}
          {error && <p className={styles.errorMsg}>{error}</p>}

          {!loading && (
            <div className={styles.listArea}>
              {regions.map((region, i) => (
                <RegionEditRow
                  key={region.id ?? `new-${i}`}
                  region={region}
                  onChange={updated => handleChange(i, updated)}
                  onDelete={() => handleDelete(i)}
                  onMapOpen={() => setPickerIndex(i)}
                />
              ))}
              <button className={styles.addBtn} type="button" onClick={handleAdd}>+</button>
            </div>
          )}

          <div className={styles.actionRow}>
            <button
              className={styles.backBtn}
              type="button"
              onClick={() => navigate(ROUTES.REGION)}
            >
              ← 돌아가기
            </button>
            <button
              className={styles.saveBtn}
              type="button"
              onClick={handleSave}
              disabled={saving || loading}
            >
              {saving ? '저장 중...' : '저장 →'}
            </button>
          </div>
        </div>
      </div>

      {pickerIndex !== null && (
        <KakaoMapPicker
          onSelect={handlePickerSelect}
          onClose={() => setPickerIndex(null)}
        />
      )}
    </div>
  )
}
