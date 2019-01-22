import React, { useState } from 'react';

import { ColorToolContextProps, ColorToolContext } from './ColorToolContext';

import { HexInput } from './inputs/HexInput';
import { MultiInput } from './inputs/MultiInput';
import { ColorInput } from './inputs/ColorInput';

export const ColorToolApp = () => {
  const [hex, setHex] = useState('');
  // Default to empty inputs for RGBA / HSLA. Most of the time we want to
  // treat the inputs as numbers. Using a value is required to let React know
  // that the inputs are controlled.
  const [rgba, setRgba] = useState(['', '', '', ''] as any);
  const [hsla, setHsla] = useState(['', '', '', ''] as any);

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
        <ColorInput />
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
