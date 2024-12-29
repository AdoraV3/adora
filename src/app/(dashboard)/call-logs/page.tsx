import { CallLogs } from "@/modules/call-logs/pages/CallLogs";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallLogs />
    </Suspense>
  );
}
