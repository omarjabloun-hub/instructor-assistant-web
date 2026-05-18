"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { NavItem } from "@/components/molecules/NavItem";
import { Badge } from "@/components/atoms/Badge";
import { Divider } from "@/components/atoms/Divider";
import { cn } from "@/lib/cn";

interface NavGroup {
  label: string;
  items: { href: string; label: string; icon: React.ReactNode; badge?: React.ReactNode }[];
}

const navigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
      {
        href: "/assistant",
        label: "AI Assistant",
        icon: <Sparkles className="h-4 w-4" />,
        badge: <Badge variant="primary" size="sm">New</Badge>,
      },
    ],
  },
  {
    label: "Teaching",
    items: [
      { href: "/courses", label: "Courses", icon: <BookOpen className="h-4 w-4" /> },
      { href: "/students", label: "Students", icon: <Users className="h-4 w-4" /> },
      { href: "/assignments", label: "Assignments", icon: <ClipboardList className="h-4 w-4" /> },
      { href: "/schedule", label: "Schedule", icon: <Calendar className="h-4 w-4" /> },
      { href: "/messages", label: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
    ],
  },
  {
    label: "Account",
    items: [{ href: "/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> }],
  },
];

export interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface",
        className
      )}
    >
      <div className="flex h-16 items-center gap-2 px-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-fg">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-semibold text-text">Instructor</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigation.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
              {group.label}
            </p>
            {group.items.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={pathname === item.href || pathname.startsWith(item.href + "/")}
                badge={item.badge}
              />
            ))}
          </div>
        ))}
      </nav>

      <Divider />
      <div className="p-4">
        <div className="rounded-lg bg-bg-muted p-4">
          <p className="text-xs font-semibold text-text">Free plan</p>
          <p className="mt-1 text-xs text-text-muted">Upgrade to unlock unlimited AI prompts.</p>
          <Link
            href="/settings/billing"
            className="mt-3 inline-flex text-xs font-medium text-primary hover:underline"
          >
            Upgrade plan →
          </Link>
        </div>
      </div>
    </aside>
  );
}
