"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  // const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme="light"
      className="toaster border-none group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-none group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "!bg-white-100 !text-green-100",
          error: "!bg-white-100 text-destructive",
          closeButton: "!end-0 !start-auto !top-auto",
        },
      }}
      closeButton
      {...props}
    />
  );
}

export { Toaster };
