"use client";

import { useRef, type PropsWithChildren } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
};

export function FileUpload(props: PropsWithChildren<FileUploadProps>) {
  const { register, accept, children } = props;
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => inputRef.current?.click();
  return (
    <div className="w-full border-dashed-4  border-[hsla(216,12%,84%,1)]  bg-[hsla(210,20%,98%,1)]">
      <input
        type="file"
        hidden
        accept={accept}
        {...rest}
        ref={e => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <button type="button" className="w-full" onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}
