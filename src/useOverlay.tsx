import { useEffect } from "react";

export function useOverlay(
  rootElementId: string,
  isOpen: boolean,
): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.getElementById(rootElementId)?.setAttribute("aria-hidden", "true");

    return () => {
      document.getElementById(rootElementId)?.removeAttribute("aria-hidden");
    };
  }, [isOpen, rootElementId]);
}