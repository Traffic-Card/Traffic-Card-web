import { useEffect, useState } from 'react'
import type { FixedLocation } from '../../constants/locations'
import LocationCard from './LocationCard'
import PaginationDots from '../common/PaginationDots'
import styles from './CardSlider.module.css'

const VISIBLE_COUNT = 3
const SLIDE_INTERVAL = 5000

type Props = {
  locations: FixedLocation[]
}

export default function CardSlider({ locations }: Props) {
  const maxIndex = Math.max(0, locations.length - VISIBLE_COUNT)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [maxIndex])

  const visible = locations.slice(index, index + VISIBLE_COUNT)

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {visible.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
      <PaginationDots total={maxIndex + 1} current={index} />
    </div>
  )
}
