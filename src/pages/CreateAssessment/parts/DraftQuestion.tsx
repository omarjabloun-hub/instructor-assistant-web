import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button, Chip } from '@/components/atoms'
import { QUESTION_COLOR, type QuestionType, type SpectrumColor } from '@/lib/types'
import styles from './DraftQuestion.module.css'

const DIFFICULTY_COLOR: Record<'Easy' | 'Medium' | 'Hard', SpectrumColor> = {
  Easy: 'gray',
  Medium: 'yellow',
  Hard: 'red',
}

export type DraftBaremeRow = { idx: string; label: string; pts: string }

export type DraftQuestionProps = {
  number: string
  pts: string
  ptsValue: string
  title: ReactNode
  type: QuestionType
  typeLabel?: string
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  statement?: ReactNode
  bareme?: { caption: string; rows: DraftBaremeRow[] }
  source?: ReactNode
  streaming?: boolean
  thinking?: ReactNode
}

export function DraftQuestion({
  number,
  pts,
  ptsValue,
  title,
  type,
  typeLabel,
  difficulty,
  statement,
  bareme,
  source,
  streaming,
  thinking,
}: DraftQuestionProps) {
  return (
    <article className={cn(styles.card, streaming && styles.streaming)}>
      <div className={styles.head}>
        <div>
          <span className={styles.num}>{number} · {pts}</span>
          <h3 className={styles.title}>
            {title}
            {streaming && <span className={styles.cursor} />}
          </h3>
          <div className={styles.chipRow}>
            <Chip color={QUESTION_COLOR[type]} leadingDot>
              {typeLabel ?? type.toUpperCase()}
            </Chip>
            {difficulty && <Chip color={DIFFICULTY_COLOR[difficulty]}>{difficulty}</Chip>}
          </div>
        </div>
        <span className={styles.pts}>{ptsValue}</span>
      </div>

      {thinking ? (
        <div style={{ marginTop: 4 }}>{thinking}</div>
      ) : (
        <>
          {statement && <div className={styles.statement}>{statement}</div>}
          {bareme && (
            <div className={styles.bareme}>
              <div className={styles.baremeHead}>{bareme.caption}</div>
              {bareme.rows.map((r) => (
                <div key={r.idx} className={styles.crit}>
                  <span className={styles.idx}>{r.idx}</span>
                  <span>{r.label}</span>
                  <span className={styles.critPts}>{r.pts}</span>
                </div>
              ))}
            </div>
          )}
          <div className={cn(styles.actions, !bareme && styles.actionsNoBorder)}>
            <div className={styles.source}>{source}</div>
            <div className={styles.right}>
              <Button variant="ghost" size="sm">Regenerate</Button>
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="secondary" size="sm">Accept</Button>
            </div>
          </div>
        </>
      )}
    </article>
  )
}
