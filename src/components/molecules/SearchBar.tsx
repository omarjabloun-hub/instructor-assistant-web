"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input, type InputProps } from "@/components/atoms/Input";
import { cn } from "@/lib/cn";

export interface SearchBarProps extends Omit<InputProps, "type"> {
  containerClassName?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, containerClassName, placeholder = "Search…", ...props }, ref) => (
    <div className={cn("relative w-full max-w-md", containerClassName)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
      <Input
        ref={ref}
        type="search"
        placeholder={placeholder}
        className={cn("pl-9", className)}
        {...props}
      />
    </div>
  )
);
SearchBar.displayName = "SearchBar";
