import React, { PropsWithChildren } from 'react';
import { render } from 'react-dom';

import { Modal as CommonModal } from './js';
import { Modal as CloseButtonModal } from './js/close-button';
import { Modal as CloseButtonWithRenderOptionModal } from './js/close-button/render-option';

const CurrentModal = () => {
  if (window.location.pathname.replace(/\/$/, '') === '/close-button') {
    return <CloseButtonModal />;
  }

  if (
    window.location.pathname.replace(/\/$/, '') ===
    '/close-button/render-option'
  ) {
    return <CloseButtonWithRenderOptionModal />;
  }

  return <CommonModal />;
};

const routes = ['/close-button', '/close-button/render-option'];
const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      {children}
      <nav>
        {routes.map((route) => (
          <a href={route}>{route}</a>
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
