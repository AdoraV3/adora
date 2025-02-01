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
    <Card className="basis-[39rem] min-w-full md:min-w-[37rem] flex-1">
      <div className="cursor-pointer flex-1 rounded-[10px] h-full bg-[#F5F3F3] hover:bg-[hsla(25,64%,36%,0.12)]">
        <BoxReveal delay={0.01} duration={0.01} boxColor="hsla(25,64%,24%,1)">
          <CardContent className="p-4">
            <Image
              width={543}
              height={342}
              className="object-cover w-full h-full"
              src={image}
              alt={title}
            />

            <>
              <h6 className="text-black-300 py-3 font-satoshi text-3xl font-bold">
                {title}{" "}
              </h6>
              <p className="font-satoshi text-base font-normal  text-gray-2">
                {description}{" "}
              </p>
            </>
          </CardContent>
        </BoxReveal>
      </div>
    </Card>
  );
}
