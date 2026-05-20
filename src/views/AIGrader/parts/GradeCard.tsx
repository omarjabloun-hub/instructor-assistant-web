import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/atoms'
import { IconEdit, IconSparkle } from '@/lib/icons'
import styles from './GradeCard.module.css'

export type Criterion = {
  status: 'ok' | 'no' | 'mid'
  label: string
  points: string
  outOf: string
}

export type GradeCardProps = {
  variant?: 'ai' | 'override'
  scoreValue: string
  scoreMax: string
  reason: ReactNode
  criteria: Criterion[]
  feedback: string
  override?: ReactNode
  className?: string
}

const checkClass: Record<Criterion['status'], string> = {
  ok: styles.checkOk,
  no: styles.checkNo,
  mid: styles.checkMid,
}
const checkChar: Record<Criterion['status'], string> = { ok: '✓', no: '✕', mid: '~' }

export function GradeCard({
  variant = 'ai',
  scoreValue,
  scoreMax,
  reason,
  criteria,
  feedback,
  override,
  className,
}: GradeCardProps) {
  const isOverride = variant === 'override'
  return (
    <div className={cn(styles.grade, className)}>
      <div className={cn(styles.head, isOverride && styles.headOverride)}>
        <span className={cn(styles.headBadge, isOverride ? styles.overrideTone : styles.aiTone)}>
          {isOverride ? <IconEdit size={12} strokeWidth={2} /> : <IconSparkle size={12} strokeWidth={2} />}
          {isOverride ? 'AI draft · overridden' : 'AI draft'}
        </span>
        <div className={styles.score}>
          <span className={styles.scoreValue}>{scoreValue}</span>
          <span className={styles.scoreMax}>/ {scoreMax}</span>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.reason}>{reason}</p>
        <ul className={styles.critList}>
          {criteria.map((c, i) => (
            <li key={i} className={styles.crit}>
              <span className={cn(styles.check, checkClass[c.status])}>{checkChar[c.status]}</span>
              <span className={styles.critLabel}>{c.label}</span>
              <span className={styles.critPts}>
                {c.points}
                <span className={styles.of}>/{c.outOf}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.feedback}>
          <span className={styles.feedbackLabel}>Suggested feedback for the student</span>
          {feedback}
        </div>
      </div>
      <div className={styles.actions}>
        <span className={cn(styles.override, isOverride && styles.overrideActive)}>
          {override ?? 'No override'}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <Button variant="ghost" size="sm">
            {isOverride ? 'Revert' : 'Adjust'}
          </Button>
          <Button variant="secondary" size="sm">Accept</Button>
        </div>
      </div>
    </div>
  )
}
