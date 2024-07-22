import BlurIn from "@/components/animations/blur-in";
import { HTMLAttributes } from "react";

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subTitle: string;
}

export function PageHeader({ title, subTitle, className }: PageHeaderProps) {
  return (
    <div className={className}>
      <BlurIn
        word={title}
        className="font-normal mb-2 font-coreC  text-black-100 text-5xl "
      />

      <p className="font-normal text-gray-2 font-satoshi text-lg">
        {subTitle}{" "}
      </p>
    </div>
  );
}
