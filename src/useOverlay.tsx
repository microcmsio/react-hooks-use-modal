import { RefObject, useEffect } from 'react';

export function useOverlay(
  isOpen: boolean,
  close: () => void,
  ref: RefObject<HTMLDivElement>
): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();

        if (ref.current === null) {
          return;
        }

        // https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute
        const focusableDialogElements: HTMLElement[] = Array.from(
          ref.current.querySelectorAll(
            'button, a[href], input:not([type="hidden"]), select, details > summary:first-child, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable]'
          )
        );
        const focusables = focusableDialogElements.concat(ref.current)

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
    };
  }, [isOpen, close, ref]);
}
