import React from 'react';
import { render } from 'react-dom';
import { ModalOptions, useModal } from '../../src';

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '60px 100px',
  borderRadius: '10px',
};

const App = () => {
  let options: ModalOptions = {
    preventScroll: true,
    focusTrapOptions: {
      clickOutsideDeactivates: false,
    },
  };

  if (window.location.pathname === '/close-button') {
    const newOptions: ModalOptions = { ...options, showCloseButton: true };
    options = newOptions;
  }

  const [Modal, open, , isOpen] = useModal('root', options);

  return (
    <div>
      <div>Modal is Open? {isOpen ? 'Yes' : 'No'}</div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <div style={modalStyle}>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
        </div>
      </Modal>
    </div>
  );
};

render(<App />, document.getElementById('root'));
