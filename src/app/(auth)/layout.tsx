import { PropsWithChildren } from "react";

// interface AuthLayoutProps {
//   params?: { [key: string]: string | string[] | undefined };
// }
export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen max-w-md mx-auto">
      <nav className=" p-4 pb-6  md:p-6  text-center">Logo</nav>

      <main>{children}</main>
    </div>
  );
}
