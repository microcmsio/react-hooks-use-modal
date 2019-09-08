import React from 'react';
import { render } from 'react-dom';
import useModal from '../../src';
import styles from './styles.module.css';

const App = () => {
  const [Modal, open, close] = useModal();
  return (
    <div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <div className={styles.modal}>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button onClick={close}>CLOSE</button>
        </div>
      </Modal>
    </div>
  );
};
render(<App />, document.getElementById('root'));
