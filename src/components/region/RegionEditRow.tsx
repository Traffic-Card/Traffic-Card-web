import type { FavoriteRegionRequest } from '../../types/api'
import styles from './RegionEditRow.module.css'

function IconTag() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

type Props = {
  region: FavoriteRegionRequest
  onChange: (updated: FavoriteRegionRequest) => void
  onDelete: () => void
  onMapOpen: () => void
}

export default function RegionEditRow({ region, onChange, onDelete, onMapOpen }: Props) {
  return (
    <div className={styles.row}>

      {/* 별칭 입력 */}
      <div className={styles.inputField}>
        <input
          className={styles.input}
          value={region.alias}
          placeholder="별칭"
          onChange={e => onChange({ ...region, alias: e.target.value })}
        />
        <span className={styles.icon}><IconTag /></span>
      </div>

      {/* 주소: 전체 클릭으로 지도 오픈 */}
      <div className={`${styles.inputField} ${styles.clickable}`} onClick={onMapOpen}>
        <input
          className={styles.input}
          value={region.address}
          placeholder="주소 (클릭하여 지도에서 선택)"
          readOnly
        />
        <span className={`${styles.icon} ${styles.iconActive}`}><IconMapPin /></span>
      </div>

      {/* 삭제 */}
      <button className={styles.deleteBtn} type="button" onClick={onDelete}>✕</button>

    </div>
  )
}
