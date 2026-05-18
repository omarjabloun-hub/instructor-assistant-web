import { Plus } from "lucide-react";
import { PageHeader } from "@/components/molecules/PageHeader";
import { Card } from "@/components/molecules/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { schedule } from "@/lib/mock";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule"
        description="Week of May 18 – May 24"
        actions={
          <>
            <Button variant="outline">Today</Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>Add event</Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {days.map((day) => {
          const events = schedule.filter((e) => e.day === day);
          return (
            <Card key={day} padding="sm" className="flex flex-col">
              <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-text-subtle">
                {day}
              </p>
              <div className="mt-2 flex flex-1 flex-col gap-2">
                {events.length === 0 && (
                  <p className="rounded-md border border-dashed border-border p-3 text-xs text-text-subtle text-center">
                    No events
                  </p>
                )}
                {events.map((e) => (
                  <div
                    key={e.id}
                    className="rounded-md border border-border bg-bg-muted/40 p-3 hover:border-primary transition-colors cursor-pointer"
                  >
                    <p className="text-xs font-medium text-primary">{e.time}</p>
                    <p className="mt-1 text-sm font-medium text-text">{e.title}</p>
                    <p className="text-xs text-text-muted">{e.room}</p>
                    <Badge variant="outline" size="sm" className="mt-2">
                      {e.course}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
