import Vapi from "@vapi-ai/web";
import { env } from "env.mjs";
import { useEffect, useState } from "react";

const ASSISTANT_ID = env.NEXT_PUBLIC_ADORA_AI;

export function useVapiCall() {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    try {
      const vapiInstance = new Vapi(env.NEXT_PUBLIC_VAPI_CLIENT_SDK);

      vapiInstance.on("call-start", () => setIsCallActive(true));
      vapiInstance.on("call-end", () => setIsCallActive(false));

      setVapi(vapiInstance);
      setIsReady(true);
    } catch (error) {
      console.error("Failed to initialize Vapi:", error);
    }

    return () => {
      if (vapi) {
        vapi.stop();
      }
      return undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCall = async () => {
    if (!vapi) return;

    try {
      if (isCallActive) {
        vapi.stop();
      } else {
        await vapi.start(ASSISTANT_ID);
      }
    } catch (error) {
      console.error("Failed to toggle call:", error);
      setIsCallActive(false);
    }
  };

  return {
    isCallActive,
    toggleCall,
    isReady,
  };
}
