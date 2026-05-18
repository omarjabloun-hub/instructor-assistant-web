import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Avatar, Input } from '@/components/atoms'
import { IconSearch } from '@/lib/icons'
import styles from './Topbar.module.css'

export type TopbarProps = {
  /** Left-side content: breadcrumbs, page title, etc. */
  leading?: ReactNode
  /** Optional search input — pass false to disable */
  showSearch?: boolean
  searchPlaceholder?: string
  /** Right-side actions (buttons, ribbons, etc.) — appears before the avatar */
  actions?: ReactNode
  /** User initials shown in the rightmost avatar chip */
  userInitials?: string
  userColor?: 'purple' | 'green' | 'blue' | 'orange' | 'pink' | 'teal' | 'yellow' | 'red' | 'brown'
  className?: string
}

export function Topbar({
  leading,
  showSearch = true,
  searchPlaceholder = 'Search classes, assessments, students…',
  actions,
  userInitials = 'NK',
  userColor = 'purple',
  className,
}: TopbarProps) {
  return (
    <div className={cn(styles.topbar, className)}>
      {leading && <div style={{ flex: 1, minWidth: 0 }}>{leading}</div>}
      {showSearch && (
        <div className={styles.search}>
          <Input className={styles.searchInput} placeholder={searchPlaceholder} size="sm" />
          <IconSearch size={14} className={styles.searchIcon} />
        </div>
      )}
      {actions}
      <Avatar initials={userInitials} color={userColor} size="sm" />
    </div>
  )
}
