'use client'

import { createContext, useContext, useState, type ReactNode, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import styles from './Tabs.module.css'

type TabsCtx = {
  value: string
  setValue: (v: string) => void
}
const Ctx = createContext<TabsCtx | null>(null)

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  defaultValue: string
  value?: string
  onValueChange?: (v: string) => void
  children: ReactNode
}

export function Tabs({ defaultValue, value, onValueChange, className, children, ...rest }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const setValue = (v: string) => {
    if (value === undefined) setInternal(v)
    onValueChange?.(v)
  }
  return (
    <Ctx.Provider value={{ value: current, setValue }}>
      <div className={className} {...rest}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

export function TabsList({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="tablist" className={cn(styles.list, className)} {...rest}>
      {children}
    </div>
  )
}

export type TabProps = HTMLAttributes<HTMLButtonElement> & {
  value: string
  icon?: ReactNode
  count?: number | string
}

export function Tab({ value, icon, count, className, children, ...rest }: TabProps) {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('<Tab> must be inside <Tabs>')
  const active = ctx.value === value
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => ctx.setValue(value)}
      className={cn(styles.tab, active && styles.on, className)}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  )
}

export type TabPanelProps = HTMLAttributes<HTMLDivElement> & { value: string }

export function TabPanel({ value, className, children, ...rest }: TabPanelProps) {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('<TabPanel> must be inside <Tabs>')
  if (ctx.value !== value) return null
  return (
    <div role="tabpanel" className={className} {...rest}>
      {children}
    </div>
  )
}