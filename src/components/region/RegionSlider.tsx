import type { FavoriteRegionResponse } from '../../types/api'
import RegionCard from './RegionCard'
import PaginationDots from '../common/PaginationDots'
import styles from './RegionSlider.module.css'

type Props = {
  regions: FavoriteRegionResponse[]
  index: number
  onPrev: () => void
  onNext: () => void
}

export default function RegionSlider({ regions, index, onPrev, onNext }: Props) {
  const current = regions[index]
  const isFirst = index === 0
  const isLast = index === regions.length - 1

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <button className={styles.arrow} onClick={onPrev} disabled={isFirst}>&#8249;</button>
        <RegionCard key={current.id} region={current} />
        <button className={styles.arrow} onClick={onNext} disabled={isLast}>&#8250;</button>
      </div>
      <PaginationDots total={regions.length} current={index} />
    </div>
  )
}
