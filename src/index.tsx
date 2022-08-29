import { Options as FocusTrapOptions } from 'focus-trap';
import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useBodyScrollLock } from './useBodyScrollLock';
import { useFocusTrap } from './useFocusTrap';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  elementId: 'root' | string;
  preventScroll: boolean;
  focusTrapOptions: FocusTrapOptions;
}

export interface ModalOptions {
  preventScroll?: boolean;
  focusTrapOptions?: FocusTrapOptions;
}

export type UseModal = (
  elementId: string,
  options?: ModalOptions
) => [
  ModalWrapper: React.FC<{ children: React.ReactNode }>,
  open: () => void,
  close: () => void,
  isOpen: boolean
];

const wrapperStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 100000,
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 100001,
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  close,
  elementId = 'root',
  preventScroll,
  focusTrapOptions,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen, {
    onDeactivate: close,
    clickOutsideDeactivates: true,
    ...focusTrapOptions,
  });
  useBodyScrollLock(dialogRef, isOpen, preventScroll);

  if (isOpen === false) {
    return null;
  }

  return createPortal(
    <div style={wrapperStyle}>
      <div style={overlayStyle} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        style={containerStyle}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.getElementById(elementId) as HTMLElement
  );
};

export const useModal: UseModal = (elementId = 'root', options = {}) => {
  const { preventScroll = false, focusTrapOptions = {} } = options;
  const [isOpen, setOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const ModalWrapper = useCallback(
    ({ children }) => {
      return (
        <Modal
          isOpen={isOpen}
          close={close}
          elementId={elementId}
          preventScroll={preventScroll}
          focusTrapOptions={focusTrapOptions}
        >
          {children}
        </Modal>
      );
    },
    [close, elementId, focusTrapOptions, isOpen, preventScroll]
  );

  return [ModalWrapper, open, close, isOpen];
};
