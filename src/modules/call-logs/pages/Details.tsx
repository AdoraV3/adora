"use client";

import { getAgentDetailsAction } from "@/app/actions/agent";
import { getCallAction } from "@/app/actions/call-log";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { QueryKeyFactory } from "@/lib/queryKeyFactory";
import { exportToCSV } from "@/modules/commons/utils/exportToCsv";
import { formatPhoneNumber } from "@/modules/commons/utils/helpers";
import { formatDate } from "date-fns";
import { format } from "date-fns/format";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formatConversation } from "../utils/helper";

export function Details() {
  const { id } = useParams();

  const { data: callData, isPending } = useServerActionQuery(getCallAction, {
    input: {
      callId: id as string,
    },
    queryKey: QueryKeyFactory.getCallLog(id as string),
    enabled: !!id,
  });

  const { data: agentDetails } = useServerActionQuery(getAgentDetailsAction, {
    input: {
      agentId: callData?.data.assistantId,
    },
    queryKey: QueryKeyFactory.getAgentDetails(callData?.data.assistantId),
    enabled: !!callData?.data.assistantId,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0; // Reset to beginning when finished
    };

    audio.addEventListener("ended", handleEnded);
    // eslint-disable-next-line consistent-return
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const exportConversation = () => {
    const columns = ["id", "timestamp", "speaker", "message"];

    const messageData = callData?.data?.messages?.map(message => [
      crypto.randomUUID(),
      formatDate(message.time, "dd MMM, yyyy h:mm a"),
      message.role,
      message.message,
    ]);

    if (!messageData) return;
    exportToCSV({
      columns,
      data: messageData,
      name: `conversation-${format(new Date(), "dd-MM-yyyy")}`,
    });
  };

  if (isPending) return <div>Loading...</div>;
  return (
    <div className="pt-10">
      <div className="flex  justify-between items-start">
        <div>
          <h2 className="font-bold capitalize text-lg font-satoshi text-[hsla(214,24%,20%,1)] ">
            {agentDetails?.data?.name}
          </h2>
          <div className="divide-x my-5 font-normal text-[hsla(0,0%,11%,0.6)] text-sm font-satoshi flex divide-gray-700">
            {callData?.data.createdAt && (
              <p className="px-4">
                {formatDate(callData?.data.createdAt, "h:mm a")}{" "}
              </p>
            )}
            {callData?.data.createdAt && (
              <p className="px-4">
                {formatDate(callData?.data.createdAt, "dd MMM, yyyy")}{" "}
              </p>
            )}
            {callData?.data?.customer?.number && (
              <p className="px-4">
                Customer Phone Number :{" "}
                <span className="font-bold">
                  {formatPhoneNumber(
                    callData?.data?.customer?.number as string,
                  )}{" "}
                </span>{" "}
              </p>
            )}
          </div>

          <Button
            onClick={togglePlayPause}
            icon={<Icons.Mic />}
            className="flex gap-2 text-primary bg-[hsla(25,100%,99%,1)] items-center"
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>

          <audio ref={audioRef} src={callData?.data?.stereoRecordingUrl}>
            <track kind="captions" src="" />
          </audio>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            className="!border px-6 text-primary bg-[hsla(30,100%,99%,1)] border-[hsla(218,39%,90%,1)] "
            icon={<Icons.Share />}
            size="sm"
            onClick={exportConversation}
          >
            Export{" "}
          </Button>
        </div>
      </div>

      <p className="mt-10 px-4  prose whitespace-pre-line font-satoshi font-normal text-sm">
        {formatConversation(callData?.data?.transcript)}
      </p>
    </div>
  );
}
