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
      className={cn(" md:border-dashed relative pb-6 md:border-l md:border-black-100", {
        "md:border-primary": isActive,
      })}
    >
      <div
        className={cn("hidden md:block h-8 -left-[1.9px] absolute w-1 bg-[#575757]", {
          "bg-[#975221]": isActive,
        })}
      />
      <h6
        className={cn(
          "text-black-100  md:px-6 border-black-100 font-bold font-satoshi text-2xl",
          {
            "md:text-primary": isActive,
          },
        )}
      >
        {title}{" "}
      </h6>

      <p className="font-normal  md:px-6 font-satoshi text-base text-black-100">
        {subTitle}{" "}
      </p>
    </div>
  );
}
