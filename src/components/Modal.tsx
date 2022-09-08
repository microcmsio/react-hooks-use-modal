import { Options as FocusTrapOptions } from 'focus-trap';
import React, { useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps, OverlayProps, WrapperProps } from '..';

import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ModalWrapperProps<T extends Record<string, unknown>> {
  children: React.ReactNode;
  isOpen: boolean;
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
  const _focusTrapOptions = useMemo(
    () => ({
      onDeactivate: close,
      clickOutsideDeactivates: true,
      ...focusTrapOptions,
    }),
    [close, focusTrapOptions]
  );
  useFocusTrap(dialogRef, isOpen, _focusTrapOptions);
  useBodyScrollLock(dialogRef, isOpen, preventScroll);

  if (isOpen === false) {
    return null;
  }

  return createPortal(
    <components.Wrapper>
      <components.Overlay />
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
    </components.Wrapper>,
    document.getElementById(elementId) as HTMLElement
  );
};
