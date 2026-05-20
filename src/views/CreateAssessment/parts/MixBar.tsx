import type { SpectrumColor } from '@/lib/types'
import styles from './MixBar.module.css'

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

export type MixRow = {
  name: string
  pct: number
  count: number
  color: SpectrumColor
}

export function MixBar({ name, pct, count, color }: MixRow) {
  return (
    <div className={styles.row}>
      <span className={styles.name}>{name}</span>
      <div className={styles.bar}>
        <span style={{ width: `${pct}%`, background: SOLID[color] }} />
      </div>
      <span className={styles.pct}>{count}</span>
    </div>
  )
}

export function MixBarGroup({ rows }: { rows: MixRow[] }) {
  return (
    <div className={styles.group}>
      {rows.map((r) => (
        <MixBar key={r.name} {...r} />
      ))}
    </div>
  )
}
