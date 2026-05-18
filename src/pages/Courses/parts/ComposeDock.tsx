import { cn } from '@/lib/cn'
import { IconArrowRight, IconSparkle } from '@/lib/icons'
import styles from './ComposeDock.module.css'

export type ComposeDockProps = {
  defaultValue?: string
  placeholder?: string
  hints?: string[]
  onSend?: (value: string) => void
  className?: string
}

export function ComposeDock({
  defaultValue,
  placeholder = 'Ask the assistant…',
  hints = [],
  onSend,
  className,
}: ComposeDockProps) {
  return (
    <div className={cn(styles.dock, className)}>
      <div className={styles.spark}>
        <IconSparkle size={14} strokeWidth={2} />
      </div>
      <div>
        <input
          className={styles.input}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSend?.((e.target as HTMLInputElement).value)
          }}
        />
        {hints.length > 0 && (
          <div className={styles.hints}>
            {hints.map((h, i) => (
              <button key={i} type="button" className={styles.hint}>
                {h}
              </button>
            ))}
          </div>
        )}
      </div>
      <button type="button" className={styles.send}>
        Generate
        <IconArrowRight size={14} strokeWidth={2} />
      </button>
    </div>
  )
}
