import deepmerge from 'deepmerge';
import { Options as FocusTrapOptions } from 'focus-trap';
import React, { useCallback, useState } from 'react';
import {
  DefaultModal,
  DefaultOverlay,
  DefaultWrapper,
} from './components/DefaultComponents';

import { ModalWrapper } from './components/Modal';
import { useModalConfig } from './hooks/useModalConfig';

export interface WrapperProps {
  children: React.ReactNode;
}

export interface OverlayProps {}

export interface ModalProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  close: () => void;
  children: React.ReactNode;
}

export interface UseModalOptions {
  preventScroll?: boolean;
  focusTrapOptions?: FocusTrapOptions;
  components?: {
    Wrapper?: React.ComponentType<WrapperProps>;
    Overlay?: React.ComponentType<OverlayProps>;
    Modal?: React.ComponentType<ModalProps>;
  };
}

export interface ModalWrapperProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}

export type UseModal = (
  elementId?: string,
  options?: UseModalOptions
) => [
  ModalWrapper: React.FC<ModalWrapperProps>,
  open: () => void,
  close: () => void,
  isOpen: boolean
];

export const useModal: UseModal = (elementId = 'root', options = {}) => {
  const {
    preventScroll = false,
    focusTrapOptions = {},
    components = {},
  } = deepmerge<UseModalOptions>(useModalConfig(), options);
  const [isOpen, setOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const Wrapper = components.Wrapper ?? DefaultWrapper;
  const Overlay = components.Overlay ?? DefaultOverlay;
  const Modal = components.Modal ?? DefaultModal;

  const _ModalWrapper: React.FC<ModalWrapperProps> = useCallback(
    ({ title, description, children }) => {
      return (
        <ModalWrapper
          isOpen={isOpen}
          close={close}
          elementId={elementId}
          title={title}
          description={description}
          preventScroll={preventScroll}
          focusTrapOptions={focusTrapOptions}
          components={{ Modal, Overlay, Wrapper }}
        >
          {children}
        </ModalWrapper>
      );
    },
    [
      Modal,
      Overlay,
      Wrapper,
      close,
      elementId,
      focusTrapOptions,
      isOpen,
      preventScroll,
    ]
  );

  return [_ModalWrapper, open, close, isOpen];
};

export { ModalProvider } from './components/ModalProvider';
