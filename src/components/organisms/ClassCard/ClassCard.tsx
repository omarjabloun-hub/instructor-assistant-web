import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { SpectrumColor } from '@/lib/types'
import { IconPlus } from '@/lib/icons'
import styles from './ClassCard.module.css'

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

export type ClassCardProps = {
  to: string
  title: string
  subtitle: string
  icon: ReactNode
  gradient: [SpectrumColor, SpectrumColor]
  stats?: { label: string; value: ReactNode }[]
  className?: string
}

export function ClassCard({ to, title, subtitle, icon, gradient, stats, className }: ClassCardProps) {
  const [a, b] = gradient
  return (
    <Link href={to} className={cn(styles.card, className)}>
      <div
        className={styles.cover}
        style={{ background: `linear-gradient(120deg, ${SOLID[a]} 0%, ${SOLID[b]} 100%)` }}
      />
      <div className={styles.body}>
        <span
          className={styles.icon}
          style={{ background: TINT[a].bg, color: TINT[a].text }}
        >
          {icon}
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.sub}>{subtitle}</p>
        {stats && stats.length > 0 && (
          <div className={styles.stats}>
            {stats.map((s, i) => (
              <span key={i}>
                <strong>{s.value}</strong> {s.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export function ClassCardEmpty({ to = '#', label = 'Add a class' }: { to?: string; label?: string }) {
  return (
    <Link href={to} className={cn(styles.card, styles.dashed)}>
      <div>
        <IconPlus size={22} strokeWidth={1.6} />
        <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
      </div>
    </Link>
  )
}
