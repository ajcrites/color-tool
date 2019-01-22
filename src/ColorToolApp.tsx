import React, { useState } from 'react';
import { ColorToolContextProps, ColorToolContext } from './ColorToolContext';

import { HexInput } from './inputs/HexInput';
import { MultiInput } from './inputs/MultiInput';

export const ColorToolApp = () => {
  const [hex, setHex] = useState('');
  const [rgba, setRgba] = useState([]);
  const [hsla, setHsla] = useState([]);

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
        <MultiInput parser="rgba" label="RGB(A): " />
        <br />
        <MultiInput parser="hsla" label="HSL(A): " />
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
