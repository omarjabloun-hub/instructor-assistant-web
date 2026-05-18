import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Button, Chip, ProgressBar } from '@/components/atoms'
import { IconArrowRight, IconClock, IconSparkle } from '@/lib/icons'
import type { SpectrumColor } from '@/lib/types'
import styles from './RunCard.module.css'

export type RunStatus = 'grading' | 'review-ready' | 'done'

export type RunCardProps = {
  classLabel: string
  classColor: SpectrumColor
  examTitle: string
  meta: string
  total: number
  graded: number
  validated: number
  flagged: number
  status: RunStatus
  eta?: string
  to?: string
  className?: string
}

const STATUS_CHIP: Record<RunStatus, { label: string; color: SpectrumColor | 'ai' }> = {
  grading:        { label: 'AI grading',     color: 'ai' },
  'review-ready': { label: 'Ready to review', color: 'yellow' },
  done:           { label: 'Validated',      color: 'green' },
}

export function RunCard({
  classLabel,
  classColor,
  examTitle,
  meta,
  total,
  graded,
  validated,
  flagged,
  status,
  eta,
  to = '/ai-grader',
  className,
}: RunCardProps) {
  const gradedPct = (graded / total) * 100
  const validatedPct = (validated / total) * 100
  const remainingPct = 100 - gradedPct
  const statusChip = STATUS_CHIP[status]

  return (
    <article className={cn(styles.card, status === 'grading' && styles.ai, status === 'done' && styles.done, className)}>
      <div className={styles.head}>
        <div>
          <div className={styles.chipRow}>
            <Chip color={classColor} leadingDot>{classLabel}</Chip>
            <Chip color={statusChip.color} leadingDot size="sm">
              {statusChip.label}
            </Chip>
          </div>
          <h3 className={styles.title}>{examTitle}</h3>
          <div className={styles.sub}>
            <span className={styles.subStrong}>{total}</span> submissions · {meta}
          </div>
        </div>
        {status === 'grading' && <IconSparkle size={16} stroke="var(--accent-500)" strokeWidth={2} />}
      </div>

      <div>
        <div className={styles.progressLabel}>
          <span>
            {validated} validated · {graded - validated} drafted · {total - graded} queued
          </span>
          <span>{Math.round(gradedPct)}%</span>
        </div>
        <ProgressBar
          size="sm"
          segments={[
            { value: validatedPct, color: 'var(--c-green-solid)' },
            { value: gradedPct - validatedPct, color: 'var(--c-yellow-solid)' },
            { value: remainingPct, color: 'var(--surface-sunken)' },
          ]}
        />
      </div>

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statLbl}>Drafts</span>
          <span className={styles.statVal}>{graded - validated}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLbl}>Flagged</span>
          <span className={styles.statVal} style={{ color: flagged > 0 ? 'var(--c-red-text)' : undefined }}>
            {flagged}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLbl}>Class median</span>
          <span className={styles.statVal}>
            13.5<span className="max"> / 20</span>
          </span>
        </div>
      </div>

      <div className={styles.foot}>
        <span className={styles.eta}>
          <IconClock size={12} />
          {eta ?? 'Just finished'}
        </span>
        <Button as="a" href={to} variant="secondary" size="sm" trailingIcon={<IconArrowRight size={12} />}>
          {status === 'done' ? 'View results' : 'Review drafts'}
        </Button>
      </div>
    </article>
  )
}

/** Link wrapper used when the whole card should be clickable */
export function RunCardLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      {children}
    </Link>
  )
}
