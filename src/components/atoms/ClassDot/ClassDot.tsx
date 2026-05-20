import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import styles from './ClassDot.module.css'

const dot = cva(styles.dot, {
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
    },
    size: { sm: styles.sm, md: '', lg: styles.lg },
    shape: { square: '', round: styles.round },
    outline: { true: styles.outline },
  },
  defaultVariants: { color: 'gray', size: 'md', shape: 'square' },
})

export type ClassDotProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof dot>

export function ClassDot({ color, size, shape, outline, className, ...rest }: ClassDotProps) {
  return <span className={cn(dot({ color, size, shape, outline }), className)} {...rest} />
}
