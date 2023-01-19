import React from 'react';

import type { UseModalOptions } from '..';
import { ModalConfigContext } from '../hooks/useModalConfig';

interface ModalProviderProps extends UseModalOptions {
  children?: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <ModalConfigContext.Provider value={props}>
      {children}
    </ModalConfigContext.Provider>
  );
};
