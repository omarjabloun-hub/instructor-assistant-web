'use client'

import { AppShell } from '@/components/templates'
import { Breadcrumbs, Callout, FilterChip } from '@/components/molecules'
import { AIRibbon, Button, Input, SmallCaps } from '@/components/atoms'
import {
  IconCheck,
  IconClock,
  IconDownload,
  IconFilter,
  IconSearch,
  IconSparkle,
  IconUpload,
} from '@/lib/icons'
import {
  ActivityFeed,
  QueueTable,
  RunCard,
  StageFlow,
  type ActivityEntry,
  type QueueEntry,
} from './parts'
import styles from './GradingQueue.module.css'

const ROWS: QueueEntry[] = [
  {
    id: '1',
    initials: 'AB',
    avatarColor: 'green',
    name: 'Aïcha Bensalem',
    studentId: '4283',
    examLabel: 'CS-201 · Final',
    examColor: 'green',
    status: 'validated',
    score: { value: '17', max: '20' },
    time: 'Validated 14m ago',
  },
  {
    id: '2',
    initials: 'MD',
    avatarColor: 'purple',
    name: 'Marie Dubois',
    studentId: '4291',
    examLabel: 'CS-201 · Final',
    examColor: 'green',
    status: 'drafted',
    score: { value: '14', max: '20' },
    overridden: true,
    time: 'Drafted 22m ago',
  },
  {
    id: '3',
    initials: 'OK',
    avatarColor: 'orange',
    name: 'Omar Khalil',
    studentId: '4304',
    examLabel: 'CS-201 · Final',
    examColor: 'green',
    status: 'flagged',
    score: { value: '11', max: '20' },
    time: 'Drafted 28m ago',
    flagSummary: 'Possible formula error · Q5',
  },
  {
    id: '4',
    initials: 'JV',
    avatarColor: 'blue',
    name: 'Jean-Luc Vasseur',
    studentId: '4312',
    examLabel: 'CS-201 · Final',
    examColor: 'green',
    status: 'reading',
    score: null,
    time: 'Reading · 6 of 11 pages',
  },
  {
    id: '5',
    initials: 'SC',
    avatarColor: 'teal',
    name: 'Sofia Caruso',
    studentId: '4321',
    examLabel: 'CS-201 · Final',
    examColor: 'green',
    status: 'drafting',
    score: null,
    time: 'Drafting Q3…',
  },
  {
    id: '6',
    initials: 'PK',
    avatarColor: 'pink',
    name: 'Priya Krishnan',
    studentId: '4327',
    examLabel: 'CS-201 · Final',
    examColor: 'green',
    status: 'validated',
    score: { value: '19', max: '20' },
    time: 'Validated 1h ago',
  },
  {
    id: '7',
    initials: 'LM',
    avatarColor: 'red',
    name: 'Lin Mei',
    studentId: '4333',
    examLabel: 'CS-201 · Final',
    examColor: 'green',
    status: 'flagged',
    score: { value: '8', max: '20' },
    time: 'Drafted 40m ago',
    flagSummary: 'Score 3.5σ below median',
  },
  {
    id: '8',
    initials: 'TN',
    avatarColor: 'yellow',
    name: 'Thomas Nguyen',
    studentId: '4341',
    examLabel: 'CS-201 · Final',
    examColor: 'green',
    status: 'queued',
    score: null,
    time: 'Queued 2m ago',
  },
  {
    id: '9',
    initials: 'EC',
    avatarColor: 'brown',
    name: 'Eleanor Choi',
    studentId: '4352',
    examLabel: 'CHEM-110 · Mid-term',
    examColor: 'orange',
    status: 'drafted',
    score: { value: '15', max: '20' },
    time: 'Drafted 5m ago',
  },
  {
    id: '10',
    initials: 'RP',
    avatarColor: 'gray',
    name: 'Raj Patel',
    studentId: '4361',
    examLabel: 'CHEM-110 · Mid-term',
    examColor: 'orange',
    status: 'drafted',
    score: { value: '12', max: '20' },
    time: 'Drafted 11m ago',
  },
]

