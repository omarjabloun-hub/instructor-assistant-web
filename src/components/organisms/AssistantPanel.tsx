"use client";

import * as React from "react";
import { ArrowUp, Paperclip, Sparkles } from "lucide-react";
import { ChatMessage } from "@/components/molecules/ChatMessage";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Textarea } from "@/components/atoms/Textarea";
import { cn } from "@/lib/cn";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi Sarah! I'm your teaching assistant. I can help you draft lesson plans, generate quiz questions, summarise student feedback, or analyse assignment performance. What would you like to work on today?",
    timestamp: "9:14 AM",
  },
  {
    id: "2",
    role: "user",
    content: "Can you suggest three icebreaker activities for my intro to algebra class next Monday?",
    timestamp: "9:16 AM",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Absolutely — here are three quick options:\n1. Number Bingo: students fill a 3×3 grid with numbers 1–25 and you call out equations whose answers match.\n2. Two Truths & A Variable: each student writes two true math facts about themselves (age, favourite number) and one disguised as a variable for the class to solve.\n3. Pattern Hunt: in pairs, students photograph a pattern around the classroom and present the rule.",
    timestamp: "9:16 AM",
  },
];

const suggestions = [
  "Draft a quiz on linear equations",
  "Summarise Monday's class feedback",
  "Create a rubric for the essay assignment",
  "Plan a 30-minute review session",
];

export interface AssistantPanelProps {
  className?: string;
  layout?: "inline" | "full";
}

export function AssistantPanel({ className, layout = "full" }: AssistantPanelProps) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [draft, setDraft] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", content: trimmed, timestamp: now },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Got it — here's a starting point you can refine. (Demo response.)",
        timestamp: now,
      },
    ]);
    setDraft("");
  };

  return (
    <div className={cn("flex h-full flex-col bg-surface", className)}>
      {layout === "full" && (
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-fg">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-text">Teaching Assistant</p>
              <p className="text-xs text-text-subtle">Powered by Claude</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            New chat
          </Button>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            role={m.role}
            content={<span className="whitespace-pre-wrap">{m.content}</span>}
            timestamp={m.timestamp}
            authorName="Sarah Chen"
          />
        ))}
      </div>

      <div className="border-t border-border bg-bg-muted/40 p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="flex items-end gap-2 rounded-xl border border-border bg-surface p-2"
        >
          <IconButton aria-label="Attach file" variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </IconButton>
          <Textarea
            placeholder="Ask me anything about your classes…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="min-h-[40px] max-h-32 resize-none border-0 bg-transparent shadow-none focus:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(draft);
              }
            }}
          />
          <Button size="sm" type="submit" rightIcon={<ArrowUp className="h-3.5 w-3.5" />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
