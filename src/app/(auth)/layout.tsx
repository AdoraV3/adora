import Image from "next/image";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto min-h-[100dvh] gap-5 sm:max-w-[25rem] flex flex-col flex-1">
      <Image
        src="/images/adora.png"
        className="mx-auto mt-auto h-auto w-14"
        width={200}
        height={50}
        alt="logo.png"
      />

      {children}
    </main>
  );
}
