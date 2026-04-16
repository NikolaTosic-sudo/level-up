import { useCallback, useRef } from "react";
import { useGlobalStore } from "../store/useGlobalStore";

export function useSound(open: string, close: string) {
  const { muted } = useGlobalStore();
  const audioOpen = useRef(new Audio(open));
  const audioClose = useRef(new Audio(close));

  const playOpen = useCallback(() => {
    const a = audioOpen.current;
    a.currentTime = 0;
    a.volume = 0.2;
    a.muted = muted;
    a.play();
  }, [muted]);

  const playClose = useCallback(() => {
    const a = audioClose.current;
    a.currentTime = 0;
    a.volume = 0.2;
    a.muted = muted;
    a.play();
  }, [muted]);

  return [playOpen, playClose];
}
