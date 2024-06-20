import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  iconClassName?: string;
};

export const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, iconClassName, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          type="search"
          className={cn("rounded-sm pl-10 ", className)}
          ref={ref}
          {...props}
        />
        <div
          className={cn("absolute left-4 top-4 text-gray-100", iconClassName)}
        >
          <Icons.Search size={18} />
        </div>
      </div>
    );
  },
);

SearchInput.displayName = "searchInput";
