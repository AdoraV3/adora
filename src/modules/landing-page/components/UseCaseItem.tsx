import { BoxReveal } from "@/components/animations/box-reveal";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";

interface UseCaseItemProps {
  image: string;
  title: string;
  description: string;
}
export function UseCaseItem({ title, image, description }: UseCaseItemProps) {
  return (
    <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] h-full">
      <BoxReveal delay={0.01} duration={0.01} boxColor="hsla(25, 64%, 24%, 1)">
        <div className="cursor-pointer w-[80vw] md:w-[55vw] lg:w-[40vw] rounded-[10px] h-full bg-[#F5F3F3] hover:bg-[hsla(25,64%,36%,0.12)]">
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
              <h6 className="text-black-300 py-3 font-satoshi text-3xl font-bold">
                {title}{" "}
              </h6>
              <p className="font-satoshi text-base font-normal  text-gray-2">
                {description}{" "}
              </p>
            </div>
          </CardContent>
        </div>
      </BoxReveal>
    </div>
  );
}
