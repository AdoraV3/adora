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
import { Disclosure } from "@/modules/commons/hooks/useDisclosure";
import { useEffect } from "react";

export function BusinessSetupModal(props: Readonly<Disclosure>) {
  const { isOpen, onClose, onOpen } = props;
  const { data, isPending } = useServerActionQuery(getBusinessAction, {
    input: undefined,
    queryKey: ["getBusiness"],
  });

  const business = data?.data;

  useEffect(() => {
    if (!isPending && !business?.isProfileCompleted) {
      onOpen();
    }
  }, [business, onOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton className="sm:max-w-[425px] bg-white-100">
        <DialogHeader>
          <DialogTitle className="font-semibold text-black-100 font-lg">
            Almost Ready
          </DialogTitle>

          <DialogDescription className="pt-3 text-sm font-normal text-gray-750 font-satoshi">
            Your Registration is almost complete
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex items-center gap-3 mt-5 flex-end">
          <Button size="sm" onClick={onClose}>
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
