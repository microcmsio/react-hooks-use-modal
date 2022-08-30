import { Options as FocusTrapOptions } from 'focus-trap';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { useFocusTrap } from './hooks/useFocusTrap';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  elementId: 'root' | string;
  preventScroll: boolean;
  focusTrapOptions: FocusTrapOptions;
  closeButton: React.ReactElement | null;
}

interface DefaultCloseButtonProps {
  onClose: () => void;
}

export type ModalOptions = {
  preventScroll?: boolean;
  focusTrapOptions?: FocusTrapOptions;
} & (
  | {
      showCloseButton?: false;
    }
  | {
      showCloseButton: true;
      renderCloseButton?: (close: () => void) => React.ReactElement;
    }
);

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

const closeButtonStyle: React.CSSProperties = {
  // reset
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  padding: 0,
  appearance: 'none',

  position: 'absolute',
  right: 0,
  top: 0,
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
};

const DefaultCloseButton: React.FC<DefaultCloseButtonProps> = ({ onClose }) => {
  return (
    <button
      type="button"
      style={closeButtonStyle}
      onClick={onClose}
      aria-label="close"
    >
      ×
    </button>
  );
};

const Modal: React.FC<ModalProps> = ({
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

export const useModal: UseModal = (elementId = 'root', options = {}) => {
  const { preventScroll = false, focusTrapOptions = {}, ...rest } = options;
  const [isOpen, setOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const closeButton: ModalProps['closeButton'] = useMemo(() => {
    return rest.showCloseButton ? (
      rest.renderCloseButton !== undefined ? (
        rest.renderCloseButton(close)
      ) : (
        <DefaultCloseButton onClose={close} />
      )
    ) : null;
  }, [close, rest]);

  const ModalWrapper = useCallback(
    ({ children }) => {
      return (
        <Modal
          isOpen={isOpen}
          close={close}
          elementId={elementId}
          preventScroll={preventScroll}
          focusTrapOptions={focusTrapOptions}
          closeButton={closeButton}
        >
          {children}
        </Modal>
      );
    },
    [close, closeButton, elementId, focusTrapOptions, isOpen, preventScroll]
  );

  return [ModalWrapper, open, close, isOpen];
};
