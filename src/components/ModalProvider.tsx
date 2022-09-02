import React, { PropsWithChildren } from 'react';
import { UseModalOptions } from '..';
import { ModalConfigContext } from '../hooks/useModalConfig';

interface ModalProviderProps {
  value: UseModalOptions;
}

export const ModalProvider: React.FC<PropsWithChildren<ModalProviderProps>> = ({
  value,
  children,
}) => {
  return (
    <ModalConfigContext.Provider value={value}>
      {children}
    </ModalConfigContext.Provider>
  );
};
