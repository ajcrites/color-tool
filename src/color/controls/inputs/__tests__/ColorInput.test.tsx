import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';

import { ColorToolContext } from '~/ColorToolContext';
import { updateHex } from '~/color/actions';
import { ColorInput } from '../ColorInput';

describe('ColorInput component', () => {
  afterEach(cleanup);

  test('show color input when supported', () => {
    const state: any = {};
    const { container } = render(
      <ColorToolContext.Provider value={state}>
        <ColorInput />
      </ColorToolContext.Provider>,
    );

    expect(container).toBeTruthy();
  });

  test('uses hex black string when invalid hex is provided', () => {
    const state: any = {
      hex: 'A7& -',
    };
    const { container } = render(
      <ColorToolContext.Provider value={state}>
        <ColorInput />
      </ColorToolContext.Provider>,
    );
    const input = container.querySelector('input');

    expect(input.value).toBe('#000000');
  });

  test('update hex value on change', () => {
    const testHex = '#abcdef';
    const state: any = {
      dispatch: jest.fn(),
    };
    const { container } = render(
      <ColorToolContext.Provider value={state}>
        <ColorInput />
      </ColorToolContext.Provider>,
    );
    const input = container.querySelector('input');

    fireEvent.change(input, { target: { value: testHex } });

    expect(state.dispatch).toHaveBeenCalledWith(updateHex(testHex));
  });
});
