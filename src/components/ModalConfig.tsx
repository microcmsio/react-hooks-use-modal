import React, { PropsWithChildren } from 'react';
import { ModalOptions } from '..';
import { ModalConfigContext } from '../hooks/useModalConfig';

interface ModalConfigProps {
  value: ModalOptions;
}

export const ModalConfig: React.FC<PropsWithChildren<ModalConfigProps>> = ({
  value,
  children,
}) => {
  return (
    <ModalConfigContext.Provider value={value}>
      {children}
    </ModalConfigContext.Provider>
  );
};
