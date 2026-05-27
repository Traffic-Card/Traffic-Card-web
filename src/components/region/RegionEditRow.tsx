import type { FavoriteRegionRequest } from '../../types/api'
import Button from '../common/Button'
import styles from './RegionEditRow.module.css'

type Props = {
  region: FavoriteRegionRequest
  onChange: (updated: FavoriteRegionRequest) => void
  onDelete: () => void
  onMapOpen: () => void
}

export default function RegionEditRow({ region, onChange, onDelete, onMapOpen }: Props) {
  return (
    <div className={styles.row}>
      <input
        className={styles.input}
        value={region.alias}
        placeholder="별칭"
        onChange={e => onChange({ ...region, alias: e.target.value })}
      />
      <input
        className={`${styles.input} ${styles.inputReadOnly}`}
        value={region.address}
        placeholder="지도에서 선택"
        readOnly
      />
      <Button type="button" onClick={onMapOpen}>지도</Button>
      <button className={styles.deleteBtn} type="button" onClick={onDelete}>−</button>
    </div>
  )
}
