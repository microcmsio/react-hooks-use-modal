import { useEffect } from "react";

export function useOverlay(
  rootElementId: string,
  isOpen: boolean,
  close: () => void
): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
    }

    document.getElementById(rootElementId)?.setAttribute("aria-hidden", "true");
    document.body.addEventListener("keydown", handleKeydown);

    return () => {
      document.getElementById(rootElementId)?.removeAttribute("aria-hidden");
      document.body.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, close, rootElementId]);
}