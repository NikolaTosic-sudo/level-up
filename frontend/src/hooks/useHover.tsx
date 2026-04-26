import { useState } from "react";

export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const bind = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return { isHovered, bind };
}
