import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { IconSparkle } from '@/lib/icons'
import styles from './AIRibbon.module.css'

export type AIRibbonProps = HTMLAttributes<HTMLSpanElement> & { showIcon?: boolean }

export function AIRibbon({ showIcon = true, className, children, ...rest }: AIRibbonProps) {
  return (
    <span className={cn(styles.ribbon, className)} {...rest}>
      {showIcon && <IconSparkle size={12} />}
      {children}
    </span>
  )
}
