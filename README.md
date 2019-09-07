# react-portal-modal

This is a Customizable Modal.

## Usage

```javascript
import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import Modal from '../../src';
import styles from './styles.module.css';

const App = () => {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  return (
    <div>
      <button onClick={open}>OPEN</button>
      <Modal isOpen={isOpen} close={close}>
        <div className={styles.modal}>
          <h1>Title</h1>
          <p>This is a react-portal-modal.</p>
        </div>
      </Modal>
    </div>
  );
};
render(<App />, document.getElementById('root'));
```

## Props

| property  | Required | Type     | description                                 | example               | default |
| :-------- | :------- | :------- | :------------------------------------------ | :-------------------- | :------ |
| isOpen    | required | Boolean  | whether the modal is open                   | false                 | false   |
| close     | required | Function | close the modal                             | -                     | -       |
| elementId | option   | String   | an element id for which the modal is output | 'root', 'app', etc... | 'root'  |

## How To Develop

### Setup

```
$ npm install
```

### Build

```
$ npm run build
```

### Example

```
$ npm start
```

http://localhost:3001

## License

MIT
