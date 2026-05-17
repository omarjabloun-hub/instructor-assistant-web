import { forwardRef } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import styles from './Input.module.css'

const input = cva(styles.input, {
  variants: {
    size: { sm: styles.sm, md: '', lg: styles.lg },
    invalid: { true: styles.invalid },
  },
  defaultVariants: { size: 'md' },
})

type SharedVariant = VariantProps<typeof input>

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & SharedVariant

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size, invalid, className, ...rest },
  ref,
) {
  return <input ref={ref} className={cn(input({ size, invalid }), className)} {...rest} />
})

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  SharedVariant

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { size, invalid, className, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(input({ size, invalid }), styles.textarea, className)}
      {...rest}
    />
  )
})

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & SharedVariant

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size, invalid, className, children, ...rest },
  ref,
) {
  return (
    <select ref={ref} className={cn(input({ size, invalid }), className)} {...rest}>
      {children}
    </select>
  )
})
