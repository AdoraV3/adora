"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface OtpTimerHook {
  timer: string;
  resetTimer: () => void;
  isOtpValid: boolean;
}

interface OtpTimerProps {
  startTimer?: boolean;
  timerInSeconds?: number;
}

export function useOtpTimer({
  startTimer = true,
  timerInSeconds,
}: OtpTimerProps = {}): OtpTimerHook {
  const timerDefault = timerInSeconds ?? 120; // in seconds
  const [timer, setTimer] = useState(timerDefault);

  // Callback to decrease the timer
  const timeOutCallback = useCallback(() => {
    setTimer(currTimer => Math.max(currTimer - 1, 0));
  }, []);

  useEffect(() => {
    if (!startTimer) {
      setTimer(timerDefault);
    }
    // Set up an interval to decrease the timer every second
    const intervalId = setInterval(timeOutCallback, 1000);

    // Cleanup function to clear the interval when the component unmounts or timer reaches 0
    return () => clearInterval(intervalId);
  }, [timer, startTimer, timeOutCallback, timerDefault]);

  // Reset the timer when it hits zero
  const resetTimer = useCallback(() => {
    if (timer === 0) {
      setTimer(timerDefault);
    }
  }, [timer, timerDefault]);

  const formattedTimer = useMemo(() => {
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }, [timer]);

  return {
    timer: formattedTimer,
    resetTimer,
    isOtpValid: timer > 0,
  };
}
