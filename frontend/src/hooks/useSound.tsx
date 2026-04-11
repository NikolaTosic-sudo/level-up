import { useCallback, useRef } from "react";

export function useSound(open: string, close: string) {
  const audioOpen = useRef(new Audio(open));
  const audioClose = useRef(new Audio(close));

  const playOpen = useCallback(() => {
    const a = audioOpen.current;
    a.currentTime = 0;
    a.play();
  }, []);

  const playClose = useCallback(() => {
    const a = audioClose.current;
    a.currentTime = 0;
    a.play();
  }, []);

  return [playOpen, playClose];
}
