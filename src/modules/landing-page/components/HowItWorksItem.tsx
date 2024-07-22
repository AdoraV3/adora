import { cn } from "@/lib/utils";

interface HowItWorksItemProps {
  title: string;
  subTitle: string;
  isActive?: boolean;
}

export function HowItWorksItem({
  title,
  subTitle,
  isActive,
}: HowItWorksItemProps) {
  return (
    <div
      className={cn(" border-dashed relative pb-6 border-l border-black-100", {
        "border-primary": isActive,
      })}
    >
      <h6
        className={cn(
          "text-black-100 px-6  border-black-100 border-l-2  font-bold font-satoshi text-2xl",
          {
            "text-primary border-primary ": isActive,
          },
        )}
      >
        {title}{" "}
      </h6>

      <p className="font-normal px-6 font-satoshi text-base text-black-100">
        {subTitle}{" "}
      </p>
    </div>
  );
}
