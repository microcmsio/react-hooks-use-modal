import { Options as FocusTrapOptions } from 'focus-trap';
import React, { createElement, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps, OverlayProps, WrapperProps } from '..';

import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { mergeRefs } from '../utils/mergeRefs';

interface ModalWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  elementId: 'root' | string;
  preventScroll: boolean;
  focusTrapOptions: FocusTrapOptions;
  components: {
    Wrapper: React.ComponentType<WrapperProps>;
    Overlay: React.ComponentType<OverlayProps>;
    Modal: React.ComponentType<ModalProps>;
  };
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  isOpen,
  close,
  elementId = 'root',
  preventScroll,
  focusTrapOptions,
  components,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen, {
    onDeactivate: close,
    clickOutsideDeactivates: true,
    ...focusTrapOptions,
  });
  useBodyScrollLock(dialogRef, isOpen, preventScroll);

  const _Wrapper: WrapperProps['Wrapper'] = (props) => {
    return createElement('div', {
      ...props,
    });
  };
  const _Overlay: OverlayProps['Overlay'] = (props) => {
    return createElement('div', {
      ...props,
      'aria-hidden': true,
    });
  };
  const _Modal: ModalProps['Modal'] = (props) => {
    return createElement('div', {
      ...props,
      ref: mergeRefs([
        dialogRef,
        ...(typeof props.ref !== 'string' && props.ref ? [props.ref] : []),
      ]),
      role: 'dialog',
      'aria-modal': 'true',
      tabIndex: -1,
    });
  };

  if (isOpen === false) {
    return null;
  }

  return createPortal(
    <components.Wrapper Wrapper={_Wrapper}>
      <components.Overlay Overlay={_Overlay} />
      <components.Modal Modal={_Modal} close={close}>
        {children}
      </components.Modal>
    </components.Wrapper>,
    document.getElementById(elementId) as HTMLElement
  );
};
