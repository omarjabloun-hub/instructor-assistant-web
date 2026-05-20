'use client'

import { AppShell } from '@/components/templates'
import { Breadcrumbs, Callout, FormField, SegmentControl } from '@/components/molecules'
import {
  AIRibbon,
  AIShimmer,
  Button,
  Chip,
  Input,
  NumberInput,
  Select,
  SmallCaps,
} from '@/components/atoms'
import {
  IconBook,
  IconDownload,
  IconEdit,
  IconLink,
  IconRefresh,
  IconSettings,
  IconSparkle,
  IconUpload,
} from '@/lib/icons'
import { DraftQuestion, MixBarGroup, SourceItem } from './parts'
import styles from './CreateAssessment.module.css'

export function CreateAssessment() {
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
              { label: 'New assessment' },
            ]}
          />
        ),
        actions: (
          <>
            <AIRibbon>AI-assisted authoring</AIRibbon>
            <Button variant="ghost" size="sm">Save as template</Button>
            <Button variant="primary" size="sm">Open in editor →</Button>
          </>
        ),
      }}
    >
      <div className={styles.composer}>
        {/* LEFT — configuration */}
        <section className={styles.left}>
          <header className={styles.hdr}>
            <SmallCaps style={{ marginBottom: 8, display: 'block' }}>New assessment</SmallCaps>
            <h1>Create an exam with AI</h1>
            <p>
              Reference past exams, set the format, then let the assistant draft a new exam for
              you. Every question is a draft until you accept it.
            </p>
          </header>

          {/* 1. Sources */}
          <div className={styles.blk}>
            <div className={styles.blkHead}>
              <div className={styles.blkTitle}>Reference material</div>
              <span className={styles.blkStep}>01</span>
            </div>
            <p className={styles.blkHint}>
              Past exams, textbook chapters, or syllabus items. The assistant mirrors their level,
              style and topic coverage.
            </p>
            <div className={styles.sources}>
              <SourceItem
                kind="doc"
                name="Algorithms — Final, January 2025.pdf"
                meta="14 pages · 8 questions · used as primary template"
              />
              <SourceItem
                kind="doc"
                name="Algorithms — Mid-term 2025.pdf"
                meta="8 pages · 5 questions"
              />
              <SourceItem
                kind="lib"
                name="Graph algorithms — practice set"
                meta="From Library · 12 questions"
              />
              <SourceItem
                kind="link"
                name="CLRS — Ch. 22 & 24 (Graphs, Shortest Paths)"
                meta="Linked syllabus reference"
              />
            </div>
            <div className={styles.sourceAdd}>
              <Button variant="secondary" size="sm" leadingIcon={<IconUpload size={14} />}>
                Upload files
              </Button>
              <Button variant="secondary" size="sm" leadingIcon={<IconBook size={14} />}>
                From Library
              </Button>
              <Button variant="ghost" size="sm" leadingIcon={<IconLink size={14} />}>
                Paste link
              </Button>
            </div>
            <div className={styles.dropzone}>
              <IconUpload size={18} />
              <div>
                <strong>Drop files here</strong> — PDF, DOCX, TXT, images, up to 25 MB
              </div>
            </div>
          </div>

          {/* 2. Settings */}
          <div className={styles.blk}>
            <div className={styles.blkHead}>
              <div className={styles.blkTitle}>Exam format</div>
              <span className={styles.blkStep}>02</span>
            </div>
            <p className={styles.blkHint}>
              Set the shape of the exam. The assistant respects every constraint.
            </p>
            <div className={styles.settings}>
              <FormField label="Class">
                <Select defaultValue="cs201">
                  <option value="cs201">CS-201 Algorithms · Spring 2026</option>
                </Select>
              </FormField>
              <FormField label="Assessment type">
                <Select defaultValue="final">
                  <option value="final">Final exam</option>
                  <option value="midterm">Mid-term</option>
                  <option value="quiz">Quiz</option>
                </Select>
              </FormField>
              <FormField label="Questions">
                <NumberInput defaultValue={8} min={1} max={50} />
              </FormField>
              <FormField label="Total points">
                <NumberInput defaultValue={20} min={1} max={100} />
              </FormField>
              <FormField label="Time budget">
                <Input defaultValue="2h 00m" />
              </FormField>
              <FormField label="Language">
                <Select defaultValue="en">
                  <option value="en">English</option>
                </Select>
              </FormField>

              <FormField label="Difficulty balance" className={styles.full}>
                <SegmentControl
                  defaultValue="balanced"
                  options={[
                    { value: 'easy', label: 'Easy-leaning' },
                    { value: 'balanced', label: 'Balanced' },
                    { value: 'hard', label: 'Hard-leaning' },
                  ]}
                />
              </FormField>

              <FormField
                className={styles.full}
                label={
                  <>
                    Question-type mix{' '}
                    <span style={{ color: 'var(--ink-muted)', fontWeight: 400, fontSize: 12 }}>
                      (target distribution)
                    </span>
                  </>
                }
              >
                <div style={{ marginTop: 6 }}>
                  <MixBarGroup
                    rows={[
                      { name: 'Q&A',         pct: 38, count: 3, color: 'blue' },
                      { name: 'Open-ended',  pct: 25, count: 2, color: 'pink' },
                      { name: 'Code',        pct: 25, count: 2, color: 'green' },
                      { name: 'Image',       pct: 12, count: 1, color: 'orange' },
                      { name: 'Math',        pct: 0,  count: 0, color: 'purple' },
                    ]}
                  />
                </div>
              </FormField>
            </div>
          </div>

          {/* 3. Instructions */}
          <div className={styles.blk}>
            <div className={styles.blkHead}>
              <div className={styles.blkTitle}>Instructions to the assistant</div>
              <span className={styles.blkStep}>03</span>
            </div>
            <p className={styles.blkHint}>
              Anything else the assistant should know — topics to favour, traps to avoid, the tone
              you want.
            </p>

            <div className={styles.instructionsArea}>
              <textarea defaultValue={`Mirror the style and difficulty of last year's final. Focus more on graph algorithms this term — we covered shortest paths and MSTs in detail. Include one applied problem about a real-world routing scenario. Avoid dynamic-programming questions; those were the homework.\n\nFor the code question, use Python and require students to handle the disconnected case.`} />
              <div className={styles.instructionsBar}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <Button variant="ghost" size="sm" style={{ padding: '4px 8px' }} leadingIcon={<IconEdit size={14} />}>
                    Templates
                  </Button>
                  <Button variant="ghost" size="sm" style={{ padding: '4px 8px' }} leadingIcon={<IconSettings size={14} />}>
                    Tone
                  </Button>
                </div>
                <SmallCaps style={{ fontSize: 10.5 }}>280 / 1000</SmallCaps>
              </div>
            </div>

            <div className={styles.suggestChips}>
              <button type="button" className={styles.suggestChip}>Cap any single question at 4 pts</button>
              <button type="button" className={styles.suggestChip}>Match last year's wording style</button>
              <button type="button" className={styles.suggestChip}>Avoid trick questions</button>
              <button type="button" className={styles.suggestChip}>Include a multi-part question</button>
            </div>
          </div>

          {/* Generate bar */}
          <div className={styles.genBar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <AIRibbon style={{ fontSize: 11 }}>Last generated 8 minutes ago</AIRibbon>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="ai" block leadingIcon={<IconRefresh size={14} />}>
                Regenerate exam
              </Button>
              <Button variant="secondary" size="sm" title="Generate options">
                <IconSettings size={14} />
              </Button>
            </div>
          </div>
        </section>

        {/* RIGHT — AI draft */}
        <section className={styles.right}>
          <div className={styles.preview}>
            <div className={styles.previewHead}>
              <div>
                <div className={styles.crumbs}>
                  <Chip color="green" leadingDot>CS-201 Algorithms</Chip>
                  <Chip color="gray">Final exam</Chip>
                  <Chip color="ai" leadingDot>AI draft</Chip>
                </div>
                <h2>Algorithms — Final, May 2026</h2>
                <p>Generated from 4 sources · drafted in 12 seconds</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="secondary" size="sm" leadingIcon={<IconDownload size={14} />}>
                  Export draft
                </Button>
                <Button variant="primary" size="sm" leadingIcon={<IconEdit size={14} />}>
                  Open in editor
                </Button>
              </div>
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryCell}>
                <div className={styles.summaryLbl}>Questions</div>
                <div className={styles.summaryVal}>8</div>
              </div>
              <div className={styles.summaryCell}>
                <div className={styles.summaryLbl}>Total points</div>
                <div className={styles.summaryVal}>
                  20<span className="max"> / 20</span>
                </div>
              </div>
              <div className={styles.summaryCell}>
                <div className={styles.summaryLbl}>Estimated time</div>
                <div className={styles.summaryVal}>1h 52m</div>
              </div>
              <div className={styles.summaryCell}>
                <div className={styles.summaryLbl}>Difficulty mix</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <Chip color="gray" leadingDot size="sm">3 easy</Chip>
                  <Chip color="yellow" leadingDot size="sm">3 med</Chip>
                  <Chip color="red" leadingDot size="sm">2 hard</Chip>
                </div>
              </div>
            </div>

            <Callout
              intent="ai"
              icon={<IconSparkle size={16} />}
              style={{ marginBottom: 18 }}
              title="Notes on this draft."
            >
              I weighted graph algorithms more heavily (4 of 8 questions) per your instructions.
              The code question uses Python and handles disconnected vertices. I skipped DP
              entirely. Q7 is an applied scenario about delivery routing — feel free to swap if
              it doesn't fit your tone.
            </Callout>

            <div className={styles.drafts}>
              <DraftQuestion
                number="01"
                pts="2 pts"
                ptsValue="2.0"
                title="Asymptotic notation — formal definitions"
                type="qa"
                typeLabel="Q&A"
                difficulty="Easy"
                statement="Give the formal definitions of O(n), Θ(n), and Ω(n). For each, state one common use in algorithm analysis."
                bareme={{
                  caption: 'Barème · 4 criteria · 2.0 pts total',
                  rows: [
                    { idx: 'a', label: 'Correct quantifier formulation for O.', pts: '0.5' },
                    { idx: 'b', label: 'Correct quantifier formulation for Θ and Ω.', pts: '1.0' },
                    { idx: 'c', label: 'One sensible example per notation.', pts: '0.5' },
                  ],
                }}
                source={<>Inspired by <strong>Mid-term 2025 · Q1</strong></>}
              />

              <DraftQuestion
                number="02"
                pts="2 pts"
                ptsValue="2.0"
                title="Why quicksort degrades to O(n²)"
                type="qa"
                typeLabel="Q&A"
                difficulty="Easy"
                statement="Describe an input on which quicksort with first-element pivot achieves Θ(n²) running time. Explain why."
                bareme={{
                  caption: 'Barème · 3 criteria · 2.0 pts total',
                  rows: [
                    { idx: 'a', label: 'Identifies a sorted-ascending or sorted-descending input.', pts: '1.0' },
                    { idx: 'b', label: 'Explains the recursion tree depth becoming linear.', pts: '1.0' },
                  ],
                }}
                source={<>Inspired by <strong>Final 2025 · Q3</strong></>}
              />

              <DraftQuestion
                number="03"
                pts="3 pts"
                ptsValue="3.0"
                title="BFS vs DFS — when to use each"
                type="open"
                typeLabel="Open-ended"
                difficulty="Medium"
                statement="Give two specific problems where BFS is preferable to DFS, and two where DFS is preferable. Justify each choice in 1–2 sentences."
                bareme={{
                  caption: 'Barème · 4 criteria · 3.0 pts total',
                  rows: [
                    { idx: 'a', label: 'Two valid BFS use-cases with reasoning.', pts: '1.5' },
                    { idx: 'b', label: 'Two valid DFS use-cases with reasoning.', pts: '1.5' },
                  ],
                }}
                source={<>From <strong>Graph algorithms · Library</strong></>}
              />

              <DraftQuestion
                number="04"
                pts="3 pts"
                ptsValue="3.0"
                title="Dijkstra — proof of correctness"
                type="open"
                typeLabel="Open-ended"
                difficulty="Medium"
                statement="Sketch a proof that Dijkstra's algorithm produces correct shortest-path distances for a graph with non-negative edge weights. Explain the role of the greedy choice and why negative edges break it."
                source={<>Inspired by <strong>CLRS Ch. 24</strong></>}
              />

              <DraftQuestion
                number="05"
                pts="4 pts"
                ptsValue="4.0"
                title="Implement Dijkstra in Python with a heap"
                type="code"
                typeLabel="Code · Python"
                difficulty="Hard"
                statement="Implement dijkstra(graph, source) for a weighted directed graph represented as a dict-of-dicts. Use heapq. Handle disconnected vertices by returning float('inf') for them."
                bareme={{
                  caption: 'Barème · 4 criteria · 4.0 pts total',
                  rows: [
                    { idx: 'a', label: 'Correct algorithm, terminates on all inputs.', pts: '2.0' },
                    { idx: 'b', label: 'Uses a min-heap appropriately.', pts: '1.0' },
                    { idx: 'c', label: 'Handles disconnected vertices.', pts: '0.5' },
                    { idx: 'd', label: 'Docstring with expected complexity.', pts: '0.5' },
                  ],
                }}
                source={<>Inspired by <strong>Final 2025 · Q5</strong> · adapted to Python</>}
              />

              <DraftQuestion
                number="06"
                pts="2 pts"
                ptsValue="2.0"
                title="Trace a BFS on the diagram"
                type="image"
                typeLabel="Image"
                difficulty="Medium"
                statement="Given the graph below, write out the order in which nodes are visited by BFS starting from node A. Use lexicographic order to break ties."
                source="Newly drafted"
              />

              <DraftQuestion
                number="07"
                pts="2 pts"
                ptsValue="2.0"
                title="Applied — pick an algorithm for parcel routing"
                type="open"
                typeLabel="Open-ended"
                difficulty="Hard"
                statement="A logistics company runs 200 vans across a city. They need the shortest route from a depot to every drop-off point each morning, with traffic-weighted edges that change every hour. Which graph algorithm would you propose and why?"
                source="Newly drafted · applied scenario per instructions"
              />

              <DraftQuestion
                number="08"
                pts="2 pts"
                ptsValue="2.0"
                title="Minimum spanning tree — Kruskal vs Prim"
                type="qa"
                typeLabel="Q&A"
                difficulty="Medium"
                streaming
                thinking={<AIShimmer>Drafting statement and barème…</AIShimmer>}
              />
            </div>

            <div className={styles.draftActions}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--ink-strong)', fontWeight: 500 }}>
                  8 questions ready to review
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>
                  Open in editor to refine, reorder, or accept individually.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="secondary" leadingIcon={<IconRefresh size={14} />}>
                  Regenerate all
                </Button>
                <Button variant="secondary">Accept all drafts</Button>
                <Button variant="primary">Open in editor →</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}