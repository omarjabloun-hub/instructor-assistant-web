import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import styles from './AIShimmer.module.css'

export type AIShimmerProps = HTMLAttributes<HTMLDivElement>

export function AIShimmer({ className, children, ...rest }: AIShimmerProps) {
  return (
    <div className={cn(styles.shimmer, className)} {...rest}>
      <span className={styles.dotPulse} />
      {children ?? 'Drafting…'}
    </div>
  )
}
