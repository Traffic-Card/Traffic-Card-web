import styles from './PaginationDots.module.css'

type Props = {
  total: number
  current: number
}

export default function PaginationDots({ total, current }: Props) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`${styles.dot} ${i === current ? styles.active : ''}`} />
      ))}
    </div>
  )
}
