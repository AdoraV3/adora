import Image from "next/image";
import { PropsWithChildren } from "react";

// interface AuthLayoutProps {
//   params?: { [key: string]: string | string[] | undefined };
// }
export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto flex sm:max-w-[25rem] flex-1 flex-col gap-5">
      <Image
        src="/images/adora.png"
        className="mx-auto mt-4 h-auto w-14"
        width={200}
        height={50}
        alt="logo.png"
      />

      {children}
    </div>
  );
}
