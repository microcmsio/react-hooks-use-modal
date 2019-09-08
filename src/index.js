import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

const Modal = ({ children, isOpen = false, close, elementId = 'root' }) => {
  if (isOpen === false) {
    return null;
  }
  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.mask} onClick={close} />
      <div className={styles.container}>{children}</div>
    </div>,
    document.getElementById(elementId)
  );
};

const useModal = elementId => {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  const ModalWrapper = ({ children }) => (
    <Modal isOpen={isOpen} close={close} elementId={elementId}>
      {children}
    </Modal>
  );

  return [ModalWrapper, open, close];
};

export default useModal;
