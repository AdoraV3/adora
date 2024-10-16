import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function AiInfo() {
  return (
    <Card className="relative mt-10 rounded-md bg-white-100 shadow-350 md:h-[14.7rem]">
      <CardContent className="flex flex-col justify-between md:flex-row ">
        <div className="p-4">
          <h5 className="font-satoshi text-2xl font-medium text-[#575757]">
            AI Assistant
          </h5>
          <div className="mt-3 flex items-center gap-2">
            <p className="font-satoshi text-xs font-normal text-[hsla(0,0%,47%,1)] ">
              Voice:
            </p>
            <Badge className="bg-[hsla(28,62%,96%,1)] font-satoshi text-sm font-medium text-[#575757] ">
              Female
            </Badge>
          </div>
          <Button size="sm" className="mt-14 whitespace-nowrap">
            View Languages{" "}
          </Button>
        </div>
        <div className="w-full">
          <Image
            src="/images/ai.png"
            alt="ai"
            width={200}
            height={200}
            className="h-[50%] w-[50%] md:absolute md:-top-12 md:right-0 md:h-full md:w-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
}
