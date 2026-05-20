'use client'

import { AppShell } from '@/components/templates'
import { Breadcrumbs, FormField } from '@/components/molecules'
import { Button, Chip, Input, Select, SmallCaps, Textarea } from '@/components/atoms'
import {
  IconDownload,
  IconEdit,
  IconMenu,
  IconPlus,
  IconSparkle,
  IconMoreHorizontal,
} from '@/lib/icons'
import { QUESTION_COLOR, type QuestionType } from '@/lib/types'
import { Bareme, QuestionListItem, RailStat, TypePill, TypePillList } from './parts'
import styles from './ExamBuilder.module.css'

type Q = {
  id: string
  number: string
  pts: string
  title: string
  type: QuestionType
  typeLabel?: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const QUESTIONS: Q[] = [
  { id: '01', number: '01', pts: '2 pts', title: 'Asymptotic notation — definitions', type: 'qa', typeLabel: 'Q&A', difficulty: 'Easy' },
  { id: '02', number: '02', pts: '2 pts', title: 'Quicksort — worst-case input', type: 'qa', typeLabel: 'Q&A', difficulty: 'Easy' },
  { id: '03', number: '03', pts: '3 pts', title: 'Master theorem — case analysis', type: 'qa', typeLabel: 'Q&A', difficulty: 'Medium' },
  { id: '04', number: '04', pts: '3 pts', title: 'Graph traversal — BFS vs DFS', type: 'open', typeLabel: 'Open', difficulty: 'Medium' },
  { id: '05', number: '05', pts: '4 pts', title: 'Dijkstra — implement in Python', type: 'code', typeLabel: 'Code', difficulty: 'Hard' },
  { id: '06', number: '06', pts: '2 pts', title: 'NP-completeness — reduction sketch', type: 'open', typeLabel: 'Open', difficulty: 'Hard' },
  { id: '07', number: '07', pts: '2 pts', title: 'Graph diagram — identify the cycle', type: 'image', typeLabel: 'Image', difficulty: 'Medium' },
]

export function ExamBuilder() {
  return (
    <AppShell
      topbar={{
        showSearch: false,
        leading: (
          <Breadcrumbs
            items={[
              { label: 'Dashboard', to: '/' },
              { label: 'CS-201 Algorithms', to: '/exam-builder' },
              { label: 'Final exam · January 2026' },
            ]}
          />
        ),
        actions: (
          <>
            <span className={styles.saveState}>Saved 2 min ago</span>
            <Button variant="ghost" size="sm" leadingIcon={<IconDownload size={14} />}>
              Export
            </Button>
            <Button variant="secondary" size="sm">
              Preview
            </Button>
            <Button variant="primary" size="sm">
              Publish
            </Button>
          </>
        ),
      }}
    >
      <div className={styles.headerRow}>
        <div>
          <div className={styles.chipRow}>
            <Chip color="green" leadingDot>CS-201 Algorithms</Chip>
            <Chip color="gray">Final exam</Chip>
            <Chip color="blue">Spring 2026</Chip>
          </div>
          <h1>Algorithms — Final, January 2026</h1>
          <div className={styles.metaRow}>
            <span><strong>8</strong> questions</span>
            <span className={styles.dotSep} />
            <span><strong>20</strong> points</span>
            <span className={styles.dotSep} />
            <span>~<strong>2h</strong></span>
            <span className={styles.dotSep} />
            <span><strong>32</strong> students</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm" leadingIcon={<IconPlus size={14} />}>
            Add question
          </Button>
          <Button
            as="a"
            href="/create-assessment"
            variant="ai"
            size="sm"
            leadingIcon={<IconSparkle size={14} />}
          >
            Draft with AI
          </Button>
        </div>
      </div>

      <div className={styles.builder}>
        <aside className={styles.list}>
          <div className={styles.listHead}>
            <SmallCaps>8 questions</SmallCaps>
            <SmallCaps>18 / 20</SmallCaps>
          </div>
          {QUESTIONS.map((q) => (
            <QuestionListItem
              key={q.id}
              number={q.number}
              points={q.pts}
              title={q.title}
              type={q.type}
              typeLabel={q.typeLabel}
              difficulty={q.difficulty}
              active={q.id === '03'}
            />
          ))}
          <QuestionListItem
            number="08"
            points="— pts"
            title="Untitled · draft"
            type="other"
            dashed
          />
          <Button variant="ghost" size="sm" className={styles.addBtn} leadingIcon={<IconPlus size={14} />}>
            Add question
          </Button>
        </aside>

        <section className={styles.editor}>
          <div className={styles.editorHead}>
            <div>
              <SmallCaps>Question 03 of 08</SmallCaps>
              <h2>Master theorem — case analysis</h2>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <Button variant="ghost" size="icon" title="Duplicate">
                <IconEdit size={16} />
              </Button>
              <Button variant="ghost" size="icon" title="Reorder">
                <IconMenu size={16} />
              </Button>
              <Button variant="ghost" size="icon" title="More">
                <IconMoreHorizontal size={16} />
              </Button>
            </div>
          </div>

          <TypePillList>
            <TypePill color={QUESTION_COLOR.qa} active>Q&A</TypePill>
            <TypePill color={QUESTION_COLOR.open}>Open-ended</TypePill>
            <TypePill color={QUESTION_COLOR.math}>Math</TypePill>
            <TypePill color={QUESTION_COLOR.code}>Code</TypePill>
            <TypePill color={QUESTION_COLOR.image}>Image</TypePill>
          </TypePillList>

          <div className={styles.form} style={{ marginTop: 20 }}>
            <FormField label="Statement" hint="Supports text, LaTeX (between $…$), and inline images.">
              <Textarea
                rows={3}
                defaultValue="State the three cases of the master theorem for divide-and-conquer recurrences. Then prove correctness of case 2 for the specific recurrence T(n) = 2T(n/2) + n."
              />
            </FormField>

            <div className={styles.formRow}>
              <FormField label="Difficulty">
                <Select defaultValue="medium">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Select>
              </FormField>
              <FormField label="Time estimate">
                <Input defaultValue="12 min" />
              </FormField>
              <FormField label="Points">
                <Input defaultValue="3.0" />
              </FormField>
              <FormField label="Topic tags" className={styles.full}>
                <div className={styles.tagRow}>
                  <Chip color="purple">Recurrences</Chip>
                  <Chip color="purple">Divide &amp; conquer</Chip>
                  <Chip color="purple">Master theorem</Chip>
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{ padding: '2px 8px', fontSize: 12, color: 'var(--ink-muted)' }}
                  >
                    + Add tag
                  </Button>
                </div>
              </FormField>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 12 }}>
                <div>
                  <SmallCaps>Barème · grading rubric</SmallCaps>
                  <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--ink-muted)' }}>
                    The AI applies this rubric verbatim to every submission.
                  </p>
                </div>
                <Button variant="ai" size="sm" leadingIcon={<IconSparkle size={14} />}>
                  Draft barème
                </Button>
              </div>
              <Bareme
                rows={[
                  { idx: 'a', criterion: 'Correctly states all three cases of the master theorem.', points: '1.0' },
                  { idx: 'b', criterion: 'Identifies case 2 applies to T(n) = 2T(n/2) + n with f(n) = Θ(n^log₂ 2).', points: '1.0' },
                  { idx: 'c', criterion: 'Verifies the regularity condition where required, or notes its absence.', points: '0.5' },
                  { idx: 'd', criterion: 'Concludes T(n) = Θ(n log n) with a clean derivation.', points: '0.5' },
                ]}
                total="3.0 / 3"
              />
            </div>

            <FormField
              label={
                <>
                  Expected answer <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>(optional)</span>
                </>
              }
            >
              <Textarea
                rows={2}
                placeholder="Provide a model answer to anchor the AI's grading."
                defaultValue="For case 2, when f(n) = Θ(n^log_b a · log^k n), the recurrence solves to T(n) = Θ(n^log_b a · log^(k+1) n). Apply with a=2, b=2, k=0…"
              />
            </FormField>
          </div>
        </section>

        <aside className={styles.rail}>
          <RailStat
            label="Points budget"
            value={
              <>
                18
                <span className="max" style={{ fontSize: 14, color: 'var(--ink-subtle)', fontWeight: 400 }}>
                  {' '}/ 20
                </span>
              </>
            }
            chip={
              <Chip color="green" leadingDot size="sm">
                On track
              </Chip>
            }
            hint={<span style={{ color: 'var(--c-green-text)', fontWeight: 500 }}>2 points remaining.</span>}
          />
          <RailStat
            label="Estimated time"
            value="1h 47m"
            chip={
              <Chip color="blue" leadingDot size="sm">
                Within window
              </Chip>
            }
            hint="Within the 2-hour window."
          />
          <RailStat label="Difficulty mix" value={undefined}>
            <div className={styles.diffBar}>
              <div style={{ width: '38%', background: 'var(--c-gray-solid)' }} />
              <div style={{ width: '37%', background: 'var(--c-yellow-solid)' }} />
              <div style={{ width: '25%', background: 'var(--c-red-solid)' }} />
            </div>
            <div className={styles.diffLegend}>
              <span>
                <span className={styles.swatch} style={{ background: 'var(--c-gray-solid)' }} />3 easy
              </span>
              <span>
                <span className={styles.swatch} style={{ background: 'var(--c-yellow-solid)' }} />3 medium
              </span>
              <span>
                <span className={styles.swatch} style={{ background: 'var(--c-red-solid)' }} />2 hard
              </span>
            </div>
          </RailStat>
          <RailStat label="Question types" value={undefined}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              <Chip color={QUESTION_COLOR.qa} leadingDot>3 Q&A</Chip>
              <Chip color={QUESTION_COLOR.open} leadingDot>2 Open</Chip>
              <Chip color={QUESTION_COLOR.code} leadingDot>1 Code</Chip>
              <Chip color={QUESTION_COLOR.image} leadingDot>1 Image</Chip>
            </div>
          </RailStat>

          <div className={styles.aiCard}>
            <h5>
              <IconSparkle size={14} strokeWidth={2} />
              From your assistant
            </h5>
            <p>
              This exam is heavier on theory than your usual mix. Consider adding a short applied
              question — perhaps a graph traversal trace — to balance it out.
            </p>
            <div className={styles.actions}>
              <Button variant="ghost" size="sm">Dismiss</Button>
              <Button variant="secondary" size="sm">Draft one</Button>
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.5, padding: '0 4px' }}>
            AI proposes, you validate. Every suggestion is a draft until you accept it.
          </div>
        </aside>
      </div>
    </AppShell>
  )
}