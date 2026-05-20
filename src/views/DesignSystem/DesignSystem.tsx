'use client'

import { AppShell } from '@/components/templates'
import { Breadcrumbs, Callout, FilterChip, FormField, SegmentControl } from '@/components/molecules'
import {
  AIRibbon,
  AIShimmer,
  Avatar,
  Button,
  Card,
  Chip,
  ClassDot,
  CodeBlock,
  Com,
  Divider,
  Fn,
  Input,
  Kbd,
  Kw,
  NumberInput,
  ProgressBar,
  Select,
  SmallCaps,
  Str,
  Textarea,
} from '@/components/atoms'
import { IconCheck, IconPlus, IconSparkle } from '@/lib/icons'
import type { SpectrumColor } from '@/lib/types'
import styles from './DesignSystem.module.css'

const COLORS: SpectrumColor[] = [
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
  'red',
]

export function DesignSystem() {
  return (
    <AppShell
      topbar={{
        showSearch: false,
        leading: <Breadcrumbs items={[{ label: 'Design system' }]} />,
      }}
    >
      <header className={styles.hdr}>
        <SmallCaps>Spectrum</SmallCaps>
        <h1 style={{ marginTop: 4 }}>Instructor Assistant — design system</h1>
        <p>
          A living reference for the atomic components, color tokens, and typography that power
          the app. Every visual decision lives here. Edit{' '}
          <code style={{ background: 'var(--surface-sunken)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>
            src/styles/tokens.css
          </code>{' '}
          to change the whole product at once.
        </p>
      </header>

      {/* Spectrum colors */}
      <section className={styles.section}>
        <h2>Color · the spectrum</h2>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', maxWidth: '64ch', marginBottom: 14 }}>
          10 named colors, each available in three flavours: <code>text</code> (on white),{' '}
          <code>bg</code> (soft tinted surface), and <code>solid</code> (saturated fill for
          illustrations and dots). Pick by intent — class colors, question types, content
          formats — not by hue.
        </p>
        <div className={styles.swGrid}>
          {COLORS.map((c) => (
            <div key={c} className={styles.sw}>
              <div className={styles.swHead}>{c}</div>
              <div className={styles.swBars}>
                <span style={{ background: `var(--c-${c}-bg)` }} />
                <span style={{ background: `var(--c-${c}-solid)` }} />
                <span style={{ background: `var(--c-${c}-text)` }} />
              </div>
              <div className={styles.swFoot}>
                <Chip color={c} leadingDot>
                  Sample
                </Chip>
              </div>
            </div>
          ))}
        </div>

        <h3>Surfaces & ink</h3>
        <div className={styles.tokenList}>
          <code>--surface-base</code><span className="v">#FFFFFF</span><span className={styles.preview} style={{ background: 'var(--surface-base)' }} />
          <code>--surface-sunken</code><span className="v">#F7F6F3</span><span className={styles.preview} style={{ background: 'var(--surface-sunken)' }} />
          <code>--surface-hover</code><span className="v">#F1F1EE</span><span className={styles.preview} style={{ background: 'var(--surface-hover)' }} />
          <code>--ink-strong</code><span className="v">#1A1A19</span><span className={styles.preview} style={{ background: 'var(--ink-strong)' }} />
          <code>--ink-body</code><span className="v">#37352F</span><span className={styles.preview} style={{ background: 'var(--ink-body)' }} />
          <code>--ink-muted</code><span className="v">#787774</span><span className={styles.preview} style={{ background: 'var(--ink-muted)' }} />
          <code>--accent-500</code><span className="v">#7C5CFC · AI</span><span className={styles.preview} style={{ background: 'var(--accent-500)' }} />
        </div>
      </section>

      <Divider />

      {/* Typography */}
      <section className={styles.section}>
        <h2>Typography</h2>
        <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--line-soft)', borderRadius: 8, padding: 18 }}>
          <div className={styles.typeRow}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-display-xl)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.12, color: 'var(--ink-strong)' }}>
              Display XL
            </div>
            <div className={styles.typeMeta}>Geist · 600 · clamp(40-56px)</div>
          </div>
          <div className={styles.typeRow}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-display-md)', fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--ink-strong)' }}>
              Display MD
            </div>
            <div className={styles.typeMeta}>Geist · 600 · 24px</div>
          </div>
          <div className={styles.typeRow}>
            <div style={{ fontSize: 'var(--t-body-lg)' }}>Body LG · the quick brown fox jumps over the lazy dog</div>
            <div className={styles.typeMeta}>Geist · 400 · 16px / 1.55</div>
          </div>
          <div className={styles.typeRow}>
            <div style={{ fontSize: 'var(--t-body-md)' }}>Body MD · the quick brown fox jumps over the lazy dog</div>
            <div className={styles.typeMeta}>Geist · 400 · 14px / 1.55 (default)</div>
          </div>
          <div className={styles.typeRow}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>const distance = O((V + E) log V)</div>
            <div className={styles.typeMeta}>Geist Mono · 13px</div>
          </div>
          <div className={styles.typeRow}>
            <SmallCaps>Small-caps label</SmallCaps>
            <div className={styles.typeMeta}>11px · 600 · 0.04em tracking</div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Buttons */}
      <section className={styles.section}>
        <h2>Buttons</h2>
        <div className={styles.demo}>
          <div className={styles.row}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ai" leadingIcon={<IconSparkle size={14} />}>
              Ask Assistant
            </Button>
          </div>
          <div className={styles.row}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="secondary" size="sm" leadingIcon={<IconPlus size={14} />}>
              With icon
            </Button>
            <Button variant="ghost" size="icon" title="Icon-only">
              <IconCheck size={16} />
            </Button>
            <Button variant="primary" size="sm" block style={{ maxWidth: 200 }}>
              Block
            </Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* Chips */}
      <section className={styles.section}>
        <h2>Chips</h2>
        <div className={styles.demo}>
          <h3 style={{ margin: 0 }}>Soft (default)</h3>
          <div className={styles.row}>
            {COLORS.map((c) => (
              <Chip key={c} color={c} leadingDot>
                {c}
              </Chip>
            ))}
            <Chip color="ai" leadingDot>
              ai
            </Chip>
          </div>
          <h3>Solid</h3>
          <div className={styles.row}>
            {COLORS.slice(0, 5).map((c) => (
              <Chip key={c} color={c} appearance="solid">
                {c}
              </Chip>
            ))}
          </div>
          <h3>Outline</h3>
          <div className={styles.row}>
            {COLORS.slice(0, 5).map((c) => (
              <Chip key={c} color={c} appearance="outline">
                {c}
              </Chip>
            ))}
          </div>
          <h3>Sizes</h3>
          <div className={styles.row}>
            <Chip color="green" leadingDot size="sm">
              Small
            </Chip>
            <Chip color="green" leadingDot>
              Default
            </Chip>
            <Chip color="green" leadingDot size="lg">
              Large
            </Chip>
          </div>
        </div>
      </section>

      <Divider />

      {/* Inputs */}
      <section className={styles.section}>
        <h2>Inputs</h2>
        <div className={styles.demo} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FormField label="Text input" hint="Single line">
            <Input placeholder="Type here…" />
          </FormField>
          <FormField label="Select">
            <Select>
              <option>One</option>
              <option>Two</option>
            </Select>
          </FormField>
          <FormField label="Number input">
            <NumberInput defaultValue={8} min={0} max={20} />
          </FormField>
          <FormField label="Segment control">
            <SegmentControl
              defaultValue="b"
              options={[
                { value: 'a', label: 'Easy' },
                { value: 'b', label: 'Balanced' },
                { value: 'c', label: 'Hard' },
              ]}
            />
          </FormField>
          <FormField label="Textarea" className="" hint="Multi-line">
            <Textarea placeholder="Write something…" />
          </FormField>
          <FormField label="Invalid state" error="This field is required">
            <Input invalid defaultValue="" />
          </FormField>
        </div>
      </section>

      <Divider />

      {/* Avatars + ClassDots */}
      <section className={styles.section}>
        <h2>Avatars &amp; dots</h2>
        <div className={styles.demo}>
          <div className={styles.row}>
            <Avatar initials="NK" size="xs" />
            <Avatar initials="NK" size="sm" />
            <Avatar initials="NK" size="md" />
            <Avatar initials="NK" size="lg" color="purple" />
            <Avatar initials="AB" color="green" />
            <Avatar initials="JV" color="blue" />
            <Avatar initials="PK" color="pink" />
            <Avatar initials="OK" color="orange" />
          </div>
          <h3>Class dots</h3>
          <div className={styles.row}>
            {COLORS.slice(0, 6).map((c) => (
              <ClassDot key={c} color={c} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Callouts + AI states */}
      <section className={styles.section}>
        <h2>Callouts &amp; AI states</h2>
        <div className={styles.demo} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Callout intent="info" icon={<IconCheck />} title="Info callout">
            A short message with optional title and icon.
          </Callout>
          <Callout intent="ok" icon={<IconCheck />} title="Success">
            Operation succeeded.
          </Callout>
          <Callout intent="warn" icon={<IconCheck />}>
            A warning without a title.
          </Callout>
          <Callout intent="danger" icon={<IconCheck />} title="Danger">
            Something is broken.
          </Callout>
          <Callout intent="ai" icon={<IconSparkle />} title="From your assistant.">
            AI-flagged content always uses the violet accent.
          </Callout>
          <AIShimmer>Drafting question 8…</AIShimmer>
          <div>
            <AIRibbon>AI-assisted authoring</AIRibbon>
          </div>
        </div>
      </section>

      <Divider />

      {/* Progress + filters */}
      <section className={styles.section}>
        <h2>Progress &amp; chips</h2>
        <div className={styles.demo}>
          <ProgressBar
            segments={[
              { value: 50, color: 'var(--c-green-solid)' },
              { value: 20, color: 'var(--accent-500)' },
              { value: 10, color: 'var(--c-yellow-solid)' },
            ]}
          />
          <div style={{ marginTop: 12 }}>
            <div className={styles.row}>
              <FilterChip active>All</FilterChip>
              <FilterChip>This course</FilterChip>
              <FilterChip>AI-generated</FilterChip>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Code */}
      <section className={styles.section}>
        <h2>Code block</h2>
        <Card pad="none" elevation="raised">
          <CodeBlock>
            <Kw>def</Kw> <Fn>hello</Fn>(name): <Com># greet</Com>
            {'\n'}
            {'    '}<Kw>return</Kw> <Str>f"Hi {'{'}name{'}'}"</Str>
          </CodeBlock>
        </Card>
      </section>

      <Divider />

      {/* Kbd */}
      <section className={styles.section}>
        <h2>Kbd</h2>
        <div className={styles.demo}>
          Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the search.
        </div>
      </section>
    </AppShell>
  )
}