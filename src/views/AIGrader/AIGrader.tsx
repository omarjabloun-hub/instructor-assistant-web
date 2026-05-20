'use client'

import { AppShell } from '@/components/templates'
import { Breadcrumbs } from '@/components/molecules'
import {
  AIRibbon,
  AIShimmer,
  Avatar,
  Button,
  Chip,
  CodeBlock,
  Com,
  Fn,
  Kw,
  SmallCaps,
  Str,
} from '@/components/atoms'
import { IconDownload, IconFilter } from '@/lib/icons'
import { QUESTION_COLOR } from '@/lib/types'
import { GradeCard, SubmissionItem, type Submission } from './parts'
import styles from './AIGrader.module.css'

const SUBMISSIONS: Submission[] = [
  { initials: 'AB', name: 'Aïcha Bensalem', avatarColor: 'green', status: { label: 'Validated', color: 'green' }, score: { value: '17', max: '20' } },
  { initials: 'MD', name: 'Marie Dubois', avatarColor: 'purple', status: { label: 'AI draft', color: 'yellow' }, score: { value: '14', max: '20' }, active: true },
  { initials: 'JV', name: 'Jean-Luc Vasseur', avatarColor: 'blue', status: { label: 'Grading…', color: 'blue' }, score: null },
  { initials: 'PK', name: 'Priya Krishnan', avatarColor: 'pink', status: { label: 'Validated', color: 'green' }, score: { value: '19', max: '20' } },
  { initials: 'OK', name: 'Omar Khalil', avatarColor: 'orange', status: { label: 'AI draft', color: 'yellow' }, score: { value: '11', max: '20' } },
  { initials: 'SC', name: 'Sofia Caruso', avatarColor: 'teal', status: { label: 'AI draft', color: 'yellow' }, score: { value: '16', max: '20' } },
  { initials: 'TN', name: 'Thomas Nguyen', avatarColor: 'yellow', status: { label: 'Queued', color: 'blue' }, score: null },
  { initials: 'LM', name: 'Lin Mei', avatarColor: 'red', status: { label: 'Validated', color: 'green' }, score: { value: '18', max: '20' } },
]