const ACTIVITY: ActivityEntry[] = [
  {
    kind: 'flagged',
    time: 'now',
    body: (
      <>
        Flagged <strong>Lin Mei</strong> — score <cite>3.5σ below class median</cite>. Worth a
        manual look at Q5 (Dijkstra).
      </>
    ),
  },
  {
    kind: 'reading',
    time: '12s',
    body: (
      <>
        Reading <strong>Jean-Luc Vasseur</strong>'s submission · page 6 of 11.
      </>
    ),
  },
  {
    kind: 'drafted',
    time: '22s',
    body: (
      <>
        Drafted <strong>Sofia Caruso</strong> · proposed <cite>16 / 20</cite> · waiting on Q7.
      </>
    ),
  },
  {
    kind: 'override',
    time: '6m',
    body: (
      <>
        You overrode <strong>Marie Dubois</strong>'s Q5 grade — AI proposed{' '}
        <cite>3.0</cite>, you set <cite>3.5</cite>. Logged.
      </>
    ),
  },
  {
    kind: 'validated',
    time: '14m',
    body: (
      <>
        Published 3 grades · <strong>Aïcha</strong>, <strong>Priya</strong>,{' '}
        <strong>Hassan</strong>. Notifications sent.
      </>
    ),
  },
  {
    kind: 'flagged',
    time: '28m',
    body: (
      <>
        Flagged <strong>Omar Khalil</strong> Q5 — suspected formula transposition in the
        recurrence. Cross-check before validating.
      </>
    ),
  },
  {
    kind: 'drafted',
    time: '1h',
    body: (
      <>
        Finished first pass on CS-201 Final — <strong>25 of 32 drafts ready</strong> for review.
      </>
    ),
  },
]

