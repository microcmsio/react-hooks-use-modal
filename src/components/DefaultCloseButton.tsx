import React from 'react';

interface DefaultCloseButtonProps {
  onClose: () => void;
}

const defaultCloseButtonStyle: React.CSSProperties = {
  // reset
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
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
  fontSize: '28px',
  color: '#fff',
  transform: 'translateX(100%)',
};

export const DefaultCloseButton: React.FC<DefaultCloseButtonProps> = ({
  onClose,
}) => {
  return (
    <button
      type="button"
      style={defaultCloseButtonStyle}
      onClick={onClose}
      aria-label="close"
    >
      ×
    </button>
  );
};