export function AIGrader() {
  return (
    <AppShell
      flushMain
      topbar={{
        showSearch: false,
        leading: (
          <Breadcrumbs
            items={[
              { label: 'Dashboard', to: '/' },
              { label: 'CS-201 Algorithms', to: '/exam-builder' },
              { label: 'Final exam · grading' },
            ]}
          />
        ),
        actions: (
          <>
            <AIRibbon>AI drafts — review before publishing</AIRibbon>
            <Button variant="ghost" size="sm" leadingIcon={<IconDownload size={14} />}>
              Export CSV
            </Button>
            <Button variant="primary" size="sm">
              Publish 7 grades
            </Button>
          </>
        ),
      }}
    >
      <div className={styles.progressStrip}>
        <span className={styles.progressLabel}>Grading · 32 submissions</span>
        <div className={styles.progressBar}>
          <div style={{ width: '22%', background: 'var(--c-green-solid)' }} />
          <div style={{ width: '56%', background: 'var(--c-yellow-solid)' }} />
        </div>
        <div className={styles.progressNum}>
          <span style={{ color: 'var(--c-green-text)' }}>7 validated</span>
          <span style={{ color: 'var(--c-yellow-text)' }}>18 drafts</span>
          <span style={{ color: 'var(--ink-muted)' }}>7 queued</span>
        </div>
      </div>

      <div className={styles.pageHeader}>
        <div className={styles.chipRow}>
          <Chip color="green" leadingDot>CS-201 Algorithms</Chip>
          <Chip color="gray">Final exam</Chip>
        </div>
        <h1>Marie Dubois — submission #14</h1>
        <p>algo-final-marie.pdf · uploaded 4 May 2026 · 11 pages</p>
      </div>

      <div className={styles.grader}>
        <aside>
          <div className={styles.subsHead}>
            <SmallCaps>Class · 32 students</SmallCaps>
            <Button variant="ghost" size="sm" style={{ padding: '4px 8px' }}>
              <IconFilter size={13} />
            </Button>
          </div>
          {SUBMISSIONS.map((s) => (
            <SubmissionItem key={s.name} {...s} />
          ))}
          <AIShimmer style={{ marginTop: 12, fontSize: 12, padding: '8px 12px' }}>
            Reading 3 submissions…
          </AIShimmer>
        </aside>

        <section className={styles.pane}>
          <div className={styles.paneHead}>
            <div className={styles.studentHeader}>
              <div className="who" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Avatar size="lg" color="purple" initials="MD" />
                <div>
                  <h2>Marie Dubois</h2>
                  <span className={styles.subMeta}>Student #4291 · submitted 4 May, 10:34</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="secondary" size="sm">Override scores</Button>
                <Button variant="primary" size="sm">Validate &amp; advance →</Button>
              </div>
            </div>
          </div>

          <div className={styles.summaryRow}>
            <div className={styles.summaryCell}>
              <div className={styles.summaryLbl}>AI proposed</div>
              <div className={`${styles.summaryVal} ${styles.summaryValDraft}`}>
                13<span className="max"> / 20</span>
              </div>
            </div>
            <div className={styles.summaryCell}>
              <div className={styles.summaryLbl}>After overrides</div>
              <div className={`${styles.summaryVal} ${styles.summaryValScore}`}>
                14<span className="max"> / 20</span>
              </div>
            </div>
            <div className={styles.summaryCell}>
              <div className={styles.summaryLbl}>Overridden</div>
              <div className={styles.summaryVal}>
                2<span className="max"> / 8</span>
              </div>
            </div>
            <div className={styles.summaryCell}>
              <div className={styles.summaryLbl}>Class median</div>
              <div className={styles.summaryVal}>
                13.5<span className="max"> / 20</span>
              </div>
            </div>
          </div>

          <div className={styles.qrow}>
            <div className={styles.qrowCol}>
              <div className={styles.qrowHead}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-muted)' }}>
                    QUESTION 03
                  </span>
                  <h3>Master theorem — case analysis</h3>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <Chip color={QUESTION_COLOR.qa} leadingDot>Q&amp;A</Chip>
                    <Chip color="yellow">Medium</Chip>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    background: 'var(--surface-sunken)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--ink-strong)',
                  }}
                >
                  3 pts
                </span>
              </div>
              <div className={styles.statement}>
                State the three cases of the master theorem and prove correctness for case 2 of the
                recurrence T(n) = 2T(n/2) + n.
              </div>
              <div className={styles.answer}>
                The master theorem describes the asymptotic behavior of recurrences of the form T(n) = aT(n/b) + f(n). The three cases compare f(n) against n^(log_b a):
                {'\n\n'}
                <span
                  style={{
                    background: 'var(--accent-50)',
                    borderBottom: '1px solid var(--accent-300)',
                    padding: '0 2px',
                    color: 'var(--accent-700)',
                  }}
                >
                  — case 1: f(n) = O(n^(log_b a − ε)), then T(n) = Θ(n^log_b a){'\n'}
                  — case 2: f(n) = Θ(n^log_b a), then T(n) = Θ(n^log_b a · log n){'\n'}
                  — case 3: f(n) = Ω(n^(log_b a + ε)), then T(n) = Θ(f(n))
                </span>
                {'\n\n'}
                For T(n) = 2T(n/2) + n, a = 2, b = 2, so n^log_b a = n. Then f(n) = n = Θ(n^log_b a), placing the recurrence in case 2. Therefore T(n) = Θ(n log n).
              </div>
            </div>

            <div className={styles.qrowCol}>
              <GradeCard
                scoreValue="2.5"
                scoreMax="3"
                reason={
                  <>
                    The proof correctly applies <cite>case 2 of the master theorem</cite> and
                    identifies the parameters cleanly, but skips the regularity condition. Partial
                    credit awarded for the setup.
                  </>
                }
                criteria={[
                  { status: 'ok', label: 'States all three cases of the master theorem.', points: '1.0', outOf: '1.0' },
                  { status: 'ok', label: 'Identifies case 2 with f(n) = Θ(n^log₂ 2).', points: '1.0', outOf: '1.0' },
                  { status: 'no', label: 'Verifies the regularity condition.', points: '0.0', outOf: '0.5' },
                  { status: 'ok', label: 'Concludes T(n) = Θ(n log n) cleanly.', points: '0.5', outOf: '0.5' },
                ]}
                feedback="Your case analysis is clean and the final result is correct. To earn full marks, also check the regularity condition for case 2 (or state explicitly that it is not required here and why)."
              />
            </div>
          </div>

          <div className={styles.qrow}>
            <div className={styles.qrowCol}>
              <div className={styles.qrowHead}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-muted)' }}>
                    QUESTION 05
                  </span>
                  <h3>Dijkstra — implement in Python</h3>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <Chip color={QUESTION_COLOR.code} leadingDot>Code · Python</Chip>
                    <Chip color="red">Hard</Chip>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    background: 'var(--surface-sunken)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--ink-strong)',
                  }}
                >
                  4 pts
                </span>
              </div>
              <div className={styles.statement}>
                Implement Dijkstra's shortest-path algorithm for a weighted graph. Use a min-heap.
                Handle disconnected vertices.
              </div>
              <div className={`${styles.answer} ${styles.answerBare}`}>
                <CodeBlock>
                  <Kw>import</Kw> heapq{'\n\n'}
                  <Kw>def</Kw> <Fn>dijkstra</Fn>(graph, source):{'\n'}
                  {'    '}dist = {'{'}v: <Fn>float</Fn>(<Str>'inf'</Str>) <Kw>for</Kw> v <Kw>in</Kw> graph{'}'}
                  {'\n'}
                  {'    '}dist[source] = 0{'\n'}
                  {'    '}pq = [(0, source)]{'\n'}
                  {'    '}<Kw>while</Kw> pq:{'\n'}
                  {'        '}d, u = heapq.<Fn>heappop</Fn>(pq){'\n'}
                  {'        '}<Kw>if</Kw> d &gt; dist[u]: <Kw>continue</Kw>{'\n'}
                  {'        '}<Kw>for</Kw> v, w <Kw>in</Kw> graph[u].<Fn>items</Fn>():{'\n'}
                  {'            '}<Kw>if</Kw> dist[u] + w &lt; dist[v]:{'\n'}
                  {'                '}dist[v] = dist[u] + w{'\n'}
                  {'                '}heapq.<Fn>heappush</Fn>(pq, (dist[v], v)){'\n'}
                  {'    '}<Kw>return</Kw> dist{'\n\n'}
                  <Com># O((V + E) log V)</Com>
                </CodeBlock>
              </div>
            </div>

            <div className={styles.qrowCol}>
              <GradeCard
                variant="override"
                scoreValue="3.5"
                scoreMax="4"
                reason={
                  <>
                    Implementation is correct, uses <cite>heapq</cite> properly, handles the
                    lazy-deletion optimisation. Disconnected vertices reported with{' '}
                    <cite>float('inf')</cite>.
                  </>
                }
                criteria={[
                  { status: 'ok', label: 'Correct algorithm, terminates on all inputs.', points: '2.0', outOf: '2.0' },
                  { status: 'ok', label: 'Uses a min-heap appropriately.', points: '1.0', outOf: '1.0' },
                  { status: 'ok', label: 'Handles disconnected vertices.', points: '0.5', outOf: '0.5' },
                  { status: 'mid', label: 'Docs, edge cases, complexity comment.', points: '0.0', outOf: '0.5' },
                ]}
                feedback="Clean, idiomatic Dijkstra. A short docstring stating the expected complexity (O((V+E) log V)) and a comment about the lazy-deletion guard would round this off."
                override="AI proposed 3.0 → you set 3.5"
              />
            </div>
          </div>
        </section>
      </div>

      <div className={styles.floatBar}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div>
            <div className={styles.lbl}>Total · Marie Dubois</div>
            <div className={styles.scoreBig}>
              14<span className="max"> / 20</span>
            </div>
          </div>
          <div className={styles.vdivider} />
          <div className={styles.note}>
            8 questions · 2 overridden · audit log will be saved with the grade.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" size="sm">
            Save &amp; close
          </Button>
          <Button variant="primary" size="sm">
            Validate · next →
          </Button>
        </div>
      </div>
    </AppShell>
  )
}