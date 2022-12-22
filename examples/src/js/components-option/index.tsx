import React from 'react';
import { ModalProps, ModalProvider, useModal } from '../../../../src';

const Modal = () => {
  const [renderModal, open, close, isOpen] = useModal('root');

  return (
    <div>
      <div>Modal is Open? {isOpen ? 'Yes' : 'No'}</div>
      <button onClick={open}>OPEN</button>
      {renderModal(<button onClick={close}>CLOSE</button>, {
        title: 'Title',
        description: 'This is a customizable modal.',
      })}
    </div>
  );
};
const ModalWithOverrideOptions = () => {
  const [renderModal, open, close, isOpen] = useModal('root', {
    components: {
      Modal: ({ title, description, children }) => {
        return (
          <div
            style={{
              padding: '60px 100px',
              backgroundColor: 'cyan', // override
              borderRadius: '10px',
            }}
          >
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
            {children}
          </div>
        );
      },
    },
  });

  return (
    <div style={{ marginTop: '40px' }}>
      <div>Overrided style modal is Open? {isOpen ? 'Yes' : 'No'}</div>
      <button onClick={open}>OPEN</button>

      {renderModal(<button onClick={close}>CLOSE</button>, {
        title: 'Title',
        description: 'This is a customizable modal.',
      })}
    </div>
  );
};

type AdditionalProps = {
  footer: React.ReactNode;
};
interface OverrideModalProps extends ModalProps<AdditionalProps> {}
const OverrideModal: React.FC<OverrideModalProps> = ({
  title,
  description,
  children,
  additionalProps,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        padding: '60px 100px',
        backgroundColor: 'fff',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          marginBottom: '60px',
        }}
      >
        {title && <h1>{title}</h1>}
        {description && <p>{description}</p>}
      </div>
      {additionalProps?.footer && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
        >
          {additionalProps.footer}
        </div>
      )}
      {children}
    </div>
  );
};

const ModalWithAdditionalProps = () => {
  const [renderModal, open, close, isOpen] = useModal('root', {
    components: {
      Modal: OverrideModal, // The type of `additionalProps` that can be specified for `Modal` is automatically determined according to the type of `components.Modal` props.
    },
  });

  return (
    <div style={{ marginTop: '40px' }}>
      <div>
        Modal with `additionalProps` option applied is Open?{' '}
        {isOpen ? 'Yes' : 'No'}
      </div>
      <button onClick={open}>OPEN</button>
      {renderModal(<button onClick={close}>CLOSE</button>, {
        title: 'Title',
        description: 'This is a customizable modal.',
        additionalProps: { footer: <button onClick={close}>CLOSE</button> },
      })}
    </div>
  );
};

export const ModalWrapper = () => {
  return (
    <ModalProvider
      focusTrapOptions={{
        clickOutsideDeactivates: true,
      }}
      components={{
        Modal: ({ title, description, children }) => {
          return (
            <div
              style={{
                padding: '60px 100px',
                backgroundColor: '#fff',
                borderRadius: '10px',
              }}
            >
              {title && <h1>{title}</h1>}
              {description && <p>{description}</p>}
              {children}
            </div>
          );
        },
      }}
    >
      <Modal />
      <ModalWithOverrideOptions />
      <ModalWithAdditionalProps />
    </ModalProvider>
  );
};
