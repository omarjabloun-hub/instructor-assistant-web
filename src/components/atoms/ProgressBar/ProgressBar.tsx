import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import styles from './ProgressBar.module.css'

export type Segment = {
  /** 0–100 (percentage of total track width) */
  value: number
  /** any CSS color or var() */
  color: string
  label?: string
}

export type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  segments: Segment[]
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({ segments, size = 'md', className, ...rest }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(styles.track, size === 'sm' && styles.sm, size === 'lg' && styles.lg, className)}
      {...rest}
    >
      {segments.map((seg, i) => (
        <span
          key={i}
          className={styles.seg}
          style={{ width: `${seg.value}%`, background: seg.color }}
          aria-label={seg.label}
        />
      ))}
    </div>
  )
}
