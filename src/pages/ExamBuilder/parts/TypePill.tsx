import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { SpectrumColor } from '@/lib/types'
import styles from './TypePill.module.css'

const SOLID: Record<SpectrumColor, string> = {
  gray: 'var(--c-gray-solid)',
  brown: 'var(--c-brown-solid)',
  orange: 'var(--c-orange-solid)',
  yellow: 'var(--c-yellow-solid)',
  green: 'var(--c-green-solid)',
  teal: 'var(--c-teal-solid)',
  blue: 'var(--c-blue-solid)',
  purple: 'var(--c-purple-solid)',
  pink: 'var(--c-pink-solid)',
  red: 'var(--c-red-solid)',
}

export type TypePillProps = {
  color: SpectrumColor
  active?: boolean
  onClick?: () => void
  children: ReactNode
}

export function TypePill({ color, active, onClick, children }: TypePillProps) {
  return (
    <button
      type="button"
      className={cn(styles.pill, active && styles.active)}
      onClick={onClick}
    >
      <span className={styles.swatch} style={{ background: SOLID[color] }} />
      {children}
    </button>
  )
}

export function TypePillList({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>
}
