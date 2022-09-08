import React, { Fragment } from 'react';
import { ModalProps, WrapperProps } from '..';

const wrapperStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div style={wrapperStyle}>{children}</div>;
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const Overlay: React.FC = () => {
  return <div style={overlayStyle} />;
};

const Modal: React.FC<ModalProps<{}>> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export {
  Modal as DefaultModal,
  Overlay as DefaultOverlay,
  Wrapper as DefaultWrapper,
};
