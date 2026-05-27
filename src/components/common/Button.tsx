import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'solid'
}

export default function Button({ variant = 'outline', className = '', ...props }: Props) {
  const variantClass = variant === 'solid' ? styles.solid : styles.outline
  return (
    <button className={`${styles.btn} ${variantClass} ${className}`} {...props} />
  )
}
