import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface OverviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: ReactNode;
  icon: keyof typeof Icons;
  iconBackground: string;
  impression?: ReactNode;
}

export function OverviewCard({
  className,
  title,
  icon,
  iconBackground,
  value,
  impression,
}: OverviewCardProps) {
  const Icon = Icons[icon];
  return (
    <Card className="py-4 rounded-none">
      <CardContent className={cn(className)}>
        <div
          className={cn(
            iconBackground,
            "w-12 h-12 flex justify-center items-center rounded-full",
          )}
        >
          <Icon className="text-white-100 size-6" />
        </div>

        <p className="font-satoshi font-normal text-sm text-gray-600 my-3">
          {title}{" "}
        </p>

        <div className="font-satoshi font-medium text-2xl text-[#575757]">
          {value}
        </div>

        {impression && <div>{impression}</div>}
      </CardContent>
    </Card>
  );
}
