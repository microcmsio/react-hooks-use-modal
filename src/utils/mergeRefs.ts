// Reference: https://github.com/gregberge/react-merge-refs/blob/main/src/index.tsx

import React from 'react';

export const mergeRefs = <T extends HTMLElement>(
  refs: React.Ref<T>[]
): React.RefCallback<T> => {
  const margedRef = (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref !== null) {
        (ref as React.MutableRefObject<T | null>).current = instance;
      }
    });
  };

  return margedRef;
};
