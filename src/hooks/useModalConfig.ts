import { createContext, useContext } from 'react';
import { ModalOptions } from '..';

export const ModalConfigContext = createContext<ModalOptions>({});

export const useModalConfig = () => {
  return useContext(ModalConfigContext);
};
