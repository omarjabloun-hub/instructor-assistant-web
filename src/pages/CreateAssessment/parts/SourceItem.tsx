import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { IconClose, IconFile, IconBook, IconLink } from '@/lib/icons'
import styles from './SourceItem.module.css'

export type SourceKind = 'doc' | 'lib' | 'link'

export type SourceItemProps = {
  kind: SourceKind
  name: string
  meta: string
  onRemove?: () => void
}

const ICON: Record<SourceKind, ReactNode> = {
  doc: <IconFile size={14} />,
  lib: <IconBook size={14} />,
  link: <IconLink size={14} />,
}

export function SourceItem({ kind, name, meta, onRemove }: SourceItemProps) {
  return (
    <div className={styles.row}>
      <span className={cn(styles.icon, styles[kind])}>{ICON[kind]}</span>
      <div>
        <div className={styles.name}>{name}</div>
        <div className={styles.meta}>{meta}</div>
      </div>
      <button className={styles.remove} type="button" aria-label={`Remove ${name}`} onClick={onRemove}>
        <IconClose size={14} strokeWidth={2} />
      </button>
    </div>
  )
}
