# useModal

[![Build Status](https://travis-ci.org/shibe97/react-use-modal.svg?branch=master)](https://travis-ci.org/shibe97/react-use-modal)

This is a react hook which can open the modal easily.

## Usage

```javascript
import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import useModal from 'use-modal';
import styles from './styles.module.css';

const App = () => {
  const [Modal, open, close] = useModal();
  return (
    <div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <div className={styles.modal}>
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
