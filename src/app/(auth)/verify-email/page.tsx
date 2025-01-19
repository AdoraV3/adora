import VerifyOtp from "@/modules/auth/components/VerifyOtp";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtp />
    </Suspense>
  );
}
