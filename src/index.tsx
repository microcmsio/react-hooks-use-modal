import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import disableScroll from 'disable-scroll';
import { useOverlay } from './useOverlay';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  elementId: 'root' | string;
};

export interface ModalOptions {
  preventScroll?: boolean;
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

const maskStyle: React.CSSProperties = {
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

const Modal: React.FC<ModalProps> = ({ children, isOpen = false, close, elementId = 'root' }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOverlay(isOpen, close, ref);

  if (isOpen === false) {
    return null;
  }
  return createPortal(
    <div role="dialog" aria-modal style={wrapperStyle}>
      <div style={maskStyle} onClick={close} />
      <div ref={ref} style={containerStyle}>{children}</div>
    </div>,
    document.getElementById(elementId) as HTMLElement
  );
};

export const useModal: UseModal = (elementId = 'root', options = {}) => {
  const { preventScroll = false } = options;
  const [isOpen, setOpen] = useState<boolean>(false);
  const open = useCallback(() => {
    setOpen(true);
    if (preventScroll) {
      disableScroll.on();
    }
  }, [setOpen, preventScroll]);
  const close = useCallback(() => {
    setOpen(false);
    if (preventScroll) {
      disableScroll.off();
    }
  }, [setOpen, preventScroll]);

  const ModalWrapper = useCallback(
    ({ children }) => {
      return (
        <Modal isOpen={isOpen} close={close} elementId={elementId}>
          {children}
        </Modal>
      );
    },
    [isOpen, close, elementId]
  );

  return [ModalWrapper, open, close, isOpen];
};
