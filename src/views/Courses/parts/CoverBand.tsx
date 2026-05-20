import { cn } from '@/lib/cn'
import styles from './CoverBand.module.css'

export type CourseTopic = { week: string; label: string }

const TOPICS: CourseTopic[] = [
  { week: 'w1', label: 'Foundations' },
  { week: 'w3', label: 'Sorting' },
  { week: 'w5', label: 'Trees' },
  { week: 'w7', label: 'Graphs' },
  { week: 'w8', label: 'Shortest paths · now' },
  { week: 'w10', label: 'MST' },
  { week: 'w12', label: 'NP-completeness' },
]

export type CoverBandProps = {
  topics?: CourseTopic[]
  className?: string
}

export function CoverBand({ topics = TOPICS, className }: CoverBandProps) {
  return (
    <div className={cn(styles.band, className)}>
      <svg
        className={styles.arcs}
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="124" x2="1200" y2="124" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <g fill="white">
          <circle cx="80" cy="124" r="3.5" />
          <circle cx="180" cy="124" r="3.5" />
          <circle cx="280" cy="124" r="3.5" />
          <circle cx="380" cy="124" r="3.5" />
          <circle cx="480" cy="124" r="3.5" />
          <circle cx="580" cy="124" r="4.5" />
          <circle cx="680" cy="124" r="3.5" />
          <circle cx="780" cy="124" r="3.5" />
          <circle cx="880" cy="124" r="3.5" />
          <circle cx="980" cy="124" r="3.5" />
          <circle cx="1080" cy="124" r="3.5" />
        </g>
        <g fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2">
          <path d="M 80 124 Q 130 30 180 124" />
          <path d="M 180 124 Q 230 60 280 124" />
          <path d="M 280 124 Q 380 -10 480 124" />
          <path d="M 80 124 Q 280 -40 480 124" />
          <path d="M 480 124 Q 530 60 580 124" />
          <path d="M 380 124 Q 480 30 580 124" />
          <path d="M 580 124 Q 680 0 780 124" />
          <path d="M 580 124 Q 630 70 680 124" />
          <path d="M 680 124 Q 730 70 780 124" />
          <path d="M 780 124 Q 830 70 880 124" />
          <path d="M 880 124 Q 930 80 980 124" />
          <path d="M 580 124 Q 780 -20 980 124" />
          <path d="M 980 124 Q 1030 80 1080 124" />
        </g>
        <g>
          <circle cx="580" cy="124" r="9" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <circle cx="580" cy="124" r="14" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
        </g>
      </svg>

      <div className={styles.topics}>
        {topics.map((t) => (
          <span key={t.week + t.label} className={styles.topic}>
            <span className={styles.num}>{t.week}</span>
            {t.label}
          </span>
        ))}
      </div>
    </div>
  )
}
