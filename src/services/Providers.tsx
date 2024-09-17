"use client";

import { Icons } from "@/components/icons";
import { Toaster } from "@/components/ui/sonner";
import { TailwindIndicator } from "@/modules/commons/components/TailwindIndicator";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(new QueryClient());
  return (
    <>
      <TailwindIndicator />
      <Toaster
        icons={{ success: <Icons.Success className="w-8 h-8 mr-5" /> }}
        className="bg-red-300"
        position="top-right"
      />
      <QueryClientProvider client={client}>
        <HydrationBoundary>{children}</HydrationBoundary>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>
    </>
  );
}
