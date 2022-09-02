import { createContext, useContext } from 'react';
import { UseModalOptions } from '..';

export const ModalConfigContext = createContext<UseModalOptions>({});

export const useModalConfig = () => {
  return useContext(ModalConfigContext);
};
