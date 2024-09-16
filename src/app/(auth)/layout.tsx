import { PropsWithChildren } from "react";

// interface AuthLayoutProps {
//   params?: { [key: string]: string | string[] | undefined };
// }
export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-20 flex-1 max-w-[25rem]  m-auto">
      <nav className=" p-4 pb-6  md:p-6  text-center">Logo</nav>

      {children}
    </div>
  );
}
