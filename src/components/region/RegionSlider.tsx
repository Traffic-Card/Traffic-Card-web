import { useNavigate } from 'react-router-dom'
import type { FavoriteRegionResponse } from '../../types/api'
import { ROUTES } from '../../constants/routes'
import RegionCard from './RegionCard'
import PaginationDots from '../common/PaginationDots'
import styles from './RegionSlider.module.css'

function IconChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

type Props = {
  regions: FavoriteRegionResponse[]
  index: number
  onPrev: () => void
  onNext: () => void
}

export default function RegionSlider({ regions, index, onPrev, onNext }: Props) {
  const current = regions[index]
  const navigate = useNavigate()
  const isFirst = index === 0
  const isLast  = index === regions.length - 1

  return (
    <div className={styles.wrapper}>

      {/* ── 카드 헤더: alias | address | 편집→ ── */}
      <div className={styles.cardHeader}>
        <div className={styles.headerInfo}>
          <span className={styles.alias}>{current.alias}</span>
          <span className={styles.address}>{current.address}</span>
        </div>
        <button
          className={styles.editBtn}
          onClick={() => navigate(ROUTES.REGION_EDIT)}
        >
          편집 →
        </button>
      </div>

      {/* ── 슬라이더 ── */}
      <div className={styles.row}>
        <button className={styles.arrow} onClick={onPrev} disabled={isFirst} aria-label="이전">
          <IconChevronLeft />
        </button>
        <RegionCard key={current.id} region={current} />
        <button className={styles.arrow} onClick={onNext} disabled={isLast} aria-label="다음">
          <IconChevronRight />
        </button>
      </div>

      <PaginationDots total={regions.length} current={index} />
    </div>
  )
}
