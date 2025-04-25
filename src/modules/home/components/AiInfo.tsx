import { getAgentWithVoiceAction } from "@/app/actions/agent";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { QueryKeyFactory } from "@/lib/queryKeyFactory";
import { formatPhoneNumber } from "@/modules/auth/helpers";
import Image from "next/image";

export function AiInfo() {
  const { data, isPending } = useServerActionQuery(getAgentWithVoiceAction, {
    input: undefined,
    queryKey: QueryKeyFactory.getAgent(),
  });

  const agentDetails = data?.data;
  if (isPending) return <div>Loading...</div>;

  return (
    <Card className="relative mt-10 rounded-md bg-white-100 shadow-350 md:h-[14.7rem]">
      <CardContent className="flex flex-col justify-between md:flex-row ">
        <div className="p-4 space-y-3">
          <h5 className="font-satoshi text-2xl font-medium text-black-100">
            {agentDetails?.name}
          </h5>
          <div className=" flex items-center gap-2">
            <p className="font-satoshi text-xs font-normal text-[hsla(0,0%,47%,1)] ">
              Voice:
            </p>
            <Badge className="bg-[hsla(28,62%,96%,1)] font-satoshi text-sm font-medium text-black-100 ">
              {agentDetails?.voice?.gender}
            </Badge>
          </div>
          <div className=" w-max p-4 rounded-[10px] text-white-100 bg-primary whitespace-nowrap">
            Agent Number :{" "}
            {formatPhoneNumber(agentDetails?.phoneNumber?.phoneNumber)}
          </div>
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
