import Link from "next/link";
import { ArrowRight, BookOpen, MessageSquare, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";

const features = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI-powered planning",
    body: "Generate lesson plans, quiz questions, and rubrics in seconds, tailored to your curriculum.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Student insights",
    body: "Spot at-risk students early with attendance, grade, and engagement signals in one view.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Course workspace",
    body: "Keep syllabi, assignments, and announcements organised across every class you teach.",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Talk with your data",
    body: "Ask the assistant in plain language — “Who's behind on assignments in CAL 301?”",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/60 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-fg font-bold">
              I
            </span>
            <span className="font-semibold">Instructor</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-text-muted">
            <a href="#features" className="hover:text-text">Features</a>
            <a href="#pricing" className="hover:text-text">Pricing</a>
            <Link href="/login" className="hover:text-text">Sign in</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Open app</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <Badge variant="primary" className="mb-6">
          <Sparkles className="h-3 w-3" /> Now with AI lesson planning
        </Badge>
        <h1 className="mx-auto max-w-3xl text-4xl md:text-5xl font-semibold tracking-tight text-text">
          The AI assistant built for instructors.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-text-muted">
          Plan classes faster, grade with consistency, and give every student the attention they
          deserve — all from one calm, focused workspace.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Try the demo
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">Sign in</Button>
          </Link>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-surface p-6 shadow-sm"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-subtle text-primary">
                {f.icon}
              </span>
              <h3 className="mt-4 font-semibold text-text">{f.title}</h3>
              <p className="mt-1.5 text-sm text-text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-text-subtle">
        © {new Date().getFullYear()} Instructor Inc. · Built with Next.js
      </footer>
    </div>
  );
}
