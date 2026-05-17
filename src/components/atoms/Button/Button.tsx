import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import styles from './Button.module.css'

const button = cva(styles.btn, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      ghost: styles.ghost,
      danger: styles.danger,
      ai: styles.ai,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      icon: styles.icon,
    },
    block: { true: styles.block },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

type ButtonBaseProps = VariantProps<typeof button> & {
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  children?: ReactNode
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button'
  }

type AnchorProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'a'
    href: string
  }

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | AnchorProps>(
  function Button(props, ref) {
    const { variant, size, block, leadingIcon, trailingIcon, children, className, ...rest } = props
    const classes = cn(button({ variant, size, block }), className)
    const inner = (
      <>
        {leadingIcon}
        {children}
        {trailingIcon}
      </>
    )
    if (props.as === 'a') {
      return (
        <a
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
        >
          {inner}
        </a>
      )
    }
    return (
      <button
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
      >
        {inner}
      </button>
    )
  },
)
