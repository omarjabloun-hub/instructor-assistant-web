import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import styles from './StatTile.module.css'

export type StatTileProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode
  value: ReactNode
  delta?: ReactNode
  deltaTone?: 'positive' | 'negative' | 'neutral'
  tone?: 'default' | 'sunken'
}

export function StatTile({
  label,
  value,
  delta,
  deltaTone = 'neutral',
  tone = 'default',
  className,
  ...rest
}: StatTileProps) {
  return (
    <div className={cn(styles.tile, tone === 'sunken' && styles.sunken, className)} {...rest}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {delta !== undefined && (
        <span
          className={cn(
            styles.delta,
            deltaTone === 'positive' && styles.deltaPos,
            deltaTone === 'negative' && styles.deltaNeg,
          )}
        >
          {delta}
        </span>
      )}
    </div>
  )
}
