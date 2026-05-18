import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import styles from './RailStat.module.css'

export type RailStatProps = {
  label: ReactNode
  value: ReactNode
  hint?: ReactNode
  chip?: ReactNode
  className?: string
  children?: ReactNode
}

export function RailStat({ label, value, hint, chip, className, children }: RailStatProps) {
  return (
    <div className={cn(styles.stat, className)}>
      <div className={styles.head}>
        <div className={styles.label}>{label}</div>
        {chip}
      </div>
      {value !== undefined && <div className={styles.value}>{value}</div>}
      {hint && <div className={styles.hint}>{hint}</div>}
      {children}
    </div>
  )
}
