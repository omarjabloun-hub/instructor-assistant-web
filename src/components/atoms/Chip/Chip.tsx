import type { HTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import styles from './Chip.module.css'

const chip = cva(styles.chip, {
  variants: {
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
      ai: styles.ai,
    },
    appearance: {
      soft: '',
      solid: styles.solid,
      outline: styles.outline,
    },
    size: {
      sm: styles.sm,
      md: '',
      lg: styles.lg,
    },
  },
  defaultVariants: { color: 'gray', appearance: 'soft', size: 'md' },
})

export type ChipProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof chip> & {
    leadingDot?: boolean
    leadingIcon?: ReactNode
  }

export function Chip({
  color,
  appearance,
  size,
  leadingDot,
  leadingIcon,
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <span className={cn(chip({ color, appearance, size }), className)} {...rest}>
      {leadingDot && <span className={styles.dot} />}
      {leadingIcon}
      {children}
    </span>
  )
}
