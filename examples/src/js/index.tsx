import React from 'react';
import { render } from 'react-dom';

import { useModal } from '../../../src';

import { Modal as CloseButtonModal } from './close-button';
import { Modal as CloseButtonWithRenderOptionModal } from './close-button/render-option';

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '60px 100px',
  borderRadius: '10px',
};

const Modal = () => {
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    focusTrapOptions: {
      clickOutsideDeactivates: false,
    },
  });

  return (
    <div>
      <div>Modal is Open? {isOpen ? 'Yes' : 'No'}</div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <div style={modalStyle}>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          {window.location.pathname.startsWith('/close-button') && (
            <button onClick={close}>CLOSE</button>
          )}
        </div>
      </Modal>
    </div>
  );
};

const App = () => {
  if (window.location.pathname === '/close-button') {
    return <CloseButtonModal />;
  }

  if (window.location.pathname === '/close-button/render-option') {
    return <CloseButtonWithRenderOptionModal />;
  }

  return <Modal />;
};

render(<App />, document.getElementById('root'));
