import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import styles from './Brand.module.css'

export type BrandProps = { to?: string; className?: string }

export function Brand({ to = '/', className }: BrandProps) {
  return (
    <Link to={to} className={cn(styles.brand, className)} aria-label="Instructor Assistant — home">
      <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="#9067E3" />
        <rect x="13" y="2" width="9" height="9" rx="2" fill="#F08A2C" />
        <rect x="2" y="13" width="9" height="9" rx="2" fill="#21A879" />
        <rect x="13" y="13" width="9" height="9" rx="2" fill="#3B82F6" />
      </svg>
      <span className={styles.word}>
        Instructor <span className={styles.dim}>Assistant</span>
      </span>
    </Link>
  )
}
