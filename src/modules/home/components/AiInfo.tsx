import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function AiInfo() {
  return (
    <Card className="shadow-350 mt-10 h-[14.7rem] relative rounded-md bg-white-100">
      <CardContent className="flex justify-between ">
        <div className="p-4">
          <h5 className="font-medium text-2xl font-satoshi text-[#575757]">
            AI Assistant
          </h5>
          <div className="flex mt-3 items-center gap-2">
            <p className="font-satoshi font-normal text-xs text-[hsla(0,0%,47%,1)] ">
              Voice:
            </p>
            <Badge className="bg-[hsla(28,62%,96%,1)] font-medium text-sm font-satoshi text-[#575757] ">
              Female
            </Badge>
          </div>
          <Button size="sm" className="mt-20">
            View Languages{" "}
          </Button>
        </div>

        <Image
          className="absolute right-0 -top-12"
          src="/images/ai.png"
          alt="ai"
          width={319.41}
          height={311}
        />
      </CardContent>
    </Card>
  );
}
