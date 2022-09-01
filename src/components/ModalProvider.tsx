import React, { PropsWithChildren } from 'react';
import { ModalOptions } from '..';
import { ModalConfigContext } from '../hooks/useModalConfig';

interface ModalProviderProps {
  value: ModalOptions;
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
