import type { HTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import styles from './Callout.module.css'

const callout = cva(styles.callout, {
  variants: {
    intent: {
      ai: styles.ai,
      info: styles.info,
      warn: styles.warn,
      ok: styles.ok,
      danger: styles.danger,
      neutral: styles.neutral,
    },
  },
  defaultVariants: { intent: 'info' },
})

export type CalloutProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof callout> & {
    icon?: ReactNode
    title?: ReactNode
  }

export function Callout({ intent, icon, title, className, children, ...rest }: CalloutProps) {
  return (
    <div className={cn(callout({ intent }), className)} {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.body}>
        {title && <div className={styles.title}>{title}</div>}
        {children}
      </div>
    </div>
  )
}
