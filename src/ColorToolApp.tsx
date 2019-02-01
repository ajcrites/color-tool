import React, { useReducer } from 'react';

import { ColorToolContextProps, ColorToolContext } from './ColorToolContext';

import { HexInput } from './inputs/HexInput';
import { MultiInput } from './inputs/MultiInput';
import { ColorInput } from './inputs/ColorInput';

import { colorReducer } from './colorReducer';

export const ColorToolApp = () => {
  // Default to empty inputs for RGBA / HSLA. Most of the time we want to
  // treat the inputs as numbers. Using a value is required to let React know
  // that the inputs are controlled.
  const [{ hex, rgba, hsla }, dispatch] = useReducer(colorReducer, {
    hex: '',
    rgba: ['', '', '', ''],
    hsla: ['', '', '', ''],
  });

  const state: ColorToolContextProps = {
    hex,
    rgba,
    hsla,

    dispatch,
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
