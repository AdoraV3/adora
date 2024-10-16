"use client";

import {
  createKnowledgeBaseAction,
  deleteKnowledgeBaseAction,
  getKnowledgeBaseAction,
} from "@/app/actions/knowledgeBase";
import { Label } from "@/components/ui/label";
import {
  useServerActionMutation,
  useServerActionQuery,
} from "@/lib/hooks/server-action-hooks";
import { FileUpload } from "@/modules/commons/components";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileUploadSchema } from "../validation";
import { ViewKnowledgeBase } from "./ViewKnowledgeBase";

export function CreateKnowledgeBase() {
  const [hasFile, setHasFile] = useState(false);
  const createKnowledgeBaseHandler = useServerActionMutation(
    createKnowledgeBaseAction,
    {
      onSuccess: () =>
        toast.success("Successfully added!", {
          description: "You have successfully updated your knowledge base",
        }),
      onError: error => {
        toast.error(error?.message);
      },
    },
  );

  const onFileUploadSuccess = (data: FileUploadSchema) => {
    createKnowledgeBaseHandler.mutate(data);
  };

  const { data: knowledgeBase } = useServerActionQuery(getKnowledgeBaseAction, {
    queryKey: ["knowledgeBase"],
    input: undefined,
  });

  useEffect(() => {
    if (knowledgeBase?.data?.fileId) {
      setHasFile(true);
    }
  }, [knowledgeBase?.data?.fileId]);

  const deleteKnowledgeBaseHandler = useServerActionMutation(
    deleteKnowledgeBaseAction,
    {
      onSuccess: () => {
        toast.success("Successfully Deleted!", {
          description: "You have successfully deleted the knowledge base.",
        });
        setHasFile(false);
      },
      onError: error => {
        toast.error(error?.message);
      },
    },
  );

  return (
    <section className="space-y-3">
      {hasFile ? (
        <ViewKnowledgeBase
          isLoading={deleteKnowledgeBaseHandler.isPending}
          file={{
            name: knowledgeBase?.data?.originalName ?? "",
            size: knowledgeBase?.data?.size ?? 0,
            url: knowledgeBase?.data?.url ?? "",
          }}
          handleDelete={() => deleteKnowledgeBaseHandler.mutate(undefined)}
        />
      ) : (
        <div className="col-span-2 max-w-4xl space-y-2">
          <h4 className="font-satoshi my-3 underline-offset-2 underline font-medium text-base text-black-100">
            Customer Support Knowledge Base
          </h4>
          <Label className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
            Upload Knowledge Base
          </Label>

          <FileUpload onSuccess={onFileUploadSuccess} />
        </div>
      )}
    </section>
  );
}
