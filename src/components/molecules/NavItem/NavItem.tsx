'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname() ?? '/'
  const isActive = isLinkActive(pathname, to, end)

  return (
    <Link
      href={to}
      className={cn(styles.item, isActive && styles.active, className)}
    >
      {icon}
      <span>{children}</span>
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </Link>
  )
}

function isLinkActive(pathname: string, to: string, end?: boolean): boolean {
  if (!to || to === '#') return false
  if (end) return pathname === to
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}
