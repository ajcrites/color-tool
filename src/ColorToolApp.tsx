import React, { useState } from 'react';
import { ColorToolContextProps, ColorToolContext } from './ColorToolContext';

import { HexInput } from './inputs/HexInput';
import { RgbaInput } from './inputs/RgbaInput';
import { HslaInput } from './inputs/HslaInput';

export const ColorToolApp = () => {
  const [hex, setHex] = useState('');
  const [rgba, setRgba] = useState([0, 0, 0, 0]);
  const [hsla, setHsla] = useState([0, 0, 0, 0]);

  const state: ColorToolContextProps = {
    hex,
    rgba,
    hsla,

    setHex,
    setRgba,
    setHsla,
  };

  return (
    <main>
      <ColorToolContext.Provider value={state}>
        <HexInput />
        <br />
        <RgbaInput />
        <br />
        <HslaInput />
        <br />
        <div
          style={{
            backgroundColor: `rgba(${rgba.join()})`,
            width: 50,
            height: 50,
          }}
        />
      </ColorToolContext.Provider>
    </main>
  );
};
