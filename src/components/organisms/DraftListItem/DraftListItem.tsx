import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { SpectrumColor } from '@/lib/types'
import { Chip } from '@/components/atoms'
import styles from './DraftListItem.module.css'

const TINT: Record<SpectrumColor, { bg: string; text: string }> = {
  gray:   { bg: 'var(--c-gray-bg)',   text: 'var(--c-gray-text)' },
  brown:  { bg: 'var(--c-brown-bg)',  text: 'var(--c-brown-text)' },
  orange: { bg: 'var(--c-orange-bg)', text: 'var(--c-orange-text)' },
  yellow: { bg: 'var(--c-yellow-bg)', text: 'var(--c-yellow-text)' },
  green:  { bg: 'var(--c-green-bg)',  text: 'var(--c-green-text)' },
  teal:   { bg: 'var(--c-teal-bg)',   text: 'var(--c-teal-text)' },
  blue:   { bg: 'var(--c-blue-bg)',   text: 'var(--c-blue-text)' },
  purple: { bg: 'var(--c-purple-bg)', text: 'var(--c-purple-text)' },
  pink:   { bg: 'var(--c-pink-bg)',   text: 'var(--c-pink-text)' },
  red:    { bg: 'var(--c-red-bg)',    text: 'var(--c-red-text)' },
}

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

export type DraftItem = {
  icon: ReactNode
  iconColor: SpectrumColor
  title: string
  meta: string
  status: { label: string; color: SpectrumColor | 'ai' }
  progress: number
  progressColor?: SpectrumColor | 'accent'
}

export type DraftListProps = {
  items: DraftItem[]
  className?: string
}

export function DraftList({ items, className }: DraftListProps) {
  return (
    <div className={cn(styles.list, className)}>
      {items.map((d, i) => {
        const fillColor =
          !d.progressColor || d.progressColor === 'accent'
            ? 'var(--accent-500)'
            : SOLID[d.progressColor]
        return (
          <div key={i} className={styles.item}>
            <span className={styles.icon} style={{ background: TINT[d.iconColor].bg, color: TINT[d.iconColor].text }}>
              {d.icon}
            </span>
            <div className={styles.text}>
              <div className={styles.title}>{d.title}</div>
              <div className={styles.meta}>{d.meta}</div>
            </div>
            <Chip color={d.status.color} leadingDot>
              {d.status.label}
            </Chip>
            <div className={styles.progressGroup}>
              <div className={styles.progressTrack}>
                <span className={styles.progressFill} style={{ width: `${d.progress}%`, background: fillColor }} />
              </div>
              <span className={styles.progressNum}>{d.progress}%</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
