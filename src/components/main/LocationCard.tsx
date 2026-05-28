import type { FixedLocation } from '../../constants/locations'
import TrafficMap from '../map/TrafficMap'
import styles from './LocationCard.module.css'

type Props = {
  location: FixedLocation
}

export default function LocationCard({ location }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.mapArea}>
        <TrafficMap latitude={location.latitude} longitude={location.longitude} />
      </div>
      <div className={styles.info}>
        <div className={styles.label}>{location.label}</div>
        <div className={styles.district}>{location.district}</div>
      </div>
    </div>
  )
}
