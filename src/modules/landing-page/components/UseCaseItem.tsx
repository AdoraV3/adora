import { BoxReveal } from "@/components/animations/box-reveal";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface UseCaseItemProps {
  image: string;
  title: string;
  description: string;
}
export function UseCaseItem({ title, image, description }: UseCaseItemProps) {
  return (
    <BoxReveal delay={0.01} duration={0.01} boxColor="hsla(25, 64%, 24%, 1)">
      <Card className="rounded-[10px] cursor-pointer  hover:bg-[hsla(25,64%,36%,0.12)] bg-[hsla(0,0%,98%,0.8)] ">
        <CardContent className="p-4">
          <div className="w-full">
            <Image
              width={543}
              height={342}
              className="object-cover"
              src={image}
              alt={title}
            />
          </div>

          <div>
            <h6 className="py-3 font-bold text-3xl font-satoshi text-black-300">
              {title}{" "}
            </h6>
            <p className="font-normal text-base font-satoshi  text-gray-2">
              {description}{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </BoxReveal>
  );
}
