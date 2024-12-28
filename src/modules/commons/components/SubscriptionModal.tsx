"use client";

import { getBusinessAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SubscriptionModal() {
  const { data } = useServerActionQuery(getBusinessAction, {
    input: undefined,
    queryKey: ["getBusiness"],
  });

  const business = data?.data;

  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (!business?.subscriptionEndDate) return;

    const daysLeft = differenceInDays(
      business?.subscriptionEndDate,
      new Date(),
    );

    const isValidSubscription = daysLeft > 0;

    setIsBlocked(!isValidSubscription);
  }, [business?.subscriptionEndDate]);

  const router = useRouter();
  const handlePlanUpgrade = () => {
    router.push("/pricing");
  };

  return (
    <Dialog open={isBlocked} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[425px] bg-white-100"
      >
        <DialogHeader>
          <DialogTitle className="text-black-100 font-semibold font-lg">
            Upgrade Plan
          </DialogTitle>
          <DialogDescription className="font-normal pt-3 text-gray-750 text-sm font-satoshi">
            It looks like you&apos;ve reached the limit of your current plan! To
            continue enjoying Adora&apos;s full features, please upgrade or
            renew your plan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-end items-center mt-5 gap-3">
          <Button size="sm" onClick={handlePlanUpgrade}>
            Upgrade Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
