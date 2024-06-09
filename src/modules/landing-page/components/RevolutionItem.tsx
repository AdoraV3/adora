import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface RevolutionItemProps {
  image: string;
  variant?: "flip" | "default";
  title: string;
  description: string;
}
export function RevolutionItem({
  title,
  description,
  image,
  variant,
}: RevolutionItemProps) {
  return (
    <Card className="pb-0">
      <CardContent className="grid grid-cols-2  gap-6 items-center">
        <AspectRatio
          className={cn(" relative ", variant === "flip" && "order-last")}
        >
          <Image
            src={image}
            width={478}
            height={468}
            className="object-cover rounded-lg w-full h-full "
            alt={title}
          />
        </AspectRatio>
        <div>
          <h6 className="text-3xl mb-2 font-coreC font-normal text-black-100">
            {title}{" "}
          </h6>
          <p className="text-gray-2 font-normal font-satoshi text-lg">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
