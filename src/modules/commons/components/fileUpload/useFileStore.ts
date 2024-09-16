import { create } from "zustand";

export interface UploadFileError {
  code?: string;
  message?: string;
}

type State =
  | {
      file: null;
      fileURL: null;
      error: null;
    }
  | {
      file: File;
      fileURL: null;
      error: UploadFileError | null;
    }
  | {
      file: File;
      fileURL: string;
      error: null;
    };

interface Action {
  addFile: (file: File) => void;
  removeFile: () => void;
  addFileURL: (url: string) => void;
  removeFileURL: () => void;
  setError: (error: UploadFileError | null) => void;
  reset: () => void;
}

type UploadFileStore = State & Action;

const initialState: State = {
  file: null,
  fileURL: null,
  error: null,
};

export const useFileStore = create<UploadFileStore>(set => ({
  ...initialState,
  addFile: file => set(() => ({ file })),
  removeFile: () => set(() => ({ file: null })),
  addFileURL: url => set(() => ({ fileURL: url })),
  removeFileURL: () => set(() => ({ fileURL: null })),
  setError: error => set(() => ({ error })),
  reset: () => set(initialState),
}));
