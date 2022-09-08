import React, { createContext, useContext } from 'react';
import { UseModalOptions } from '..';

export const ModalConfigContext = createContext<UseModalOptions<{}>>({});

export const useModalConfig = <T extends Record<string, unknown>>() => {
  return useContext(ModalConfigContext) as React.Context<UseModalOptions<T>>;
};
