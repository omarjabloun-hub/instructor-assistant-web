import { useState } from 'react'
import { cn } from '@/lib/cn'
import styles from './NumberInput.module.css'

export type NumberInputProps = {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  className?: string
  id?: string
}

export function NumberInput({
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  onChange,
  className,
  id,
}: NumberInputProps) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const update = (next: number) => {
    if (min !== undefined && next < min) return
    if (max !== undefined && next > max) return
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <div className={cn(styles.wrap, className)}>
      <button type="button" className={styles.btn} onClick={() => update(current - step)} aria-label="Decrease">
        −
      </button>
      <input
        id={id}
        type="number"
        className={styles.value}
        value={current}
        onChange={(e) => update(Number(e.target.value))}
      />
      <button type="button" className={styles.btn} onClick={() => update(current + step)} aria-label="Increase">
        +
      </button>
    </div>
  )
}
