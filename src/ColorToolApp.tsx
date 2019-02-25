import React, { useReducer } from 'react';

import { ColorToolContextProps, ColorToolContext } from '~/ColorToolContext';

import { HexInput } from '~/color/controls/inputs/HexInput';
import { MultiInput } from '~/color/controls/inputs/MultiInput';
import { ColorInput } from '~/color/controls/inputs/ColorInput';

import { HslaModifier } from '~/color/controls/modifiers/HslaModifier';

import { colorReducer } from '~/color/reducer';

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
    <main className="colors">
      <ColorToolContext.Provider value={state}>
        <HexInput />
        <MultiInput parser="rgba" label="RGB(A): " />
        <MultiInput parser="hsla" label="HSL(A): " />
        <ColorInput />
        <div
          style={{
            backgroundColor: `rgba(${rgba.join()})`,
            width: 50,
            height: 50,
            border: '1px solid black',
          }}
        />

        <HslaModifier label="lighten" hslaIndex={2} amount={10} />
        <HslaModifier label="darken" hslaIndex={2} amount={-10} />
        <HslaModifier label="saturate" hslaIndex={1} amount={10} />
        <HslaModifier label="desaturate" hslaIndex={1} amount={-10} />
      </ColorToolContext.Provider>
    </main>
  );
};
