import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import styles from './SmallCaps.module.css'

export type SmallCapsProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'muted' | 'strong' | 'accent'
}

export function SmallCaps({ tone = 'muted', className, children, ...rest }: SmallCapsProps) {
  return (
    <span
      className={cn(styles.label, tone === 'strong' && styles.strong, tone === 'accent' && styles.accent, className)}
      {...rest}
    >
      {children}
    </span>
  )
}
