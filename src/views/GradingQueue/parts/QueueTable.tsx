import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Avatar, Button, Chip } from '@/components/atoms'
import type { SpectrumColor } from '@/lib/types'
import styles from './QueueTable.module.css'

export type QueueStatus = 'queued' | 'reading' | 'drafting' | 'drafted' | 'validated' | 'flagged'

const STATUS: Record<QueueStatus, { label: string; color: SpectrumColor | 'ai' }> = {
  queued:    { label: 'Queued',    color: 'gray' },
  reading:   { label: 'Reading',   color: 'blue' },
  drafting:  { label: 'Drafting',  color: 'ai' },
  drafted:   { label: 'AI draft',  color: 'yellow' },
  validated: { label: 'Validated', color: 'green' },
  flagged:   { label: 'Needs review', color: 'red' },
}

export type QueueEntry = {
  id: string
  initials: string
  avatarColor: SpectrumColor
  name: string
  studentId: string
  examLabel: string
  examColor: SpectrumColor
  status: QueueStatus
  score?: { value: string; max: string } | null
  overridden?: boolean
  time: string
  flagSummary?: string
}

export type QueueTableProps = {
  rows: QueueEntry[]
  className?: string
}

export function QueueTable({ rows, className }: QueueTableProps) {
  return (
    <div className={cn(styles.table, className)}>
      <div className={styles.head}>
        <span />
        <span />
        <span>Student</span>
        <span>Exam</span>
        <span style={{ textAlign: 'right' }}>AI score</span>
        <span>Stage / time</span>
        <span style={{ textAlign: 'right' }}>Action</span>
      </div>
      {rows.length === 0 ? (
        <div className={styles.empty}>No submissions match the current filters.</div>
      ) : (
        rows.map((r) => {
          const s = STATUS[r.status]
          return (
            <div key={r.id} className={cn(styles.row, r.status === 'flagged' && styles.flagged)}>
              <span className={styles.check} role="checkbox" aria-checked="false" tabIndex={0} />
              <Avatar size="sm" color={r.avatarColor} initials={r.initials} />
              <Link href="/ai-grader" className={styles.who} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ minWidth: 0 }}>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.id}>#{r.studentId}</div>
                </div>
              </Link>
              <div className={styles.exam}>
                <Chip color={r.examColor} leadingDot size="sm">
                  {r.examLabel}
                </Chip>
              </div>
              <div className={styles.score}>
                {r.score ? (
                  <span className={cn(r.overridden && styles.scoreOverride)}>
                    {r.score.value}
                    <span className="max"> / {r.score.max}</span>
                  </span>
                ) : (
                  <span className={styles.scorePending}>—</span>
                )}
              </div>
              <div>
                <Chip color={s.color} leadingDot size="sm">
                  {s.label}
                </Chip>
                {r.flagSummary ? (
                  <div className={styles.flagText}>{r.flagSummary}</div>
                ) : (
                  <div className={styles.time}>{r.time}</div>
                )}
              </div>
              <div className={styles.actions}>
                <Button
                  as="a"
                  href="/ai-grader"
                  variant={r.status === 'validated' ? 'ghost' : 'secondary'}
                  size="sm"
                >
                  {r.status === 'validated' ? 'View' : r.status === 'flagged' ? 'Review →' : 'Open →'}
                </Button>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
