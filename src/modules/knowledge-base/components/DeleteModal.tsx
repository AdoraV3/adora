import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Modal } from "@/modules/commons/components";
import { Disclosure } from "@/modules/commons/hooks/useDisclosure";

interface DeleteModalProps extends Disclosure {
  handleDelete: () => void;
  isLoading: boolean;
}
export function DeleteModal({
  isOpen,
  onClose,
  handleDelete,
  isLoading,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} isOpenChange={onClose}>
      <Modal.Content
        className=" flex flex-col justify-between   flex-1"
        title="Delete Knowledge Base"
      >
        <div className="flex  gap-5">
          <Icons.Delete2 />
          <div>
            <h6 className="text-lg text-[#575757] font-bold">
              Delete knowledge base
            </h6>
            <p className="font-normal text-sm font-satoshi text-gray-750">
              Are you sure you want to delete this knowledge base? This action
              cannot be undone.
            </p>
          </div>
        </div>
        <Modal.Footer className="justify-end mt-5">
          <Button size="icon" variant="outline" className="rounded-lg px-4">
            Cancel
          </Button>
          <Button
            size="icon"
            onClick={handleDelete}
            isLoading={isLoading}
            className="bg-destructive rounded-lg px-4 text-white-100"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
