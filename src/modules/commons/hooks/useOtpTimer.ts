"use client";

import { useCallback, useEffect, useState } from "react";

interface OtpTimerHook {
  timer: string;
  resetTimer: () => void;
  isOtpValid: boolean;
}

export function useOtpTimer(): OtpTimerHook {
  const timerDefault = 120; // in seconds;
  const [timer, setTimer] = useState(timerDefault);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer: number) => Math.max(currTimer - 1, 0)),
    [],
  );

  useEffect(() => {
    if (timer > 0) setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = () => {
    if (!timer) {
      setTimer(timerDefault);
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return {
    timer: formatTime(timer)?.toString(),
    resetTimer,
    isOtpValid: timer > 0,
  };
}
