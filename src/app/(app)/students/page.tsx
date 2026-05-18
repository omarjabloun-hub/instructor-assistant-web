import { Plus } from "lucide-react";
import { PageHeader } from "@/components/molecules/PageHeader";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import { Select } from "@/components/atoms/Select";
import { Table, THead, TBody, TR, TH, TD } from "@/components/molecules/Table";
import { students } from "@/lib/mock";

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description={`${students.length} enrolled across all courses.`}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />}>Invite student</Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar placeholder="Search by name or email…" />
        <Select className="sm:max-w-[180px]" defaultValue="all">
          <option value="all">All courses</option>
          <option value="alg">ALG 101</option>
          <option value="geo">GEO 202</option>
          <option value="cal">CAL 301</option>
        </Select>
        <Select className="sm:max-w-[180px]" defaultValue="all">
          <option value="all">All statuses</option>
          <option value="ontrack">On track</option>
          <option value="atrisk">At risk</option>
          <option value="new">New</option>
        </Select>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>Student</TH>
            <TH>Course</TH>
            <TH>Grade</TH>
            <TH>Attendance</TH>
            <TH>Status</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <TBody>
          {students.map((s) => (
            <TR key={s.id}>
              <TD>
                <div className="flex items-center gap-3">
                  <Avatar name={s.name} size="sm" />
                  <div>
                    <p className="font-medium text-text">{s.name}</p>
                    <p className="text-xs text-text-subtle">{s.email}</p>
                  </div>
                </div>
              </TD>
              <TD className="text-text-muted">{s.course}</TD>
              <TD className="font-medium">{s.grade}</TD>
              <TD>{s.attendance}%</TD>
              <TD>
                <Badge
                  variant={
                    s.status === "At risk"
                      ? "danger"
                      : s.status === "New"
                        ? "primary"
                        : "success"
                  }
                  size="sm"
                >
                  {s.status}
                </Badge>
              </TD>
              <TD className="text-right">
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
