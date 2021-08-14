import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import disableScroll from 'disable-scroll';

export interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  elementId: 'root' | string;
};

export interface Options {
  preventScroll?: boolean;
};

const wrapperStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const maskStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 100000
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 100001
};

const Modal: React.FC<Props> = ({ children, isOpen = false, close, elementId = 'root' }) => {
  if (isOpen === false) {
    return null;
  }
  return createPortal(
    <div style={wrapperStyle}>
      <div style={maskStyle} onClick={close} />
      <div style={containerStyle}>{children}</div>
    </div>,
    document.getElementById(elementId) as HTMLElement
  );
};

export const useModal = (elementId = 'root', options: Options = {}): [ModalWrapper: (children: any) => React.ReactElement, open: () => void, close: () => void, isOpen: boolean] => {
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

  const ModalWrapper = useCallback(({ children }) => {
    return (
      <Modal isOpen={isOpen} close={close} elementId={elementId}>
        {children}
      </Modal>
    )
  }, [isOpen, close, elementId]);

  return [ModalWrapper, open, close, isOpen];
};
