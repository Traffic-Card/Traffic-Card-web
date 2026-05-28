import type { ReactNode } from 'react'
import styles from './PageContainer.module.css'

type Props = {
  children: ReactNode
  className?: string
}

export default function PageContainer({ children, className = '' }: Props) {
  return <div className={`${styles.container} ${className}`}>{children}</div>
}
