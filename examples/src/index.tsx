import React, { PropsWithChildren } from 'react';
import { render } from 'react-dom';

import routes from '../../examples-routes';

import { Modal as CommonModal } from './js';
import { Modal as CloseButtonModal } from './js/close-button';
import { Modal as CloseButtonWithRenderOptionModal } from './js/close-button/render-option';
import { ModalWrapper as ModalConfigModal } from './js/modal-config';

const CurrentModal = () => {
  switch (
    window.location.pathname
      .replace(/^\/react-hooks-use-modal/, '')
      .replace(/\/$/, '')
  ) {
    case '/close-button': {
      return <CloseButtonModal />;
    }
    case '/close-button/render-option': {
      return <CloseButtonWithRenderOptionModal />;
    }
    case '/modal-config': {
      return <ModalConfigModal />;
    }
    default: {
      return <CommonModal />;
    }
  }
};

const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      {children}
      <nav style={{ marginTop: '40px' }}>
        {routes.map(({ path }, i) => (
          <a
            href={`/react-hooks-use-modal${path}`}
            style={{ marginLeft: i !== 0 ? '10px' : '' }}
          >
            {path}
          </a>
        ))}
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <Wrapper>
      <CurrentModal />
    </Wrapper>
  );
};

render(<App />, document.getElementById('root'));
