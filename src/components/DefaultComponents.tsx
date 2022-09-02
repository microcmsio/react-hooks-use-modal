import React from 'react';
import { ModalProps, OverlayProps, WrapperProps } from '..';

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

const Wrapper: React.FC<WrapperProps> = ({ Wrapper, children }) => {
  return <Wrapper style={wrapperStyle}>{children}</Wrapper>;
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 100000,
};

const Overlay: React.FC<OverlayProps> = ({ Overlay }) => {
  return <Overlay style={overlayStyle} />;
};

const modalStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 100001,
};

const Modal: React.FC<ModalProps> = ({ Modal, children }) => {
  return <Modal style={modalStyle}>{children}</Modal>;
};

export {
  Modal as DefaultModal,
  Overlay as DefaultOverlay,
  Wrapper as DefaultWrapper,
};
