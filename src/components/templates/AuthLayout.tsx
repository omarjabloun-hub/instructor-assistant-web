import * as React from "react";
import { GraduationCap } from "lucide-react";

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-primary text-primary-fg p-12">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-white/10">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold">Instructor</span>
        </div>
        <div className="space-y-4 max-w-md">
          <h2 className="text-3xl font-semibold leading-tight">
            Teach smarter, not harder.
          </h2>
          <p className="text-white/80 leading-relaxed">
            An AI co-pilot that plans lessons, grades faster, and surfaces the students who need
            your attention most — all in one place.
          </p>
        </div>
        <p className="text-xs text-white/60">© {new Date().getFullYear()} Instructor Inc.</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-bg">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-fg">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold text-text">Instructor</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-text-muted">{subtitle}</p>}
          </div>
          {children}
          {footer && <div className="text-center text-sm text-text-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
