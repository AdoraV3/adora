"use client";

import {
  HydrationBoundaryProps,
  HydrationBoundary as RQHydrate,
} from "@tanstack/react-query";

export function Hydrate(props: HydrationBoundaryProps) {
  return <RQHydrate {...props} />;
}
