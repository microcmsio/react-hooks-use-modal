import { Options as FocusTrapOptions } from 'focus-trap';
import React, { useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps, OverlayProps, WrapperProps } from '..';

import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ModalWrapperProps {
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
    Modal: React.ComponentType<ModalProps>;
  };
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  isOpen,
  close,
  elementId = 'root',
  title,
  description,
  preventScroll,
  focusTrapOptions,
  components,
}) => {
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
        <components.Modal title={title} description={description} close={close}>
          {children}
        </components.Modal>
      </div>
    </components.Wrapper>,
    document.getElementById(elementId) as HTMLElement
  );
};
