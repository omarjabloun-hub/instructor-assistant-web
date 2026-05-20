import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import styles from './Divider.module.css'

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical'
  strong?: boolean
}

export function Divider({
  orientation = 'horizontal',
  strong,
  className,
  ...rest
}: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(orientation === 'vertical' ? styles.v : styles.h, strong && styles.strong, className)}
      {...rest}
    />
  )
}
