import { cn } from '@/lib/cn'
import { Avatar } from '@/components/atoms'
import type { SpectrumColor } from '@/lib/types'
import styles from './SubmissionItem.module.css'

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

export type Submission = {
  initials: string
  name: string
  avatarColor: SpectrumColor
  status: { label: string; color: SpectrumColor }
  score?: { value: string; max: string } | null
  active?: boolean
}

export function SubmissionItem({ initials, name, avatarColor, status, score, active }: Submission) {
  return (
    <button type="button" className={cn(styles.row, active && styles.active)}>
      <Avatar size="md" color={avatarColor} initials={initials} />
      <div>
        <div className={styles.name}>{name}</div>
        <div className={styles.meta}>
          <span className={styles.statusDot} style={{ background: SOLID[status.color] }} />
          {status.label}
        </div>
      </div>
      <div className={styles.score}>
        {score ? (
          <>
            {score.value}
            <span className={styles.max}> / {score.max}</span>
          </>
        ) : (
          <span className={styles.scorePending}>—</span>
        )}
      </div>
    </button>
  )
}
