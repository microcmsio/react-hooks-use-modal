import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import { RefObject, useEffect, useRef } from 'react';

export const useBodyScrollLock = <T extends HTMLElement>(
  isOpen: boolean,
  preventScroll: boolean
): [ref: RefObject<T>] => {
  const ref = useRef<T>(null);

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
  }, [isOpen, preventScroll]);

  return [ref];
};
