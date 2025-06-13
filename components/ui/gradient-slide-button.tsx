"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientSlideButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
}

export function GradientSlideButton({
  children,
  className,
  colorFrom = "#0284c7",
  colorTo = "#2563eb",
  ...props
}: GradientSlideButtonProps) {
  return (
    <button
      style={
        {
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        "relative overflow-hidden bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 hover:scale-[105%]",
        "before:absolute before:rounded-[inherit] before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-l before:from-[var(--color-from)] before:to-[var(--color-to)] before:transition-all before:duration-200",
        "hover:before:left-0 hover:text-white ",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
