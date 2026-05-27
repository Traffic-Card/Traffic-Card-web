import { useNavigate } from 'react-router-dom'
import type { FavoriteRegionResponse } from '../../types/api'
import { ROUTES } from '../../constants/routes'
import Button from '../common/Button'
import TrafficMap from '../TrafficMap'
import styles from './RegionCard.module.css'

type Props = {
  region: FavoriteRegionResponse
}

export default function RegionCard({ region }: Props) {
  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.info}>
          <div className={styles.alias}>{region.alias}</div>
          <div className={styles.address}>{region.address}</div>
        </div>
        <Button onClick={() => navigate(ROUTES.REGION_EDIT)}>Edit Location</Button>
      </div>

      <div className={styles.card}>
        <TrafficMap latitude={region.latitude} longitude={region.longitude} />
      </div>
    </div>
  )
}
