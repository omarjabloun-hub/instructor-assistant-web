import * as React from "react";
import {
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Flag,
  Search,
  Sparkles,
  Upload,
} from "lucide-react";
import { PageHeader } from "@/components/molecules/PageHeader";
import { Card } from "@/components/molecules/Card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/molecules/Table";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import { Input } from "@/components/atoms/Input";
import { Progress } from "@/components/atoms/Progress";
import { cn } from "@/lib/cn";

type RowStatus = "validated" | "drafted" | "flagged" | "reading" | "drafting" | "queued";

interface QueueRow {
  id: string;
  name: string;
  studentId: string;
  examLabel: string;
  status: RowStatus;
  score: { value: string; max: string } | null;
  time: string;
  overridden?: boolean;
  flagSummary?: string;
}

const ROWS: QueueRow[] = [
  { id: "1", name: "Aïcha Bensalem", studentId: "4283", examLabel: "CS-201 · Final", status: "validated", score: { value: "17", max: "20" }, time: "Validated 14m ago" },
  { id: "2", name: "Marie Dubois", studentId: "4291", examLabel: "CS-201 · Final", status: "drafted", score: { value: "14", max: "20" }, overridden: true, time: "Drafted 22m ago" },
  { id: "3", name: "Omar Khalil", studentId: "4304", examLabel: "CS-201 · Final", status: "flagged", score: { value: "11", max: "20" }, time: "Drafted 28m ago", flagSummary: "Possible formula error · Q5" },
  { id: "4", name: "Jean-Luc Vasseur", studentId: "4312", examLabel: "CS-201 · Final", status: "reading", score: null, time: "Reading · 6 of 11 pages" },
  { id: "5", name: "Sofia Caruso", studentId: "4321", examLabel: "CS-201 · Final", status: "drafting", score: null, time: "Drafting Q3…" },
  { id: "6", name: "Priya Krishnan", studentId: "4327", examLabel: "CS-201 · Final", status: "validated", score: { value: "19", max: "20" }, time: "Validated 1h ago" },
  { id: "7", name: "Lin Mei", studentId: "4333", examLabel: "CS-201 · Final", status: "flagged", score: { value: "8", max: "20" }, time: "Drafted 40m ago", flagSummary: "Score 3.5σ below median" },
  { id: "8", name: "Thomas Nguyen", studentId: "4341", examLabel: "CS-201 · Final", status: "queued", score: null, time: "Queued 2m ago" },
  { id: "9", name: "Eleanor Choi", studentId: "4352", examLabel: "CHEM-110 · Mid-term", status: "drafted", score: { value: "15", max: "20" }, time: "Drafted 5m ago" },
  { id: "10", name: "Raj Patel", studentId: "4361", examLabel: "CHEM-110 · Mid-term", status: "drafted", score: { value: "12", max: "20" }, time: "Drafted 11m ago" },
];

interface ActivityEntry {
  kind: "flagged" | "reading" | "drafted" | "override" | "validated";
  time: string;
  body: React.ReactNode;
}

const ACTIVITY: ActivityEntry[] = [
  { kind: "flagged", time: "now", body: <>Flagged <strong>Lin Mei</strong> — score 3.5σ below class median. Worth a manual look at Q5.</> },
  { kind: "reading", time: "12s", body: <>Reading <strong>Jean-Luc Vasseur</strong>&apos;s submission · page 6 of 11.</> },
  { kind: "drafted", time: "22s", body: <>Drafted <strong>Sofia Caruso</strong> · proposed 16 / 20 · waiting on Q7.</> },
  { kind: "override", time: "6m", body: <>You overrode <strong>Marie Dubois</strong>&apos;s Q5 grade — AI proposed 3.0, you set 3.5. Logged.</> },
  { kind: "validated", time: "14m", body: <>Published 3 grades · <strong>Aïcha</strong>, <strong>Priya</strong>, <strong>Hassan</strong>. Notifications sent.</> },
  { kind: "flagged", time: "28m", body: <>Flagged <strong>Omar Khalil</strong> Q5 — suspected formula transposition. Cross-check before validating.</> },
  { kind: "drafted", time: "1h", body: <>Finished first pass on CS-201 Final — <strong>25 of 32 drafts ready</strong> for review.</> },
];

interface Stage {
  label: string;
  count: number;
  hint: string;
  tone: "neutral" | "primary" | "warning" | "success";
  live?: boolean;
}

