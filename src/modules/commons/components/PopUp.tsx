import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Modal } from "./Modal";

type Variant = "success" | "delete";

interface PopUpProps {
  title: string;
  description: string;
  isOpen: boolean;
  isOpenChange: (value: boolean) => void;
  isLoading?: boolean;
  buttonText?: string;
  handleConfirm: () => void;
  variant: Variant;
  modalTrigger?: React.ReactNode;
}

export function PopUp({
  title,
  description,
  isOpen,
  isOpenChange,
  isLoading,
  buttonText = "Confirm",

  handleConfirm,
  variant = "success",
  modalTrigger,
}: PopUpProps) {
  const variantIcon: Record<Variant, keyof typeof Icons> = {
    success: "CheckCircle",
    delete: "Trash",
  };

  const Icon = Icons[variantIcon[variant]];
  return (
    <Modal
      isOpen={isOpen}
      isOpenChange={isOpenChange}
      modalTrigger={modalTrigger}
    >
      <Modal.Content title="" className=" max-w-[544px]  rounded-md">
        <div className="flex gap-2">
          <div
            className={cn("size-12 items-center  rounded-full", {
              "bg-red-100": variant === "delete",
              "bg-green-200": variant === "success",
            })}
          >
            <Icon className="size-5" />
          </div>

          <div className=" text-center">
            <h6 className="mb-2 font-sfPro text-lg font-semibold text-black-200">
              {title}
            </h6>
            <p className="mx-auto w-full font-sfPro text-base font-medium text-gray-350 ">
              {description}
            </p>
          </div>
        </div>
        <Modal.Footer className="mt-5 flex flex-row gap-4">
          <Button
            variant="ghost"
            className="rounded-full border border-gray-800 bg-background px-6 font-sfPro text-sm font-semibold text-[hsla(234,8%,49%,1)] hover:bg-background hover:text-black-100 md:px-12 "
            size="sm"
            onClick={() => isOpenChange(false)}
          />

          <Button
            onClick={handleConfirm}
            isLoading={isLoading}
            size="sm"
            className={cn(
              "rounded-full px-6 font-sfPro text-sm font-semibold text-white-100 md:px-12",
              {
                "bg-red-100 ": variant === "delete",
                "bg-green-200 ": variant === "success",
              },
            )}
          >
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
