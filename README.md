# useModal

This is a react hook which can open the modal easily.

## Usage

```javascript
import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { useModal } from 'react-hooks-use-modal';

const App = () => {
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    focusTrapOptions: {
      clickOutsideDeactivates: false,
    },
  });
  return (
    <div>
      <p>Modal is Open? {isOpen ? 'Yes' : 'No'}</p>
      <button onClick={open}>OPEN</button>
      <Modal>
        <div>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button onClick={close}>CLOSE</button>
        </div>
      </Modal>
    </div>
  );
};
render(<App />, document.getElementById('root'));
```

## Syntax

### [ModalComponent, openFunc, closeFunc, isOpenBool] = useModal(domNode?, { initialValue?, preventScroll?, focusTrapOptions?, components? })

`ModalComponent`
Type: React.FC<{ title?: React.ReactNode; description?: React.ReactNode, children?: React.ReactNode, additionalProps?: Record<string, unknown> }>
Modal component that displays children in the screen center.
If you specify `title` and `description`, `additionalProps` you must implement custom components with the `components` option's `Modal` property and render in them.
See EXAMPLE below for details.
https://github.com/microcmsio/react-hooks-use-modal/blob/master/examples/src/js/components-option/index.tsx

`openFunc`
A function to open modal.

`closeFunc`
A function to close modal.

`isOpenBool`
A boolean to know the state whether modal is open or not.

`domNode`
Optional.
Default value is 'root'.
Modal component uses React-Portal.
You can specify the output destination domNode with this argument

`initialValue`
Optional.
Default value is false.
This is useful when you want to mount the modal in an open position.

`preventScroll`
Optional to prevent scrolling while modal is open.
Default value is false.

`focusTrapOptions`
Override the focus-trap options used internally.
For example, to prevent a modal from closing when a non-modal element is clicked, do the following

```jsx
useModal('root', {
  focusTrapOptions: {
    clickOutsideDeactivates: false,
  },
});
```

`components`
Optional.
This is an option to customize the `ModalWrapper` returned by useModal.
Use as follows

```jsx
useModal('root', {
  components: {
    Modal: ({ title, description, children }) => {
      return (
        <div
          style={{
            padding: '60px 100px',
            backgroundColor: '#fff',
            borderRadius: '10px',
          }}
        >
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          {children}
        </div>
      );
    },
    Overlay: () => {
      return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
      );
    },
    Wrapper: ({ children }) => {
      return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          {children}
        </div>
      );
    },
  },
});
```

Combined with `ModalProvider` (described below), you can specify the default style for all `useModal` in the project.

## Global Settings

The `ModalProvider` component allows you to apply a common default configuration to all `useModal` hooks.

```jsx
<ModalProvider {...options}>
  <Component />
</ModalProvider>
```

The following example sets all `useModal` hooks to not scroll outside the modal by default.

```jsx
const Component1 = () => {
  const [Modal] = useModal('root');
  return (
    <Modal>
      <h2>Common</h2>
    </Modal>
  );
};
const Component2 = () => {
  const [Modal] = useModal('root', { preventScroll: false }); // override
  return (
    <Modal>
      <h2>Override options</h2>
    </Modal>
  );
};

const App = () => {
  return (
    <ModalProvider preventScroll>
      <Component1 />
      <Component2 />
    </ModalProvider>
  );
};
```

## Demo

https://microcmsio.github.io/react-hooks-use-modal/

## How To Develop

### Setup

```
$ npm install
```

### Build src

```
$ npm run build
```

### Watch src

```
$ npm run watch
```

### Build examples

```
$ npm run build:demo
```

### Start examples

```
$ npm start
```

http://localhost:3001

## License

MIT
