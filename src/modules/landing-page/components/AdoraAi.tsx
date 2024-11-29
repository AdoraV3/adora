"use client";

import { Button } from "@/components/ui/button";
import { useVapiCall } from "../hooks/useVapiWebCall";

export function AdoraAi() {
  const { isCallActive, isReady, toggleCall } = useVapiCall();
  return (
    <Button isLoading={!isReady} disabled={!isReady} onClick={toggleCall}>
      {isCallActive ? "End Call" : "Start Call"}
    </Button>
  );
}
