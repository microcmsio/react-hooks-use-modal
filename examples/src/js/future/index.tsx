import React, { useState } from 'react';

import { useModal } from '../../../../src/future';

const contentStyle1: React.CSSProperties = {
  width: '400px',
  padding: '10px 40px 40px',
  backgroundColor: '#fff',
  borderRadius: '10px',
};
const contentStyle2: React.CSSProperties = {
  width: '400px',
  height: '100%',
  padding: '10px 40px 40px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  borderRadius: '10px',
};
const dialogStyle2: React.CSSProperties = {
  justifyContent: 'flex-end',
};

export const Modal = () => {
  const [Modal1, open1, close1, isOpen1] = useModal();
  const [Modal2, open2, close2] = useModal();
  const [value, setValue] = useState('');

  return (
    <div>
      <div>Modal is Open? {isOpen1 ? 'Yes' : 'No'}</div>
      <button onClick={open1}>OPEN</button>
      <Modal1
        title="Title"
        description="This is a customizable modal."
        contentProps={{
          style: contentStyle1,
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={close1}>CLOSE</button>
        <button onClick={open2}>OPEN 2</button>
      </Modal1>
      <Modal2
        title="Title"
        description="This is a customizable modal."
        dialogProps={{
          style: dialogStyle2,
        }}
        contentProps={{
          style: contentStyle2,
        }}
      >
        <button onClick={close2}>CLOSE</button>
      </Modal2>
    </div>
  );
};
