import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] px-1.5 py-0.5 border leading-none",
  {
    variants: {
      variant: {
        default: "border-line bg-paper text-ink",
        solid:   "border-ink bg-ink text-paper",
        accent:  "border-ink bg-lime text-ink",
        danger:  "border-danger bg-paper text-danger",
        ok:      "border-ok bg-paper text-ok",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
