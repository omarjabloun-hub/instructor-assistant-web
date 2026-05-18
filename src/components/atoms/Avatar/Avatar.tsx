import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import styles from './Avatar.module.css'

const avatar = cva(styles.avatar, {
  variants: {
    size: { xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg },
    color: {
      gray: styles.gray,
      brown: styles.brown,
      orange: styles.orange,
      yellow: styles.yellow,
      green: styles.green,
      teal: styles.teal,
      blue: styles.blue,
      purple: styles.purple,
      pink: styles.pink,
      red: styles.red,
    },
  },
  defaultVariants: { size: 'md' },
})

export type AvatarProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof avatar> & {
    initials: string
  }

export function Avatar({ size, color, initials, className, ...rest }: AvatarProps) {
  return (
    <span className={cn(avatar({ size, color }), className)} title={initials} {...rest}>
      {initials}
    </span>
  )
}
