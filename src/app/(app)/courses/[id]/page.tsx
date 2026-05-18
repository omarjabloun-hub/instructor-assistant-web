import { notFound } from "next/navigation";
import { ChevronLeft, Users, Calendar, Pencil } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/molecules/PageHeader";
import { Card } from "@/components/molecules/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Progress } from "@/components/atoms/Progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/molecules/Tabs";
import { Table, THead, TBody, TR, TH, TD } from "@/components/molecules/Table";
import { courses, students, assignments } from "@/lib/mock";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();

  const enrolled = students.filter((s) => s.course === course.code);
  const tasks = assignments.filter((a) => a.course === course.code);

  return (
    <div className="space-y-6">
      <Link
        href="/courses"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to courses
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span
            className="grid h-14 w-14 place-items-center rounded-xl text-white text-lg font-semibold"
            style={{ backgroundColor: course.color }}
            aria-hidden="true"
          >
            {course.code.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <p className="text-xs text-text-subtle">{course.code}</p>
            <h1 className="text-2xl font-semibold tracking-tight text-text">{course.title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-text-muted">{course.description}</p>
          </div>
        </div>
        <Button variant="outline" leftIcon={<Pencil className="h-4 w-4" />}>
          Edit
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs text-text-subtle">Students</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-text">{course.students}</span>
            <Users className="h-4 w-4 text-text-subtle" />
          </p>
        </Card>
        <Card>
          <p className="text-xs text-text-subtle">Next session</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-base font-semibold text-text">{course.nextSession}</span>
            <Calendar className="h-4 w-4 text-text-subtle" />
          </p>
        </Card>
        <Card>
          <p className="text-xs text-text-subtle">Term progress</p>
          <div className="mt-2 flex items-center gap-3">
            <Progress value={course.progress} className="flex-1" />
            <span className="text-sm font-medium text-text">{course.progress}%</span>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <h3 className="font-semibold text-text">Syllabus</h3>
            <p className="mt-2 text-sm text-text-muted">
              A 14-week introduction grounded in real-world applications. Weekly problem sets, one
              midterm, one final project, and bi-weekly check-ins with each student.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Table>
            <THead>
              <TR>
                <TH>Name</TH>
                <TH>Email</TH>
                <TH>Grade</TH>
                <TH>Attendance</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {enrolled.map((s) => (
                <TR key={s.id}>
                  <TD className="font-medium">{s.name}</TD>
                  <TD className="text-text-muted">{s.email}</TD>
                  <TD>{s.grade}</TD>
                  <TD>{s.attendance}%</TD>
                  <TD>
                    <Badge variant={s.status === "At risk" ? "danger" : "success"} size="sm">
                      {s.status}
                    </Badge>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </TabsContent>

        <TabsContent value="assignments">
          <Table>
            <THead>
              <TR>
                <TH>Title</TH>
                <TH>Due</TH>
                <TH>Submissions</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {tasks.map((t) => (
                <TR key={t.id}>
                  <TD className="font-medium">{t.title}</TD>
                  <TD className="text-text-muted">{t.due}</TD>
                  <TD>
                    {t.submissions}/{t.total}
                  </TD>
                  <TD>
                    <Badge
                      variant={
                        t.status === "Graded"
                          ? "success"
                          : t.status === "Grading"
                            ? "warning"
                            : t.status === "Open"
                              ? "primary"
                              : "neutral"
                      }
                      size="sm"
                    >
                      {t.status}
                    </Badge>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
