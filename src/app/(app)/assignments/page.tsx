import { Plus } from "lucide-react";
import { PageHeader } from "@/components/molecules/PageHeader";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Progress } from "@/components/atoms/Progress";
import { Table, THead, TBody, TR, TH, TD } from "@/components/molecules/Table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/molecules/Tabs";
import { assignments } from "@/lib/mock";

function AssignmentTable({ rows }: { rows: typeof assignments }) {
  return (
    <Table>
      <THead>
        <TR>
          <TH>Title</TH>
          <TH>Course</TH>
          <TH>Due</TH>
          <TH>Submissions</TH>
          <TH>Status</TH>
        </TR>
      </THead>
      <TBody>
        {rows.map((a) => (
          <TR key={a.id}>
            <TD className="font-medium">{a.title}</TD>
            <TD className="text-text-muted">{a.course}</TD>
            <TD className="text-text-muted">{a.due}</TD>
            <TD>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">
                  {a.submissions}/{a.total}
                </span>
                <Progress
                  value={(a.submissions / a.total) * 100}
                  className="h-1.5 w-24"
                />
              </div>
            </TD>
            <TD>
              <Badge
                variant={
                  a.status === "Graded"
                    ? "success"
                    : a.status === "Grading"
                      ? "warning"
                      : a.status === "Open"
                        ? "primary"
                        : "neutral"
                }
                size="sm"
              >
                {a.status}
              </Badge>
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}

export default function AssignmentsPage() {
  const open = assignments.filter((a) => a.status === "Open");
  const grading = assignments.filter((a) => a.status === "Grading");
  const graded = assignments.filter((a) => a.status === "Graded");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description="Create, distribute, and grade student work across your courses."
        actions={<Button leftIcon={<Plus className="h-4 w-4" />}>New assignment</Button>}
      />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({open.length})</TabsTrigger>
          <TabsTrigger value="grading">To grade ({grading.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({graded.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AssignmentTable rows={assignments} />
        </TabsContent>
        <TabsContent value="open">
          <AssignmentTable rows={open} />
        </TabsContent>
        <TabsContent value="grading">
          <AssignmentTable rows={grading} />
        </TabsContent>
        <TabsContent value="graded">
          <AssignmentTable rows={graded} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
