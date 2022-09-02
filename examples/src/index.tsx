import React, { PropsWithChildren } from 'react';
import { render } from 'react-dom';

import routes from '../../examples-routes';

import { Modal as CommonModal } from './js';
import { ModalWrapper as ComponentsOptionModal } from './js/components-option';
import { ModalWrapper as ModalProviderModal } from './js/modal-config';
import { Modal as PreventScrollModal } from './js/prevent-scroll';

const CurrentModal = () => {
  switch (
    window.location.pathname
      .replace(/^\/react-hooks-use-modal/, '')
      .replace(/\/$/, '')
  ) {
    case '/prevent-scroll': {
      return <PreventScrollModal />;
    }
    case '/modal-provider': {
      return <ModalProviderModal />;
    }
    case '/components-option': {
      return <ComponentsOptionModal />;
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
            key={path}
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
