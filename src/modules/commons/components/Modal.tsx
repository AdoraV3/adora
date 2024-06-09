import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode } from "react";

interface ModalProps {
  isOpen?: boolean;
  isOpenChange?: (isOpen: boolean) => void;
  modalTrigger?: ReactNode;
}

interface ModalTriggerProps {
  className?: string;
}
export function Modal({
  children,
  modalTrigger,
  isOpen,
  isOpenChange,
}: PropsWithChildren<ModalProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={isOpenChange}>
      <DialogTrigger className={cn("outline-none")} asChild>
        {modalTrigger}
      </DialogTrigger>
      {children}
    </Dialog>
  );
}

function ModalFooter({
  children,
  className,
}: PropsWithChildren<ModalTriggerProps>) {
  return <DialogFooter className={cn("", className)}>{children} </DialogFooter>;
}

function ModalTrigger({
  children,
  className,
}: PropsWithChildren<ModalTriggerProps>) {
  return (
    <DialogTrigger className={cn("", className)} asChild>
      {children}
    </DialogTrigger>
  );
}

function ModalContent({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" /> */}
      <DialogContent
        title={title}
        className={cn(
          `scrollbar-hide fixed left-1/2 top-1/2 max-h-full w-full max-w-lg -translate-x-1/2 -translate-y-1/2  overflow-y-scroll rounded-[50px] bg-[#fff] py-4  text-gray-900  data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms] ${className}`,
        )}
      >
        {children}

        <ModalFooter />
      </DialogContent>
    </>
  );
}

// Modal.Button = DialogTrigger;
// // Modal.Close = Dialog.Close;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
Modal.Trigger = ModalTrigger;
