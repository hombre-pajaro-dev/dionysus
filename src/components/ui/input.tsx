import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full border-2 border-line bg-paper text-ink",
          "px-3 py-3 font-mono text-sm",
          "outline-none focus:bg-lime",
          "placeholder:text-muted-foreground placeholder:font-mono",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
