"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Icons } from "../icons";

const buttonVariants = cva(
  "inline-flex gap-2 font-satoshi  items-center justify-center rounded-default text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white-100 ",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary text-primary bg-white-100 hover:bg-accent hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-4 py-4",
        sm: "h-9 rounded-default px-3",
        lg: "h-11 rounded-default px-8",
        icon: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      isLoading,

      icon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        // disabled={isDisabled || isLoading}
      >
        {" "}
        {isLoading ? (
          <Icons.Spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        ) : (
          icon || null
        )}
        {children}{" "}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
