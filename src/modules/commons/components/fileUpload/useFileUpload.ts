import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { env } from "env.mjs";
import { FileUploadResponse } from "./types";

interface UploadFileMutationProps
  extends UseMutationOptions<
    FileUploadResponse,
    AxiosError<{ error: { message: string } }>,
    File
  > {
  signal?: AbortSignal;
  onUpload?: (options: { progress: number; estimated: number }) => void;
}

export const useUploadFileMutation = ({
  onUpload,
  ...options
}: UploadFileMutationProps = {}) => {
  return useMutation({
    ...options,
    mutationFn: file => {
      const formData = new FormData();
      formData.append("file", file);
      return axios
        .post<FileUploadResponse>("https://api.vapi.ai/file", formData, {
          onUploadProgress: ({ progress, estimated }) => {
            onUpload?.({
              progress: +(progress?.toFixed(2) ?? 0),
              estimated: Math.ceil(estimated ?? 0),
            });
          },
          signal: options?.signal,
          timeout: 60 * 1000,
          headers: {
            // Accept: "application/json",
            Authorization: `Bearer ${env.NEXT_PUBLIC_VAPI_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => res.data);
    },
    retry: false,
  });
};