export function GradingQueue() {
  return (
    <AppShell
      topbar={{
        showSearch: false,
        leading: (
          <Breadcrumbs items={[{ label: 'Dashboard', to: '/' }, { label: 'Grading queue' }]} />
        ),
        actions: (
          <>
            <AIRibbon>3 grading runs · live</AIRibbon>
            <Button variant="ghost" size="sm" leadingIcon={<IconDownload size={14} />}>
              Export CSV
            </Button>
            <Button variant="primary" size="sm" leadingIcon={<IconUpload size={14} />}>
              Publish 7 validated
            </Button>
          </>
        ),
      }}
    >
      <header className={styles.header}>
        <div>
          <SmallCaps>Cross-class grading</SmallCaps>
          <h1>Grading queue</h1>
          <p>
            Every submission that's being read, drafted, or waiting on your validation. The AI
            proposes — you decide. Nothing leaves this queue until you publish.
          </p>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" size="sm" leadingIcon={<IconFilter size={14} />}>
            Filters
          </Button>
          <Button
            as="a"
            href="/ai-grader"
            variant="ai"
            size="sm"
            leadingIcon={<IconSparkle size={14} />}
          >
            Review next flag
          </Button>
        </div>
      </header>

      {/* Pipeline visualization */}
      <StageFlow
        stages={[
          { label: 'Queued',    color: 'gray',   count: 7,  hint: 'Waiting for next worker' },
          { label: 'Reading',   color: 'blue',   count: 3,  hint: <>Avg <strong>22s</strong> per submission</>, live: true },
          { label: 'Drafting',  color: 'purple', count: 1,  hint: 'Applying barème to answers', live: true },
          { label: 'AI drafts', color: 'yellow', count: 18, hint: 'Awaiting your review' },
          { label: 'Validated', color: 'green',  count: 7,  hint: 'Ready to publish' },
        ]}
      />

      {/* Active grading runs */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <h2>Active grading runs</h2>
            <div className="sub" style={{ fontSize: 12.5, color: 'var(--ink-muted)', marginTop: 2 }}>
              Each run grades one exam across all submissions, end-to-end.
            </div>
          </div>
          <Button variant="ghost" size="sm">View all runs →</Button>
        </div>
        <div className={styles.runs}>
          <RunCard
            classLabel="CS-201 Algorithms"
            classColor="green"
            examTitle="Algorithms — Final, January 2026"
            meta="started 1h ago · 8 questions × 20 pts"
            total={32}
            graded={25}
            validated={7}
            flagged={3}
            status="grading"
            eta="~14 min remaining"
          />
          <RunCard
            classLabel="CHEM-110 Organic"
            classColor="orange"
            examTitle="Organic chemistry — Mid-term"
            meta="started 22 min ago · 10 questions"
            total={36}
            graded={8}
            validated={0}
            flagged={1}
            status="grading"
            eta="~38 min remaining"
          />
          <RunCard
            classLabel="MATH-104 Linear Algebra"
            classColor="purple"
            examTitle="Eigenvalues — practice set"
            meta="finished 6h ago · 12 questions"
            total={28}
            graded={28}
            validated={28}
            flagged={0}
            status="done"
            eta="Validated · 6h ago"
          />
        </div>
      </section>

      {/* Reminder callout */}
      <Callout
        intent="ai"
        icon={<IconSparkle size={16} />}
        title="3 flagged submissions worth a closer look."
        style={{ marginTop: 18 }}
      >
        I'm not confident on Q5 for <strong>Omar Khalil</strong> and <strong>Lin Mei</strong>
        {' '}— their answers either contradict the barème, or sit far from the class median. I
        held those drafts back so you can review first.
      </Callout>

      {/* Split: queue + activity feed */}
      <div className={styles.split}>
        <div className={styles.tableWrap}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <FilterChip active>All · 32</FilterChip>
              <FilterChip>Flagged · 3</FilterChip>
              <FilterChip>AI drafts · 18</FilterChip>
              <FilterChip>Validated · 7</FilterChip>
              <FilterChip>Queued · 7</FilterChip>
            </div>
            <div className={styles.toolbarRight}>
              <div className={styles.searchWrap}>
                <Input placeholder="Search students…" size="sm" />
                <IconSearch size={14} />
              </div>
              <Button variant="ghost" size="sm" leadingIcon={<IconFilter size={14} />}>
                Sort
              </Button>
            </div>
          </div>

          <div className={styles.batchBar}>
            <span>
              <span className={styles.count}>2 submissions</span> selected
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <Button variant="ghost" size="sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Reassign
              </Button>
              <Button variant="ghost" size="sm" style={{ color: 'rgba(255,255,255,0.85)' }} leadingIcon={<IconClock size={14} />}>
                Regrade
              </Button>
              <Button
                variant="secondary"
                size="sm"
                style={{ background: 'white', color: 'var(--ink-strong)', borderColor: 'white' }}
                leadingIcon={<IconCheck size={14} />}
              >
                Validate selected
              </Button>
            </div>
          </div>

          <QueueTable rows={ROWS} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 4px',
              fontSize: 12,
              color: 'var(--ink-muted)',
            }}
          >
            <span>Showing 10 of 68 submissions across 3 exams</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <Button variant="ghost" size="sm">← Prev</Button>
              <Button variant="ghost" size="sm">Next →</Button>
            </div>
          </div>
        </div>

        <aside className={styles.activityRail}>
          <ActivityFeed
            entries={ACTIVITY}
            footer={
              <span style={{ fontSize: 11.5, color: 'var(--ink-muted)', lineHeight: 1.5 }}>
                Every AI decision is logged with the submission. You can audit and revert any
                grade from the student record.
              </span>
            }
          />

          <Callout intent="neutral" icon={<IconClock size={14} />}>
            <strong style={{ fontWeight: 600, color: 'var(--ink-strong)' }}>~52 minutes</strong>{' '}
            until all active runs finish. You'll get a notification when CS-201 is fully drafted.
          </Callout>
        </aside>
      </div>
    </AppShell>
  )
}