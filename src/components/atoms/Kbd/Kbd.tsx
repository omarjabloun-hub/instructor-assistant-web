import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import styles from './Kbd.module.css'

export function Kbd({ className, children, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd className={cn(styles.kbd, className)} {...rest}>
      {children}
    </kbd>
  )
}
