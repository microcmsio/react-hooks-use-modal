import { createFocusTrap, Options as FocusTrapOptions } from 'focus-trap';
import { RefObject, useEffect } from 'react';

export const useFocusTrap = <T extends HTMLElement>(
  ref: RefObject<T>,
  isOpen: boolean,
  focusTrapOptions: FocusTrapOptions
): void => {
  useEffect(() => {
    if (!isOpen || ref.current === null) {
      return;
    }

    const focusTrap = createFocusTrap(ref.current, {
      fallbackFocus: ref.current,
      ...focusTrapOptions,
    });
    focusTrap.activate();

    // It looks like we need to wait a bit until document.activeElement is updated.
    setTimeout(() => {
      if (document.activeElement === ref.current) {
        console.warn(`[react-hooks-use-modal]: Since there were no focusable elements in the modal, the initial focus was on the containing element.
  WAI-ARIA 1.1 states that there should be at least one focusable element in the modal.
  https://www.w3.org/TR/wai-aria-1.1/#dialog`);
      }
    }, 100);

    return () => {
      focusTrap.deactivate();
    };
  }, [focusTrapOptions, isOpen, ref]);
};
