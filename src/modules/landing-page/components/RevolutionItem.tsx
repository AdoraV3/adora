import BlurImage from "@/components/animations/blur-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RevolutionItemProps {
  image: string;
  variant?: "reverse" | "default";
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
    <Card className="pb-0 ">
      <CardContent className="grid px-0 md:grid-cols-2  gap-10 items-center">
        <AspectRatio>
          <BlurImage
            src={image}
            width={478}
            height={468}
            className="object-cover rounded-lg w-full h-full "
            alt={title}
          />
        </AspectRatio>
        <div
          className={cn(variant === "reverse" ? "order-first" : "order-last")}
        >
          <h6 className="text-3xl mb-2 font-coreC font-normal text-[#575757]">
            {title}{" "}
          </h6>
          <p className="text-gray-2 tracking-tight font-normal font-satoshi text-lg">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
