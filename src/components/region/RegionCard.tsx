import type { FavoriteRegionResponse } from '../../types/api'
import TrafficMap from '../map/TrafficMap'
import RegionWeather from './RegionWeather'
import styles from './RegionCard.module.css'

type Props = {
  region: FavoriteRegionResponse
}

export default function RegionCard({ region }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.mapArea}>
        <TrafficMap latitude={region.latitude} longitude={region.longitude} draggable />
      </div>

      <div className={styles.divider} />

      <RegionWeather latitude={region.latitude} longitude={region.longitude} />
    </div>
  )
}
