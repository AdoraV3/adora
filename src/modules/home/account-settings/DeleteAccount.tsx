"use client";

import { Button } from "@/components/ui/button";

export function DeleteAccount() {
  return (
    <div className="max-w-lg mt-10">
      <h6 className="font-medium mb-2 font-satoshi text-black-100 text-sm">
        Delete your account
      </h6>
      <p className="font-normal font-satoshi text-sm text-gray-2">
        When you delete your account, you lose access to Adora account services,
        and we permanently delete your personal data. You can cancel the
        deletion within 14 days.
      </p>

      <Button
        className="mt-10 text-black-100 px-6 border border-input bg-gray-650"
        disabled
      >
        Delete Account
      </Button>
    </div>
  );
}
