'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import styles from './SegmentControl.module.css'

export type SegmentControlProps<T extends string = string> = {
  options: { value: T; label: string }[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  className?: string
}

export function SegmentControl<T extends string = string>({
  options,
  value,
  defaultValue,
  onChange,
  className,
}: SegmentControlProps<T>) {
  const [internal, setInternal] = useState<T>(defaultValue ?? options[0]!.value)
  const current = value ?? internal
  return (
    <div role="radiogroup" className={cn(styles.root, className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={current === o.value}
          className={cn(styles.opt, current === o.value && styles.on)}
          onClick={() => {
            if (value === undefined) setInternal(o.value)
            onChange?.(o.value)
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}