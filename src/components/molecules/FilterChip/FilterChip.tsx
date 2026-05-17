import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import styles from './FilterChip.module.css'

export type FilterChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

export function FilterChip({ active, className, children, ...rest }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(styles.chip, active && styles.on, className)}
      {...rest}
    >
      {children}
    </button>
  )
}
