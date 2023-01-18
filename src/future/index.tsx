import React, {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from 'react';

import { ModalContentDefault } from './components/DefaultComponents';
import { useModalConfig } from './hooks/useModalConfig';
import styles from './index.module.css';

export type ModalWrapperProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  dialogProps?: React.ComponentProps<'dialog'>;
  contentProps?: React.ComponentProps<'div'>;
};

export type ModalContentProps = Pick<
  ModalWrapperProps,
  'title' | 'description' | 'children' | 'contentProps'
>;

export type UseModalOptions = {
  initialValue?: boolean;
  closeOnOverlayClick?: boolean;
  components?: {
    ModalContent?: React.FC<ModalContentProps>;
  };
};

type UseModalResult = [
  ModalWrapper: React.FC<ModalWrapperProps>,
  open: () => void,
  close: () => void,
  isOpen: boolean
];

export type UseModal = (options?: UseModalOptions) => UseModalResult;

export const useModal: UseModal = (options) => {
  const modalConfig = useModalConfig();

  const initialValue =
    options?.initialValue ?? modalConfig.initialValue ?? false;
  const closeOnOverlayClick =
    options?.closeOnOverlayClick ?? modalConfig.closeOnOverlayClick ?? true;
  const ModalContent =
    options?.components?.ModalContent ??
    modalConfig.components?.ModalContent ??
    ModalContentDefault;

  const ref = useRef<HTMLDialogElement>(null);

  const subscribe = useCallback((callback: () => void) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'open') {
          callback();
        }
      });
    });

    ref.current &&
      observer.observe(ref.current, {
        attributes: true,
      });

    return () => {
      observer.disconnect();
    };
  }, []);
  const isOpen = useSyncExternalStore(
    subscribe,
    () => {
      return ref.current?.open ?? false;
    },
    () => false
  );

  const open = useCallback(() => {
    ref.current?.showModal();
  }, []);

  const close = useCallback(() => {
    ref.current?.close();
  }, []);

  const handleOverlayClick: React.MouseEventHandler<HTMLDialogElement> =
    useCallback(
      (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          close();
        }
      },
      [closeOnOverlayClick, close]
    );

  const justMounted = useRef(true);
  useEffect(() => {
    if (justMounted.current) {
      if (initialValue === true) {
        open();
      }
      justMounted.current = false;
    }
  }, [initialValue, open]);

  const ModalWrapper: React.FC<ModalWrapperProps> = useCallback(
    ({ dialogProps, ...props }) => {
      return (
        <dialog
          ref={ref}
          className={[styles.dialog, dialogProps?.className]
            .filter(Boolean)
            .join(' ')}
          onClick={(e) => {
            dialogProps?.onClick?.(e);
            handleOverlayClick(e);
          }}
          {...dialogProps}
        >
          <ModalContent {...props} />
        </dialog>
      );
    },
    [handleOverlayClick, ModalContent]
  );

  return [ModalWrapper, open, close, isOpen];
};

export { ModalProvider } from './components/ModalProvider';
