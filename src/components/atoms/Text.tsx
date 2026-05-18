import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-3xl md:text-4xl font-semibold tracking-tight text-text",
      h2: "text-2xl md:text-3xl font-semibold tracking-tight text-text",
      h3: "text-xl md:text-2xl font-semibold text-text",
      h4: "text-lg font-semibold text-text",
      body: "text-sm text-text",
      lead: "text-base text-text-muted",
      caption: "text-xs text-text-subtle",
      label: "text-sm font-medium text-text",
      code: "font-mono text-xs bg-bg-muted text-text px-1.5 py-0.5 rounded",
    },
    tone: {
      default: "",
      muted: "!text-text-muted",
      subtle: "!text-text-subtle",
      primary: "!text-primary",
      danger: "!text-danger",
      success: "!text-success",
    },
  },
  defaultVariants: { variant: "body", tone: "default" },
});

type AsProp = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "label";

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: AsProp;
}

export function Text({ as, variant = "body", tone, className, ...props }: TextProps) {
  const Tag: AsProp =
    as ??
    (variant === "h1"
      ? "h1"
      : variant === "h2"
        ? "h2"
        : variant === "h3"
          ? "h3"
          : variant === "h4"
            ? "h4"
            : variant === "caption"
              ? "span"
              : "p");
  return React.createElement(Tag, {
    className: cn(textVariants({ variant, tone }), className),
    ...props,
  });
}
