import React from 'react';
import { UseModalOptions } from '..';
import { ModalConfigContext } from '../hooks/useModalConfig';

interface ModalProviderProps<T extends Record<string, unknown>>
  extends UseModalOptions<T> {
  children?: React.ReactNode;
}

export const ModalProvider = <T extends Record<string, unknown>>({
  children,
  ...props
}: ModalProviderProps<T>): React.ReactElement | null => {
  return (
    <ModalConfigContext.Provider value={props}>
      {children}
    </ModalConfigContext.Provider>
  );
};
