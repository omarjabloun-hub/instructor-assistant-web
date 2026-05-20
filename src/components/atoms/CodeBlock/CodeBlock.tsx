import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import styles from './CodeBlock.module.css'

export type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  children?: ReactNode
}

/**
 * Pre-styled dark code block. Use the syntax helpers (Kw, Fn, Str, Com)
 * to add minimal syntax highlighting — they're tinted spans, not a real
 * lexer.
 */
export function CodeBlock({ className, children, ...rest }: CodeBlockProps) {
  return (
    <pre className={cn(styles.block, className)} {...rest}>
      {children}
    </pre>
  )
}

export const Kw  = ({ children }: { children: ReactNode }) => <span className={styles.kw}>{children}</span>
export const Fn  = ({ children }: { children: ReactNode }) => <span className={styles.fn}>{children}</span>
export const Str = ({ children }: { children: ReactNode }) => <span className={styles.str}>{children}</span>
export const Com = ({ children }: { children: ReactNode }) => <span className={styles.com}>{children}</span>
