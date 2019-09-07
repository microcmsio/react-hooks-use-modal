import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import Modal from '../../src';
import styles from './styles.module.css';

const App = () => {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  return (
    <div>
      <button onClick={open}>OPEN</button>
      <Modal isOpen={isOpen} close={close}>
        <div className={styles.modal}>
          <h1>Title</h1>
          <p>This is a react-portal-modal.</p>
        </div>
      </Modal>
    </div>
  );
};
render(<App />, document.getElementById('root'));
