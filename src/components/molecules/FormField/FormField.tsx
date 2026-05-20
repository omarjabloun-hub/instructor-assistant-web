import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import styles from './FormField.module.css'

export type FormFieldProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  required?: boolean
  htmlFor?: string
}

export function FormField({
  label,
  hint,
  error,
  required,
  htmlFor,
  className,
  children,
  ...rest
}: FormFieldProps) {
  return (
    <div className={cn(styles.field, className)} {...rest}>
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error ? <span className={styles.error}>{error}</span> : hint ? <span className={styles.hint}>{hint}</span> : null}
    </div>
  )
}
