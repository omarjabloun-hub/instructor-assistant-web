"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/molecules/PageHeader";
import { Card } from "@/components/molecules/Card";
import { Avatar } from "@/components/atoms/Avatar";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ChatMessage } from "@/components/molecules/ChatMessage";
import { cn } from "@/lib/cn";

const threads = [
  { id: "1", name: "Alex Johnson", lastMessage: "Thanks for the feedback!", time: "2m", unread: 2, course: "ALG 101" },
  { id: "2", name: "Priya Singh", lastMessage: "Could we schedule office hours?", time: "1h", unread: 1, course: "CAL 301" },
  { id: "3", name: "Lena Kim", lastMessage: "I submitted the assignment.", time: "3h", unread: 0, course: "ALG 101" },
  { id: "4", name: "Sam Patel", lastMessage: "Question on problem 4…", time: "Yesterday", unread: 0, course: "CAL 301" },
  { id: "5", name: "Maria Rodriguez", lastMessage: "Thank you!", time: "2d", unread: 0, course: "GEO 202" },
];

const messages = [
  { id: "1", role: "user" as const, content: "Hi Sarah! I had a quick question about the homework.", time: "10:21 AM" },
  { id: "2", role: "assistant" as const, content: "Of course — what part is giving you trouble?", time: "10:24 AM" },
  { id: "3", role: "user" as const, content: "Problem 4. I keep getting a negative discriminant.", time: "10:25 AM" },
  { id: "4", role: "assistant" as const, content: "Try rewriting in standard form first — what coefficients are you getting for a, b, and c?", time: "10:27 AM" },
];

export default function MessagesPage() {
  const [active, setActive] = React.useState(threads[0]);
  const [draft, setDraft] = React.useState("");

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" description="Direct conversations with students and staff." />
      <Card padding="none" className="overflow-hidden">
        <div className="grid h-[640px] grid-cols-[300px_1fr]">
          <aside className="border-r border-border overflow-y-auto">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className={cn(
                  "w-full text-left px-4 py-3 border-b border-border transition-colors hover:bg-bg-muted",
                  active.id === t.id && "bg-bg-muted"
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar name={t.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-text truncate">{t.name}</p>
                      <span className="text-[11px] text-text-subtle">{t.time}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <p className="text-xs text-text-muted truncate flex-1">{t.lastMessage}</p>
                      {t.unread > 0 && (
                        <Badge variant="primary" size="sm" className="px-1.5">
                          {t.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </aside>

          <section className="flex flex-col">
            <header className="flex items-center gap-3 border-b border-border px-5 py-3">
              <Avatar name={active.name} size="sm" />
              <div>
                <p className="text-sm font-medium text-text">{active.name}</p>
                <p className="text-xs text-text-subtle">{active.course}</p>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
              {messages.map((m) => (
                <ChatMessage
                  key={m.id}
                  role={m.role}
                  content={m.content}
                  authorName={active.name}
                  timestamp={m.time}
                />
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDraft("");
              }}
              className="flex items-center gap-2 border-t border-border px-4 py-3"
            >
              <Input
                placeholder="Type a message…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <Button type="submit" leftIcon={<Send className="h-3.5 w-3.5" />}>
                Send
              </Button>
            </form>
          </section>
        </div>
      </Card>
    </div>
  );
}
