'use client'

import { AppShell } from '@/components/templates'
import { Breadcrumbs, FilterChip, Tab, Tabs, TabsList } from '@/components/molecules'
import { AIRibbon, Button, ClassDot, Chip, ProgressBar } from '@/components/atoms'
import {
  IconBook,
  IconCheck,
  IconClock,
  IconCode,
  IconDownload,
  IconFile,
  IconMenu,
  IconPlus,
  IconRefresh,
  IconSettings,
  IconSparkle,
  IconUsers,
} from '@/lib/icons'
import {
  ComposeDock,
  CoverBand,
  FormatChip,
  LessonCard,
  LessonCardEmpty,
  ReuseTag,
  ReviewLink,
  WeekCard,
  type WeekCardProps,
} from './parts'
import styles from './Courses.module.css'

const WEEKS: WeekCardProps[] = [
  { num: 'W01', status: 'done', title: 'Foundations & correctness', formats: ['notes', 'slides', 'reading', 'summary'] },
  { num: 'W02', status: 'done', title: 'Asymptotic analysis', formats: ['notes', 'slides', 'practice', 'summary'] },
  { num: 'W03', status: 'done', title: 'Divide & conquer', formats: ['notes', 'slides', 'reading', 'practice'] },
  { num: 'W04', status: 'done', title: 'Sorting', formats: ['notes', 'slides', 'reading', 'practice', 'summary'] },
  { num: 'W05', status: 'done', title: 'Hashing & search trees', formats: ['notes', 'slides', 'practice'] },
  { num: 'W06', status: 'done', title: 'Heaps & priority queues', formats: ['notes', 'slides', 'reading', 'summary'] },
  { num: 'W07', status: 'done', title: 'Graph representations & BFS / DFS', formats: ['notes', 'slides', 'reading', 'practice', 'summary'] },
  { num: 'W08 · NOW', status: 'current', title: 'Shortest paths', formats: ['notes', 'slides', 'reading', 'practice', 'summary'] },
  { num: 'W09', status: 'ai-drafting', title: 'All-pairs shortest paths', formats: ['notes', 'slides', 'missing', 'missing'] },
  { num: 'W10', status: 'future', title: 'Minimum spanning trees', formats: ['missing', 'missing', 'missing'] },
  { num: 'W11', status: 'future', title: 'Max-flow & matching', formats: ['missing', 'missing'] },
  { num: 'W12', status: 'future', title: 'NP-completeness', formats: ['missing', 'missing'] },
  { num: 'W13', status: 'future', title: 'Approximation', formats: ['missing', 'missing'] },
  { num: 'W14', status: 'future', title: 'Review & final', formats: ['missing', 'missing'] },
]

const OBJECTIVES = [
  'State the single-source shortest-path problem formally',
  'Derive Dijkstra from BFS; explain why a heap is needed',
  'Identify graphs where Dijkstra fails (negative edges)',
  'Compare Dijkstra and Bellman-Ford trade-offs',
]

