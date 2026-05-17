import { AppShell } from '@/components/templates'
import { Breadcrumbs, Callout } from '@/components/molecules'
import { Button } from '@/components/atoms'
import { AISuggestion, ClassCard, ClassCardEmpty, DraftList } from '@/components/organisms'
import {
  IconCheck,
  IconClock,
  IconCode,
  IconMessage,
  IconPlus,
  IconSparkle,
  IconType,
  IconUsers,
  IconImage,
  IconCalculator,
  IconArrowRight,
} from '@/lib/icons'
import styles from './Dashboard.module.css'

export function Dashboard() {
  return (
    <AppShell
      topbar={{
        leading: <Breadcrumbs items={[{ label: 'Dashboard' }]} />,
        actions: (
          <Button variant="ai" size="sm" leadingIcon={<IconSparkle size={14} />}>
            Ask Assistant
          </Button>
        ),
      }}
    >
      <header className={styles.greet}>
        <div>
          <h1>Good morning, Noor.</h1>
          <div className={styles.day}>Sunday, 17 May 2026 · Week 14 of the spring term</div>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" size="sm" leadingIcon={<IconPlus size={14} />}>
            Add class
          </Button>
          <Button
            as="a"
            href="/create-assessment"
            variant="primary"
            size="sm"
            leadingIcon={<IconPlus size={14} />}
          >
            New assessment
          </Button>
        </div>
      </header>

      <div className={styles.statRow}>
        <StatTile
          color="yellow"
          icon={<IconClock />}
          value={
            <>
              18<span className={styles.max}> drafts</span>
            </>
          }
          label="AI grades awaiting your review"
        />
        <StatTile
          color="green"
          icon={<IconCheck />}
          value="142"
          label="Grades published this week"
          delta="+34 vs last week"
        />
        <StatTile color="blue" icon={<IconUsers />} value="156" label="Students across 5 classes" />
        <StatTile color="purple" icon={<IconMessage />} value="214" label="Questions in your library" />
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Your classes</h2>
          <a className={styles.link} href="#">View all 5 →</a>
        </div>
        <div className={styles.classGrid}>
          <ClassCard
            to="/exam-builder"
            title="CS-201 Algorithms"
            subtitle="Spring 2026 · 32 students"
            icon={<IconCode size={18} />}
            gradient={['green', 'teal']}
            stats={[
              { label: 'active assessments', value: 4 },
              { label: 'drafts', value: 18 },
            ]}
          />
          <ClassCard
            to="#"
            title="MATH-104 Linear Algebra"
            subtitle="Spring 2026 · 28 students"
            icon={<IconCalculator size={18} />}
            gradient={['purple', 'pink']}
            stats={[
              { label: 'active assessments', value: 3 },
              { label: 'drafts', value: 0 },
            ]}
          />
          <ClassCard
            to="#"
            title="PHYS-220 Mechanics"
            subtitle="Spring 2026 · 41 students"
            icon={<IconSparkle size={18} />}
            gradient={['blue', 'purple']}
            stats={[
              { label: 'active assessments', value: 5 },
              { label: 'drafts', value: 0 },
            ]}
          />
          <ClassCard
            to="#"
            title="LIT-301 Romantic Poetry"
            subtitle="Spring 2026 · 19 students"
            icon={<IconType size={18} />}
            gradient={['pink', 'orange']}
            stats={[
              { label: 'active assessments', value: 2 },
              { label: '', value: '—' },
            ]}
          />
          <ClassCard
            to="#"
            title="CHEM-110 Organic"
            subtitle="Spring 2026 · 36 students"
            icon={<IconImage size={18} />}
            gradient={['orange', 'yellow']}
            stats={[
              { label: 'active assessments', value: 6 },
              { label: '', value: '—' },
            ]}
          />
          <ClassCardEmpty />
        </div>
      </section>

      <div className={styles.lower}>
        <section>
          <div className={styles.sectionHead}>
            <h2>Drafts in progress</h2>
            <a className={styles.link} href="/ai-grader">Open grading queue →</a>
          </div>
          <DraftList
            items={[
              {
                icon: <IconCode size={16} />,
                iconColor: 'green',
                title: 'Algorithms — Final, January 2026',
                meta: 'CS-201 · 32 submissions · 18 AI drafts',
                status: { label: '18 drafts', color: 'ai' },
                progress: 56,
                progressColor: 'accent',
              },
              {
                icon: <IconImage size={16} />,
                iconColor: 'orange',
                title: 'Organic chemistry — Mid-term',
                meta: 'CHEM-110 · 36 submissions · grading…',
                status: { label: 'Running', color: 'blue' },
                progress: 22,
                progressColor: 'blue',
              },
              {
                icon: <IconType size={16} />,
                iconColor: 'pink',
                title: 'Wordsworth essay — week 8',
                meta: 'LIT-301 · draft assessment · 0/4 questions',
                status: { label: 'Draft', color: 'gray' },
                progress: 8,
                progressColor: 'gray',
              },
              {
                icon: <IconCalculator size={16} />,
                iconColor: 'purple',
                title: 'Eigenvalues — practice set',
                meta: 'MATH-104 · ready to publish · 12 questions',
                status: { label: 'Ready', color: 'green' },
                progress: 100,
                progressColor: 'green',
              },
            ]}
          />
        </section>

        <aside>
          <div className={styles.sectionHead}>
            <h2>From your assistant</h2>
          </div>
          <AISuggestion
            title="18 drafts ready to review"
            actions={
              <>
                <Button
                  as="a"
                  href="/ai-grader"
                  variant="ai"
                  size="sm"
                >
                  Review flagged first
                </Button>
                <Button as="a" href="/ai-grader" variant="secondary" size="sm">
                  Open queue
                </Button>
              </>
            }
          >
            I finished grading the CS-201 final last night. Most submissions look clean — three
            have flags worth a second look (suspected formula errors in Q5). Want to start with
            those?
          </AISuggestion>

          <Callout
            intent="info"
            icon={<IconClock />}
            style={{ marginTop: 14 }}
          >
            <strong style={{ color: 'var(--c-blue-text)', fontWeight: 600 }}>
              Term ends in 4 weeks.
            </strong>{' '}
            Two of your classes still don't have a final assessment scheduled.{' '}
            <a href="#" style={{ color: 'var(--c-blue-text)', textDecoration: 'underline', fontWeight: 500 }}>
              Plan finals
            </a>
            .
          </Callout>
        </aside>
      </div>
    </AppShell>
  )
}

function StatTile({
  color,
  icon,
  value,
  label,
  delta,
}: {
  color: 'yellow' | 'green' | 'blue' | 'purple'
  icon: React.ReactNode
  value: React.ReactNode
  label: string
  delta?: string
}) {
  const tints: Record<string, { bg: string; text: string }> = {
    yellow: { bg: 'var(--c-yellow-bg)', text: 'var(--c-yellow-text)' },
    green:  { bg: 'var(--c-green-bg)',  text: 'var(--c-green-text)' },
    blue:   { bg: 'var(--c-blue-bg)',   text: 'var(--c-blue-text)' },
    purple: { bg: 'var(--c-purple-bg)', text: 'var(--c-purple-text)' },
  }
  return (
    <div className={styles.statTile}>
      <div className={styles.statIcon} style={{ background: tints[color].bg, color: tints[color].text }}>
        {icon}
      </div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      {delta && (
        <div className={styles.statDelta}>
          <IconArrowRight size={12} style={{ transform: 'rotate(-45deg)' }} />
          {delta}
        </div>
      )}
    </div>
  )
}
