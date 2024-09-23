import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useFormatNumber } from "../../hooks/useFormatNumber";
import { useFormatSize } from "../../utils/helpers";
import { UploadFileError, useFileStore } from "./useFileStore";

interface UploadStateProps {
  uploadProgress: {
    progress: number;
    estimated: number;
  };
  isLoading: boolean;
  onUpdate: () => void;
  onReset: () => void;
  onRetry: () => void;
  className?: string;
}

interface ProgressProps {
  progress: number;
  className?: string;
}
function Progress({ progress, className }: ProgressProps) {
  return (
    <div
      role="progressbar"
      style={{ "--progress": progress } as React.CSSProperties}
      className={cn(
        "relative h-2 overflow-hidden rounded-full bg-[hsla(206,21%,94%,1)]",
        "text-brown-200 after:absolute after:inset-0 after:origin-left after:translate-x-[calc((1-var(--progress))*-100%)] after:rounded-[inherit] after:bg-current after:transition-transform after:duration-500 after:ease-out after:rtl:origin-right after:rtl:translate-x-[calc((1-var(--progress))*100%)]",
        className,
      )}
    />
  );
}

function LoadingState({
  className,
  uploadProgress,
  onReset,
}: Pick<UploadStateProps, "uploadProgress" | "onReset" | "className">) {
  const formatNumber = useFormatNumber();

  return (
    <div
      className={cn(
        "flex min-h-[5.25rem] w-full flex-col gap-2 rounded-2xl border-2 !border-[hsla(212,33%,95%,1)] p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5 text-xs font-normal text-gray-600">
          <p className="font-semibold text-[#575757]">Uploading</p>

          <p className="capitalize">
            {formatNumber((uploadProgress.progress ?? 0) / 100, {
              style: "percent",
            })}{" "}
            • {formatNumber(uploadProgress.estimated)} Seconds Remaining
          </p>
        </div>

        <Icons.Close
          className="h-6 w-6 cursor-pointer rounded-full  p-1 text-red-100 bg-red-300"
          onClick={onReset}
        />
      </div>

      <Progress progress={uploadProgress.progress} />
    </div>
  );
}

interface SuccessStateProps
  extends Pick<UploadStateProps, "onReset" | "className"> {
  file: File;
}

export function SuccessState({ file, onReset, className }: SuccessStateProps) {
  const formatSize = useFormatSize();

  return (
    <div
      className={cn(
        "flex min-h-[4.25rem] items-center gap-2.5 rounded-2xl border-2 !border-[hsla(212,33%,95%,1)] p-4 py-2",
        className,
      )}
    >
      <Icons.File />

      <div
        className="flex flex-col gap-1 text-xs font-normal text-gray-600"
        title={file.name}
      >
        <p className="line-clamp-1 font-semibold text-[#575757]">{file.name}</p>

        <p>{formatSize(file.size)}</p>
      </div>

      <Icons.Close
        className="ms-auto h-6 w-6 cursor-pointer rounded-full bg-background p-1 text-[hsla(223,26%,36%,1)] hover:bg-gray-70"
        onClick={onReset}
      />
    </div>
  );
}

interface ErrorStateProps
  extends Pick<UploadStateProps, "onReset" | "className"> {
  file: File;
  error: UploadFileError;
}

function ErrorState({ onReset, className, file, error }: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[3.375rem] w-full gap-1.5 rounded-2xl bg-red-300 px-4 py-2.5",
        className,
      )}
    >
      {/* <Icons.WarningC className="h-6 w-6 self-start" /> */}

      <div
        className="flex flex-1 flex-col gap-1 text-xs font-normal text-gray-600"
        title={error.message}
      >
        <p className="text-sm text-red-100">Upload failed</p>

        <p className="line-clamp-1">
          {file.name} • {error.message}
        </p>
      </div>

      <Icons.Close
        className="ms-auto h-6 w-6 cursor-pointer self-center rounded-full bg-[hsla(0,0%,100%,0.35)] p-1 text-[hsla(223,26%,36%,1)] hover:bg-red-300"
        onClick={onReset}
      />
    </div>
  );
}

export function UploadState({
  uploadProgress,
  isLoading,
  onRetry,
  onUpdate,
  ...props
}: UploadStateProps) {
  const error = useFileStore(state => state.error);
  const file = useFileStore(state => state.file);
  const fileURL = useFileStore(state => state.fileURL);

  // if (!file && fileURL)
  //   return <UpdateState fileURL={fileURL} onUpdate={onUpdate} {...props} />;

  if (!file) return null;

  // const isNetworkError = error?.code === "ECONNABORTED";
  // if (isNetworkError) {
  //   return (
  //     <NetworkErrorState
  //       progress={uploadProgress.progress}
  //       onRetry={onRetry}
  //       {...props}
  //     />
  //   );
  // }

  if (error) return <ErrorState error={error} file={file} {...props} />;

  if (isLoading)
    return <LoadingState uploadProgress={uploadProgress} {...props} />;

  if (!fileURL || !file) return null;

  return <SuccessState file={file} {...props} />;
}
