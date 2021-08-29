import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useOverlay } from './useOverlay';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOverlayClick: React.MouseEventHandler<HTMLDivElement>;
  elementId: 'root' | string;
  preventScroll?: boolean;
};

export interface ModalOptions {
  preventScroll?: boolean;
  closeOnOverlayClick?: boolean;
};

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

const Modal: React.FC<ModalProps> = ({ children, isOpen = false, onOverlayClick, elementId = 'root', preventScroll = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  useOverlay(isOpen, close, ref);

  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }
    if (isOpen) {
      if (preventScroll) {
        disableBodyScroll(containerRef.current, {
          reserveScrollBarGap: true,
        });
      }
    } else {
      if (preventScroll) {
        enableBodyScroll(containerRef.current)
      }
    }
    return () => {
      if (containerRef.current === null) {
        return;
      }
      if (preventScroll) {
        enableBodyScroll(containerRef.current)
      }
    }
  },[containerRef, isOpen, preventScroll]);

  if (isOpen === false) {
    return null;
  }
  return createPortal(
    <div role="dialog" aria-modal style={wrapperStyle} ref={containerRef}>
      <div style={overlayStyle} onClick={onOverlayClick} />
      <div ref={ref} style={containerStyle}>{children}</div>
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
  const onOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (closeOnOverlayClick) {
      close();
    }
  }, [closeOnOverlayClick, close]);

  const ModalWrapper = useCallback(
    ({ children }) => {
      return (
        <Modal isOpen={isOpen} onOverlayClick={onOverlayClick} elementId={elementId} preventScroll={preventScroll}>
          {children}
        </Modal>
      );
    },
    [isOpen, close, elementId]
  );

  return [ModalWrapper, open, close, isOpen];
};
