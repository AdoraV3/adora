import { AccountSettings } from "@/modules/home/pages/AccountSettings";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountSettings />
    </Suspense>
  );
}
