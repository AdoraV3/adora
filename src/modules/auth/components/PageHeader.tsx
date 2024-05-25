import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}
export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn(className)}>
      <h6 className="font-coreC text-center font-semibold text-black-100 text-2xl md:text-4xl">
        {title}{" "}
      </h6>
      <p className="font-satoshi text-center font-normal text-sm text-gray-300">
        {subtitle}{" "}
      </p>
    </div>
  );
}
