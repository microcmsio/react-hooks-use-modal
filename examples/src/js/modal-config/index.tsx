import React from 'react';
import { ModalProvider, useModal } from '../../../../src';

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '60px 100px',
  borderRadius: '10px',
};

const Modal = () => {
  const [Modal, open, close, isOpen] = useModal('root');

  return (
    <div>
      <div>Modal is Open? {isOpen ? 'Yes' : 'No'}</div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <div style={modalStyle}>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button onClick={close}>CLOSE</button>
        </div>
      </Modal>
    </div>
  );
};
const ModalWithOverrideOptions = () => {
  const [Modal, open, close, isOpen] = useModal('root', {
    focusTrapOptions: {
      clickOutsideDeactivates: false,
    },
  });

  return (
    <div style={{ marginTop: '40px' }}>
      <div>Modal overridden by options is Open? {isOpen ? 'Yes' : 'No'}</div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <div style={modalStyle}>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button onClick={close}>CLOSE</button>
        </div>
      </Modal>
    </div>
  );
};

export const ModalWrapper = () => {
  return (
    <ModalProvider
      focusTrapOptions={{
        clickOutsideDeactivates: true,
      }}
    >
      <Modal />
      <ModalWithOverrideOptions />
    </ModalProvider>
  );
};
