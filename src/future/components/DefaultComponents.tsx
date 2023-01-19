import React from 'react';

import type { ModalContentProps } from '../';

export const ModalContentDefault: React.FC<ModalContentProps> = ({
  title,
  description,
  children,
  contentProps,
}) => {
  return (
    <div {...contentProps}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};
