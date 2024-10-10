"use client";

import { getAgentDetailsAction } from "@/app/actions/agent";
import { getCallAction } from "@/app/actions/call-log";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { formatDate } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formatConversation } from "../utils/helper";

export function Details() {
  const { id } = useParams();
  const { data: callData } = useServerActionQuery(getCallAction, {
    input: {
      callId: id as string,
    },
    queryKey: ["getCallLog"],
    enabled: !!id,
  });

  const { data: agentDetails } = useServerActionQuery(getAgentDetailsAction, {
    input: {
      agentId: callData?.data.assistantId,
    },
    queryKey: ["getAgentDetails", callData?.data.assistantId as string],
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
          >
            Export{" "}
          </Button>
          <Button
            className="text-white-100 px-6"
            size="sm"
            icon={<Icons.Printer />}
          >
            Printer
          </Button>
        </div>
      </div>

      <p className="mt-10 px-4  prose whitespace-pre-line font-satoshi font-normal text-sm">
        {formatConversation(callData?.data?.transcript)}
      </p>
    </div>
  );
}
