import { Options as FocusTrapOptions } from 'focus-trap';
import React, { useCallback, useMemo, useState } from 'react';
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

export interface ModalProps<T extends Record<string, unknown>> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  close: () => void;
  children: React.ReactNode;
  additionalProps?: T;
}

export interface UseModalOptions<T extends Record<string, unknown>> {
  initialValue?: boolean;
  preventScroll?: boolean;
  focusTrapOptions?: FocusTrapOptions;
  components?: {
    Wrapper?: React.ComponentType<WrapperProps>;
    Overlay?: React.ComponentType<OverlayProps>;
    Modal?: React.ComponentType<ModalProps<T>>;
  };
}

export interface ModalWrapperProps<T extends Record<string, unknown>> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  additionalProps?: T;
}

export type UseModalResult<T extends Record<string, unknown>> = [
  renderModal: (
    content: React.ReactNode,
    props?: ModalWrapperProps<T>
  ) => JSX.Element,
  open: () => void,
  close: () => void,
  isOpen: boolean
];

export type UseModal<T extends Record<string, unknown>> = (
  elementId?: string,
  options?: UseModalOptions<T>
) => UseModalResult<T>;

const defaultOptions: Required<UseModalOptions<{}>> = {
  initialValue: false,
  preventScroll: false,
  focusTrapOptions: {},
  components: {},
};

export const useModal = <T extends Record<string, unknown>>(
  elementId = 'root',
  options?: UseModalOptions<T>
): UseModalResult<T> => {
  const modalConfig = useModalConfig<T>();
  const { initialValue, preventScroll, focusTrapOptions, components } = useMemo(
    () => Object.assign({}, defaultOptions, modalConfig, options),
    [modalConfig, options]
  );
  const [isOpen, setOpen] = useState<boolean>(initialValue);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const Wrapper = components.Wrapper ?? DefaultWrapper;
  const Overlay = components.Overlay ?? DefaultOverlay;
  const Modal = components.Modal ?? DefaultModal;

  const renderModal = useCallback(
    (
      children: React.ReactNode,
      { title, description, additionalProps }: ModalWrapperProps<T> = {}
    ): JSX.Element => {
      return (
        <ModalWrapper
          isOpen={isOpen}
          close={close}
          elementId={elementId}
          title={title}
          description={description}
          preventScroll={preventScroll}
          focusTrapOptions={focusTrapOptions}
          components={{
            Modal,
            Overlay,
            Wrapper,
          }}
          additionalProps={additionalProps}
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

  return [renderModal, open, close, isOpen];
};

export { ModalProvider } from './components/ModalProvider';
