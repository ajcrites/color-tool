/**
 * Color Tool application container
 */

import React, { useReducer } from 'react';

import { ColorToolContextProps, ColorToolContext } from '~/ColorToolContext';

import { HexInput } from '~/color/controls/inputs/HexInput';
import { MultiInput } from '~/color/controls/inputs/MultiInput';
import { ColorInput } from '~/color/controls/inputs/ColorInput';
import { KeywordInput } from '~/color/controls/inputs/KeywordInput';

import { HslaModifier } from '~/color/controls/modifiers/HslaModifier';

import { colorReducer } from '~/color/reducer';

export const ColorToolApp = () => {
  // Default to empty inputs for RGBA / HSLA. Most of the time we want to
  // treat the inputs as numbers. Using a value is required to let React know
  // that the inputs are controlled.
  const [{ hex, rgba, hsla, keyword, hasKeyword }, dispatch] = useReducer(
    colorReducer,
    {
      hex: '',
      rgba: ['', '', '', ''],
      hsla: ['', '', '', ''],
      keyword: '',
      hasKeyword: false,
    },
  );

  const state: ColorToolContextProps = {
    hex,
    rgba,
    hsla,
    keyword,
    hasKeyword,

    dispatch,
  };

  return (
    <main id="color-tool" className="colors">
      <ColorToolContext.Provider value={state}>
        <HexInput />
        <MultiInput parser="rgba" label="RGB(A): " />
        <MultiInput parser="hsla" label="HSL(A): " />
        <KeywordInput />
        <ColorInput />
        <div
          className="color-display"
          style={{
            backgroundColor: `rgba(${rgba.join()})`,
          }}
        />

        <section aria-label="hsla color modifiers" className="color-modifiers">
          <HslaModifier label="lighten" hslaIndex={2} amount={10} />
          <HslaModifier label="darken" hslaIndex={2} amount={-10} />
          <HslaModifier label="saturate" hslaIndex={1} amount={10} />
          <HslaModifier label="desaturate" hslaIndex={1} amount={-10} />
        </section>
      </ColorToolContext.Provider>
    </main>
  );
};
