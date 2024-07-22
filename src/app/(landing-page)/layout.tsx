import { Footer } from "@/modules/landing-page/components/Footer";
import { Navbar } from "@/modules/landing-page/components/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
