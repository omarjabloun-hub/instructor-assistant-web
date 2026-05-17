import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { IconSparkle } from '@/lib/icons'
import styles from './AISuggestion.module.css'

export type AISuggestionProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode
  actions?: ReactNode
}

export function AISuggestion({ title, actions, children, className, ...rest }: AISuggestionProps) {
  return (
    <div className={cn(styles.card, className)} {...rest}>
      <h3 className={styles.title}>
        <IconSparkle size={18} strokeWidth={2} />
        {title}
      </h3>
      <p className={styles.body}>{children}</p>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
