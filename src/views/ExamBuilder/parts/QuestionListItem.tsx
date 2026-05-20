'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Chip } from '@/components/atoms'
import { QUESTION_COLOR, type QuestionType, type SpectrumColor } from '@/lib/types'
import styles from './QuestionListItem.module.css'

const DIFFICULTY_COLOR: Record<'Easy' | 'Medium' | 'Hard', SpectrumColor> = {
  Easy: 'gray',
  Medium: 'yellow',
  Hard: 'red',
}

export type QuestionListItemProps = {
  number: string
  points: string
  title: string
  type: QuestionType
  typeLabel?: string
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  active?: boolean
  dashed?: boolean
  onClick?: () => void
}

export function QuestionListItem({
  number,
  points,
  title,
  type,
  typeLabel,
  difficulty,
  active,
  dashed,
  onClick,
}: QuestionListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(styles.card, active && styles.active, dashed && styles.dashed)}
    >
      <div className={styles.head}>
        <span className={styles.num}>{number}</span>
        <span className={cn(styles.pts, dashed && styles.ptsMuted)}>{points}</span>
      </div>
      <h4 className={cn(styles.title, dashed && styles.titleMuted)}>{title}</h4>
      <div className={styles.meta}>
        {dashed ? (
          <Chip color="gray">Drafting…</Chip>
        ) : (
          <>
            <Chip color={QUESTION_COLOR[type]} leadingDot>
              {typeLabel ?? type.toUpperCase()}
            </Chip>
            {difficulty && <Chip color={DIFFICULTY_COLOR[difficulty]}>{difficulty}</Chip>}
          </>
        )}
      </div>
    </button>
  )
}

export const NEW_QUESTION_PLACEHOLDER: ReactNode = null