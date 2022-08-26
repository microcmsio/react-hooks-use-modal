import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import { RefObject, useEffect } from 'react';

export const useBodyScrollLock = <T extends HTMLElement>(
  ref: RefObject<T>,
  isOpen: boolean,
  preventScroll: boolean
): void => {
  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    if (preventScroll) {
      if (isOpen) {
        disableBodyScroll(ref.current, {
          reserveScrollBarGap: true,
        });
      } else {
        enableBodyScroll(ref.current);
      }

      return () => {
        clearAllBodyScrollLocks();
      };
    }
  }, [isOpen, preventScroll, ref]);
};
