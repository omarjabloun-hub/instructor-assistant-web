import Link from "next/link";
import {
  BookOpen,
  CalendarClock,
  ClipboardCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/molecules/PageHeader";
import { StatCard } from "@/components/molecules/StatCard";
import { Card } from "@/components/molecules/Card";
import { CourseCard } from "@/components/organisms/CourseCard";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import { courses, schedule, announcements, students } from "@/lib/mock";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome back, Sarah"
        description="Here's what's happening across your courses this week."
        actions={
          <>
            <Button variant="outline">Export report</Button>
            <Link href="/courses/new">
              <Button>New course</Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active students"
          value={123}
          delta={{ value: "8%", direction: "up" }}
          icon={<Users className="h-4 w-4" />}
          description="vs. last term"
        />
        <StatCard
          label="Courses"
          value={5}
          icon={<BookOpen className="h-4 w-4" />}
          description="2 drafts in progress"
        />
        <StatCard
          label="To grade"
          value={47}
          delta={{ value: "12", direction: "down" }}
          icon={<ClipboardCheck className="h-4 w-4" />}
          description="Across 3 assignments"
        />
        <StatCard
          label="Avg. attendance"
          value="91%"
          delta={{ value: "2%", direction: "up" }}
          icon={<TrendingUp className="h-4 w-4" />}
          description="Last 4 weeks"
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">Your courses</h2>
          <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.id} {...c} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text">Today's schedule</h3>
              <p className="text-sm text-text-muted">Monday, May 18</p>
            </div>
            <Link href="/schedule" className="text-sm font-medium text-primary hover:underline">
              Full calendar →
            </Link>
          </div>
          <ul className="space-y-3">
            {schedule.slice(0, 4).map((s) => (
              <li
                key={s.id}
                className="flex items-center gap-4 rounded-lg border border-border bg-bg-muted/40 p-3"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-subtle text-primary">
                  <CalendarClock className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{s.title}</p>
                  <p className="text-xs text-text-muted">
                    {s.day} · {s.time} · {s.room}
                  </p>
                </div>
                <Badge variant="outline" size="sm">
                  {s.course}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-text">At-risk students</h3>
            <Link href="/students" className="text-xs font-medium text-primary hover:underline">
              View
            </Link>
          </div>
          <ul className="space-y-3">
            {students
              .filter((s) => s.status === "At risk")
              .slice(0, 4)
              .map((s) => (
                <li key={s.id} className="flex items-center gap-3">
                  <Avatar name={s.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">{s.name}</p>
                    <p className="text-xs text-text-muted">
                      {s.course} · {s.attendance}% attendance
                    </p>
                  </div>
                  <Badge variant="danger" size="sm">
                    {s.grade}
                  </Badge>
                </li>
              ))}
          </ul>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-text">Announcements</h3>
        </div>
        <ul className="divide-y divide-border">
          {announcements.map((a) => (
            <li key={a.id} className="flex items-center gap-3 py-3">
              <span
                className={
                  a.type === "warning"
                    ? "h-2 w-2 rounded-full bg-warning"
                    : "h-2 w-2 rounded-full bg-primary"
                }
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{a.title}</p>
                <p className="text-xs text-text-subtle">{a.author}</p>
              </div>
              <span className="text-xs text-text-subtle">{a.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