const STAGES: Stage[] = [
  { label: "Queued", count: 7, hint: "Waiting for next worker", tone: "neutral" },
  { label: "Reading", count: 3, hint: "Avg 22s per submission", tone: "primary", live: true },
  { label: "Drafting", count: 1, hint: "Applying barème to answers", tone: "primary", live: true },
  { label: "AI drafts", count: 18, hint: "Awaiting your review", tone: "warning" },
  { label: "Validated", count: 7, hint: "Ready to publish", tone: "success" },
];

interface Run {
  classLabel: string;
  examTitle: string;
  meta: string;
  total: number;
  graded: number;
  validated: number;
  flagged: number;
  status: "grading" | "done";
  eta: string;
}

const RUNS: Run[] = [
  { classLabel: "CS-201 Algorithms", examTitle: "Algorithms — Final, January 2026", meta: "started 1h ago · 8 questions × 20 pts", total: 32, graded: 25, validated: 7, flagged: 3, status: "grading", eta: "~14 min remaining" },
  { classLabel: "CHEM-110 Organic", examTitle: "Organic chemistry — Mid-term", meta: "started 22 min ago · 10 questions", total: 36, graded: 8, validated: 0, flagged: 1, status: "grading", eta: "~38 min remaining" },
  { classLabel: "MATH-104 Linear Algebra", examTitle: "Eigenvalues — practice set", meta: "finished 6h ago · 12 questions", total: 28, graded: 28, validated: 28, flagged: 0, status: "done", eta: "Validated · 6h ago" },
];

const stageTone: Record<Stage["tone"], string> = {
  neutral: "bg-bg-muted text-text-muted",
  primary: "bg-primary-subtle text-primary",
  warning: "bg-warning-subtle text-warning",
  success: "bg-success-subtle text-success",
};

const statusBadge: Record<RowStatus, { variant: React.ComponentProps<typeof Badge>["variant"]; label: string }> = {
  validated: { variant: "success", label: "Validated" },
  drafted: { variant: "primary", label: "AI draft" },
  flagged: { variant: "warning", label: "Flagged" },
  reading: { variant: "neutral", label: "Reading" },
  drafting: { variant: "neutral", label: "Drafting" },
  queued: { variant: "outline", label: "Queued" },
};

const activityDot: Record<ActivityEntry["kind"], string> = {
  flagged: "bg-warning",
  reading: "bg-primary",
  drafted: "bg-primary",
  override: "bg-accent",
  validated: "bg-success",
};

