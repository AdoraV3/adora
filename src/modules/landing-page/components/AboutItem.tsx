import BlurImage from "@/components/animations/blur-image";
import BlurIn from "@/components/animations/blur-in";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AboutItemProps {
  image: string;
  variant?: "reverse" | "default";
  title: string;
  description: string;
}
export function AboutItem({
  title,
  description,
  image,
  variant,
}: AboutItemProps) {
  return (
    <Card className="pb-0 ">
      <CardContent className="flex flex-col gap-y-2 md:grid px-0 grid-cols-2 gap-10 items-center">
        <AspectRatio ratio={16 / 9}>
          <BlurImage
            src={image}
            width={668}
            height={430}
            className="object-contain rounded-lg w-full h-full "
            alt={title}
          />
        </AspectRatio>
        <div
          className={cn(variant === "reverse" ? "order-first" : "order-last")}
        >
          <BlurIn
            word={title}
            className="text-3xl mb-2 font-coreC font-normal text-black-100"
          />

          <BlurIn
            word={description}
            className="text-gray-2 font-normal font-satoshi text-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
