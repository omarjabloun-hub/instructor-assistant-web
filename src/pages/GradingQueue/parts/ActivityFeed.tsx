import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import {
  IconCheck,
  IconClock,
  IconEdit,
  IconSparkle,
} from '@/lib/icons'
import styles from './ActivityFeed.module.css'

export type ActivityKind = 'reading' | 'drafted' | 'flagged' | 'validated' | 'override'

export type ActivityEntry = {
  kind: ActivityKind
  body: ReactNode
  time: string
}

const ICON: Record<ActivityKind, { glyph: ReactNode; cls: string }> = {
  reading:   { glyph: <IconSparkle size={12} strokeWidth={2} />,      cls: 'glyphAi' },
  drafted:   { glyph: <IconClock size={12} />,                         cls: 'glyphWarn' },
  flagged:   { glyph: <IconEdit size={12} strokeWidth={2} />,          cls: 'glyphDanger' },
  validated: { glyph: <IconCheck size={13} strokeWidth={2.4} />,       cls: 'glyphOk' },
  override:  { glyph: <IconEdit size={12} strokeWidth={2} />,          cls: 'glyphAi' },
}

export type ActivityFeedProps = {
  entries: ActivityEntry[]
  live?: boolean
  className?: string
  footer?: ReactNode
}

export function ActivityFeed({ entries, live = true, className, footer }: ActivityFeedProps) {
  return (
    <div className={cn(styles.feed, className)}>
      <div className={styles.head}>
        <h3>Activity</h3>
        {live && <span className={styles.live}>Live</span>}
      </div>
      <div className={styles.entries}>
        {entries.map((e, i) => {
          const I = ICON[e.kind]
          return (
            <div key={i} className={styles.entry}>
              <span className={cn(styles.glyph, styles[I.cls as 'glyphAi'])}>{I.glyph}</span>
              <div className={styles.body}>{e.body}</div>
              <span className={styles.time}>{e.time}</span>
            </div>
          )
        })}
      </div>
      {footer && <div className={styles.foot}>{footer}</div>}
    </div>
  )
}
