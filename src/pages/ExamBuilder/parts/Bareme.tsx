import { cn } from '@/lib/cn'
import styles from './Bareme.module.css'

export type BaremeRow = { idx: string; criterion: string; points: string }

export type BaremeProps = {
  rows: BaremeRow[]
  total: string
  className?: string
}

export function Bareme({ rows, total, className }: BaremeProps) {
  return (
    <div className={cn(styles.bareme, className)}>
      <div className={styles.head}>
        <span>#</span>
        <span>Criterion</span>
        <span className={styles.right}>Points</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.idx}>{r.idx}</span>
          <span className={styles.crit}>{r.criterion}</span>
          <span className={styles.ptsCell}>{r.points}</span>
        </div>
      ))}
      <div className={styles.total}>
        <span />
        <span>Total</span>
        <span className={styles.totalPts}>{total}</span>
      </div>
    </div>
  )
}
