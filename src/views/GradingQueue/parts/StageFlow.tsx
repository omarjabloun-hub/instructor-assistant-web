import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { SpectrumColor } from '@/lib/types'
import styles from './StageFlow.module.css'

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

export type Stage = {
  label: string
  color: SpectrumColor
  count: number | string
  hint: ReactNode
  live?: boolean
}

export type StageFlowProps = {
  stages: Stage[]
  className?: string
}

export function StageFlow({ stages, className }: StageFlowProps) {
  return (
    <div className={cn(styles.flow, className)} style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
      {stages.map((s, i) => (
        <div key={i} className={styles.stage}>
          <div className={styles.lbl}>
            <span className={styles.dot} style={{ background: SOLID[s.color] }} />
            {s.label}
          </div>
          <div className={styles.value}>{s.count}</div>
          <div className={styles.hint}>
            {s.live ? <span className={styles.live}>{s.hint}</span> : s.hint}
          </div>
        </div>
      ))}
    </div>
  )
}
