import { RefObject, useEffect, useRef } from 'react';

export const useKeyDown = <T extends HTMLElement>(
  isOpen: boolean,
  close: () => void,
): [RefObject<T>] => {
  const dialogRef = useRef<T>(null);
  const lastFocusedRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return
    }
    lastFocusedRef.current = document.activeElement;
    dialogRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();

        if (dialogRef.current === null) {
          return;
        }

        // https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute
        const focusableDialogElements: HTMLElement[] = Array.from(
          dialogRef.current.querySelectorAll(
            'button, a[href], input:not([type="hidden"]), select, details > summary:first-child, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable]'
          )
        );
        const focusables = focusableDialogElements.concat(dialogRef.current)

        const currentIndex = focusables.findIndex(
          (element) => element === document.activeElement
        );

        if (currentIndex === -1) {
          focusables[0].focus();
          return;
        }

        const nextIndex = currentIndex + (event.shiftKey ? -1 : 1);

        if (nextIndex === -1) {
          focusables[focusables.length - 1].focus();
          return;
        }

        if (nextIndex === focusables.length) {
          focusables[0].focus();
          return;
        }

        focusables[nextIndex].focus();
        return;
      }
    };

    document.body.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.removeEventListener('keydown', handleKeydown);
      lastFocusedRef.current instanceof HTMLElement && lastFocusedRef.current?.focus();
    };
  }, [isOpen, close]);

  return [dialogRef];
}
