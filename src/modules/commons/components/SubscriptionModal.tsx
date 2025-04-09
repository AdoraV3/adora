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
            Select Plan
          </DialogTitle>

          <DialogDescription className="font-normal pt-3 text-gray-750 text-sm font-satoshi">
            To continue using Adora, Select a plan to enjoy a 7day free trial
          </DialogDescription>
        </DialogHeader>

        <p className="font-normal pt-3 text-gray-750 text-sm font-satoshi">
          Access to the app will resume after selecting a plan
        </p>

        <DialogFooter className="flex flex-end items-center mt-5 gap-3">
          <Button size="sm" onClick={handlePlanUpgrade}>
            Select Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
