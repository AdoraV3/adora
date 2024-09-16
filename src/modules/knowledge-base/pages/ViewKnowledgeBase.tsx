import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@/modules/commons/hooks/useDisclosure";
import { useFormatSize } from "@/modules/commons/utils/helpers";
import { DeleteModal } from "../components/DeleteModal";

interface ViewKnowledgeBaseProps {
  file: { name: string; size: number; url: string };
  handleDelete: () => void;
  isLoading: boolean;
}

export function ViewKnowledgeBase({
  file,
  handleDelete,
  isLoading,
}: ViewKnowledgeBaseProps) {
  const formatSize = useFormatSize();

  const disclosure = useDisclosure();

  return (
    <Card className="mt-10 flex flex-1 flex-col  shadow-350 h-[31rem] rounded-3xl bg-white-100">
      <CardContent className="p-20 flex flex-1 mt-auto gap-6 flex-col">
        <h4 className="font-satoshi my-3 underline-offset-2 underline font-medium text-base text-black-100">
          Customer Support Knowledge Base
        </h4>
        <div
          className={cn(
            "flex min-h-[4.25rem]  items-center gap-2.5 rounded-2xl border-2 !border-[hsla(212,33%,95%,1)] p-4 py-2",
          )}
        >
          <Icons.File />
          <div
            className="flex flex-col gap-1 text-xs font-normal text-gray-600"
            title={file.name}
          >
            <p className="line-clamp-1 font-semibold text-black-100">
              {file.name}
            </p>
            <p>{formatSize(file.size)}</p>
          </div>
        </div>

        <Button
          className="bg-[hsla(25,64%,36%,0.05)] rounded-lg  text-primary w-full max-w-md m-auto "
          variant="ghost"
          icon={<Icons.Delete />}
          onClick={disclosure.onOpen}
          isLoading={isLoading}
        >
          Delete File
        </Button>
      </CardContent>
      <DeleteModal
        isLoading={isLoading}
        handleDelete={handleDelete}
        {...disclosure}
      />
    </Card>
  );
}
