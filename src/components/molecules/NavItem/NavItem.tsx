import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import styles from './NavItem.module.css'

export type NavItemProps = {
  to: string
  icon?: ReactNode
  count?: number | string
  end?: boolean
  className?: string
  children: ReactNode
}

export function NavItem({ to, icon, count, end, className, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => cn(styles.item, isActive && styles.active, className)}
    >
      {icon}
      <span>{children}</span>
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </NavLink>
  )
}