export default function GradingQueuePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Grading queue"
        description="Every submission being read, drafted, or waiting on your validation. The AI proposes — you decide. Nothing leaves this queue until you publish."
        actions={
          <>
            <Badge variant="primary" size="md" className="hidden sm:inline-flex">
              <Sparkles className="h-3 w-3" /> 3 grading runs · live
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Button size="sm">
              <Upload className="h-4 w-4" /> Publish 7 validated
            </Button>
          </>
        }
      />

      <section aria-label="Pipeline stages" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {STAGES.map((stage) => (
          <Card key={stage.label} padding="md" className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
                  stageTone[stage.tone]
                )}
              >
                {stage.live && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />}
                {stage.label}
              </span>
              <span className="text-2xl font-semibold tabular-nums text-text">{stage.count}</span>
            </div>
            <p className="text-xs text-text-muted">{stage.hint}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-text">Active grading runs</h2>
            <p className="text-sm text-text-muted">Each run grades one exam across all submissions, end-to-end.</p>
          </div>
          <Button variant="ghost" size="sm">View all runs →</Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {RUNS.map((run) => {
            const pct = Math.round((run.graded / run.total) * 100);
            return (
              <Card key={run.examTitle} padding="md" className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-text-subtle">{run.classLabel}</p>
                    <h3 className="mt-1 truncate text-sm font-semibold text-text">{run.examTitle}</h3>
                    <p className="mt-0.5 text-xs text-text-muted">{run.meta}</p>
                  </div>
                  <Badge variant={run.status === "done" ? "success" : "primary"} size="sm">
                    {run.status === "done" ? "Done" : "Grading"}
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>{run.graded} of {run.total} graded</span>
                    <span className="tabular-nums">{pct}%</span>
                  </div>
                  <Progress value={pct} />
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="success" size="sm">
                    <CheckCircle2 className="h-3 w-3" /> {run.validated} validated
                  </Badge>
                  {run.flagged > 0 && (
                    <Badge variant="warning" size="sm">
                      <Flag className="h-3 w-3" /> {run.flagged} flagged
                    </Badge>
                  )}
                  <Badge variant="outline" size="sm">
                    <Clock className="h-3 w-3" /> {run.eta}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <Card padding="md" className="border-l-4 border-l-primary">
        <div className="flex items-start gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary-subtle text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="text-sm text-text">
            <p className="font-semibold">3 flagged submissions worth a closer look.</p>
            <p className="mt-1 text-text-muted">
              I&apos;m not confident on Q5 for <strong>Omar Khalil</strong> and <strong>Lin Mei</strong> —
              their answers either contradict the barème, or sit far from the class median. I held those drafts
              back so you can review first.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-3 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              <FilterChip active label="All" count={32} />
              <FilterChip label="Flagged" count={3} />
              <FilterChip label="AI drafts" count={18} />
              <FilterChip label="Validated" count={7} />
              <FilterChip label="Queued" count={7} />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-subtle" />
                <Input placeholder="Search students…" size="sm" className="w-48 pl-8" />
              </div>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" /> Sort
              </Button>
            </div>
          </div>

          <Table>
            <THead>
              <TR>
                <TH className="w-10"></TH>
                <TH>Student</TH>
                <TH>Exam</TH>
                <TH>Status</TH>
                <TH>Score</TH>
                <TH>Updated</TH>
              </TR>
            </THead>
            <TBody>
              {ROWS.map((row) => {
                const badge = statusBadge[row.status];
                return (
                  <TR key={row.id}>
                    <TD>
                      <input type="checkbox" className="h-3.5 w-3.5 rounded border-border" aria-label={`Select ${row.name}`} />
                    </TD>
                    <TD>
                      <div className="flex items-center gap-3">
                        <Avatar name={row.name} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-text">{row.name}</p>
                          <p className="text-xs text-text-subtle">#{row.studentId}</p>
                        </div>
                      </div>
                    </TD>
                    <TD className="text-sm text-text-muted">{row.examLabel}</TD>
                    <TD>
                      <div className="flex flex-col gap-0.5">
                        <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
                        {row.flagSummary && <span className="text-xs text-warning">{row.flagSummary}</span>}
                      </div>
                    </TD>
                    <TD className="tabular-nums text-sm">
                      {row.score ? (
                        <span className={cn("font-medium", row.overridden && "text-accent")}>
                          {row.score.value}<span className="text-text-subtle"> / {row.score.max}</span>
                          {row.overridden && <span className="ml-1 text-xs text-text-subtle">(overridden)</span>}
                        </span>
                      ) : (
                        <span className="text-text-subtle">—</span>
                      )}
                    </TD>
                    <TD className="text-xs text-text-muted">{row.time}</TD>
                  </TR>
                );
              })}
            </TBody>
          </Table>

          <div className="flex items-center justify-between px-1 text-xs text-text-muted">
            <span>Showing 10 of 68 submissions across 3 exams</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">← Prev</Button>
              <Button variant="ghost" size="sm">Next →</Button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <Card padding="md">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">Recent activity</h3>
              <span className="text-xs text-text-subtle">Live</span>
            </div>
            <ol className="space-y-3">
              {ACTIVITY.map((entry, i) => (
                <li key={i} className="flex gap-3">
                  <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", activityDot[entry.kind])} />
                  <div className="min-w-0 flex-1 text-xs leading-relaxed text-text-muted">
                    {entry.body}
                    <span className="ml-1 text-text-subtle">· {entry.time}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 border-t border-border pt-3 text-[11px] leading-relaxed text-text-subtle">
              Every AI decision is logged with the submission. You can audit and revert any grade from the student record.
            </p>
          </Card>

          <Card padding="md" variant="filled">
            <div className="flex items-start gap-2 text-xs text-text-muted">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p>
                <strong className="font-semibold text-text">~52 minutes</strong> until all active runs finish.
                You&apos;ll get a notification when CS-201 is fully drafted.
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function FilterChip({ label, count, active }: { label: string; count: number; active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-fg"
          : "border-border bg-surface text-text-muted hover:bg-bg-muted"
      )}
    >
      {label}
      <span className={cn("tabular-nums", active ? "text-primary-fg/80" : "text-text-subtle")}>· {count}</span>
    </button>
  );
}
