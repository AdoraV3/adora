import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        type={type}
        className={cn(
          " border h-14 peer border-gray-550 focus:border-primary",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        " left-3 bg-white-100 text-base font-satoshi font-normal px-2 text-gray-550 absolute start-2 top-[0.1rem] origin-[0] -translate-y-4 scale-75 transform duration-300  peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary  rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

export { FloatingInput, FloatingLabel };
