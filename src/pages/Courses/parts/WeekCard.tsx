import { cn } from '@/lib/cn'
import type { ContentFormat } from '@/lib/types'
import styles from './WeekCard.module.css'

export type WeekStatus = 'done' | 'current' | 'future' | 'ai-drafting'

export type WeekCardProps = {
  num: string
  title: string
  status: WeekStatus
  formats: (ContentFormat | 'missing')[]
  onClick?: () => void
}

const fmtClass: Record<ContentFormat | 'missing', string> = {
  notes: styles.fmtNotes,
  slides: styles.fmtSlides,
  reading: styles.fmtReading,
  practice: styles.fmtPractice,
  summary: styles.fmtSummary,
  video: styles.fmtVideo,
  missing: styles.fmtMissing,
}

export function WeekCard({ num, title, status, formats, onClick }: WeekCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        styles.card,
        status === 'done' && styles.done,
        status === 'current' && styles.current,
        status === 'future' && styles.future,
        status === 'ai-drafting' && styles.aiDrafting,
      )}
    >
      <div className={styles.head}>
        <span className={styles.num}>{num}</span>
        <span
          className={cn(
            styles.status,
            status === 'done' && styles.statusDone,
            status === 'current' && styles.statusCurrent,
            status === 'future' && styles.statusFuture,
            status === 'ai-drafting' && styles.statusAi,
          )}
        />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.formats}>
        {formats.map((f, i) => (
          <span key={i} className={cn(styles.fmt, fmtClass[f])} />
        ))}
      </div>
    </button>
  )
}
