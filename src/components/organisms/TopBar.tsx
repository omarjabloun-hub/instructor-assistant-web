"use client";

import * as React from "react";
import { Bell, HelpCircle, Sun, Moon } from "lucide-react";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Avatar } from "@/components/atoms/Avatar";
import { IconButton } from "@/components/atoms/IconButton";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/cn";

export interface TopBarProps {
  userName?: string;
  className?: string;
}

export function TopBar({ userName = "Dr. Sarah Chen", className }: TopBarProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "light"
      | "dark"
      | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.dataset.theme = stored;
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-surface/80 px-6 backdrop-blur",
        className
      )}
    >
      <SearchBar containerClassName="max-w-lg" placeholder="Search courses, students, lessons…" />
      <div className="ml-auto flex items-center gap-2">
        <IconButton aria-label="Help" variant="ghost" size="sm">
          <HelpCircle className="h-4 w-4" />
        </IconButton>
        <IconButton aria-label="Toggle theme" variant="ghost" size="sm" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </IconButton>
        <div className="relative">
          <IconButton aria-label="Notifications" variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </IconButton>
          <Badge
            variant="danger"
            size="sm"
            className="absolute -right-1 -top-1 h-4 min-w-4 justify-center px-1 leading-none"
          >
            3
          </Badge>
        </div>
        <div className="ml-2 flex items-center gap-2 pl-3 border-l border-border">
          <Avatar name={userName} size="sm" />
          <div className="hidden md:block leading-tight">
            <p className="text-sm font-medium text-text">{userName}</p>
            <p className="text-xs text-text-subtle">Instructor</p>
          </div>
        </div>
      </div>
    </header>
  );
}
