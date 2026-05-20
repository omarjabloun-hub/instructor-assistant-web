import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { NavItem } from '@/components/molecules'
import { ClassDot } from '@/components/atoms'
import {
  IconBook,
  IconClock,
  IconDashboard,
  IconFile,
  IconInbox,
  IconMessage,
  IconPlus,
} from '@/lib/icons'
import type { SpectrumColor } from '@/lib/types'
import styles from './Sidebar.module.css'

export type ClassEntry = {
  to: string
  label: string
  color: SpectrumColor
  count?: number
}

export type SidebarProps = {
  classes?: ClassEntry[]
  className?: string
}

const DEFAULT_CLASSES: ClassEntry[] = [
  { to: '/exam-builder', label: 'CS-201 Algorithms', color: 'green', count: 32 },
  { to: '#', label: 'MATH-104 Linear Algebra', color: 'purple', count: 28 },
  { to: '#', label: 'PHYS-220 Mechanics', color: 'blue', count: 41 },
  { to: '#', label: 'LIT-301 Romantic Poetry', color: 'pink', count: 19 },
  { to: '#', label: 'CHEM-110 Organic', color: 'orange', count: 36 },
]

export function Sidebar({ classes = DEFAULT_CLASSES, className }: SidebarProps) {
  return (
    <nav className={cn(styles.sidebar, className)} aria-label="Workspace">
      <div className={styles.group}>Workspace</div>
      <NavItem to="/" end icon={<IconDashboard />}>
        Dashboard
      </NavItem>
      <NavItem to="/inbox" icon={<IconInbox />} count={2}>
        Inbox
      </NavItem>
      <NavItem to="/grading-queue" icon={<IconClock />} count={3}>
        Grading queue
      </NavItem>

      <div className={styles.group}>Classes</div>
      {classes.map((c) => (
        <NavItem key={c.label} to={c.to} icon={<ClassDot color={c.color} />} count={c.count}>
          {c.label}
        </NavItem>
      ))}
      <NavItem to="#" icon={<IconPlus />}>
        <ClassDimText>Add class</ClassDimText>
      </NavItem>

      <div className={styles.group}>Library</div>
      <NavItem to="/assessments" icon={<IconFile />}>
        Assessments
      </NavItem>
      <NavItem to="/questions" icon={<IconMessage />}>
        Questions
      </NavItem>
      <NavItem to="/courses" icon={<IconBook />}>
        Courses
      </NavItem>

      <div className={styles.group}>System</div>
      <NavItem to="/design-system" icon={<IconFile />}>
        Design system
      </NavItem>
    </nav>
  )
}

function ClassDimText({ children }: { children: ReactNode }) {
  return <span style={{ color: 'var(--ink-muted)' }}>{children}</span>
}
