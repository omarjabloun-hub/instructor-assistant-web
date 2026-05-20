import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Brand } from '@/components/organisms/Brand'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Topbar, type TopbarProps } from '@/components/organisms/Topbar'
import styles from './AppShell.module.css'

export type AppShellProps = {
  /** Pass-through to the Topbar */
  topbar?: TopbarProps
  /** Content of the main area */
  children: ReactNode
  /** Set true to remove the default 40px padding (e.g. Courses page) */
  flushMain?: boolean
  /** Additional class for the <main> wrapper */
  mainClassName?: string
}

export function AppShell({ topbar, flushMain, mainClassName, children }: AppShellProps) {
  return (
    <div className={styles.app}>
      <div className={styles.brandCell}>
        <Brand />
      </div>
      <div className={styles.topCell}>
        <Topbar {...topbar} />
      </div>
      <div className={styles.navCell}>
        <Sidebar />
      </div>
      <main className={cn(styles.mainCell, flushMain ? styles.mainFlush : styles.main, mainClassName)}>
        {children}
      </main>
    </div>
  )
}
