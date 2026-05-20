import { Fragment } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import styles from './Breadcrumbs.module.css'

export type Crumb = { label: string; to?: string }
export type BreadcrumbsProps = { items: Crumb[]; className?: string }

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn(styles.root, className)} aria-label="Breadcrumb">
      {items.map((c, i) => {
        const isLast = i === items.length - 1
        return (
          <Fragment key={i}>
            {c.to && !isLast ? (
              <Link href={c.to} className={styles.crumb}>
                {c.label}
              </Link>
            ) : (
              <span className={isLast ? styles.current : styles.crumb}>{c.label}</span>
            )}
            {!isLast && <span className={styles.sep}>/</span>}
          </Fragment>
        )
      })}
    </nav>
  )
}
