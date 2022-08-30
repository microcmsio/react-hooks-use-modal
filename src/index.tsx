import { Options as FocusTrapOptions } from 'focus-trap';
import React, { useCallback, useMemo, useState } from 'react';

import { DefaultCloseButton } from './components/DefaultCloseButton';
import { Modal, ModalProps } from './components/Modal';

export type ModalOptions = {
  preventScroll?: boolean;
  focusTrapOptions?: FocusTrapOptions;
} & (
  | {
      showCloseButton?: false;
    }
  | {
      showCloseButton: true;
      renderCloseButton?: (close: () => void) => React.ReactElement;
    }
);

export type UseModal = (
  elementId: string,
  options?: ModalOptions
) => [
  ModalWrapper: React.FC<{ children: React.ReactNode }>,
  open: () => void,
  close: () => void,
  isOpen: boolean
];

export const useModal: UseModal = (elementId = 'root', options = {}) => {
  const { preventScroll = false, focusTrapOptions = {}, ...rest } = options;
  const [isOpen, setOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const closeButton: ModalProps['closeButton'] = useMemo(() => {
    return rest.showCloseButton ? (
      rest.renderCloseButton !== undefined ? (
        rest.renderCloseButton(close)
      ) : (
        <DefaultCloseButton onClose={close} />
      )
    ) : null;
  }, [close, rest]);

  const ModalWrapper = useCallback(
    ({ children }) => {
      return (
        <Modal
          isOpen={isOpen}
          close={close}
          elementId={elementId}
          preventScroll={preventScroll}
          focusTrapOptions={focusTrapOptions}
          closeButton={closeButton}
        >
          {children}
        </Modal>
      );
    },
    [close, closeButton, elementId, focusTrapOptions, isOpen, preventScroll]
  );

  return [ModalWrapper, open, close, isOpen];
};
