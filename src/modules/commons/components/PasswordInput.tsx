"use client";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FloatingInput, FloatingLabel } from "./FloatingInput";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <FloatingInput
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <FloatingLabel>{label} </FloatingLabel>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
          onClick={() => setShowPassword(prev => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <Icons.Hide className="h-4 w-4 text-gray-100" aria-hidden="true" />
          ) : (
            <Icons.View className="h-4 w-4 text-blue-100" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
