import React from 'react';

interface DefaultCloseButtonProps {
  onClose: () => void;
}

const closeButtonStyle: React.CSSProperties = {
  // reset
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  padding: 0,
  appearance: 'none',

  position: 'absolute',
  right: 0,
  top: 0,
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
};

export const DefaultCloseButton: React.FC<DefaultCloseButtonProps> = ({
  onClose,
}) => {
  return (
    <button
      type="button"
      style={closeButtonStyle}
      onClick={onClose}
      aria-label="close"
    >
      ×
    </button>
  );
};
