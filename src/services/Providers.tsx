"use client";

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
      <Toaster position="top-right" />
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
