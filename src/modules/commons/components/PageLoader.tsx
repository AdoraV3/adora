"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

type Spinner = {
  type: "spinner";
  spinnerClassName?: string;
};

interface PageLoaderProps {
  text?: string;
  className?: string;
  variant?: Spinner;
}

export function PageLoader({
  text,
  className,
  variant = { type: "spinner" },
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        `z-30 flex h-96 w-full items-center justify-center  overflow-hidden p-5 `,
        className,
      )}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <Icons.Spinner
          className={cn(
            "mr-2 h-4 w-4 animate-spin text-primary",
            variant.spinnerClassName,
          )}
          aria-hidden="true"
        />

        <h3 className="text-large my-5 text-center font-medium text-black-100">
          {text}{" "}
        </h3>
      </div>
    </div>
  );
}
