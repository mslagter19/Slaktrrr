import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const container = cva("mx-auto w-full", {
  variants: {
    maxWidth: {
      md: "max-w-3xl",
      lg: "max-w-5xl",
      xl: "max-w-6xl",
      "2xl": "max-w-7xl",
      full: "max-w-none",
    },
    padding: {
      none: "px-0",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    },
  },
  defaultVariants: {
    maxWidth: "xl", // max-w-6xl, zoals jij wilde
    padding: "md",  // px-6
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof container> { }

export function Container({ maxWidth, padding, className, ...props }: ContainerProps) {
  return (
    <div className={cn(container({ maxWidth, padding }), className)} {...props} />
  );
}