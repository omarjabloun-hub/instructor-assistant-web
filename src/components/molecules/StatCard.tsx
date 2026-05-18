import * as React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "./Card";
import { cn } from "@/lib/cn";

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: { value: string; direction: "up" | "down" };
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({ label, value, delta, icon, description, className }: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-text-muted">{label}</span>
        {icon && (
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary-subtle text-primary">
            {icon}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between gap-3">
        <span className="text-3xl font-semibold tracking-tight text-text">{value}</span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
              delta.direction === "up"
                ? "bg-success-subtle text-success"
                : "bg-danger-subtle text-danger"
            )}
          >
            {delta.direction === "up" ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {delta.value}
          </span>
        )}
      </div>
      {description && <p className="text-xs text-text-subtle">{description}</p>}
    </Card>
  );
}
