import { Options as FocusTrapOptions } from 'focus-trap';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';

import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  elementId: 'root' | string;
  preventScroll: boolean;
  focusTrapOptions: FocusTrapOptions;
  closeButton: React.ReactElement | null;
}

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

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  close,
  elementId = 'root',
  preventScroll,
  focusTrapOptions,
  closeButton,
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
        {closeButton}
      </div>
    </div>,
    document.getElementById(elementId) as HTMLElement
  );
};
