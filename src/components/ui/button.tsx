import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 w-full",
    "border-2 border-line",
    "font-sans font-bold text-sm uppercase tracking-wider",
    "transition-transform duration-[40ms] active:translate-x-px active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-40",
    "cursor-pointer select-none",
  ],
  {
    variants: {
      variant: {
        default:  "bg-paper text-ink",
        primary:  "bg-lime text-ink border-ink",
        ink:      "bg-ink text-paper border-ink",
        ghost:    "bg-transparent text-ink border-transparent",
        danger:   "bg-paper text-danger border-danger",
      },
      size: {
        default: "px-4 py-3",
        sm:      "px-3 py-2 text-xs",
        lg:      "px-6 py-4 text-base",
        icon:    "p-3 w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
