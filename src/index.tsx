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
  Wrapper: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  children: React.ReactNode;
}

export interface OverlayProps {
  Overlay: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
}

export interface ModalProps {
  Modal: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
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

export type UseModal = (
  elementId: string,
  options?: UseModalOptions
) => [
  ModalWrapper: React.FC<{ children: React.ReactNode }>,
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

  const _ModalWrapper = useCallback(
    ({ children }: { children: React.ReactNode }) => {
      return (
        <ModalWrapper
          isOpen={isOpen}
          close={close}
          elementId={elementId}
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
