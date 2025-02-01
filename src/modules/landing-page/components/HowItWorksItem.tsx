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
    <div className={cn("relative pb-6 ")}>
      {/* <div
        className={cn(
          "hidden md:block h-8 -left-[1.9px] absolute w-1 bg-[#575757]",
          {
            "bg-[#975221]": isActive,
          },
        )}
      /> */}
      <h6
        className={cn(
          "border-black-100 font-satoshi text-2xl font-bold text-black-100",
          {
            "md:text-primary": isActive,
          },
        )}
      >
        {title}{" "}
      </h6>

      <p className="font-satoshi text-base font-normal text-black-100">
        {subTitle}{" "}
      </p>
    </div>
  );
}
