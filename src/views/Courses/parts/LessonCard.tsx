import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { IconPlus, IconShuffle } from '@/lib/icons'
import type { ContentFormat } from '@/lib/types'
import { FormatChip } from './FormatChip'
import styles from './LessonCard.module.css'

type GradientTone = 'green' | 'purple' | 'blue' | 'orange' | 'brown' | 'teal' | 'pink' | 'yellow'
const topClass: Record<GradientTone, string> = {
  green: styles.topGreen,
  purple: styles.topPurple,
  blue: styles.topBlue,
  orange: styles.topOrange,
  brown: styles.topBrown,
  teal: styles.topTeal,
  pink: styles.topPink,
  yellow: styles.topYellow,
}

export type LessonCardProps = {
  topGradient: GradientTone
  number: string
  title: string
  description: string
  formats: ContentFormat[]
  footer?: ReactNode
  ai?: boolean
  className?: string
}

export function LessonCard({
  topGradient,
  number,
  title,
  description,
  formats,
  footer,
  ai,
  className,
}: LessonCardProps) {
  return (
    <article className={cn(styles.wrap, className)}>
      <div className={cn(styles.body, ai && styles.aiBody)}>
        <div className={cn(styles.top, topClass[topGradient])} />
        <div className={styles.pad}>
          <div className={cn(styles.num, ai && styles.aiNum)}>{number}</div>
          <div className={styles.title}>{title}</div>
          <p className={styles.desc}>{description}</p>
          <div className={styles.formats}>
            {formats.map((f) => (
              <FormatChip
                key={f}
                format={f}
                size="sm"
                label={
                  f === 'notes'
                    ? 'Notes'
                    : f === 'slides'
                    ? 'Slides'
                    : f === 'reading'
                    ? 'Readings'
                    : f === 'practice'
                    ? 'Practice'
                    : f === 'summary'
                    ? 'Summary'
                    : 'Video'
                }
              />
            ))}
          </div>
          {footer && <div className={styles.foot}>{footer}</div>}
        </div>
      </div>
    </article>
  )
}

export function LessonCardEmpty() {
  return (
    <article className={styles.wrap}>
      <div className={cn(styles.body, styles.newBody)}>
        <IconPlus size={22} strokeWidth={1.6} />
        <strong>New lesson</strong>
        <span>Start from a topic, syllabus item, or learning objective</span>
      </div>
    </article>
  )
}

export function ReuseTag({ count }: { count: number }) {
  return (
    <span className={styles.reuse}>
      <IconShuffle size={11} strokeWidth={2} />
      Reused {count}×
    </span>
  )
}

export function ReviewLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={styles.reviewLink} style={{ textDecoration: 'none' }}>
      {children}
    </a>
  )
}
