// import { useRef, type PropsWithChildren } from "react";
// import { type UseFormRegisterReturn } from "react-hook-form";

// type FileUploadProps = {
//   register: UseFormRegisterReturn;
//   accept?: string;
// };

// export function FileUpload(props: PropsWithChildren<FileUploadProps>) {
//   const { register, accept, children } = props;
//   const { ref, ...rest } = register as {
//     ref: (instance: HTMLInputElement | null) => void;
//   };

//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const handleClick = () => inputRef.current?.click();
//   return (
//     <div className="w-full border-dashed-4 rounded-md border-[hsla(216,12%,84%,1)]  bg-[hsla(210,20%,98%,1)]">
//       <input
//         type="file"
//         hidden
//         accept={accept}
//         ref={e => {
//           ref(e);
//           inputRef.current = e;
//         }}
//         {...rest}
//       />
//       <button type="button" className="w-full" onClick={handleClick}>
//         {children}
//       </button>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UploadState } from "./UploadState";
import { useFileStore } from "./useFileStore";
import { useUploadFileMutation } from "./useFileUpload";

const initialProgress = {
  progress: 0,
  estimated: 0,
};

interface OnSuccess {
  id: string;
  url: string;
  originalName: string;
  size: number;
}

interface UploadDragAndDropProps {
  onSuccess?: ({ id, url, originalName, size }: OnSuccess) => void;
  onRemove?: () => void;
  supportedFormats?: string[];
  initialURL?: string;
  className?: string;
  filePreviewClassName?: string;
}

export function FileUpload({
  onSuccess,
  onRemove,
  supportedFormats = [".pdf", ".docx", ".jpeg"],
  initialURL,
  className,
  filePreviewClassName,
}: UploadDragAndDropProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(initialProgress);
  const [abortController, setAbortController] = useState(
    () => new AbortController(),
  );

  const error = useFileStore(state => state.error);
  const fileURL = useFileStore(state => state.fileURL);
  const addFile = useFileStore(state => state.addFile);
  const addFileURL = useFileStore(state => state.addFileURL);
  const setError = useFileStore(state => state.setError);
  const resetStore = useFileStore(state => state.reset);

  const uploadFileHandler = useUploadFileMutation({
    signal: abortController.signal,
    onUpload: setUploadProgress,
    onSuccess: data => {
      addFileURL(data.url);
      onSuccess?.({
        id: data.id,
        url: data.url,
        originalName: data.name,
        size: Number(data.bytes),
      });
    },
    onError: err => {
      if (err.code === "ERR_CANCELED") return;

      setError({
        code: err.code,
        message: err.message,
      });
    },
    onSettled: () => setUploadProgress(initialProgress),
  });

  const isNetworkError = error?.code === "ECONNABORTED";
  const canUpload = !uploadFileHandler.isPending && !isNetworkError;

  const resetProgress = () => setUploadProgress(initialProgress);

  const onRetry = () => {
    setError(null);

    const { file } = useFileStore.getState();
    if (!file) return;

    uploadFileHandler.mutate(file);
  };

  const onReset = () => {
    if (uploadFileHandler.isPending) {
      abortController.abort();
      setAbortController(new AbortController());
    }

    resetProgress();
    resetStore();
    uploadFileHandler.reset();
    onRemove?.();
  };

  const onFileChange = (files: FileList | null) => {
    setError(null);
    if (!files?.length) return;
    const file = files[0];
    addFile(file);

    const isSupportedFormat = supportedFormats.some(format =>
      file.type.endsWith(format.replace(".", "")),
    );

    if (!isSupportedFormat) {
      setError({
        code: "ERR_UNSUPPORTED_FORMAT",
        message: "unsupported format",
      });
      return;
    }

    uploadFileHandler.mutate(file);
  };

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);

    if (!canUpload) return;

    onFileChange(e.dataTransfer.files);
  };

  useEffect(() => {
    if (initialURL && !fileURL) {
      addFileURL(initialURL);
    }

    return () => {
      onReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div
        className="flex min-h-[14.375rem] w-full flex-col gap-1.5"
        onDragOver={e => e.preventDefault()}
        onDrop={onFileDrop}
      >
        <div
          title={canUpload ? "Click to upload or drag and drop" : undefined}
          className={cn(
            "flex min-h-[14.375rem] flex-1 flex-col items-center gap-2 rounded-2xl  border-dashed border-2 border-gray-920 bg-white-100 pt-14",
            {
              "cursor-not-allowed opacity-60 grayscale": !canUpload,
              "border-primary": isDraggingFile && canUpload,
              "bg-[hsla(141,82%,90%,1)]": isDraggingFile && canUpload,
            },
          )}
          onDragEnter={e => {
            e.preventDefault();
            setIsDraggingFile(true);
          }}
          onDragExit={e => {
            e.preventDefault();
            setIsDraggingFile(false);
          }}
        >
          <p
            className={cn("text-sm font-normal text-[hsla(0,2%,41%,1)] ", {
              "select-none text-gray-70": !canUpload,
            })}
          >
            <Button
              variant="ghost"
              className={cn(
                "h-auto cursor-pointer rounded-lg  bg-transparent px-0 py-1.5 text-sm text-[#575757] hover:text-[#575757]",
                {
                  "text-gray-70": !canUpload,
                },
              )}
              onClick={() => inputRef.current?.click()}
              isDisabled={!canUpload}
            >
              <input
                ref={inputRef}
                type="file"
                hidden
                accept={supportedFormats.join(",")}
                onChange={e => onFileChange(e.target.files)}
              />
              Click to upload
            </Button>
            or drag and drop
          </p>
          <p className="text-[hsla(0,2%,41%,1)] font-normal text-sm font-satoshi ">
            {supportedFormats.map(el => el.replace(".", "")).join(", ")}
          </p>
        </div>
      </div>

      <UploadState
        uploadProgress={uploadProgress}
        isLoading={uploadFileHandler.isPending}
        onReset={onReset}
        onRetry={onRetry}
        onUpdate={() => inputRef.current?.click()}
        className={filePreviewClassName}
      />
    </div>
  );
}
