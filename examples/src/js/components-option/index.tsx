import React from 'react';
import { ModalProvider, useModal } from '../../../../src';

const Modal = () => {
  const [Modal, open, close, isOpen] = useModal('root');

  return (
    <div>
      <div>Modal is Open? {isOpen ? 'Yes' : 'No'}</div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <h1>Title</h1>
        <p>This is a customizable modal.</p>
        <button onClick={close}>CLOSE</button>
      </Modal>
    </div>
  );
};
const ModalWithOverrideOptions = () => {
  const [Modal, open, close, isOpen] = useModal('root', {
    components: {
      Modal: ({ Modal, children }) => {
        return (
          <Modal
            style={{
              position: 'relative',
              zIndex: 100001,
              padding: '60px 100px',
              backgroundColor: 'cyan',
              borderRadius: '10px',
            }}
          >
            {children}
          </Modal>
        );
      },
    },
  });

  return (
    <div style={{ marginTop: '40px' }}>
      <div>Overrided style modal is Open? {isOpen ? 'Yes' : 'No'}</div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <h1>Title</h1>
        <p>This is a customizable modal.</p>
        <button onClick={close}>CLOSE</button>
      </Modal>
    </div>
  );
};

export const ModalWrapper = () => {
  return (
    <ModalProvider
      value={{
        focusTrapOptions: {
          clickOutsideDeactivates: true,
        },
        components: {
          Modal: ({ Modal, children }) => {
            return (
              <Modal
                style={{
                  position: 'relative',
                  zIndex: 100001,
                  padding: '60px 100px',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                }}
              >
                {children}
              </Modal>
            );
          },
        },
      }}
    >
      <Modal />
      <ModalWithOverrideOptions />
    </ModalProvider>
  );
};
