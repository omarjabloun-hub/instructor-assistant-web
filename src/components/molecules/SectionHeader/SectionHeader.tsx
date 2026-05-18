import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import styles from './SectionHeader.module.css'

export type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  size?: 'md' | 'lg'
}

export function SectionHeader({
  title,
  subtitle,
  actions,
  size = 'md',
  className,
  ...rest
}: SectionHeaderProps) {
  return (
    <div className={cn(styles.head, className)} {...rest}>
      <div>
        <h2 className={cn(styles.title, size === 'lg' && styles.titleLg)}>{title}</h2>
        {subtitle && <div className={styles.sub}>{subtitle}</div>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
