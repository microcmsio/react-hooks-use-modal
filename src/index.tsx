import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

import { useBodyScrollLock } from './useBodyScrollLock';
import { useKeyDown } from './useKeyDown';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  onOverlayClick: React.MouseEventHandler<HTMLDivElement>;
  elementId: 'root' | string;
  preventScroll?: boolean;
}

export interface ModalOptions {
  preventScroll?: boolean;
  closeOnOverlayClick?: boolean;
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
  isOpen = false,
  close,
  onOverlayClick,
  elementId = 'root',
  preventScroll = false,
}) => {
  const [wrapperRef] = useKeyDown<HTMLDivElement>(isOpen, close);
  const [containerRef] = useBodyScrollLock<HTMLDivElement>(
    isOpen,
    preventScroll
  );

  if (isOpen === false) {
    return null;
  }

  return createPortal(
    <div ref={wrapperRef} style={wrapperStyle}>
      <div style={overlayStyle} onClick={onOverlayClick} />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal={isOpen}
        style={containerStyle}
        tabIndex={0}
      >
        {children}
      </div>
    </div>,
    document.getElementById(elementId) as HTMLElement
  );
};

export const useModal: UseModal = (elementId = 'root', options = {}) => {
  const { preventScroll, closeOnOverlayClick = true } = options;
  const [isOpen, setOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (closeOnOverlayClick) {
        close();
      }
    },
    [closeOnOverlayClick, close]
  );

  const ModalWrapper = useCallback(
    ({ children }) => {
      return (
        <Modal
          isOpen={isOpen}
          close={close}
          onOverlayClick={onOverlayClick}
          elementId={elementId}
          preventScroll={preventScroll}
        >
          {children}
        </Modal>
      );
    },
    [close, elementId, isOpen, onOverlayClick, preventScroll]
  );

  return [ModalWrapper, open, close, isOpen];
};
