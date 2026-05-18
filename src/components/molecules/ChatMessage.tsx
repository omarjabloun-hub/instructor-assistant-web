import * as React from "react";
import { Bot } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { cn } from "@/lib/cn";

export interface ChatMessageProps {
  role: "user" | "assistant";
  content: React.ReactNode;
  authorName?: string;
  timestamp?: string;
  className?: string;
}

export function ChatMessage({ role, content, authorName, timestamp, className }: ChatMessageProps) {
  const isUser = role === "user";
  return (
    <div className={cn("flex w-full gap-3", isUser && "flex-row-reverse", className)}>
      {isUser ? (
        <Avatar size="sm" name={authorName} />
      ) : (
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-fg">
          <Bot className="h-4 w-4" />
        </span>
      )}
      <div className={cn("flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-primary text-primary-fg"
              : "rounded-tl-sm bg-bg-muted text-text"
          )}
        >
          {content}
        </div>
        {timestamp && <span className="text-[11px] text-text-subtle px-1">{timestamp}</span>}
      </div>
    </div>
  );
}