export function Courses() {
  return (
    <AppShell
      flushMain
      topbar={{
        showSearch: false,
        leading: (
          <Breadcrumbs
            items={[
              { label: 'Dashboard', to: '/' },
              { label: 'Library' },
              { label: 'Courses' },
              { label: 'CS-201 Algorithms' },
            ]}
          />
        ),
        actions: (
          <>
            <AIRibbon>AI-assisted authoring</AIRibbon>
            <Button variant="ghost" size="sm">Share with TAs</Button>
            <Button variant="primary" size="sm">Publish to class</Button>
          </>
        ),
      }}
    >
      {/* HERO */}
      <section className={styles.hero}>
        <CoverBand />
        <div className={styles.titleStrip}>
          <div className={styles.titleGlyph}>
            <IconCode size={28} strokeWidth={1.6} />
          </div>
          <div>
            <h1>CS-201 — Algorithms &amp; Complexity</h1>
            <div className={styles.metaRow}>
              <span>Spring 2026 · 14-week course</span>
              <span className={styles.metaSep} />
              <span><strong>32</strong> students</span>
              <span className={styles.metaSep} />
              <span><strong>11 / 14</strong> lessons published</span>
              <span className={styles.metaSep} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <ClassDot color="green" size="sm" />
                Class colour · green
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <Button variant="secondary" size="sm" leadingIcon={<IconFile size={14} />}>
              Export syllabus
            </Button>
            <Button variant="ai" size="sm" leadingIcon={<IconSparkle size={14} />}>
              Draft next lesson
            </Button>
          </div>
        </div>
      </section>

      {/* TABS */}
      <Tabs defaultValue="syllabus" className={styles.tabs}>
        <TabsList style={{ border: 0, gap: 4 }}>
          <Tab value="syllabus" icon={<IconMenu size={12} />} count={14}>
            Syllabus
          </Tab>
          <Tab value="materials" icon={<IconFile size={12} />} count={68}>
            Materials
          </Tab>
          <Tab value="schedule" icon={<IconClock size={12} />}>
            Schedule
          </Tab>
          <Tab value="roster" icon={<IconUsers size={12} />} count={32}>
            Roster
          </Tab>
          <Tab value="settings" icon={<IconSettings size={12} />}>
            Settings
          </Tab>
        </TabsList>
      </Tabs>

      {/* PROGRESS BAND */}
      <div className={styles.progressBand}>
        <div>
          <div className={styles.lbl}>Course progress · Week 8 of 14</div>
          <ProgressBar
            segments={[
              { value: 50, color: 'var(--c-green-solid)', label: 'published' },
              { value: 7, color: 'var(--accent-500)', label: 'AI drafting' },
              { value: 7, color: 'var(--c-yellow-solid)', label: 'in review' },
              { value: 36, color: 'var(--surface-sunken)', label: 'not started' },
            ]}
          />
          <div className={styles.legend}>
            <span>
              <span className={styles.sw} style={{ background: 'var(--c-green-solid)' }} />7 published
            </span>
            <span>
              <span className={styles.sw} style={{ background: 'var(--accent-500)' }} />1 AI-drafting
            </span>
            <span>
              <span className={styles.sw} style={{ background: 'var(--c-yellow-solid)' }} />1 in review
            </span>
            <span>
              <span className={styles.sw} style={{ background: 'var(--surface-sunken)', border: '1px solid var(--line-soft)' }} />5 not started
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className={styles.lbl}>Materials generated</div>
          <div className={styles.summaryNum}>
            68<span className="max"> / 70 planned</span>
          </div>
          <div className={styles.summaryDelta}>
            <span>+12 this week</span>
          </div>
        </div>
      </div>

      {/* SYLLABUS TRACK */}
      <section className={styles.syllabus}>
        <div className={styles.syllabusHead}>
          <h2>Weekly plan</h2>
          <div className={styles.legendInline}>
            <span><span className={styles.dot} style={{ background: 'var(--c-brown-solid)' }} />Notes</span>
            <span><span className={styles.dot} style={{ background: 'var(--c-purple-solid)' }} />Slides</span>
            <span><span className={styles.dot} style={{ background: 'var(--c-blue-solid)' }} />Readings</span>
            <span><span className={styles.dot} style={{ background: 'var(--c-green-solid)' }} />Practice</span>
            <span><span className={styles.dot} style={{ background: 'var(--c-teal-solid)' }} />Summary</span>
          </div>
        </div>
        <div className={styles.weeks}>
          {WEEKS.map((w) => (
            <WeekCard key={w.num} {...w} />
          ))}
        </div>
      </section>

      {/* LESSON STUDIO */}
      <section className={styles.studio}>
        <div className={styles.studioHead}>
          <div className={styles.studioTitle}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
              <span className={styles.weekPill}>WEEK 08 · LESSON 1 of 2</span>
              <Chip color="green" leadingDot>Published</Chip>
              <Chip color="ai" leadingDot>Last edited by AI · 2h ago</Chip>
            </div>
            <h2>Shortest paths — Dijkstra &amp; Bellman-Ford</h2>
            <div className={styles.studioSub}>
              75 min lecture · prerequisites: Week 7 (BFS, DFS) · Week 6 (heaps)
            </div>
            <div className={styles.objectives}>
              {OBJECTIVES.map((o) => (
                <span key={o} className={styles.objective}>
                  <IconCheck size={12} strokeWidth={2.4} />
                  {o}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" size="sm" leadingIcon={<IconRefresh size={14} />}>
              Regenerate
            </Button>
            <Button variant="secondary" size="sm" leadingIcon={<IconFile size={14} />}>
              Edit lesson
            </Button>
          </div>
        </div>

        <div className={styles.studioGrid}>
          {/* NOTES */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div className="left" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <FormatChip format="notes" label="Lecture notes" />
                <span className={styles.panelMeta}>12 pages · 2,840 words</span>
              </div>
              <div className={styles.panelActions}>
                <Button variant="ghost" size="sm" leadingIcon={<IconDownload size={14} />}>
                  .docx
                </Button>
                <Button variant="ghost" size="sm">Open</Button>
              </div>
            </div>
            <div className={styles.notesBody}>
              <div className={styles.notesH}>1 · The single-source shortest-path problem</div>
              <div>
                <span className={styles.notesTag}>def</span>
                Given a weighted directed graph <span className={styles.notesFormula}>G = (V, E, w)</span> and
                a source <span className={styles.notesFormula}>s ∈ V</span>, find for every vertex{' '}
                <span className={styles.notesFormula}>v</span> the minimum total weight of a path from{' '}
                <span className={styles.notesFormula}>s</span> to <span className={styles.notesFormula}>v</span>.
              </div>
              <div>
                We write this distance <span className={styles.notesFormula}>δ(s, v)</span>, with the
                convention <span className={styles.notesFormula}>δ(s, v) = ∞</span> when no path exists.
              </div>
              <div className={styles.notesHSub}>2 · Dijkstra's algorithm (1956)</div>
              <div>
                The key insight: <em>relax</em> edges out of the closest unvisited vertex. Because all
                weights are non-negative, once a vertex's distance is finalized it cannot improve.
              </div>
              <div>
                <span className={styles.notesTag}>intuition</span>
                BFS is the special case where every edge has weight 1; Dijkstra replaces the FIFO queue
                with a min-heap keyed on tentative distance.
              </div>
              <div>
                Running time with a binary heap: <span className={styles.notesFormula}>O((V + E) log V)</span>.
              </div>
            </div>
          </article>

          {/* SLIDES */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div className="left" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <FormatChip format="slides" label="Slide deck" />
                <span className={styles.panelMeta}>24 slides · 16:9</span>
              </div>
              <div className={styles.panelActions}>
                <Button variant="ghost" size="sm" leadingIcon={<IconDownload size={14} />}>
                  .pptx
                </Button>
                <Button variant="ghost" size="sm">Open</Button>
              </div>
            </div>
            <div className={styles.slideGrid}>
              <div className={`${styles.thumb} ${styles.thumbCover}`}>
                <span className={styles.thumbNum}>01</span>
                <h4>Shortest paths</h4>
                <div className={styles.thumbBody}>
                  Dijkstra · Bellman-Ford<br />CS-201 · Week 8
                </div>
              </div>
              <div className={styles.thumb}>
                <span className={styles.thumbNum}>02</span>
                <h4>The problem</h4>
                <ul className={styles.thumbBullets}>
                  <li>Weighted directed graph</li>
                  <li>Source vertex s</li>
                  <li>Find δ(s, v) for all v</li>
                </ul>
              </div>
              <div className={`${styles.thumb} ${styles.thumbDiagram}`}>
                <span className={styles.thumbNum}>03</span>
                <h4>From BFS to Dijkstra</h4>
                <div className={styles.miniGraph}>
                  <span className={styles.node} style={{ left: '10%', top: '30%' }} />
                  <span className={styles.node} style={{ left: '38%', top: '18%' }} />
                  <span className={styles.node} style={{ left: '64%', top: '38%' }} />
                  <span className={styles.node} style={{ left: '32%', top: '62%' }} />
                  <span className={styles.node} style={{ left: '78%', top: '70%' }} />
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 60">
                    <line x1="14" y1="22" x2="40" y2="14" stroke="#145CC2" strokeWidth="0.6" />
                    <line x1="40" y1="14" x2="66" y2="26" stroke="#145CC2" strokeWidth="0.6" />
                    <line x1="14" y1="22" x2="34" y2="42" stroke="#145CC2" strokeWidth="0.6" />
                    <line x1="34" y1="42" x2="80" y2="48" stroke="#145CC2" strokeWidth="0.6" />
                    <line x1="66" y1="26" x2="80" y2="48" stroke="#145CC2" strokeWidth="0.6" />
                  </svg>
                </div>
              </div>
              <div className={styles.thumb}>
                <span className={styles.thumbNum}>04</span>
                <h4>Algorithm sketch</h4>
                <ul className={styles.thumbBullets}>
                  <li>Init dist[s] = 0</li>
                  <li>Pop min-heap</li>
                  <li>Relax outgoing edges</li>
                  <li>Repeat until empty</li>
                </ul>
              </div>
              <div className={styles.thumb}>
                <span className={styles.thumbNum}>05</span>
                <h4>Why a heap?</h4>
                <ul className={styles.thumbBullets}>
                  <li>Naïve scan = O(V²)</li>
                  <li>Binary heap = O(E log V)</li>
                  <li>Fib heap = O(E + V log V)</li>
                </ul>
              </div>
              <div className={styles.thumb}>
                <span className={styles.thumbNum}>06</span>
                <h4>When Dijkstra breaks</h4>
                <ul className={styles.thumbBullets}>
                  <li>Negative edges</li>
                  <li>→ use Bellman-Ford</li>
                  <li>O(V·E)</li>
                </ul>
              </div>
            </div>
          </article>

          {/* READINGS */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div className="left" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <FormatChip format="reading" label="Reading list" />
                <span className={styles.panelMeta}>3 items · ~42 pages</span>
              </div>
              <div className={styles.panelActions}>
                <Button variant="ghost" size="sm" leadingIcon={<IconPlus size={14} />}>
                  Add
                </Button>
              </div>
            </div>
            <div className={styles.readingList}>
              <div className={styles.reading}>
                <div className={`${styles.readingCover} ${styles.coverClrs}`}>
                  <span className="spine" />
                </div>
                <div>
                  <div className={styles.readingTitle}>Introduction to Algorithms — Ch. 24</div>
                  <div className={styles.readingMeta}>Cormen, Leiserson, Rivest, Stein · CLRS 4e · Required</div>
                </div>
                <span className={styles.readingPages}>pp. 658–692</span>
              </div>
              <div className={styles.reading}>
                <div className={`${styles.readingCover} ${styles.coverSedge}`}>
                  <span className="spine" />
                </div>
                <div>
                  <div className={styles.readingTitle}>Algorithms — §4.4 Shortest Paths</div>
                  <div className={styles.readingMeta}>Sedgewick &amp; Wayne · Recommended</div>
                </div>
                <span className={styles.readingPages}>pp. 638–680</span>
              </div>
              <div className={styles.reading}>
                <div className={`${styles.readingCover} ${styles.coverPaper}`} />
                <div>
                  <div className={styles.readingTitle}>A Note on Two Problems in Connexion with Graphs</div>
                  <div className={styles.readingMeta}>E. W. Dijkstra · Num. Math. 1, 1959 · Optional · The original paper</div>
                </div>
                <span className={styles.readingPages}>3 pp.</span>
              </div>
            </div>
          </article>

          {/* SUMMARY */}
          <article className={`${styles.panel} ${styles.summaryPanel}`}>
            <div className={styles.panelHead}>
              <div className="left" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <FormatChip format="summary" label="Student-facing summary" />
                <span className={styles.panelMeta}>AI-drafted · approved</span>
              </div>
              <div className={styles.panelActions}>
                <Button variant="ghost" size="sm" leadingIcon={<IconRefresh size={14} />}>
                  Regenerate
                </Button>
              </div>
            </div>
            <div className={styles.summaryBody}>
              <ol className={styles.summaryBullets}>
                <li>
                  <span className={styles.idx}>1</span>
                  <span>
                    <strong>Dijkstra's algorithm</strong> finds the shortest path from one node to every
                    other node in a graph with non-negative edge weights.
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>2</span>
                  <span>
                    It works by always expanding the <strong>closest unvisited node</strong> — a greedy
                    choice that's safe because no later edge can shorten a path that's already minimal.
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>3</span>
                  <span>
                    The data structure that makes it fast is a <strong>min-heap</strong>: it gives us the
                    next closest vertex in <span className={styles.notesFormula}>O(log V)</span> time per
                    step.
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>4</span>
                  <span>
                    When edges can be <strong>negative</strong>, the greedy invariant breaks. Use{' '}
                    <strong>Bellman-Ford</strong> instead — it's slower (
                    <span className={styles.notesFormula}>O(V·E)</span>) but correct.
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>5</span>
                  <span>
                    Real-world uses include GPS routing, network protocols (OSPF), and currency
                    arbitrage detection (via negative cycles).
                  </span>
                </li>
              </ol>
            </div>
          </article>
        </div>
      </section>

      {/* COMPOSE DOCK */}
      <ComposeDock
        defaultValue="Draft Week 9 — All-pairs shortest paths, building on this week's Dijkstra material."
        hints={[
          '+ Floyd-Warshall section',
          '+ Worked example: 5-node graph',
          '+ Match tone of Week 8',
          '+ Add 10-question practice set',
        ]}
      />

      {/* LIBRARY SHELF */}
      <section className={styles.shelf}>
        <div className={styles.shelfHead}>
          <h2>From your library · reusable lessons</h2>
          <div className={styles.filters}>
            <FilterChip active>All</FilterChip>
            <FilterChip>This course</FilterChip>
            <FilterChip>Other classes</FilterChip>
            <FilterChip>AI-generated</FilterChip>
            <FilterChip>Reused 3+ times</FilterChip>
          </div>
        </div>
        <div className={styles.shelfGrid}>
          <LessonCard
            topGradient="green"
            number="W07 · LESSON · CS-201"
            title="BFS & DFS — graph traversal basics"
            description="Foundations students need before Week 8. Includes a 7-node worked example and a coding lab."
            formats={['notes', 'slides', 'practice']}
            footer={
              <>
                <span>Updated 4 days ago</span>
                <ReuseTag count={2} />
              </>
            }
          />
          <LessonCard
            ai
            topGradient="purple"
            number="AI-DRAFT · W09 · IN REVIEW"
            title="All-pairs shortest paths — Floyd-Warshall"
            description="Drafted from this week's lesson. Adds the matrix-relaxation viewpoint and a transitive-closure aside."
            formats={['notes', 'slides', 'summary']}
            footer={
              <>
                <span>Drafted 14 minutes ago</span>
                <ReviewLink href="/create-assessment">Review draft →</ReviewLink>
              </>
            }
          />
          <LessonCard
            topGradient="blue"
            number="REUSABLE · ALL CLASSES"
            title="Big-O without the hand-waving"
            description="A short refresher you can drop into any algorithms or analysis course. 10 slides, 3 quick exercises."
            formats={['slides', 'practice', 'summary']}
            footer={
              <>
                <span>From your library</span>
                <ReuseTag count={5} />
              </>
            }
          />
          <LessonCard
            topGradient="orange"
            number="W04 · LESSON · CS-201"
            title="Merge sort & the master theorem"
            description="Recurrence-relation toolkit with a clean derivation of T(n) = 2T(n/2) + Θ(n)."
            formats={['notes', 'slides', 'reading', 'practice']}
            footer={
              <>
                <span>Published 6 weeks ago</span>
                <ReuseTag count={1} />
              </>
            }
          />
          <LessonCard
            topGradient="brown"
            number="W06 · LESSON · CS-201"
            title="Heaps — the data structure that quietly powers everything"
            description="Includes the heap sort detour and a TA-favorite worksheet on heapify."
            formats={['notes', 'slides', 'reading']}
            footer={
              <>
                <span>Published 3 weeks ago</span>
                <ReuseTag count={3} />
              </>
            }
          />
          <LessonCard
            topGradient="teal"
            number="REUSABLE · MATH-104"
            title="Matrix multiplication — three viewpoints"
            description="Originally for Linear Algebra. Pulls in nicely as a primer for Floyd-Warshall."
            formats={['notes', 'slides', 'video']}
            footer={
              <>
                <span>Cross-course</span>
                <ReuseTag count={4} />
              </>
            }
          />
          <LessonCard
            ai
            topGradient="pink"
            number="AI-DRAFT · WORKSHEET"
            title="Routing in real life — applied scenarios"
            description="5 mini case studies (logistics, gaming, networking, biology, finance) for the optional lab."
            formats={['practice', 'reading']}
            footer={
              <>
                <span>Drafted today</span>
                <ReviewLink href="#">Review draft →</ReviewLink>
              </>
            }
          />
          <LessonCardEmpty />
        </div>
        {/* Suppress unused warnings */}
        <div style={{ display: 'none' }}>
          <IconBook /> <IconCheck />
        </div>
      </section>
    </AppShell>
  )
}