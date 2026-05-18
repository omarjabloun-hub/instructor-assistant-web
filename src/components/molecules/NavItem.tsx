"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  collapsed?: boolean;
}

export function NavItem({ href, label, icon, active, badge, collapsed }: NavItemProps) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary-subtle text-primary"
          : "text-text-muted hover:bg-bg-muted hover:text-text",
        collapsed && "justify-center px-0"
      )}
    >
      {icon && (
        <span className={cn("shrink-0", active ? "text-primary" : "text-text-subtle group-hover:text-text")}>
          {icon}
        </span>
      )}
      {!collapsed && <span className="flex-1 truncate">{label}</span>}
      {!collapsed && badge}
    </Link>
  );
}
