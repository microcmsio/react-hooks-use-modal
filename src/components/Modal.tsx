import { Options as FocusTrapOptions } from 'focus-trap';
import FocusTrap from 'focus-trap-react';
import React, { useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps, OverlayProps, WrapperProps } from '..';

import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface ModalWrapperProps<T extends Record<string, unknown>> {
  children: React.ReactNode;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  elementId: 'root' | string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  preventScroll: boolean;
  focusTrapOptions: FocusTrapOptions;
  components: {
    Wrapper: React.ComponentType<WrapperProps>;
    Overlay: React.ComponentType<OverlayProps>;
    Modal: React.ComponentType<ModalProps<T>>;
  };
  additionalProps?: T;
}

export const ModalWrapper = <T extends Record<string, unknown>>({
  children,
  isOpen,
  open,
  close,
  elementId = 'root',
  title,
  description,
  preventScroll,
  focusTrapOptions,
  components,
  additionalProps,
}: ModalWrapperProps<T>): React.ReactElement | null => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const _focusTrapOptions: FocusTrapOptions = useMemo(
    () => ({
      ...focusTrapOptions,
      onActivate: () => {
        open();
        focusTrapOptions.onActivate?.();
      },
      onDeactivate: () => {
        close();
        focusTrapOptions.onDeactivate?.();
      },
      clickOutsideDeactivates: focusTrapOptions.clickOutsideDeactivates ?? true,
      fallbackFocus:
        focusTrapOptions.fallbackFocus ?? dialogRef.current ?? undefined,
    }),
    [close, focusTrapOptions, open]
  );

  useBodyScrollLock(dialogRef, isOpen, preventScroll);

  if (isOpen === false) {
    return null;
  }

  return createPortal(
    <components.Wrapper>
      <components.Overlay />
      <FocusTrap focusTrapOptions={_focusTrapOptions}>
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={{ position: 'relative' }}
        >
          <components.Modal
            title={title}
            description={description}
            close={close}
            additionalProps={additionalProps}
          >
            {children}
          </components.Modal>
        </div>
      </FocusTrap>
    </components.Wrapper>,
    document.getElementById(elementId) as HTMLElement
  );
};
