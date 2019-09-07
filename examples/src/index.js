import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import Modal from '../../src';

const App = () => {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  return (
    <div>
      <button onClick={open}>OPEN</button>
      <Modal isOpen={isOpen} close={close}>
        modal
      </Modal>
    </div>
  );
};
render(<App />, document.getElementById('root'));
