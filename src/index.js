import React from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

export default ({ children, isOpen, close, elementId = 'root' }) => {
  if (!isOpen) {
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
