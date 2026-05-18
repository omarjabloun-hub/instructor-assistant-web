import * as React from "react";
import Link from "next/link";
import { Users, Clock } from "lucide-react";
import { Card } from "@/components/molecules/Card";
import { Badge } from "@/components/atoms/Badge";
import { Progress } from "@/components/atoms/Progress";

export interface CourseCardProps {
  id: string;
  title: string;
  code: string;
  description: string;
  students: number;
  progress: number;
  nextSession: string;
  status: "active" | "draft" | "archived";
  color?: string;
}

const statusVariant: Record<CourseCardProps["status"], "success" | "warning" | "neutral"> = {
  active: "success",
  draft: "warning",
  archived: "neutral",
};

export function CourseCard({
  id,
  title,
  code,
  description,
  students,
  progress,
  nextSession,
  status,
  color = "#4f46e5",
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="block group">
      <Card className="h-full transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-lg text-white text-sm font-semibold"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            >
              {code.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="text-xs text-text-subtle">{code}</p>
              <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>
          </div>
          <Badge variant={statusVariant[status]} size="sm" className="capitalize">
            {status}
          </Badge>
        </div>

        <p className="mt-3 text-sm text-text-muted line-clamp-2">{description}</p>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Term progress</span>
            <span className="font-medium text-text">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {students} students
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {nextSession}
          </span>
        </div>
      </Card>
    </Link>
  );
}
