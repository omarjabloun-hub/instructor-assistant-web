import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import styles from './Card.module.css'

const card = cva(styles.card, {
  variants: {
    pad: { none: styles.padNone, sm: styles.padSm, md: styles.padMd, lg: styles.padLg },
    elevation: { flat: styles.flat, raised: styles.elevated },
    tone: { default: '', sunken: styles.sunken, ai: styles.ai, danger: styles.danger },
    dashed: { true: styles.dashed },
  },
  defaultVariants: { pad: 'md', elevation: 'flat', tone: 'default' },
})

export type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof card>

export function Card({ pad, elevation, tone, dashed, className, children, ...rest }: CardProps) {
  return (
    <div className={cn(card({ pad, elevation, tone, dashed }), className)} {...rest}>
      {children}
    </div>
  )
}
